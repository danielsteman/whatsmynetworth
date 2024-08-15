import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { Adapter } from "next-auth/adapters";

const prisma = new PrismaClient();

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  adapter: <Adapter>PrismaAdapter(prisma),
  callbacks: {
    async signIn({
      user,
      account,
      profile,
      email,
      credentials,
    }): Promise<boolean> {
      return true;
    },
  },
};

export default authOptions;
