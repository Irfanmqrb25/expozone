import { redirect } from "next/navigation";

import getStore from "../actions/getStore";
import getProductByStore from "../actions/getProductByStore";
import getCurrentUser from "@/lib/session";

import Container from "@/components/Container";
import EmptyPage from "@/components/EmptyPage";
import ProductCard from "@/components/product/ProductCard";

const StorePage = async () => {
  const store = await getStore();
  const products = await getProductByStore();
  const session = await getCurrentUser();

  if (!session) {
    redirect("/login");
  }

  if (!store) {
    return (
      <div className="flex items-center justify-center w-full h-screen m-auto">
        <EmptyPage />
      </div>
    );
  }

  return (
    <Container>
      <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products?.map((product: any) => (
          <ProductCard
            key={product.id}
            productName={product.name}
            productImage={product.image}
            price={product.price}
            storeImage={store.image}
            storeName={store.name}
          />
        ))}
      </div>
    </Container>
  );
};

export default StorePage;
