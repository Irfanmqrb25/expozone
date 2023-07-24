import { Fredoka } from "next/font/google";

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { DollarSign, ShoppingCart } from "lucide-react";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import Image from "next/image";
import clsx from "clsx";
import CartUpdate from "../input/CartUpdate";
import { Cart, CartItem } from "@/types";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

const fredoka = Fredoka({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--fredoka-font",
});

interface CartSheetProps {
  cart: Cart;
  cartUserId: string;
}

const CartSheet = ({ cart, cartUserId }: CartSheetProps) => {
  const itemCount = cart?.items.reduce(
    (total: number, item: CartItem) => total + Number(item.quantity),
    0
  );

  const cartTotal = cart?.items.reduce(
    (total: number, item: CartItem) =>
      total + Number(item.quantity) * Number(item.product.price),
    0
  );

  return (
    <Sheet>
      <SheetTrigger className="relative p-2 bg-black rounded-sm">
        {itemCount > 0 && (
          <Badge
            variant="secondary"
            className="absolute w-5 h-5 p-[6px] text-white hover:bg-red-500 bg-red-500 rounded-full -right-2 -top-2"
          >
            {itemCount}
          </Badge>
        )}
        <ShoppingCart color="white" size={14} />
      </SheetTrigger>
      <SheetContent
        className={clsx(
          "flex w-full flex-col pr-0 sm:max-w-lg",
          fredoka.className
        )}
      >
        <SheetHeader>
          <SheetTitle>Cart {itemCount > 0 && `(${itemCount})`}</SheetTitle>
        </SheetHeader>
        <Separator className="my-5" />
        {itemCount > 0 ? (
          <>
            <div className="flex flex-col flex-1 gap-5 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="flex flex-col gap-5 pr-6">
                  {cart?.items?.map((item: any) => (
                    <div key={item.id} className="space-y-3">
                      <div className="flex items-center space-x-4">
                        <div className="relative w-16 h-16 overflow-hidden rounded">
                          <Image
                            src={
                              item.product.image ??
                              "/images/product-placeholder.webp"
                            }
                            alt={item.product.image ?? item.name}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            fill
                            className="absolute object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div className="flex flex-col self-start flex-1 gap-1 text-sm">
                          <span className="line-clamp-1">
                            {item.product.name}
                          </span>
                          <span className="line-clamp-1 text-muted-foreground">
                            {item.product.price} x {item.quantity} ={" "}
                            {item.product.price * item.quantity}
                          </span>
                          <span className="text-xs capitalize line-clamp-1 text-muted-foreground">
                            {item.product.category}
                          </span>
                        </div>
                        <CartUpdate item={item} cartUserId={cartUserId} />
                      </div>
                      <Separator />
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className="grid gap-1.5 pr-6 text-sm">
                <div className="flex">
                  <span className="flex-1 text-xl">Total</span>
                  <div className="flex items-center">
                    <DollarSign size={18} />
                    <span className="text-xl">{cartTotal.toFixed(2)}</span>
                  </div>
                </div>
                <Separator />
                <SheetFooter className="mt-1.5">
                  <Button
                    aria-label="Proceed to checkout"
                    size="sm"
                    className="w-full"
                  >
                    Checkout
                  </Button>
                </SheetFooter>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <ShoppingCart size={60} className="text-muted-foreground" />
            <div className="text-lg text-center md:text-xl text-muted-foreground">
              Your cart is empty
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
