"use server"
import { getUserIdFromSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function getIsPremium() {
  try {
    const userId = await getUserIdFromSession();
    if (!userId) {
      throw new Error("Unauthorized");
    }
     console.log("userId",userId)
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { isPremium: true },
    });

    return { isPremium: user?.isPremium ?? false };
  } catch (error: any) {
    console.error("Error in getIsPremium:", error.message);
    return { isPremium: false }; // fallback to non-premium on error
  }
}
