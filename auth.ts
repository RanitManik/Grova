import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import { generateUsername } from "@/lib/utils";

const customAdapter = PrismaAdapter(db);
const originalCreateUser = customAdapter.createUser!;
customAdapter.createUser = async (user) => {
  const base = user.name || user.email;
  const username = generateUsername(base || "user");
  return originalCreateUser({ ...user, username } as Parameters<
    typeof originalCreateUser
  >[0]);
};

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: customAdapter,
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
        if (user.image) session.user.image = user.image;
        if (user.name) session.user.name = user.name;
      }
      return session;
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
