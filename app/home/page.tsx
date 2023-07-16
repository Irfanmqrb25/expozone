import React from "react";

import Container from "@/components/Container";
import RemoveFilter from "@/components/RemoveFilter";
import ProductCard from "@/components/product/ProductCard";

import getProducts, { IProductParams } from "@/actions/getProducts";

interface HomePageProps {
  searchParams: IProductParams;
}

const HomePage = async ({ searchParams }: HomePageProps) => {
  const products = await getProducts(searchParams);

  if (products?.length === 0) {
    return (
      <Container>
        <RemoveFilter title="Product Not Found" reset />
      </Container>
    );
  }

  return (
    <Container>
      <div className="grid grid-cols-1 gap-5 pt-20 mx-1 md:gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {products?.map((product) => (
          <ProductCard key={product.id} productData={product} />
        ))}
      </div>
    </Container>
  );
};

export default HomePage;
