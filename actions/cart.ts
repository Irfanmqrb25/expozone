import prisma from "@/lib/prisma";
import getCurrentUser from "@/lib/session";

export async function getCart() {
  const session = await getCurrentUser();

  if (!session) {
    return null;
  }

  try {
    const cart = await prisma.cart.findFirst({
      where: {
        userId: session?.id,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    return cart;
  } catch (error) {
    console.error("Error while getting cart:", error);
    throw error;
  }
}
