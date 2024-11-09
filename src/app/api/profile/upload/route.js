import {
  ref,
  getDownloadURL,
  deleteObject,
  uploadBytes,
} from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import { db, storage } from "@/firebase";
import { auth } from "@/auth";

export async function POST(request) {
  const session = await auth();
  let user = session?.user;
  const formData = await request.formData();
  const file = formData.get("file");

  console.log("file==>", file);

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  // Validate file type and size
  const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (!validTypes.includes(file.type)) {
    return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
  }
  if (file.size > maxSize) {
    return NextResponse.json(
      { error: "File size exceeds 5MB" },
      { status: 400 }
    );
  }

  try {
    if (user.profileImageUrl && user.profileImageUrl !== "") {
      const oldImageRef = ref(storage, user.profileImageUrl);
      await deleteObject(oldImageRef);
    }

    const storageRef = ref(storage, `profile-images/${user.id}_${Date.now()}`);
    const metadata = { contentType: file.type };

    await uploadBytes(storageRef, await file.arrayBuffer(), metadata);
    const downloadUrl = await getDownloadURL(storageRef);

    const userDocRef = doc(db, "users", user.id);
    await updateDoc(userDocRef, { profileImageUrl: downloadUrl });

    return NextResponse.json({ downloadUrl });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
}
