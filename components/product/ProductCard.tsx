"use client";
import Image from "next/image";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { AspectRatio } from "../ui/aspect-ratio";
import { DollarSignIcon } from "lucide-react";

import { ProductData, User } from "@/types";
import { useState } from "react";
import axios from "axios";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

interface ProductCard {
  productData: ProductData;
  session: User;
  mystore?: boolean;
  onClick?: () => void;
}

const ProductCart: React.FC<ProductCard> = ({ productData, session }) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const storeUrl =
    productData.store.name.split(" ").length > 1
      ? productData.store.name.toLowerCase().replace(/\s+/g, "-")
      : productData.store.name.toLowerCase();

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/cart", {
        productId: productData.id,
        userId: session?.id,
        quantity: 1,
      });

      router.refresh();

      if (response.status == 200) {
        toast({
          title: "Success✅",
          description: "Product added to cart!",
        });
      } else {
        toast({
          title: "Failed❌",
          description: "Something went wrong.",
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="h-full overflow-hidden rounded-sm">
      <Link href={`/${storeUrl}/${productData.id}`}>
        <CardHeader className="p-0 border-b">
          <AspectRatio ratio={4 / 3}>
            <Image
              src={productData.image}
              alt={productData.name}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading="lazy"
              fill
              className="object-cover"
            />
          </AspectRatio>
        </CardHeader>
      </Link>
      <Link href={`/${storeUrl}/${productData.id}`}>
        <CardContent className="grid gap-2.5 p-4 border-b">
          <CardTitle className="text-lg font-medium line-clamp-1">
            {productData.name}
          </CardTitle>
          <CardDescription className="flex items-center text-lg">
            <DollarSignIcon size={16} className="mt-[3px]" />
            {productData.price}
          </CardDescription>
          <div className="flex gap-2">
            <Avatar className="border w-7 h-7">
              <AvatarImage
                src={productData.store.image || "/assets/blank-user.jpg"}
                alt="avatar"
              />
            </Avatar>
            <span>{productData.store.name}</span>
          </div>
        </CardContent>
      </Link>
      <CardFooter className="p-4">
        <div className="flex flex-col items-center w-full gap-2 sm:flex-row sm:justify-between">
          <Button variant="outline" className="w-full" disabled={loading}>
            Buy now
          </Button>
          <Button
            className="w-full"
            onClick={session ? handleAddToCart : () => router.push("/login")}
            disabled={loading}
          >
            Add to cart
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCart;
