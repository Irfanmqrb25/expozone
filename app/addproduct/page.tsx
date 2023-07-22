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
import Container from "@/components/Container";
import { categories } from "@/components/navbar/Categories";
import ProductUpload from "@/components/input/ProductUpload";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { BsCurrencyDollar } from "react-icons/bs";
import clsx from "clsx";
import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";

const AddProductPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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
    },
  });

  const image = watch("image");

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
      router.push("/mystore");
      router.refresh();
      reset();
      toast.success("Product Added");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <div className="flex pt-20">
        <div className="flex flex-col w-full gap-10 px-2 md:px-0 md:w-1/2">
          <h1 className="text-2xl font-medium">Add new product to your shop</h1>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <span>Product Name</span>
              <Input
                id="name"
                disabled={isLoading}
                {...register("name", { required: true })}
                className={clsx(
                  errors["name"]
                    ? "focus-visible:ring-red-500 border-red-300"
                    : ""
                )}
              />
            </div>
            <div>
              <span>Add product images</span>
              <ProductUpload
                value={image}
                onChange={(value) => setCustomValue("image", value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <span>Select product category</span>
              <Select
                onValueChange={(value) => setCustomValue("category", value)}
              >
                <SelectTrigger>
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
            </div>
            <div className="flex flex-col gap-1">
              <span>Describe your product</span>
              <Textarea
                id="description"
                disabled={isLoading}
                {...register("description", { required: true })}
                className={clsx(
                  "h-40",
                  errors["description"]
                    ? "focus-visible:ring-red-500 border-red-300"
                    : ""
                )}
              />
            </div>
            <div className="flex flex-col gap-1">
              <span>Set product price</span>
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
                    errors["price"]
                      ? "focus-visible:ring-red-500 border-red-300"
                      : ""
                  )}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit" onClick={handleSubmit(onSubmit)}>
                Add to store
              </Button>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </Container>
  );
};

export default AddProductPage;
