"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

import axios from "axios";
import { Loader2 } from "lucide-react";
import { formatPrice } from "@/lib/utils";

const ModalClient = ({ order }: { order: any }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const subtotal = order?.product?.price! * order?.quantity!;

  const onClose = useCallback(() => {
    router.back();
  }, [router]);

  const handleupdateStatus = async (orderId: string, status: string) => {
    setLoading(true);
    try {
      await axios.put(`/api/order/${orderId}`, { status });
      onClose();
      router.refresh();
      toast({
        title: "Success✅",
        description: "status has been updated.",
      });
    } catch (error) {
      toast({
        title: "Failed❌",
        description: "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-0">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Order details</CardTitle>
          <Badge>{order?.status}</Badge>
        </div>
        <CardDescription>{order?.createdAt}</CardDescription>
        <CardDescription>Order ID: {order?.id}</CardDescription>
      </CardHeader>
      <Separator className="mb-5 h-[1.5px] bg-black" />
      <CardContent className="flex flex-col gap-2">
        <div className="flex flex-row items-center gap-2">
          <div className="relative w-[100px] h-[100px] md:w-[200px] md:h-[200px] object-cover border-2 border-black rounded">
            <Image
              src={order?.product.image!}
              alt="brand logo"
              objectFit="cover"
              fill
            />
          </div>
          <div className="">
            <p className="text-xl font-medium md:text-2xl">
              {order?.product.name}
            </p>
            <p>Quantity: {order?.quantity}</p>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex justify-between">
            <p>Subtotal product</p>
            <p>{formatPrice(subtotal.toFixed(2))}</p>
          </div>
          <div className="flex justify-between">
            <p>Shipment fee</p>
            <p>{formatPrice(7)}</p>
          </div>
          <div className="flex justify-between">
            <p>Service fee</p>
            <p>{formatPrice(2)}</p>
          </div>
        </div>
        <Separator className="bg-black" />
        <div className="flex justify-between">
          <p>Total price</p>
          <p>{formatPrice(order?.totalPrice.toFixed(2))}</p>
        </div>
      </CardContent>
      <Separator className="mb-5 h-[1.5px] bg-black" />
      <CardFooter className="flex gap-2">
        <Button
          variant="outline"
          className="w-full border-2 border-black"
          onClick={onClose}
          disabled={loading}
        >
          Close
        </Button>
        {order?.status === "finished" ? (
          <Button className="w-full">Review</Button>
        ) : (
          <Button
            className="w-full"
            onClick={() => handleupdateStatus(order.id, "finished")}
            disabled={loading}
          >
            {loading && <Loader2 size={16} className="mr-1 animate-spin" />}
            Finished
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ModalClient;
