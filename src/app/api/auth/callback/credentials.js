import NextAuth from "next-auth";
import Providers from "next-auth/providers";

const authOptions = {
  providers: [
    Providers.Credentials({
      name: "Credentials",
      credentials: {
        userId: { label: "User ID", type: "text" },
      },
      async authorize(credentials) {
        // Simply return the userId without verification
        return { id: credentials.userId };
      },
    }),
  ],
  session: {
    jwt: true,
  },
  callbacks: {
    async jwt(token, user) {
      if (user) {
        token.id = user.id; // Save user ID in token
      }
      return token;
    },
    async session(session, token) {
      session.user.id = token.id; // Attach user ID to session
      return session;
    },
  },
};

export default (req, res) => NextAuth(req, res, authOptions);
