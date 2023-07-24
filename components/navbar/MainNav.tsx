"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

import Container from "../Container";
import MobileSheet from "./MobileSheet";
import Filter from "../input/Filter";
import AvatarProfile from "./AvatarProfile";

import { User as UserType, Store as StoreType, Cart } from "@/types";
import Link from "next/link";
import CartSheet from "./CartSheet";

interface MainNavProps {
  session?: UserType;
  store?: StoreType;
  cart?: any;
}

const MainNav: React.FC<MainNavProps> = ({ session, store, cart }) => {
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
              <Link href="/products">Products</Link>
              <Link href="/store">Store</Link>
            </div>
          </div>
          {session ? (
            <div className="flex items-center gap-3">
              <CartSheet cart={cart} cartUserId={session.id} />
              <AvatarProfile session={session} store={store} />
            </div>
          ) : (
            <Link
              href="/login"
              className="px-2 py-1 border border-black rounded-sm hover:bg-[#23A094] hover:text-white"
            >
              Sign in
            </Link>
          )}
        </div>
      </Container>
    </nav>
  );
};

export default MainNav;
