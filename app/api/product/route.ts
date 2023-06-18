import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import getCurrentUser from "@/lib/session";
import getStore from "@/app/actions/getStore";

export async function POST(request: Request) {
  const session = await getCurrentUser();
  const store = await getStore();

  if (!session && !store) {
    return NextResponse.json("unauthorized");
  }

  const body = await request.json();
  const { name, image, category, description, price } = body;

  const product = await prisma.product.create({
    data: {
      name,
      image,
      category,
      description,
      price: parseInt(price),
      storeId: store?.id!,
    },
  });
  return NextResponse.json(product);
}
