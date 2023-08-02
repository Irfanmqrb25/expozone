"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Breadcrumbs,
  BreadcrumbsIcon,
  BreadcrumbsItem,
} from "@/components/Breadcrumbs";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import { BsArrowUpRight } from "react-icons/bs";
import { DollarSign, Loader2 } from "lucide-react";
import { User } from "@/types";
import axios from "axios";

interface DetailProductPageClientProps {
  product: any;
  session: User;
}

const DetailProductPageClient: React.FC<DetailProductPageClientProps> = ({
  product,
  session,
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/cart", {
        productId: product.id,
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
    <div>
      <Breadcrumbs>
        <BreadcrumbsItem href="/products" label="Product" />
        <BreadcrumbsIcon />
        <BreadcrumbsItem disabled label={product?.name!} />
      </Breadcrumbs>
      <div className="flex flex-col gap-5 md:gap-10 md:flex-row">
        <div className="flex flex-col gap-2 w-full md:w-[40%]">
          <div className="relative overflow-hidden border-2 border-black rounded-sm aspect-square">
            <Image
              alt="product"
              src={product?.image!}
              fill
              loading="lazy"
              className="object-cover w-full h-full transition hover:scale-110"
            />
          </div>
          <div className="flex items-center justify-between w-full px-2 py-2 border-2 border-black rounded-sm">
            <div className="flex items-center gap-2">
              <Avatar className="border-2 border-black w-9 h-9">
                <AvatarImage
                  src={product?.store?.image || "/assets/blank-user.jpg"}
                  alt="avatar"
                />
              </Avatar>
              <span className="text-lg font-medium">
                {product?.store?.name}
              </span>
            </div>
            <div className="flex items-center gap-1 mr-2 cursor-pointer">
              <BsArrowUpRight className="text-sm" />
            </div>
          </div>
        </div>
        <div className="flex flex-col md:w-[40%] gap-5 w-full">
          <div className="flex flex-col gap-1">
            <p className="text-2xl font-medium md:text-3xl">{product?.name}</p>
            <p>Stock: {product?.stock}</p>
          </div>
          <div className="flex items-center text-xl text-gray-400">
            <DollarSign size={16} />
            {product?.price}
          </div>
          <Separator className="h-[1.5px] bg-black" />
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem
              value="description"
              className="border-b-2 border-black"
            >
              <AccordionTrigger className="md:text-lg">
                Description
              </AccordionTrigger>
              <AccordionContent className="md:text-lg">
                {product?.description}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="w-full border-2 border-black"
              onClick={() => router.push(`/buy/${product.id}`)}
            >
              Buy now
            </Button>
            <Button
              className="w-full"
              onClick={session ? handleAddToCart : () => router.push("/login")}
              disabled={loading}
            >
              {loading && <Loader2 size={16} className="mr-2 animate-spin" />}
              Add to cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProductPageClient;
