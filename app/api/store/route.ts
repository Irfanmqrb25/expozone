import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import getCurrentUser from "@/lib/session";

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
