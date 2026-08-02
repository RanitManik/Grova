import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import { generateUsername } from "@/lib/utils";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/login",
    newUser: "/dashboard",
  },
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.username =
          (user as { username?: string }).username ?? null;
      }
      return session;
    },
    async signIn({ user, profile }) {
      // Auto-generate username on first sign-in
      if (user.email) {
        const existingUser = await db.user.findUnique({
          where: { email: user.email },
          select: { username: true },
        });

        if (existingUser && !existingUser.username) {
          const base =
            (profile as { login?: string })?.login || user.name || user.email;
          const username = generateUsername(base || "user");
          await db.user.update({
            where: { email: user.email },
            data: { username },
          });
        }
      }
      return true;
    },
  },
  session: {
    strategy: "database",
  },
});

// Extend the session type
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string | null;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}
