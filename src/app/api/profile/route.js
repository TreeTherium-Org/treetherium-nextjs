import { getUserByEmail, getUserByWalletAddress } from "@/app/model/user";
import { auth } from "@/auth";
import { db } from "@/firebase";
import { doc, updateDoc } from "firebase/firestore";

export async function POST(req) {
  const body = await req.json();
  const session = await auth();
  const user = session.user;
  try {
    if (user) {
      const { username, motto, walletAddress, country } = body;
      const userDoc =
        user.provider === "solana"
          ? await getUserByWalletAddress(user.walletAddress)
          : await getUserByEmail(user.email);
      const userDocRef = doc(db, "users", userDoc.id);
      await updateDoc(userDocRef, {
        username,
        motto,
        walletAddress,
        country,
      });

      return new Response(
        JSON.stringify({ message: "Successfully updated profile" }),
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
