import { getUserByEmail, getUserByWalletAddress } from "@/app/model/user";
import { auth } from "@/auth";
import { db, storage } from "@/firebase";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export async function GET() {
  const session = await auth();
  let user = session?.user;
  user =
    user.provider === "solana"
      ? await getUserByWalletAddress(user.walletAddress)
      : await getUserByEmail(user.email);

  try {
    if (user) {
      const treeCollection = collection(db, "tree");
      const q = query(treeCollection, where("userId", "==", user.id));
      const treeSnapshot = await getDocs(q);
      const treeList = treeSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return new Response(JSON.stringify({ data: treeList }), {
        status: 200,
      });
    } else {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }
  } catch (e) {
    console.log(e);
  }
}

export async function POST(req) {
  const session = await auth();
  let user = session.user;
  user =
    user.provider === "solana"
      ? await getUserByWalletAddress(user.walletAddress)
      : await getUserByEmail(user.email);

  try {
    if (user) {
      const formData = await req.formData();
      const file = formData.get("file");
      const title = formData.get("title");
      const description = formData.get("description");
      const location = formData.get("location");
      const country = formData.get("country");

      const storageRef = ref(
        storage,
        `tree-images/${user.id}_${Date.now()}_${file.name}`
      );
      const metadata = { contentType: file.type };
      await uploadBytes(storageRef, await file.arrayBuffer(), metadata);
      const downloadURL = await getDownloadURL(storageRef);
      await addDoc(collection(db, "tree"), {
        userId: user.id,
        title,
        description,
        location,
        country,
        imageUrl: downloadURL,
        timestamp: new Date(),
      });

      return new Response(
        JSON.stringify({ message: "Successfully planted a Tree!" }),
        {
          status: 200,
        }
      );
    } else {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }
  } catch (e) {
    console.log(e);
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 401,
    });
  }
}
