"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";

import { OrdersColumn } from "../table/OrderTable";
import axios from "axios";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface OrderCardProps {
  order: OrdersColumn;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleupdateStatus = async (orderId: string, status: string) => {
    setLoading(true);
    try {
      await axios.put(`/api/order/${orderId}`, { status });
      toast({
        title: "Success✅",
        description: "status has been updated.",
      });
      router.refresh();
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
    <Card
      className="h-full overflow-hidden border-2 border-black rounded-sm shadow-card"
      key={order.id}
    >
      <Link href={`/order/details/${order.id}`}>
        <CardHeader className="p-0 border-b-2 border-black">
          <AspectRatio ratio={4 / 3}>
            <Image
              src={order.product.image}
              alt={order.product.name}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading="lazy"
              fill
              className="object-cover"
            />
          </AspectRatio>
        </CardHeader>
      </Link>
      <CardFooter className="p-4">
        <div className="flex flex-col items-center w-full gap-2 sm:flex-row sm:justify-between">
          <Link
            href={`/order/details/${order.id}`}
            className="inline-flex items-center justify-center w-full px-3 text-sm font-medium transition-colors border-2 border-black rounded-md hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background h-9"
          >
            Details
          </Link>
          {order.status === "finished" ? (
            <Button size="sm" className="w-full">
              Review
            </Button>
          ) : (
            <Button
              size="sm"
              className="w-full"
              onClick={() => handleupdateStatus(order.id, "finished")}
              disabled={loading}
            >
              {loading && <Loader2 size={16} className="mr-1 animate-spin" />}
              Finished
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default OrderCard;
