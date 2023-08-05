"use client";
import { usePathname, useRouter } from "next/navigation";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import clsx from "clsx";

const StoreTabs = () => {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    {
      title: "Store",
      href: `/store`,
    },
    {
      title: "Products",
      href: `/store/products`,
    },
    {
      title: "Orders",
      href: `/store/orders`,
    },
    {
      title: "Reviews",
      href: `/store/reviews`,
    },
  ];

  return (
    <Tabs onValueChange={(value) => router.push(value)}>
      <TabsList>
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.title}
            value={tab.href}
            className={clsx(
              pathname === tab.href && "bg-background text-foreground shadow-sm"
            )}
            onClick={() => router.push(tab.href)}
          >
            {tab.title}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default StoreTabs;
