"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import AvatarUpload from "@/components/input/AvatarUpload";

import axios from "axios";
import clsx from "clsx";
import { Country } from "country-state-city";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import { Loader2 } from "lucide-react";

const UpdateStoreForm = ({ store }: { store: any }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: store?.name,
      image: store?.image,
      email: store?.email,
      country: Country.getCountryByCode(store?.country)?.name || store?.country,
      city: store?.city,
      address: store?.address,
      description: store?.description,
    },
  });

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });

    if (id === "country" && !value) {
      setValue("city", null);
    }
  };

  const image = watch("image");

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoadingUpdate(true);
    setIsLoading(true);
    try {
      await axios.put(`/api/store`, data);
      router.refresh();
      toast({
        title: "Success✅",
        description: "Store has been updated.",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Failed❌",
        description: "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setLoadingUpdate(false);
      setIsLoading(false);
    }
  };

  const handleDeleteStore = async () => {
    setLoadingDelete(true);
    setIsLoading(true);
    try {
      await axios.delete("/api/store");
      router.refresh();
      toast({
        title: "Success✅",
        description: "Store has been deleted.",
      });
    } catch (error) {
      toast({
        title: "Failed❌",
        description: "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setLoadingDelete(false);
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full lg:w-1/2">
      <CardHeader className="space-y-1">
        <CardTitle className="font-medium">Update your store</CardTitle>
        <CardDescription>Edit your store data or delete it</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="grid w-full max-w-xl gap-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <AvatarUpload
              value={image || "/assets/blank-user.jpg"}
              onChange={(value) => setCustomValue("image", value)}
              className="w-[100px] h-[100px]"
            />
          </div>
          <fieldset className="grid gap-2.5">
            <label>Name</label>
            <Input
              id="name"
              placeholder="Type store name here."
              {...register("name", { required: true })}
              disabled={isLoading}
              className={clsx(
                errors["name"]
                  ? "focus-visible:ring-red-500 border-red-300"
                  : ""
              )}
            />
          </fieldset>
          <fieldset className="grid gap-2.5">
            <label>Email</label>
            <Input
              id="email"
              placeholder="Type store email here."
              {...register("email", { required: true })}
              disabled={isLoading}
              className={clsx(
                errors["email"]
                  ? "focus-visible:ring-red-500 border-red-300"
                  : ""
              )}
            />
          </fieldset>
          <div className="flex flex-col items-center w-full gap-2 sm:flex-row sm:justify-between">
            <fieldset className="grid gap-2.5 w-full">
              <label>Country</label>
              <Input
                id="country"
                placeholder="Type store country here."
                {...register("country", { required: true })}
                disabled={isLoading}
                className={clsx(
                  errors["country"]
                    ? "focus-visible:ring-red-500 border-red-300"
                    : ""
                )}
              />
            </fieldset>
            <fieldset className="grid gap-2.5 w-full">
              <label>City</label>
              <Input
                id="city"
                placeholder="Type store city here."
                {...register("city", { required: true })}
                disabled={isLoading}
                className={clsx(
                  errors["city"]
                    ? "focus-visible:ring-red-500 border-red-300"
                    : ""
                )}
              />
            </fieldset>
          </div>
          <fieldset className="grid gap-2.5 w-full">
            <label>Address</label>
            <Input
              id="address"
              placeholder="Type your store address."
              {...register("address", { required: true })}
              disabled={isLoading}
              className={clsx(
                errors["address"]
                  ? "focus-visible:ring-red-500 border-red-300"
                  : ""
              )}
            />
          </fieldset>
          <fieldset className="grid gap-2.5 w-full">
            <label>Description</label>
            <Textarea
              id="description"
              placeholder="Type your store description."
              {...register("description", { required: true })}
              disabled={isLoading}
              className={clsx(
                errors["description"]
                  ? "focus-visible:ring-red-500 border-red-300"
                  : ""
              )}
            />
          </fieldset>
          <div className="flex gap-2">
            {loadingUpdate ? (
              <Button disabled={isLoading} className="w-full">
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit" className="w-full">
                Update
              </Button>
            )}
            <AlertDialog>
              <AlertDialogTrigger asChild className="w-full">
                <Button variant="destructive" disabled={isLoading}>
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you absolutely sure you want to delete the store?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete your store account and remove
                    your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel disabled={isLoading}>
                    Cancel
                  </AlertDialogCancel>
                  {loadingDelete ? (
                    <AlertDialogAction disabled={isLoading}>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Please wait
                    </AlertDialogAction>
                  ) : (
                    <AlertDialogAction onClick={handleDeleteStore}>
                      Continue
                    </AlertDialogAction>
                  )}
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default UpdateStoreForm;
