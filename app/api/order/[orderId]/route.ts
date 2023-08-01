import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import getCurrentUser from "@/lib/session";

export async function DELETE(
  req: Request,
  { params }: { params: { orderId: string } }
) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    if (!params.orderId) {
      return new NextResponse("Order id is required", { status: 400 });
    }

    const order = await prisma.order.delete({
      where: {
        id: params.orderId,
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.log("[PRODUCT_DELETE]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { orderId: string } }
) {
  const session = await getCurrentUser();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const body = await request.json();
  const { status } = body;

  if (!status || (status !== "canceled" && status !== "finished")) {
    return NextResponse.error();
  }

  try {
    const order = await prisma.order.findUnique({
      where: {
        id: params.orderId,
      },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (order.userId !== session.id) {
      return NextResponse.json(
        { error: "You are not authorized to update this order" },
        { status: 403 }
      );
    }

    const updatedOrder = await prisma.order.update({
      where: {
        id: params.orderId,
      },
      data: {
        status,
      },
    });

    return NextResponse.json(updatedOrder);
  } catch (error) {
    return NextResponse.error();
  }
}
