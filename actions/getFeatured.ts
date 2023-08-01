import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

interface IParams {
  category: string;
}

export default async function getFeatured(params: IParams) {
  const { category } = params;

  if (!category) {
    return [];
  }

  try {
    const products = await prisma.product.findMany({
      where: {
        isFeatured: true,
        category: {
          equals: category,
        },
      },
      include: {
        store: true,
      },
      take: 5,
    });
    return products;
  } catch (error) {
    console.log(error);
  }
}
