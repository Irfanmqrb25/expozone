import Container from "@/components/Container";
import ProductCard from "@/components/product/ProductCard";
import React from "react";
import getProducts, { IProductParams } from "../actions/getProducts";

interface HomePageProps {
  searchParams: IProductParams;
}

const HomePage = async ({ searchParams }: HomePageProps) => {
  const products = await getProducts(searchParams);

  if (products?.length === 0) {
    return (
      <Container>
        <p>No products found</p>
      </Container>
    );
  }

  return (
    <Container>
      <div className="grid grid-cols-1 gap-8 pt-20 lg:pt-36 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {products?.map((product) => (
          <ProductCard
            key={product.id}
            storeName={product.store.name}
            storeImage={product.store.image}
            productName={product.name}
            productImage={product.image}
            price={product.price}
          />
        ))}
      </div>
    </Container>
  );
};

export default HomePage;
