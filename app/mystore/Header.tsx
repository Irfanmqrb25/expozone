"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import { CiLocationOn } from "react-icons/ci";
import { VscDiffAdded } from "react-icons/vsc";

import { Package2 } from "lucide-react";
import { Info } from "lucide-react";
import { Columns } from "lucide-react";

import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import clsx from "clsx";

const Header = ({ store }: any) => {
  const router = useRouter();
  const pathname = usePathname();

  if (!store) return null;

  return (
    <Container>
      <div className="flex flex-col gap-10 pt-20">
        <div className="flex flex-col items-center justify-between w-full gap-4 p-5 border border-gray-300 rounded-md md:gap-0 md:flex-row">
          <div className="flex items-center gap-4 md:gap-3">
            <div className="relative w-16 h-16 overflow-hidden border-2 border-gray-300 rounded-full md:w-20 md:h-20">
              <Image
                src={store?.image || "/assets/blank-user.jpg"}
                alt="Store Profile"
                fill
                className="object-cover object-center"
              />
            </div>
            <div className="flex flex-col">
              <p className="text-2xl font-medium tracking-wide md:text-3xl">
                {store?.name}
              </p>
              <div className="flex items-center">
                <CiLocationOn />
                <p className="font-light">{store?.city}</p>
              </div>
            </div>
          </div>
          <div className="flex gap-5">
            <div className="flex flex-col items-center">
              <p className="md:text-xl">Product</p>
              <p className="text-lg font-medium md:text-2xl">150</p>
            </div>
            <div className="w-[1.5px] bg-neutral-400"></div>
            <div className="flex flex-col items-center">
              <p className="md:text-xl">Category</p>
              <p className="text-lg font-medium md:text-2xl">5</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-4 md:flex-row md:gap-0">
          <div className="flex items-center justify-between w-full text-lg md:gap-10 md:justify-start">
            <button
              onClick={() => router.push("/mystore")}
              className={clsx(
                "flex items-center gap-1 pb-2",
                pathname === "/mystore" && "border-b-2 border-black"
              )}
            >
              <Package2 />
              <span className="hidden">Product</span>
            </button>
            <button
              onClick={() => router.push("/mystore/category")}
              className={clsx(
                "flex items-center gap-1 pb-2",
                pathname === "/mystore/category" && "border-b-2 border-black"
              )}
            >
              <Columns />
              <span className="hidden">Category</span>
            </button>
            <button
              onClick={() => router.push("/mystore/information")}
              className={clsx(
                "flex items-center gap-1 pb-2",
                pathname === "/mystore/information" && "border-b-2 border-black"
              )}
            >
              <Info />
              <span className="hidden">Information</span>
            </button>
          </div>
          <div className="flex">
            <Button
              onClick={() => router.push("/addproduct")}
              className="flex items-center w-full gap-2 md:w-40"
            >
              <VscDiffAdded className="text-lg md:text-xl" />
              <span className="text-sm md:text-base">Add Product</span>
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Header;
