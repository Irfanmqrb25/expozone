"use client";
import { useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import useCreateStoreModal from "@/app/hooks/useCreateStoreModal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";
import clsx from "clsx";

import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import Modal from "./Modal";
import Heading from "../Heading";
import AvatarUpload from "../input/AvatarUpload";
import CountrySelect from "../input/CountrySelect";
import CitySelect from "../input/CitySelect";

enum STEPS {
  PROFILE_STORE = 0,
  INFO_STORE = 1,
}

const CreateStoreModal = () => {
  const router = useRouter();
  const createStoreModal = useCreateStoreModal();
  const pathaname = usePathname();
  const [step, setStep] = useState(STEPS.PROFILE_STORE);
  const [isLoading, setIsLoading] = useState(false);

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
      email: "",
      country: null,
      city: null,
      address: "",
      description: "",
    },
  });

  const image = watch("image");
  const country = watch("country");
  const city = watch("city");

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

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.INFO_STORE) {
      return onNext();
    }

    setIsLoading(true);

    axios
      .post("/api/store", data)
      .then(() => {
        router.refresh();
        reset();
        setStep(STEPS.PROFILE_STORE);
        createStoreModal.onClose();
        if (pathaname === "/home") {
          router.push("/mystore");
        }
        toast.success("Store Created");
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO_STORE) {
      return "Create";
    }
    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.PROFILE_STORE) {
      return undefined;
    }
    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading title="Set your profile store!" subtitle="Step 1 of 2" />
      <div className="flex flex-col items-center w-full gap-10 mx-auto">
        <AvatarUpload
          value={image}
          onChange={(value) => setCustomValue("image", value)}
        />
        <Input
          id="name"
          disabled={isLoading}
          {...register("name", { required: true })}
          placeholder="Name your store"
          className={clsx(
            "text-center",
            errors["name"] ? "focus-visible:ring-red-500 border-red-300" : ""
          )}
        />
      </div>
    </div>
  );

  if (step === STEPS.INFO_STORE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Set your store information!" subtitle="Step 2 of 2" />
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <span>Confirm your email</span>
            <Input
              id="email"
              disabled={isLoading}
              {...register("email", { required: true })}
              className={clsx(
                errors["email"]
                  ? "focus-visible:ring-red-500 border-red-300"
                  : ""
              )}
            />
          </div>
          <div className="flex flex-col gap-1">
            <span>Where&apos;s your store located?</span>
            <div className="flex flex-col items-center gap-5 md:flex-row">
              <CountrySelect
                onChange={(value) => setCustomValue("country", value)}
                value={country}
              />
              <CitySelect
                onChange={(value) => setCustomValue("city", value)}
                value={city}
                selectedCountry={country?.value}
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span>Write full address</span>
            <Input
              id="address"
              disabled={isLoading}
              {...register("address", { required: true })}
              className={clsx(
                errors["address"]
                  ? "focus-visible:ring-red-500 border-red-300"
                  : ""
              )}
            />
          </div>
          <div className="flex flex-col gap-1">
            <span>Describe your store</span>
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
          </div>
        </div>
      </div>
    );
  }

  return (
    <Modal
      title="Create store account"
      isOpen={createStoreModal.isOpen}
      onClose={createStoreModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.PROFILE_STORE ? undefined : onBack}
      body={bodyContent}
    />
  );
};

export default CreateStoreModal;
