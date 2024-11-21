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
        // Check if userId is provided
        if (!credentials.userId) {
          console.log('User ID is required');
          throw new Error('User ID is required');
        }

        // Log the received userId for debugging
        console.log('Received userId:', credentials.userId);

        // Simulate user retrieval (replace this with actual validation logic)
        const user = { id: credentials.userId }; // Here you would normally check against your database or API

        // Log the user object that will be returned
        console.log('Authorized user:', user);

        return user; // Return the user object if verification is successful
      },
    }),
  ],
  session: {
    jwt: true,
    maxAge: 24 * 60 * 60,
  },
  callbacks: {
    async jwt(token, user) {
      if (user) {
        token.id = user.id; // Save user ID in token
        // Log the token object after adding user ID
        console.log('JWT Token:', token);
      }
      return token;
    },
    async session(session, token) {
      session.user.id = token.id; // Attach user ID to session
      // Log the session object to see the user ID
      console.log('Session object:', session);
      return session;
    },
  },
};

export default (req, res) => NextAuth(req, res, authOptions);
