import getStore from "@/actions/getStore";
import OrderTable from "@/components/table/OrderTable";
import getOrders from "@/actions/getOrders";
import EmptyStore from "@/components/EmptyPage";

const OrdersPage = async () => {
  const store = await getStore();

  const orderData = await getOrders({ storeId: store?.id });

  return (
    <div>
      <OrderTable store={store} orderData={orderData.formatedOrders} />
    </div>
  );
};

export default OrdersPage;
