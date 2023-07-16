import Image from "next/image";

import getProductById from "@/actions/getProductById";

import Container from "@/components/Container";

import { BiDollar } from "react-icons/bi";
import { BsArrowUpRight } from "react-icons/bs";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface IProductParams {
  productId: string;
}

const DetailProductPage = async ({ params }: { params: IProductParams }) => {
  const product = await getProductById(params);
  return (
    <div className="pt-20">
      <Container>
        <div className="flex gap-10">
          <div className="flex flex-col w-[25%] gap-3">
            <div className="flex border border-gray-300 rounded-sm ">
              <div className="relative w-full overflow-hidden rounded-t-md aspect-square">
                <Image
                  alt="product"
                  src={product?.image!}
                  fill
                  className="object-cover w-full h-full transition hover:scale-110"
                />
              </div>
            </div>
            <Button
              variant="outline"
              className="border-black hover:bg-black hover:text-white"
            >
              Buy Product
            </Button>
          </div>
          <div className="flex flex-col w-[40%] gap-5">
            <div className="flex items-center justify-between px-2 py-2 border border-gray-300 rounded-sm">
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
            <div className="flex items-center gap-1 px-2 py-1 mx-auto ml-0 text-white bg-black rounded-sm">
              <BiDollar className="text-xl" />
              <p className="mr-1 text-xl">{product?.price}</p>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-lg font-medium">Product Description</p>
              <p className="text-lg text-justify">{product?.description}</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default DetailProductPage;
