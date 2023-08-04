"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { BsApple, BsPaypal } from "react-icons/bs";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ProductData } from "@/types";
import { Loader2, MinusIcon } from "lucide-react";
import { PlusIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { DollarSign } from "lucide-react";
import {
  FieldValues,
  SubmitHandler,
  useForm,
  Controller,
} from "react-hook-form";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";

interface FormBuyProductProps {
  product: ProductData;
}

const FormBuyProduct: React.FC<FormBuyProductProps> = ({ product }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const shipmentFee = 7;
  const serviceFee = 2;

  const shipments = [
    { id: 1, name: "JNE" },
    { id: 2, name: "JNT" },
    { id: 3, name: "FedEx" },
  ];

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      productId: "",
      recipient: "",
      phone: "",
      address: "",
      postalCode: "",
      quantity: 1,
      payment: "card",
      shipment: "",
      cardNumber: "",
      totalPrice: 0,
      status: "process",
    },
  });

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const quantity = watch("quantity");
  const payment = watch("payment");

  const subtotalProduct = product.price * quantity;
  const totalPrice = subtotalProduct + shipmentFee + serviceFee;

  useEffect(() => {
    const totalPrice = subtotalProduct + shipmentFee + serviceFee;
    setValue("totalPrice", totalPrice);
    setValue("productId", product.id);
  }, [subtotalProduct, shipmentFee, serviceFee, product.id, setValue]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (quantity > product.stock) {
      return toast({
        title: "Failed❌",
        description: "Stock is not enough.",
        variant: "destructive",
      });
    }
    setLoading(true);
    try {
      await axios.post("/api/order", data);
      router.refresh();
      router.push("/order");
      toast({
        title: "Success✅",
        description: "Thank you for your purchase!.",
        variant: "success",
      });
      reset();
    } catch (error) {
      toast({
        title: "Failed❌",
        description: "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="grid w-full gap-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-center gap-5 md:flex-row">
        <Image
          src={product.image}
          alt="brand logo"
          width={150}
          height={150}
          objectFit="cover"
          className="w-full md:w-[150px] border-2 border-black rounded"
        />
        <div className="flex flex-col items-center gap-3 md:items-start">
          <p className="text-xl font-medium md:text-2xl">{product.name}</p>
          <Controller
            name="quantity"
            control={control}
            defaultValue={1}
            rules={{ required: true, min: 1 }}
            render={({ field }) => (
              <div className="flex items-center gap-1">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="w-8 h-8 border-2 border-black"
                  onClick={() => field.onChange(Math.max(field.value - 1, 1))}
                  disabled={loading}
                >
                  <MinusIcon size={14} />
                </Button>
                <Input
                  id="quantity"
                  type="number"
                  min={1}
                  className="h-8 border-2 border-black w-14"
                  {...field}
                  disabled={loading}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="w-8 h-8 border-2 border-black"
                  onClick={() => field.onChange(field.value + 1)}
                  disabled={loading}
                >
                  <PlusIcon size={14} />
                </Button>
              </div>
            )}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <fieldset className="grid gap-2.5 w-full">
          <Label htmlFor="">Recipient name</Label>
          <Input
            id="recipient"
            {...register("recipient", { required: true })}
            className={clsx(
              errors["recipient"]
                ? "focus-visible:ring-red-500 border-red-300"
                : ""
            )}
            disabled={loading}
          />
        </fieldset>
        <fieldset className="grid gap-2.5 w-full">
          <Label htmlFor="">Phone number</Label>
          <Input
            id="phone"
            {...register("phone", { required: true })}
            className={clsx(
              errors["phone"] ? "focus-visible:ring-red-500 border-red-300" : ""
            )}
          />
        </fieldset>
        <fieldset className="grid gap-2.5">
          <Label htmlFor="">Full Address</Label>
          <Input
            id="address"
            {...register("address", { required: true })}
            className={clsx(
              errors["address"]
                ? "focus-visible:ring-red-500 border-red-300"
                : ""
            )}
            disabled={loading}
          />
        </fieldset>
        <fieldset className="grid gap-2.5">
          <Label htmlFor="">Postal code</Label>
          <Input
            id="postalCode"
            {...register("postalCode", { required: true })}
            className={clsx(
              errors["postalCode"]
                ? "focus-visible:ring-red-500 border-red-300"
                : ""
            )}
            disabled={loading}
          />
        </fieldset>
        <fieldset className="grid gap-2.5">
          <Label>Select shipment</Label>
          <Select onValueChange={(value) => setCustomValue("shipment", value)}>
            <SelectTrigger disabled={loading}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {shipments.map((item) => (
                  <SelectItem value={item.name} key={item.id}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </fieldset>
      </div>
      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
          <CardDescription>Select a payment method</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <RadioGroup
            id="payment"
            className="grid grid-cols-3 gap-4"
            defaultValue="card"
            onValueChange={(value) => setCustomValue("payment", value)}
            disabled={loading}
          >
            <Label
              htmlFor="card"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
            >
              <RadioGroupItem value="card" id="card" className="sr-only" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-6 h-6 mb-3"
              >
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <path d="M2 10h20" />
              </svg>
              Card
            </Label>
            <Label
              htmlFor="paypal"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
            >
              <RadioGroupItem value="paypal" id="paypal" className="sr-only" />
              <BsPaypal className="w-6 h-6 mb-3" />
              Paypal
            </Label>
            <Label
              htmlFor="apple"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
            >
              <RadioGroupItem value="apple" id="apple" className="sr-only" />
              <BsApple className="w-6 h-6 mb-3" />
              Apple
            </Label>
          </RadioGroup>
          {payment === "card" ? (
            <div className="grid gap-2">
              <Label htmlFor="number">{`Card number (don't take it seriously)`}</Label>
              <Input
                id="cardNumber"
                placeholder="123456789"
                {...register("cardNumber", { required: true })}
                className={clsx(
                  errors["cardNumber"]
                    ? "focus-visible:ring-red-500 border-red-300"
                    : ""
                )}
                disabled={loading}
              />
            </div>
          ) : null}
        </CardContent>
      </Card>
      <CardFooter className="flex flex-col items-start w-full gap-3 p-0">
        <CardTitle>Detail payment</CardTitle>
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between w-full">
            <p>Subtotal product</p>
            <div className="flex items-center">
              <DollarSign size={16} />
              <span>{subtotalProduct.toFixed(2)}</span>
            </div>
          </div>
          <div className="flex items-center justify-between w-full">
            <p>Subtotal shipment</p>
            <div className="flex items-center">
              <DollarSign size={16} />
              <span>{shipmentFee.toFixed(2)}</span>
            </div>
          </div>
          <div className="flex items-center justify-between w-full">
            <p>Service fee</p>
            <div className="flex items-center">
              <DollarSign size={16} />
              <span>{serviceFee.toFixed(2)}</span>
            </div>
          </div>
          <Separator className="my-3" />
          <div className="flex justify-between w-full">
            <CardTitle>total payment</CardTitle>
            <CardTitle className="flex items-center font-normal">
              <DollarSign size={20} />
              <span>{totalPrice.toFixed(2)}</span>
            </CardTitle>
          </div>
          <Separator className="my-3" />
        </div>
        <div className="flex justify-end w-full mt-5">
          <Button
            type="submit"
            className="flex min-w-[150px]"
            disabled={loading}
          >
            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Order
          </Button>
        </div>
      </CardFooter>
    </form>
  );
};

export default FormBuyProduct;
