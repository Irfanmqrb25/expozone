import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import FormUpdateProduct from "./FormUpdateProduct";
import getProductById from "@/actions/getProductById";

const ProductUpdatePage = async ({
  params,
}: {
  params: { productId: string };
}) => {
  const productData = await getProductById(params);
  return (
    <Card className="w-full lg:w-[50%]">
      <CardHeader className="space-y-1">
        <CardTitle className="font-medium">Update Product</CardTitle>
        <CardDescription>Update your product data</CardDescription>
      </CardHeader>
      <CardContent>
        <FormUpdateProduct data={productData} />
      </CardContent>
    </Card>
  );
};

export default ProductUpdatePage;
