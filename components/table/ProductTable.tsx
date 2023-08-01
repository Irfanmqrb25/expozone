"use client";
import * as React from "react";
import { useRouter } from "next/navigation";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../ui/data-table";
import { useToast } from "../ui/use-toast";
import CellActionsProduct from "./cell-actions-product";

import axios from "axios";
import { Store } from "@/types";

export type ProductsColumn = {
  id: string;
  name: string;
  category: string;
  stock: number;
  price: number;
  isFeatured: boolean;
  createdAt: string;
};

interface ProductTableProps {
  productData: ProductsColumn[];
  store: Store;
}

export default function ProductTable({
  productData,
  store,
}: ProductTableProps) {
  const [selectedRowIds, setSelectedRowIds] = React.useState<string[]>([]);
  const { toast } = useToast();
  const router = useRouter();

  const columns: ColumnDef<ProductsColumn>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => {
            table.toggleAllPageRowsSelected(!!value);
            setSelectedRowIds((prev) =>
              prev.length === productData.length
                ? []
                : productData.map((row) => row.id)
            );
          }}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            row.toggleSelected(!!value);
            setSelectedRowIds((prev) =>
              value
                ? [...prev, row.original.id]
                : prev.filter((id) => id !== row.original.id)
            );
          }}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "category",
      header: "Category",
    },
    {
      accessorKey: "stock",
      header: "Stock",
    },
    {
      accessorKey: "price",
      header: "Price",
    },
    {
      accessorKey: "isFeatured",
      header: "Featured",
    },
    {
      accessorKey: "createdAt",
      header: "Created Date",
    },
    {
      id: "actions",
      cell: ({ row }) => <CellActionsProduct data={row.original} />,
    },
  ];

  async function deleteProduct(productId: string) {
    try {
      await axios.delete(`/api/product/${productId}`);
      router.refresh();
      toast({
        title: "Success✅",
        description: "Product has been deleted.",
      });
    } catch (error) {
      toast({
        title: "Failed❌",
        description: "Something went wrong.",
      });
    }
  }

  const handleDeleteSelected = async () => {
    await Promise.all(selectedRowIds.map((id) => deleteProduct(id)));
    setSelectedRowIds([]);
  };

  return (
    <DataTable
      store={store}
      columns={columns}
      data={productData}
      deleteRowsAction={() => void handleDeleteSelected()}
    />
  );
}
