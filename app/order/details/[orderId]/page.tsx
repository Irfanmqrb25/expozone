import getOrders from "@/actions/getOrders";
import getCurrentUser from "@/lib/session";
import DetailsOrderlient from "./client";

const DetailsPage = async ({ params }: { params: { orderId: string } }) => {
  const session = await getCurrentUser();
  const { formatedOrders } = await getOrders({ userId: session?.id });

  const orders = formatedOrders.find((order) => order.id === params.orderId);

  return <DetailsOrderlient order={orders} />;
};

export default DetailsPage;
