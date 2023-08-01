import getCurrentUser from "@/lib/session";
import prisma from "@/lib/prisma";
import getStore from "./getStore";
import { ProductsColumn } from "@/components/table/ProductTable";
import { format } from "date-fns";

export default async function getProductByStore(): Promise<ProductsColumn[]> {
  try {
    const session = await getCurrentUser();
    const store = await getStore();

    if (!session) {
      return [];
    }

    if (!store) {
      return [];
    }

    const products = await prisma.product.findMany({
      where: {
        storeId: store?.id,
      },
      include: {
        store: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const formatedProducts: ProductsColumn[] = products.map((product) => ({
      id: product.id,
      name: product.name,
      category: product.category,
      stock: product.stock,
      price: product.price,
      isFeatured: product.isFeatured,
      createdAt: format(product.createdAt, "dd-MM-yyyy"),
    }));

    return formatedProducts;
  } catch (error) {
    console.log(error);
    return [];
  }
}
