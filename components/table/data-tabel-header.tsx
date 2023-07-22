"use client";

import { useTransition } from "react";
import { Input } from "../ui/input";
import { PlusCircle, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const DataTableHeader = ({ table, deleteRowAction }: any) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter names..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="flex md:w-[300px]"
        />
      </div>
      {deleteRowAction && table.getSelectedRowModel().rows.length > 0 ? (
        <Button
          size="sm"
          onClick={(e) => {
            startTransition(() => {
              table.toggleAllPageRowsSelected(false);
              deleteRowAction(e);
            });
          }}
          disabled={isPending}
          variant="destructive"
        >
          <Trash size={16} className="mr-1" />
          Delete
        </Button>
      ) : (
        <Button size="sm" onClick={() => router.push("/store/products/new")}>
          <PlusCircle size={16} className="mr-1" />
          New
        </Button>
      )}
    </div>
  );
};

export default DataTableHeader;
