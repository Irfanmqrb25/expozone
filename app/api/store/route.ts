import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import getCurrentUser from "@/lib/session";
import getStore from "@/actions/getStore";

export async function POST(request: Request) {
  const session = await getCurrentUser();

  if (!session) {
    return NextResponse.json("unauthorized");
  }

  const body = await request.json();
  const { name, image, email, country, city, address, description } = body;

  const store = await prisma.store.create({
    data: {
      name,
      image,
      email,
      country: country.value,
      city: city.value,
      address,
      description,
      userId: session.id,
    },
  });

  return NextResponse.json(store);
}

export async function PUT(request: Request) {
  const session = await getCurrentUser();
  const store = await getStore();

  if (!session) {
    return NextResponse.json("unauthorized");
  }
  const body = await request.json();
  const { name, image, email, country, city, address, description } = body;

  if (!name || !image || !country || !city || !address || !description)
    return NextResponse.json("All fields are required");

  const updatedStore = await prisma.store.update({
    where: { id: store?.id },
    data: {
      name,
      image,
      email,
      country,
      city,
      address,
      description,
    },
  });

  return NextResponse.json(updatedStore);
}

export async function DELETE(request: Request) {
  const session = await getCurrentUser();
  const store = await getStore();

  if (!session) {
    return NextResponse.json("unauthorized");
  }

  await prisma.store.delete({
    where: { id: store?.id },
    include: { products: true },
  });

  return NextResponse.json({ message: "Store deleted" });
}
