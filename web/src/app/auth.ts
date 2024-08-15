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
    async signIn({ user }): Promise<boolean> {
      try {
        const customerId = user.id;
        const response = await fetch(
          `${process.env.BACKEND_BASE_URL}/api/customers/create`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: customerId }),
          }
        );

        if (!response.ok) {
          console.error("Failed to create customer", await response.text());
          return false;
        }

        return true;
      } catch (error) {
        console.error("Error in sign-in callback:", error);
        return false;
      }
    },
  },
};

export default authOptions;
