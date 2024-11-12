import { getUserByEmail } from "@/app/model/user";
import { auth } from "@/auth";

export async function GET() {
  const session = await auth();
  let user = session?.user;
  if (user) {
    const userDoc = await getUserByEmail(user.email);
    if (userDoc) {
      const res = new Response(JSON.stringify({ data: userDoc }), {
        status: 200,
      });
      res.headers.set("Cache-Control", "no-store, max-age=0");
      return res;
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
