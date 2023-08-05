import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import getCurrentUser from "@/lib/session";
import getStore from "@/actions/getStore";

export async function POST(request: Request) {
  const session = await getCurrentUser();
  const store = await getStore();

  if (!session && !store) {
    return NextResponse.json("unauthorized");
  }

  const body = await request.json();
  const { name, image, stock, category, description, price, isFeatured } = body;

  const product = await prisma.product.create({
    data: {
      name,
      image,
      category,
      description,
      isFeatured,
      stock: parseInt(stock),
      price: parseInt(price),
      storeId: store?.id!,
    },
  });
  return NextResponse.json(product);
}

export async function DELETE(
  request: Request,
  { params }: { params: { productId: string } }
) {
  const session = await getCurrentUser();
  const store = await getStore();

  if (!session && !store) {
    return NextResponse.json("unauthorized");
  }

  try {
    const product = await prisma.product.deleteMany({
      where: {
        id: params.productId,
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.log("[DELETE_PRODUCT_ERROR]", error);
    throw new Error("Failed to delete product.");
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("st") ?? "";
    const decodedQuery = decodeURIComponent(query);

    const products = await prisma.product.findMany({
      where: {
        name: {
          contains: decodedQuery,
          mode: "insensitive",
        },
      },
      include: {
        store: true,
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log("[GET_PRODUCTS_ERROR]", error);
    throw new Error("Failed to get products.");
  }
}
