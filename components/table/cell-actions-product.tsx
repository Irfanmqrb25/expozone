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
import { ProductsColumn } from "./ProductTable";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

import axios from "axios";
import { Edit, Eye, MoreVertical, Trash } from "lucide-react";

interface CellActionsProps {
  data: ProductsColumn;
}

const CellActionsProduct: React.FC<CellActionsProps> = ({ data }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const onConfirm = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/product/${data.id}`);
      toast({
        title: "Success✅",
        description: "Product has been deleted.",
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
            href={`/store/products/${data.id}/detail`}
          >
            <Eye size={15} className="mr-1" />
            View detail
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push(`/store/products/${data.id}`)}
        >
          <Edit size={15} className="mr-1" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onConfirm}>
          <Trash size={15} className="mr-1" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CellActionsProduct;
