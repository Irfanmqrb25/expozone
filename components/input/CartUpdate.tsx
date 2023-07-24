"use client";

import * as React from "react";
import { Button } from "../ui/button";
import { MinusIcon, PlusIcon, Trash } from "lucide-react";
import { Input } from "../ui/input";
import { Cart, CartItem } from "@/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";

interface CartUpdateProps {
  item: CartItem;
  cartUserId: string;
}

const CartUpdate = ({ item, cartUserId }: CartUpdateProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = React.useState(false);

  const handleIncreaseQuantity = async () => {
    const newQuantity = item.quantity + 1;
    await updateQuantity(item.id, newQuantity);
  };

  const handleDecreaseQuantity = async () => {
    const newQuantity = item.quantity - 1;
    await updateQuantity(item.id, newQuantity);
  };

  const updateQuantity = async (cartItemId: string, newQuantity: number) => {
    setLoading(true);
    try {
      await axios.put(`/api/cart/${item.id}`, {
        cartItemId,
        quantity: newQuantity,
        cartUserId: cartUserId,
      });
      router.refresh();
    } catch (error) {
      toast({
        title: "Failed❌",
        description: "Something went wrong.",
      });
      console.error("Error updating quantity:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCart = async () => {
    setLoading(true);
    try {
      await axios.delete(`/api/cart/${item.id}`, {
        data: {
          cartItemId: item.id,
          cartUserId: cartUserId,
        },
      });
      router.refresh();
      toast({
        title: "Success✅",
        description: "Product removed from cart",
      });
    } catch (error) {
      console.error("Error:", error);
      return { error: "Something went wrong" };
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-1">
      <Button
        variant="outline"
        size="icon"
        className="w-8 h-8"
        onClick={handleDecreaseQuantity}
        disabled={loading}
      >
        <MinusIcon size={14} />
      </Button>
      <Input
        type="number"
        min={0}
        className="h-8 w-14"
        value={item.quantity}
        disabled={loading}
        onChange={async (e) => {
          try {
            await updateQuantity(item.id, Number(e.target.value));
          } catch (error) {
            toast({
              title: "Failed❌",
              description: "Something went wrong.",
            });
          }
        }}
      />
      <Button
        variant="outline"
        size="icon"
        className="w-8 h-8"
        onClick={handleIncreaseQuantity}
        disabled={loading}
      >
        <PlusIcon size={14} />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="w-8 h-8"
        onClick={handleDeleteCart}
      >
        <Trash size={14} />
      </Button>
    </div>
  );
};

export default CartUpdate;
