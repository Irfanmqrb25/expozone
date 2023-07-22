"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

import Container from "../Container";
import MobileSheet from "./MobileSheet";
import Filter from "../input/Filter";
import AvatarProfile from "./AvatarProfile";

import { User as UserType, Store as StoreType, ProductData } from "@/types";
import Link from "next/link";

const MainNav = ({
  session,
  store,
}: {
  session?: UserType;
  store?: StoreType;
  product?: ProductData;
}) => {
  const router = useRouter();
  return (
    <nav className="fixed z-10 w-full py-1 bg-[#F4F7FA] shadow-sm border-y-2">
      <Container>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <div className="lg:hidden">
              <MobileSheet />
            </div>
            <div
              onClick={() => router.push("/featured")}
              className="items-center hidden gap-2 cursor-pointer lg:flex"
            >
              <Image
                src="/assets/brand-logo.svg"
                alt="brand logo"
                width={35}
                height={35}
              />
              <span className="hidden text-3xl font-semibold xl:block">
                Expozone
              </span>
            </div>
            <div className="items-center hidden mt-[6px] ml-10 gap-14 lg:flex">
              <Link href="/featured">Featured</Link>
              <Link href="/">Discover</Link>
              <Link href="/">Products</Link>
              <Link href="/store">Store</Link>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <AvatarProfile session={session} store={store} />
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default MainNav;
