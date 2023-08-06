"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { useState } from "react";

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
import { DollarSignIcon, ShoppingCart, Wallet } from "lucide-react";
import FavoriteButton from "../FavoriteButton";

import { ProductData, User } from "@/types";
import axios from "axios";

interface ProductCard {
  productData: ProductData;
  session: User;
  onClick?: () => void;
}

const ProductCard: React.FC<ProductCard> = ({ productData, session }) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const storeUrl =
    productData.store.name.split(" ").length > 1
      ? productData.store.name.replace(/\s+/g, "-")
      : productData.store.name;

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
    <Card className="h-full overflow-hidden border-2 border-black rounded-sm shadow-card">
      <CardHeader className="p-0 border-b-2 border-black">
        <AspectRatio ratio={4 / 3} className="relative overflow-hidden">
          <Link href={`/${storeUrl}/${productData.id}`}>
            <Image
              src={productData.image}
              alt={productData.name}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading="lazy"
              fill
              className="object-cover"
            />
          </Link>
          <div className="absolute p-1 bg-white border-2 border-black rounded-sm top-1 right-1">
            <FavoriteButton productId={productData.id} session={session} />
          </div>
        </AspectRatio>
      </CardHeader>
      <CardContent className="grid gap-2.5 p-4 border-b-2 border-black">
        <CardTitle className="text-lg font-medium line-clamp-1">
          {productData.name}
        </CardTitle>
        <CardDescription className="flex items-center text-lg line-clamp-1">
          <DollarSignIcon size={16} />
          {productData.price.toFixed(2)}
        </CardDescription>
        <Link href={`/visit/${storeUrl}`} className="flex items-center gap-1">
          <Avatar className="border-2 border-black w-7 h-7">
            <AvatarImage
              src={productData.store.image ?? "/assets/blank-user.jpg"}
              alt="avatar"
              className="object-cover"
            />
          </Avatar>
          <p className="line-clamp-1">{productData.store.name}</p>
        </Link>
      </CardContent>
      <CardFooter className="p-4">
        <div className="flex flex-row items-center w-full gap-2">
          <Button
            variant="outline"
            className="flex items-center w-full gap-1 border-2 border-black"
            disabled={loading}
            onClick={
              session
                ? () => router.push(`/buy/${productData.id}`)
                : () => router.push("/login")
            }
          >
            <Wallet size={16} />
            Buy
          </Button>
          <Button
            className="flex items-center w-full gap-1"
            onClick={session ? handleAddToCart : () => router.push("/login")}
            disabled={loading}
          >
            <ShoppingCart size={16} />
            Cart
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
