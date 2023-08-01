import EmptyMessage from "@/components/EmptyMessage";
import OrderCard from "@/components/card/OrderCard";

import { TbPaperBagOff } from "react-icons/tb";

import getCurrentUser from "@/lib/session";
import getOrders from "@/actions/getOrders";

const OrderPage = async () => {
  const session = await getCurrentUser();
  const { formatedOrders } = await getOrders({ userId: session?.id });

  if (!session) {
    return (
      <EmptyMessage
        icon={TbPaperBagOff}
        title="There are no orders available"
        description="You must login first!"
        href="/login"
        labelHref="Sign in"
        needAction
      />
    );
  }

  if (formatedOrders.length === 0) {
    return (
      <EmptyMessage
        icon={TbPaperBagOff}
        title="There are no orders available"
        description="Looks like you haven't ordered anything yet"
      />
    );
  }

  return (
    <>
      <h1 className="mb-4 text-2xl font-semibold md:text-3xl">My Orders</h1>
      <div className="grid grid-cols-1 gap-5 mx-1 md:gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {formatedOrders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </>
  );
};

export default OrderPage;
