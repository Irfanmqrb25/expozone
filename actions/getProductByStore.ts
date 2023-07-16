import getCurrentUser from "@/lib/session";
import prisma from "@/lib/prisma";
import getStore from "./getStore";

export default async function getProductByStore() {
  try {
    const session = await getCurrentUser();
    const store = await getStore();

    if (!session) {
      throw new Error("User session not found");
    }

    const products = await prisma.product.findMany({
      where: {
        storeId: store?.id,
      },
      include: {
        store: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });

    return products;
  } catch (error) {
    console.log(error);
  }
}
