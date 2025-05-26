"use server"
import { getUserIdFromSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function getIsPremium() {
  try {
    const userId = await getUserIdFromSession();
    if (!userId) {
      throw new Error("Unauthorized");
    }
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { isPremium: true ,lastSubscriptionDate:true},
    });

    return { isPremium: user?.isPremium ?? false ,expireDate:user?.lastSubscriptionDate };
  } catch (error: any) {
    console.error("Error in getIsPremium:", error.message);
    return { isPremium: false }; // fallback to non-premium on error
  }
}
