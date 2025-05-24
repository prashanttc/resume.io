import { getUserIdFromSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function getIsPremium() {
  try {
    const user = await getUserIdFromSession();
    if (!user) {
      throw new Error("unauthorized");
    }
    const isPremium = await prisma.user.findUnique({
      where: {
        id: user,
      },
      select: {
        isPremium: true,
      },
    });
    if(!isPremium){
        return ({isPremium:false})
    }
    return ({isPremium:true})
  } catch (error: any) {
    console.log("internal server error", error.message);
    throw new Error(error.message || "something went wrong");
  }
}
