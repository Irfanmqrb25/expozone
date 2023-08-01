import { redirect } from "next/navigation";

import getStore from "@/actions/getStore";
import getProductByStore from "@/actions/getProductByStore";
import getCurrentUser from "@/lib/session";

import Container from "@/components/Container";
import EmptyPage from "@/components/EmptyPage";
import ProductCard from "@/components/card/ProductCard";

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

  if (products!.length < 1) {
    return (
      <div className="flex justify-center h-full mt-20 text-lg font-medium text-center">
        There are no products yet
      </div>
    );
  }

  return (
    <Container>
      <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {products?.map((product: any) => (
          <ProductCard
            session={session}
            key={product.id}
            productData={product}
          />
        ))}
      </div>
    </Container>
  );
};

export default StorePage;
