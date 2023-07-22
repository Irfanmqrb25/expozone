import { DataTable } from "@/components/ui/data-table";
import React from "react";
import ProductTable from "@/components/table/ProductTable";
import getProductByStore from "@/actions/getProductByStore";
import getStore from "@/actions/getStore";
import EmptyStore from "@/components/EmptyPage";
import prisma from "@/lib/prisma";

const ProductsPage = async () => {
  const productData = await getProductByStore();
  const store = await getStore();

  if (!store) return <EmptyStore />;

  async function deleteProductAction(id: string) {
    try {
      const deletedProduct = await prisma.product.deleteMany({
        where: {
          id,
        },
      });

      return deletedProduct;
    } catch (error) {
      console.error("[DELETE_PRODUCT_ERROR]", error);
      throw new Error("Failed to delete product.");
    }
  }

  return (
    <div>
      <ProductTable productData={productData} />
    </div>
  );
};

export default ProductsPage;
