import { auth } from "@/auth";
import { db } from "@/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function GET() {
  const session = await auth();
  let user = session?.user;
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
