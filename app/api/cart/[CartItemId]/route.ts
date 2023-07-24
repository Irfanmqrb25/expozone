import prisma from "@/lib/prisma";
import getCurrentUser from "@/lib/session";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  const session = await getCurrentUser();

  if (!session) {
    return NextResponse.json("Unauthorized");
  }

  const body = await request.json();
  const { cartItemId, quantity, cartUserId } = body;

  try {
    const cartItem = await prisma.cartItem.findUnique({
      where: { id: cartItemId },
      include: { cart: { include: { user: true } }, product: true },
    });

    if (!cartItem) {
      return NextResponse.json("Cart item not found");
    }

    const userId = session?.id;
    if (userId !== cartUserId) {
      return NextResponse.json("Not allowed");
    }

    if (quantity <= 0) {
      await prisma.cartItem.delete({ where: { id: cartItemId } });
    } else {
      await prisma.cartItem.update({
        where: { id: cartItemId },
        data: {
          quantity,
          total: cartItem.product.price * quantity,
        },
      });
    }

    return NextResponse.json("Quantity updated successfully");
  } catch (error) {
    console.error(error);
    return NextResponse.json("Failed to update quantity");
  }
}

export async function DELETE(request: Request) {
  const session = await getCurrentUser();

  if (!session) {
    return NextResponse.json("Unauthorized");
  }

  const body = await request.json();
  const { cartItemId, cartUserId } = body;

  try {
    const cartItem = await prisma.cartItem.findUnique({
      where: { id: cartItemId },
      include: { cart: { include: { user: true } } },
    });

    if (!cartItem) {
      return NextResponse.json("Cart item not found");
    }

    const userId = session?.id;
    if (userId !== cartUserId) {
      return NextResponse.json("Not allowed");
    }

    await prisma.cartItem.delete({ where: { id: cartItemId } });

    return NextResponse.json("Cart item deleted successfully");
  } catch (error) {
    console.error(error);
    return NextResponse.json("Failed to delete cart item");
  }
}
