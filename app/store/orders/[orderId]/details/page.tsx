import getOrders from "@/actions/getOrders";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Clock, DollarSign } from "lucide-react";
import React from "react";
import {
  Breadcrumbs,
  BreadcrumbsIcon,
  BreadcrumbsItem,
} from "@/components/Breadcrumbs";

const OrderDetailsPage = async ({ params }: { params: { id: string } }) => {
  const { formatedOrders } = await getOrders({ id: params.id });

  return (
    <div className="flex flex-col">
      <Breadcrumbs>
        <BreadcrumbsItem href="/store" label="Store" />
        <BreadcrumbsIcon />
        <BreadcrumbsItem href="/store/orders" label="Orders" />
        <BreadcrumbsIcon />
        <BreadcrumbsItem disabled label={formatedOrders[0]?.product.name} />
      </Breadcrumbs>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2 md:gap-0 md:justify-between">
            <p className="text-2xl font-semibold">Order Details</p>
            <Badge>{formatedOrders[0]?.status}</Badge>
          </div>
          <CardDescription>Order ID {formatedOrders[0]?.id}</CardDescription>
          <div className="flex items-center gap-1">
            <Clock size={16} className="text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Order created on {formatedOrders[0]?.createdAt}
            </p>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="px-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Product</TableHead>
                <TableHead className="text-center">Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow key={formatedOrders[0]?.id}>
                <TableCell className="font-medium">
                  {formatedOrders[0]?.id}
                </TableCell>
                <TableCell className="text-center">
                  {formatedOrders[0]?.status}
                </TableCell>
                <TableCell className="text-center">
                  {formatedOrders[0]?.product.name}
                </TableCell>
                <TableCell className="text-center">
                  {formatedOrders[0]?.payment}
                </TableCell>
                <TableCell className="flex items-center justify-end">
                  <DollarSign size={12} />
                  {formatedOrders[0]?.totalPrice}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderDetailsPage;
