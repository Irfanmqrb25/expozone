"use client";
import { Fredoka } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/navigation";

import clsx from "clsx";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { GrFacebook } from "react-icons/gr";
import { signIn } from "next-auth/react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const fredoka = Fredoka({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

const RegisterClient = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/register", data)
      .then(() => {
        router.push("/login");
        toast.success("Register Success!");
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <div
      className={clsx(
        "flex flex-col w-[400px] shadow-form gap-8 px-7 py-5",
        fredoka.className
      )}
    >
      <h1
        className={clsx("text-3xl font-medium text-center", fredoka.className)}
      >
        Register Now
      </h1>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <span className="text-sm">Name</span>
          <Input
            type="name"
            id="name"
            {...register("name", { required: true })}
            disabled={isLoading}
            className={clsx(
              errors["name"] ? "focus-visible:ring-red-500 border-red-300" : ""
            )}
          />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm">Email</span>
          <Input
            type="email"
            id="email"
            {...register("email", {
              required: true,
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            disabled={isLoading}
            className={clsx(
              errors["email"] ? "focus-visible:ring-red-500 border-red-300" : ""
            )}
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby="email-error"
          />
          {errors.email && (
            <span
              id="email-error"
              className="text-sm text-red-500"
              role="alert"
            >
              {errors.email.message as string}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm">Password</span>
          <Input
            type="password"
            id="password"
            {...register("password", {
              required: true,
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
            })}
            disabled={isLoading}
            className={clsx(
              errors["password"]
                ? "focus-visible:ring-red-500 border-red-300"
                : ""
            )}
            aria-invalid={errors.password ? "true" : "false"}
            aria-describedby="password-error"
          />
          {errors.password && (
            <span
              id="password-error"
              className="text-sm text-red-500"
              role="alert"
            >
              {errors.password.message as string}
            </span>
          )}
        </div>
        <Button onClick={handleSubmit(onSubmit)} className="mt-2">
          Sign up
        </Button>
      </div>
      <hr />
      <div className="flex flex-col gap-3">
        <Button
          onClick={() => signIn("google", { callbackUrl: "/featured" })}
          className="flex justify-between text-black bg-white border hover:bg-white hover:border-neutral-500 border-neutral-300"
        >
          <FcGoogle className="text-xl" />
          <span className="mx-auto">Google</span>
        </Button>
        <Button
          disabled={isLoading}
          className="flex justify-between text-black bg-white border hover:bg-white hover:border-neutral-500 border-neutral-300"
        >
          <GrFacebook className="text-xl text-[#3b5998]" />
          <span className="mx-auto">Facebook</span>
        </Button>
        <div className="mt-3 text-sm text-center">
          Already have an account?{" "}
          <Link className="hover:underline" href="/login">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterClient;
