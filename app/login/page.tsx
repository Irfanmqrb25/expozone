"use client";
import Image from "next/image";
import { Fredoka } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import clsx from "clsx";
import { FcGoogle } from "react-icons/fc";
import { GrFacebook } from "react-icons/gr";
import { signIn } from "next-auth/react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

const fredoka = Fredoka({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

const RegisterPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);
      if (callback?.ok) {
        router.push("/home");
        toast.success("Logged in");
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  return (
    <div className="flex flex-col w-full gap-10 px-6 py-7 md:px-40 md:py-10">
      <Link href="/home" className="flex items-center justify-center gap-2">
        <Image
          src="/assets/brand-logo.svg"
          alt="brand logo"
          width={40}
          height={40}
          className="w-[30px] md:w-[40px]"
        />
        <span
          className={clsx(
            "text-3xl md:text-4xl font-semibold",
            fredoka.className
          )}
        >
          Expozone
        </span>
      </Link>
      <div className="flex items-center justify-evenly">
        <div className="hidden xl:block">
          <Image
            src="/assets/login.svg"
            alt="brand logo"
            width={500}
            height={500}
          />
        </div>
        <div
          className={clsx(
            "flex flex-col w-[400px] shadow-form gap-8 px-7 py-5",
            fredoka.className
          )}
        >
          <h1
            className={clsx(
              "text-3xl font-medium text-center",
              fredoka.className
            )}
          >
            Login
          </h1>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <span className="text-sm">Email</span>
              <Input
                type="email"
                id="email"
                {...register("email", { required: true })}
                disabled={isLoading}
                className={clsx(
                  errors["email"]
                    ? "focus-visible:ring-red-500 border-red-300"
                    : ""
                )}
              />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm">Password</span>
              <Input
                type="password"
                id="password"
                {...register("password", { required: true })}
                disabled={isLoading}
                className={clsx(
                  errors["password"]
                    ? "focus-visible:ring-red-500 border-red-300"
                    : ""
                )}
              />
            </div>
            <Button
              onClick={handleSubmit(onSubmit)}
              disabled={isLoading}
              className="mt-3"
            >
              Login
            </Button>
          </div>
          <hr />
          <div className="flex flex-col gap-3">
            <Button
              onClick={() => signIn("google", { callbackUrl: "/home" })}
              className="flex justify-between text-black bg-white border hover:bg-white hover:border-neutral-500 border-neutral-300"
            >
              <FcGoogle className="text-xl" />
              <span className="mx-auto">Google</span>
            </Button>
            <Button className="flex justify-between text-black bg-white border hover:bg-white hover:border-neutral-500 border-neutral-300">
              <GrFacebook className="text-xl text-[#3b5998]" />
              <span className="mx-auto">Facebook</span>
            </Button>
            <div className="mt-3 text-sm text-center">
              Don&apos;t have an account?{" "}
              <Link className="hover:underline" href="/register">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
