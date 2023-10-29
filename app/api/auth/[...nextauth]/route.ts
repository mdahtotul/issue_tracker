import prisma from "@/prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth";
import { authOptions } from "./option";

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: authOptions,
  session: {
    strategy: "jwt",
  },
});

export { handler as GET, handler as POST };
