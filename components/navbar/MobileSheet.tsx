import Image from "next/image";
import { Fredoka } from "next/font/google";
import Link from "next/link";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { RxHamburgerMenu } from "react-icons/rx";
import clsx from "clsx";
import { ScrollArea } from "../ui/scroll-area";
import { HomeIcon, Search, ShoppingBag, Store } from "lucide-react";

const fredoka = Fredoka({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--fredoka-font",
});

const MobileSheet = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <RxHamburgerMenu className="text-2xl" />
      </SheetTrigger>
      <SheetContent side="left" className={clsx(fredoka.className)}>
        <SheetHeader>
          <SheetTitle className="flex gap-2 text-2xl">
            <Image
              src="/assets/brand-logo.svg"
              alt="logo"
              width={25}
              height={25}
            />
            Expozone
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="mt-10">
          <Link href="/home" className="flex justify-between">
            <p className="font-medium font">Home</p>
            <HomeIcon size={18} />
          </Link>
          <hr className="mt-2 mb-4" />
          <div className="flex justify-between">
            <p className="font-medium font">Discover</p>
            <Search size={18} />
          </div>
          <hr className="mt-2 mb-4" />
          <div className="flex justify-between">
            <p className="font-medium font">Products</p>
            <ShoppingBag size={18} />
          </div>
          <hr className="mt-2 mb-4" />
          <Link href="/mystore" className="flex justify-between">
            <p className="font-medium font">Store</p>
            <Store size={18} />
          </Link>
          <hr className="mt-2 mb-4" />
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSheet;
