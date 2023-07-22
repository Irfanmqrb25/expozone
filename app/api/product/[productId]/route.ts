import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import getCurrentUser from "@/lib/session";

export async function DELETE(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    const product = await prisma.product.delete({
      where: {
        id: params.productId,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_DELETE]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const user = await getCurrentUser();

    const body = await req.json();

    const { name, price, category, image, stock, isFeatured, description } =
      body;

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!image) {
      return new NextResponse("Image are required", { status: 400 });
    }

    if (!price) {
      return new NextResponse("Price is required", { status: 400 });
    }

    if (!category) {
      return new NextResponse("Category id is required", { status: 400 });
    }

    if (!stock) {
      return new NextResponse("Stock id is required", { status: 400 });
    }

    if (!description) {
      return new NextResponse("Description id is required", { status: 400 });
    }

    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    const product = await prisma.product.update({
      where: {
        id: params.productId,
      },
      data: {
        name,
        image,
        category,
        description,
        isFeatured,
        stock: parseInt(stock),
        price: parseInt(price),
      },
    });

    return NextResponse.json(product);
  } catch (error: any) {
    console.log("[PRODUCT_PATCH]", error.message);
    return new NextResponse("Internal error", { status: 500 });
  }
}
