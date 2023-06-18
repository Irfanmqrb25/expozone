import Image from "next/image";

import { CiLocationOn } from "react-icons/ci";

import Container from "@/components/Container";

import getStore from "../actions/getStore";
import getProductByStore from "../actions/getProductByStore";

import Body from "./Body";
import getCurrentUser from "@/lib/session";
import { redirect } from "next/navigation";
import EmptyPage from "@/components/EmptyPage";

const StorePage = async () => {
  const store = await getStore();
  const products = await getProductByStore();
  const session = await getCurrentUser();

  if (!session) {
    redirect("/login");
  }

  if (!store) {
    return (
      <div className="flex items-center justify-center w-full h-screen m-auto">
        <EmptyPage />
      </div>
    );
  }

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
        <Body products={products} store={store} />
      </div>
    </Container>
  );
};

export default StorePage;
