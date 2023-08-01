import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import getCurrentUser from "@/lib/session";

export async function POST(request: Request) {
  const session = await getCurrentUser();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const body = await request.json();
  const {
    productId,
    totalPrice,
    recipient,
    phone,
    address,
    postalCode,
    quantity,
    payment,
    cardNumber,
    shipment,
  } = body;

  if (
    !productId ||
    !totalPrice ||
    !recipient ||
    !phone ||
    !address ||
    !postalCode ||
    !payment ||
    !cardNumber ||
    !shipment
  ) {
    return NextResponse.error();
  }

  try {
    // Get the product from the database based on the productId
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Check if the product has enough stock for the order
    if (product.stock < quantity) {
      return NextResponse.json({ error: "Not enough stock" }, { status: 400 });
    }

    // Reduce the product stock by the ordered quantity
    await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        stock: product.stock - quantity,
      },
    });

    const order = await prisma.order.create({
      data: {
        userId: session.id,
        productId,
        totalPrice,
        recipient,
        phone,
        address,
        postalCode,
        quantity,
        payment,
        cardNumber,
        shipment,
        status: "process",
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.error();
  }
}
