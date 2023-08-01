"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

import axios from "axios";
import { CheckCircle, Eye, MoreVertical, Trash, XCircle } from "lucide-react";
import { OrdersColumn } from "./OrderTable";

interface CellActionsProps {
  data: OrdersColumn;
}

const CellActionsOrder: React.FC<CellActionsProps> = ({ data }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/order/${data.id}`);
      toast({
        title: "Success✅",
        description: "order has been deleted.",
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={loading}>
        <Button variant="ghost" className="w-8 h-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreVertical className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Link
            className="flex items-center"
            href={`/store/orders/${data.id}/details`}
          >
            <Eye size={15} className="mr-1" />
            details
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleupdateStatus(data.id, "canceled")}
        >
          <XCircle size={15} className="mr-1" />
          Cancel order
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleupdateStatus(data.id, "finished")}
        >
          <CheckCircle size={15} className="mr-1" />
          Finished
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onDelete}>
          <Trash size={15} className="mr-1" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CellActionsOrder;
