import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "../../../utils/hash";
import prisma from "../../../utils/prismadb";

export const authOptions = {
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 1, // 1 days
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: {
            username: credentials.username,
          },
        });
        if (!user) {
          throw new Error("No user found");
        }
        const isValid = await verifyPassword(credentials.password, user.password);
        if (!isValid) {
          throw new Error("Invalid password");
        }
        return { id: user.id, username: user.username, admin: user.admin };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username;
        token.admin = user.admin;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.username = token.username;
      session.user.admin = token.admin;
      session.user.id = token.id;
      return session;
    },
  },
};

export default NextAuth(authOptions);
