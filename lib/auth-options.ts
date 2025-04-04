import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GithubProvider from "next-auth/providers/github";
import prisma from "@/lib/prisma";
import type { Session, User } from "next-auth";
export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
      GithubProvider({
        clientId: process.env.GITHUB_ID as string,
        clientSecret: process.env.GITHUB_SECRET as string,
      }),
    ],
    callbacks: {
      session({ session, user }: { session: Session; user: User }) {
        if (session.user && user?.id) {
          session.user.id = user.id;
        }
        return session;
      },
    },
  };