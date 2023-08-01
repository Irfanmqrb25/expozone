import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import FormBuyProduct from "./FormBuyProduct";
import getProductById from "@/actions/getProductById";
import { Separator } from "@/components/ui/separator";

interface IParams {
  productId?: string;
}

const BuyPage = async ({ params }: { params: IParams }) => {
  const product = await getProductById(params);

  return (
    <Card className="border-2 border-black">
      <CardHeader>
        <CardTitle>Product</CardTitle>
        <CardDescription>
          make sure the product you want to buy is correct
        </CardDescription>
      </CardHeader>
      <Separator className="h-[1.5px] bg-black mb-5" />
      <CardContent>
        <FormBuyProduct product={product!} />
      </CardContent>
    </Card>
  );
};

export default BuyPage;
