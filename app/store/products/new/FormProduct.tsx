"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { categories } from "@/components/navbar/Categories";
import { Button } from "@/components/ui/button";
import ImageUpload from "@/components/input/ImageUpload";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import clsx from "clsx";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { BsCurrencyDollar } from "react-icons/bs";

const FormProduct = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const filteredCategories = categories.filter(
    (category) => category.label !== "All"
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      image: "",
      category: "",
      description: "",
      price: 0,
      stock: 0,
      isFeatured: false,
    },
  });

  const image = watch("image");
  const isFeatured = watch("isFeatured");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      await axios.post("/api/product", data);
      router.refresh();
      router.push("/store/products");
      toast({
        title: "Success✅",
        description: "Produk has been added.",
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
      setIsLoading(false);
    }
  };

  return (
    <form
      className="grid w-full max-w-xl gap-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <fieldset className="grid gap-2.5">
        <p>Upload your product image</p>
        <ImageUpload
          value={image}
          onChange={(value) => setCustomValue("image", value)}
          onRemove={() => {}}
        />
      </fieldset>
      <fieldset className="grid gap-2.5">
        <label>Product Name</label>
        <Input
          id="name"
          disabled={isLoading}
          {...register("name", { required: true })}
          className={clsx(
            errors["name"] ? "focus-visible:ring-red-500 border-red-300" : ""
          )}
        />
      </fieldset>
      <fieldset className="grid gap-2.5">
        <label>Set product price</label>
        <div className="relative">
          <BsCurrencyDollar className="absolute top-3 left-2" />
          <Input
            id="price"
            type="number"
            min={0}
            disabled={isLoading}
            {...register("price", { required: true })}
            className={clsx(
              "pl-7 text-base",
              errors["price"] ? "focus-visible:ring-red-500 border-red-300" : ""
            )}
          />
        </div>
      </fieldset>
      <fieldset className="grid gap-2.5">
        <label>Set stock product</label>
        <Input
          id="stock"
          type="number"
          min={0}
          disabled={isLoading}
          {...register("stock", { required: true })}
          className={clsx(
            "text-base",
            errors["stock"] ? "focus-visible:ring-red-500 border-red-300" : ""
          )}
        />
      </fieldset>
      <fieldset className="grid gap-2.5">
        <label>Select product category</label>
        <Select onValueChange={(value) => setCustomValue("category", value)}>
          <SelectTrigger disabled={isLoading}>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {filteredCategories.map((category) => (
                <SelectItem value={category.label} key={category.label}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </fieldset>
      <fieldset className="grid gap-2.5">
        <span>Describe your product</span>
        <Textarea
          id="description"
          disabled={isLoading}
          {...register("description", { required: true })}
          className={clsx(
            errors["description"]
              ? "focus-visible:ring-red-500 border-red-300"
              : ""
          )}
        />
      </fieldset>
      <div className="flex space-x-2 items-top">
        <Checkbox
          id="featured"
          checked={isFeatured}
          onCheckedChange={(value) => setCustomValue("isFeatured", value)}
        />
        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor="featured"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Featured Product
          </label>
          <p className="text-sm text-muted-foreground">
            Check if you want this product to be featured in your store.
          </p>
        </div>
      </div>
      {isLoading ? (
        <Button disabled={isLoading}>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Please wait
        </Button>
      ) : (
        <Button disabled={isLoading} type="submit">
          Add to store
        </Button>
      )}
    </form>
  );
};

export default FormProduct;
