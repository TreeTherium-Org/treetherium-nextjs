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
      const projectCollection = collection(db, "projects");
      const q = query(projectCollection, where("userId", "==", user.id));
      const projectSnapshot = await getDocs(q);
      const projectList = projectSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return new Response(JSON.stringify({ data: projectList }), {
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
      const file = formData.get("image");
      const projectName = formData.get("projectName");
      const description = formData.get("description");
      const treeSpecies = formData.get("treeSpecies");
      const targetTrees = formData.get("targetTrees");
      const startDate = formData.get("startDate");
      const endDate = formData.get("endDate");
      const location = formData.get("location");
      const country = formData.get("country");
      const members = formData.get("members");

      const storageRef = ref(
        storage,
        `project-images/${user.id}_${Date.now()}_${file.name}`
      );
      const metadata = { contentType: file.type };
      await uploadBytes(storageRef, await file.arrayBuffer(), metadata);
      const downloadURL = await getDownloadURL(storageRef);

      // Save project details to Firestore
      await addDoc(collection(db, "projects"), {
        userId: user.id,
        projectName,
        description,
        treeSpecies,
        targetTrees: parseInt(targetTrees, 10), // Ensure targetTrees is stored as a number
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        location,
        country,
        members: members.split(",").map((email) => email.trim()), // Store members as an array
        imageUrl: downloadURL,
        timestamp: new Date(),
      });

      return new Response(
        JSON.stringify({ message: "Project successfully created!" }),
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
    console.error(e);
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
    });
  }
}

