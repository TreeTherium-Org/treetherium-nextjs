import { getUserByEmail, getUserByWalletAddress } from "@/app/model/user";
import { auth } from "@/auth";
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";

export async function GET(req, context) {
  const session = await auth();
  const { id } = context.params;
  let user = session?.user;
  user =
    user.provider === "solana"
      ? await getUserByWalletAddress(user.walletAddress)
      : await getUserByEmail(user.email);

  try {
    if (user) {
      const projectsDoc = doc(db, "projects", id);
      const projectsSnapshot = await getDoc(projectsDoc);

      return new Response(JSON.stringify({ data: projectsSnapshot.data() }), {
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
