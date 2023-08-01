import SecondaryModal from "@/components/modal/SecondaryModal";
import ModalClient from "./client";

import getCurrentUser from "@/lib/session";
import getOrders from "@/actions/getOrders";

const Details = async ({ params }: { params: { orderId: string } }) => {
  const session = await getCurrentUser();
  const { formatedOrders } = await getOrders({ userId: session?.id });

  const orders = formatedOrders.find((order) => order.id === params.orderId);

  return (
    <SecondaryModal>
      <ModalClient order={orders} />
    </SecondaryModal>
  );
};

export default Details;
