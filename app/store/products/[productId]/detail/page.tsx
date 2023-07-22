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

import { BsArrowUpRight } from "react-icons/bs";
import { DollarSign } from "lucide-react";

import getProductById from "@/actions/getProductById";

interface IProductParams {
  productId: string;
}

const ViewProductDetailPage = async ({
  params,
}: {
  params: IProductParams;
}) => {
  const product = await getProductById(params);
  return (
    <div className="flex flex-col">
      <Breadcrumbs>
        <BreadcrumbsItem href="/store" label="Store" />
        <BreadcrumbsIcon />
        <BreadcrumbsItem href="/store/products" label="Products" />
        <BreadcrumbsIcon />
        <BreadcrumbsItem disabled label={product?.name!} />
      </Breadcrumbs>
      <div className="flex flex-col gap-10 md:flex-row">
        <div className="relative w-full overflow-hidden md:w-[40%] rounded-t-md aspect-square border">
          <Image
            alt="product"
            src={product?.image!}
            fill
            className="object-cover w-full h-full transition hover:scale-110"
          />
        </div>
        <div className="flex flex-col md:w-[40%] gap-5 w-full">
          <div className="flex items-center justify-between w-full px-2 py-2 border rounded-sm border-gray-00">
            <div className="flex items-center gap-2">
              <Avatar className="border border-gray-300 w-9 h-9">
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
          <p className="text-3xl font-medium">{product?.name}</p>
          <div className="flex items-center text-gray-400">
            <DollarSign size={16} />
            {product?.price}
          </div>
          <Separator />
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Description</AccordionTrigger>
              <AccordionContent>{product?.description}</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default ViewProductDetailPage;
