"use client";
import * as React from "react";
import { useRouter } from "next/navigation";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../ui/data-table";
import { useToast } from "../ui/use-toast";

import axios from "axios";
import CellActionsOrder from "./cell-actions-order";
import { Store } from "@/types";

export type OrdersColumn = {
  id: string;
  product: {
    id: string;
    name: string;
    image: string;
    category: string;
    stock: number;
    price: number;
  };
  quantity: number;
  buyerDetails: {
    name: string;
    phone: string;
    address: string;
    postalCode: string;
  };
  shipment: string;
  totalPrice: number;
  createdAt: string;
  status: string;
  payment: string;
};

interface OrderTableProps {
  orderData: OrdersColumn[];
  store: Store;
}

export default function OrderTable({ orderData, store }: OrderTableProps) {
  const [selectedRowIds, setSelectedRowIds] = React.useState<string[]>([]);
  const { toast } = useToast();
  const router = useRouter();

  const columns: ColumnDef<OrdersColumn>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => {
            table.toggleAllPageRowsSelected(!!value);
            setSelectedRowIds((prev) =>
              prev.length === orderData.length
                ? []
                : orderData.map((row) => row.id)
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
      accessorKey: "product",
      header: "Product",
      cell: ({ row }) => <p>{row.original.product.name}</p>,
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
    },
    {
      accessorKey: "buyerDetails",
      header: "Buyer Details",
      cell: ({ row }) => (
        <div>
          <p>
            {row.original.buyerDetails.name}{" "}
            {`(${row.original.buyerDetails.phone})`}
          </p>
          <p>
            {`${row.original.buyerDetails.address} (${row.original.buyerDetails.postalCode})`}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "shipment",
      header: "Shipment",
    },
    {
      accessorKey: "totalPrice",
      header: "Total Price",
    },
    {
      accessorKey: "createdAt",
      header: "Order Date",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      id: "actions",
      cell: ({ row }) => <CellActionsOrder data={row.original} />,
    },
  ];

  async function deleteOrder(orderId: string) {
    try {
      await axios.delete(`/api/order/${orderId}`);
      router.refresh();
      toast({
        title: "Success✅",
        description: "Order has been deleted.",
      });
    } catch (error) {
      toast({
        title: "Failed❌",
        description: "Something went wrong.",
      });
    }
  }

  const handleDeleteSelected = async () => {
    await Promise.all(selectedRowIds.map((id) => deleteOrder(id)));
    setSelectedRowIds([]);
  };

  return (
    <DataTable
      store={store}
      columns={columns}
      data={orderData}
      deleteRowsAction={() => void handleDeleteSelected()}
    />
  );
}
