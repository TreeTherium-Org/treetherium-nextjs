import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./firebase";
import Google from "next-auth/providers/google";
import { addDoc, collection } from "firebase/firestore";
import { getUserByEmail, getUserByWalletAddress } from "./app/model/user";
import { SigninMessage } from "./app/libs/signinMessage";
import { getCsrfToken } from "next-auth/react";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    CredentialsProvider({
      id: "solana",
      name: "Solana",
      credentials: {
        message: {
          label: "Message",
          type: "text",
        },
        signature: {
          label: "Signature",
          type: "text",
        },
      },
      authorize: async (credentials) => {
        // console.log("authorize", credentials);
        const signinMessage = new SigninMessage(
          JSON.parse(credentials?.message || "{}")
        );
        const nextAuthUrl = new URL(process.env.NEXTAUTH_URL);
        if (signinMessage.domain !== nextAuthUrl.host) {
          return null;
        }

        // TODO: handle CSRF
        // const csrfToken = await getCsrfToken();
        // console.log("csrfToken", csrfToken);
        // if (signinMessage.nonce !== csrfToken) {
        //   return null;
        // }

        const validationResult = await signinMessage.validate(
          credentials?.signature || ""
        );
        if (!validationResult)
          throw new Error("Could not validate the signed message");

        const user = await getUserByWalletAddress(signinMessage.publicKey);
        return {
          walletAddress: signinMessage.publicKey,
          id: user?.uid || "",
          email: user?.email || "",
          name: user?.username || "",
          provider: "solana",
        };
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      id: "email",
      name: "email",
      credentials: {
        userId: { label: "User ID", type: "text" },
        email: { label: "Email", type: "text" },
        username: { label: "Username", type: "text" },
        provider: { label: "Provider", type: "text" },
        walletAddress: { label: "Wallet Address", type: "text" }, // Add wallet address here
      },
      authorize: async (credentials) => {
        if (credentials.userId) {
          const user = await getUserByEmail(credentials.email);
          if (user) {
            return {
              id: user.id,
              email: user.email || "",
              name: user.username || "",
              provider: "email",
              walletAddress: user.walletAddress || "",
            };
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, account }) => {
      if (user) {
        // console.log("jwt", user, token);
        const provider = account.provider;
        const userExist =
          provider === "solana"
            ? await getUserByWalletAddress(user.walletAddress)
            : await getUserByEmail(token.email);

        if (!userExist) {
          const newUser = await addDoc(collection(db, "users"), {
            email: token.email || "",
            username: token.name || "",
            walletAddress: token.walletAddress || user.walletAddress || "",
            provider: provider,
            createdAt: new Date(),
          });

          token.userId = newUser.id;
          token.provider = provider;
          token.email = user.email;
          token.name = user.name;
          token.walletAddress = user.walletAddress;
          return token;
        } else {
          // token.userId = user.id;
          token.email = userExist.email;
          token.name = userExist.name;
          token.provider = userExist.provider;
          token.walletAddress = userExist.walletAddress;
        }
      }
      // Add all user information to the token
      return token;
    },
    session: async ({ session, token }) => {
      // console.log("session", token);
      if (token) {
        // Add all user information to the session
        session.user.id = token.userId;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.provider = token.provider;
        session.user.walletAddress = token.walletAddress;
      } else {
        session = {};
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, 
    updateAge: 12 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  // adapter: FirestoreAdapter(authfirestore),
});
