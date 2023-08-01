import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import FormProduct from "./FormProduct";
import getCurrentUser from "@/lib/session";
import { redirect } from "next/navigation";

const AddProductPage = async () => {
  const session = await getCurrentUser();

  if (!session) {
    redirect("/login");
  }

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="font-medium">Add Product</CardTitle>
        <CardDescription>Add new product to your store</CardDescription>
      </CardHeader>
      <CardContent>
        <FormProduct />
      </CardContent>
    </Card>
  );
};

export default AddProductPage;
