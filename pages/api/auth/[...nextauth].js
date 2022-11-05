import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "../../../utils/auth";
import prisma from "../../../utils/prismadb";

export const authOptions = {
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 7, // 7 days
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
        return { name: user.username };
      },
    }),
  ],
  // secret: "secret",
  pages: {
    signIn: "/login",
  },
};

export default NextAuth(authOptions);
