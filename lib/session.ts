import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/lib/prisma";

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
  try {
    const session = await getSession();
    return session?.user;
  } catch (error) {
    return null;
  }
}
