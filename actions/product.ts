import { PrismaClient } from "@prisma/client";

export async function deleteProductAction({ id }: { id: string }) {
  try {
    const deletedProduct = await prisma?.product.delete({
      where: {
        id,
      },
    });

    return deletedProduct;
  } catch (error) {
    console.error("[DELETE_PRODUCT_ERROR]", error);
    throw new Error("Failed to delete product.");
  }
}
