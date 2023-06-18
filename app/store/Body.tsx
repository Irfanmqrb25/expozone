"use client";
import ProductCard from "@/components/product/ProductCard";
import { VscDiffAdded } from "react-icons/vsc";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface BodyProps {
  products: any;
  store: any;
}
const Body: React.FC<BodyProps> = ({ products, store }) => {
  const router = useRouter();
  const [activeButton, setActiveButton] = useState("product");

  useEffect(() => {
    console.log(products);
  });

  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <div className="flex flex-col justify-between gap-2 md:flex-row md:gap-0">
        <div className="flex items-center w-full gap-10 text-lg">
          <button onClick={() => setActiveButton("product")}>Product</button>
          <button onClick={() => setActiveButton("category")}>Category</button>
          <button onClick={() => setActiveButton("information")}>
            Information
          </button>
        </div>
        <div className="flex justify-end">
          <Button
            onClick={() => router.push("/addproduct")}
            className="flex items-center gap-2 w-36 md:w-40"
          >
            <VscDiffAdded className="text-lg md:text-xl" />
            <span className="text-sm md:text-base">Add Product</span>
          </Button>
        </div>
      </div>
      {activeButton === "product" && (
        <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products?.map((product: any) => (
            <ProductCard
              key={product.id}
              productName={product.name}
              productImage={product.image}
              price={product.price}
              storeImage={store.image}
              storeName={store.name}
              onClick={() => {}}
            />
          ))}
        </div>
      )}
      {activeButton === "category" && (
        <div>
          <p>category content</p>
        </div>
      )}
      {activeButton === "information" && (
        <div>
          <p>Information content</p>
        </div>
      )}
    </div>
  );
};

export default Body;
