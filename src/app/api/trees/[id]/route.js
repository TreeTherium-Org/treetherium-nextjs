import { auth } from "@/auth";
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";

export async function GET(req, context) {
  const session = await auth();
  const { id } = context.params;
  let user = session?.user;
  try {
    if (user) {
      const treeDoc = doc(db, "tree", id);
      const treeSnapshot = await getDoc(treeDoc);

      return new Response(JSON.stringify({ data: treeSnapshot.data() }), {
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
