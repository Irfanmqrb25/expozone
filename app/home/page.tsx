import Container from "@/components/Container";
import ProductCard from "@/components/product/ProductCard";
import React from "react";

const HomePage = () => {
  return (
    <Container>
      <div className="grid grid-cols-1 gap-8 pt-20 lg:pt-36 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        <ProductCard />
      </div>
    </Container>
  );
};

export default HomePage;
