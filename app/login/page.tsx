import Link from "next/link";
import Image from "next/image";
import { Fredoka } from "next/font/google";
import { redirect } from "next/navigation";

import clsx from "clsx";

import getCurrentUser from "@/lib/session";
import LoginClient from "./LoginClient";

const fredoka = Fredoka({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

const LoginPage = async () => {
  const session = await getCurrentUser();

  if (session) {
    redirect("/featured");
  }

  return (
    <div className="flex flex-col w-full gap-10 px-6 py-7 md:px-40 md:py-10">
      <Link
        href="/featured"
        className="flex items-center justify-center gap-2 xl:justify-start"
      >
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
        <LoginClient />
      </div>
    </div>
  );
};

export default LoginPage;
