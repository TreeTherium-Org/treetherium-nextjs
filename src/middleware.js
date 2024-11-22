import NextAuth from "next-auth";
import { NextResponse } from "next/server";

const authConfig = {
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async session({ session, token }) {
      return session;
    },
  },
  providers: [], // Add providers with an empty array for now
};

const { auth } = NextAuth(authConfig);

function handleUnauthorized(nextUrl) {
  const { pathname } = nextUrl || {};
  if (pathname.startsWith("/api")) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  } else {
    return Response.redirect(new URL("/signin", nextUrl));
  }
}

export default auth((req) => {
  const { nextUrl, auth } = req;
  const { pathname } = nextUrl || {};
  const user = auth?.user;

  if (
    !user &&
    (pathname === "/api/auth" ||
      pathname === "/" ||
      pathname === "/signin" ||
      pathname === "/signup" ||
      pathname === "/lostpassword" ||
      pathname.startsWith("/api/auth"))
  ) {
    return;
  }
  if (!user) {
    return handleUnauthorized(nextUrl);
  }
  if (
    pathname === "/signin" ||
    pathname === "/signup" ||
    pathname === "/lostpassword"
  ) {
    return Response.redirect(new URL("/home", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ["/((?!_next/static|_next/image|.*\\.png$).*)"],
};
