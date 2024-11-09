import { auth } from "@/auth";
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";

export async function GET() {
  const session = await auth();
  let user = session?.user;

  if (user) {
    const userDoc = doc(db, "users", user.id);
    const userSnapshot = await getDoc(userDoc);

    if (userSnapshot.exists()) {
      return new Response(JSON.stringify({ data: userSnapshot.data() }), {
        status: 200,
      });
    } else {
      return new Response(JSON.stringify({ message: "Unable to find user" }), {
        status: 401,
      });
    }
  } else {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }
}
