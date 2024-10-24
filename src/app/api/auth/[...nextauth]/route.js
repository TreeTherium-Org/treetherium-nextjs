// app/api/auth/[...nextauth]/route.js
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Firebase',
            credentials: {},
            authorize: async (credentials) => {
                if (credentials.userId) {
                    // Create user object with all possible fields
                    return {
                        id: credentials.userId,
                        email: credentials.email || '',
                        name: credentials.username || '',
                        provider: credentials.provider || '',
                        walletAddress: credentials.walletAddress || '', // Add wallet address
                    };
                }
                return null;
            },
        }),
    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                // Add all user information to the token
                token.userId = user.id;
                token.email = user.email;
                token.name = user.name;
                token.provider = user.provider;
                token.walletAddress = user.walletAddress;
            }
            return token;
        },
        session: async ({ session, token }) => {
            if (token) {
                // Add all user information to the session
                session.user.id = token.userId;
                session.user.email = token.email;
                session.user.name = token.name;
                session.user.provider = token.provider;
                session.user.walletAddress = token.walletAddress;
            }
            return session;
        },
    },
    pages: {
        signIn: '/signin',
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };