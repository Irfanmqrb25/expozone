import { OrdersColumn } from "@/components/table/OrderTable";
import prisma from "@/lib/prisma";
import { format } from "date-fns";

interface IParams {
  productId?: string;
  userId?: string;
  storeId?: string;
  id?: string;
}

export default async function getOrders(params: IParams) {
  try {
    const { productId, userId, storeId, id } = params;

    if (!storeId && !userId && !productId && !id) {
      return {
        orders: [],
        formatedOrders: [],
        message: "All parameters are required",
      };
    }

    const query: any = {};

    if (productId) {
      query.productId = productId;
    }

    if (id) {
      query.id = id;
    }

    if (userId) {
      query.userId = userId;
    }

    if (storeId) {
      query.product = { storeId };
    }

    const orders = await prisma.order.findMany({
      where: query,
      include: {
        product: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const formatedOrders: OrdersColumn[] = orders.map((order) => ({
      id: order.id,
      product: {
        id: order.product.id,
        name: order.product.name,
        image: order.product.image,
        category: order.product.category,
        stock: order.product.stock,
        price: order.product.price,
      },
      quantity: order.quantity,
      buyerDetails: {
        name: order.recipient,
        phone: order.phone,
        address: order.address,
        postalCode: order.postalCode,
      },
      shipment: order.shipment,
      totalPrice: order.totalPrice,
      createdAt: format(order.createdAt, "MMM d, yyyy 'at' hh:mm a"),
      status: order.status,
      payment: order.payment,
    }));

    return { orders, formatedOrders };
  } catch (error: any) {
    throw new Error(error.message);
  }
}
