import Image from "next/image";
import { Fredoka } from "next/font/google";
import Link from "next/link";

import clsx from "clsx";
import { FcGoogle } from "react-icons/fc";
import { GrFacebook } from "react-icons/gr";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const fredoka = Fredoka({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

const RegisterPage = () => {
  return (
    <div className="flex flex-col gap-10 px-3 py-7 md:px-40 md:py-10">
      <Link href="/home" className="flex items-center gap-2">
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
        <div className="hidden md:block">
          <Image
            src="/assets/register.svg"
            alt="brand logo"
            width={400}
            height={400}
          />
        </div>
        <div
          className={clsx(
            "flex flex-col w-full md:w-[400px] shadow-form gap-8 px-7 py-5",
            fredoka.className
          )}
        >
          <h1
            className={clsx(
              "text-3xl font-medium text-center",
              fredoka.className
            )}
          >
            Register Now
          </h1>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <span className="text-sm">Name</span>
              <Input type="text" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm">Email</span>
              <Input type="email" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm">Password</span>
              <Input type="password" />
            </div>
            <Button className="mt-2">Sign up</Button>
          </div>
          <hr />
          <div className="flex flex-col gap-3">
            <Button className="flex justify-between text-black bg-white border hover:bg-white hover:border-neutral-500 border-neutral-300">
              <FcGoogle className="text-xl" />
              <span className="mx-auto">Google</span>
            </Button>
            <Button className="flex justify-between text-black bg-white border hover:bg-white hover:border-neutral-500 border-neutral-300">
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
      </div>
    </div>
  );
};

export default RegisterPage;
