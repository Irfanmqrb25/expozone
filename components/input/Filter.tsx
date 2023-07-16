"use client";
import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { categories } from "../navbar/Categories";

import qs from "query-string";
import { FilterIcon } from "lucide-react";
import { Fredoka } from "next/font/google";
import clsx from "clsx";

const fredoka = Fredoka({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--fredoka-font",
});

const Filter = () => {
  const router = useRouter();
  const params = useSearchParams();

  const handleSelected = React.useCallback(
    (label: string) => {
      let currentQuery = {};
      if (params) {
        currentQuery = qs.parse(params.toString());
      }

      const updatedQuery: any = {
        ...currentQuery,
        category: label,
      };

      if (params?.get("category") === label) {
        delete updatedQuery.category;
      }

      const url = qs.stringifyUrl(
        {
          url: "/home",
          query: updatedQuery,
        },
        { skipNull: true }
      );

      router.push(url);
    },
    [params, router]
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1 p-1 text-white bg-black border border-black rounded">
        <FilterIcon size={18} />
        <p className="hidden lg:block">Filter</p>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={clsx("w-48", fredoka.className)}
        side="bottom"
        align="end"
      >
        <DropdownMenuLabel>Filter Product</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {categories.map((category, i) => (
          <DropdownMenuCheckboxItem
            key={i}
            checked={params?.get("category") === category.label}
            onCheckedChange={() => handleSelected(category.label)}
          >
            {category.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Filter;
