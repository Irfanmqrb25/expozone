import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { productId, userId, quantity } = body;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        carts: {
          include: { items: { include: { product: true } } },
        },
      },
    });

    if (!user) {
      return NextResponse.json("User not found");
    }

    let cart: any = null;
    if (user.carts.length > 0) {
      cart = user.carts[0];
    }

    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          user: { connect: { id: userId } },
        },
        include: {
          items: { include: { product: true } },
        },
      });
    }

    const existingCartItem = cart.items.find(
      (item: any) => item.productId === productId
    );

    if (existingCartItem) {
      const newQuantity = existingCartItem.quantity + quantity;
      await prisma.cartItem.update({
        where: { id: existingCartItem.id },
        data: { quantity: newQuantity },
      });
    } else {
      const product = await prisma.product.findUnique({
        where: { id: productId },
      });

      if (!product) {
        return NextResponse.json("Product not found");
      }

      await prisma.cartItem.create({
        data: {
          quantity,
          total: product.price * quantity,
          product: { connect: { id: productId } },
          cart: { connect: { id: cart.id } },
        },
      });
    }

    return NextResponse.json("Product added to cart successfully");
  } catch (error) {
    console.error(error);
    return NextResponse.json("Failed to add product to cart");
  }
}
