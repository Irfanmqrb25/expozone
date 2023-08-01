import prisma from "@/lib/prisma";
import getCurrentUser from "@/lib/session";

export default async function getFavoriteProducts() {
  try {
    const session = await getCurrentUser();

    if (!session) {
      return [];
    }

    const favorites = await prisma.product.findMany({
      where: {
        id: {
          in: [...(session.favoriteIds || [])],
        },
      },
      include: {
        store: true,
      },
    });

    return favorites;
  } catch (error: any) {
    throw new Error(error);
  }
}
