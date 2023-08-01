"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

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

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { BsCurrencyDollar } from "react-icons/bs";
import clsx from "clsx";
import axios from "axios";
import { Button } from "@/components/ui/button";
import ImageUpload from "@/components/input/ImageUpload";
import { Loader2 } from "lucide-react";

interface FormUpdateProductProps {
  data: any;
}

const FormUpdateProduct: React.FC<FormUpdateProductProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
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
      name: data.name,
      image: data.image,
      category: data.category,
      description: data.description,
      price: data.price,
      stock: data.stock,
      isFeatured: data.isFeatured,
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

  const onUpdate: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      await axios.patch(`/api/product/${params!.productId}`, data);
      router.refresh();
      router.push("/store/products");
      toast({
        title: "Success✅",
        description: "Produk has been updated.",
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
      onSubmit={handleSubmit(onUpdate)}
    >
      <fieldset className="grid gap-2.5">
        <p>Upload your product image</p>
        <ImageUpload
          value={image}
          onChange={(value) => setCustomValue("image", value)}
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
        <Select
          onValueChange={(value) => setCustomValue("category", value)}
          defaultValue={data.category}
        >
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
      <div className="flex items-center gap-2">
        <Button
          disabled={isLoading}
          onClick={() => router.back()}
          type="button"
          variant="outline"
          className="w-full"
        >
          Cancel
        </Button>
        {isLoading ? (
          <Button disabled={isLoading} className="w-full">
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button disabled={isLoading} type="submit" className="w-full">
            Update Product
          </Button>
        )}
      </div>
    </form>
  );
};

export default FormUpdateProduct;
