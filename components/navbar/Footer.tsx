import Image from "next/image";
import { Fredoka } from "next/font/google";

import SubscribeInput from "@/components/input/SubscribeInput";

import clsx from "clsx";
import { BsInstagram, BsFacebook, BsTwitter, BsLinkedin } from "react-icons/bs";

const fredoka = Fredoka({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--fredoka-font",
});

const Footer = () => {
  return (
    <footer className="flex flex-col gap-10 px-5 py-10 text-white bg-black md:px-14">
      <div
        className={clsx(
          "text-2xl md:text-4xl tracking-wider font-semibold",
          fredoka.className
        )}
      >
        EXPOZONE
      </div>
      <div className="flex flex-col justify-between gap-10 md:flex-row md:gap-0">
        <div className="flex flex-col gap-5">
          <p
            className={clsx(
              "text-lg md:text-xl font-normal tracking-wider",
              fredoka.className
            )}
          >
            Subscribe to get more information about Expozone.
          </p>
          <SubscribeInput />
        </div>
        <div
          className={clsx(
            "flex flex-row md:text-start flex-wrap justify-center md:flex-col gap-7 md:gap-3 md:mr-16",
            fredoka.className
          )}
        >
          <p>Help</p>
          <p>Blogs</p>
          <p>Pricing</p>
          <p>Terms of Service</p>
          <p>Privacy Policy</p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-10 md:justify-between md:flex-row md:gap-0">
        <div className="flex items-center gap-2">
          <Image
            src="/assets/brand-logo.svg"
            alt="brand logo"
            width={40}
            height={40}
            className="border border-white w-[30px] md:w-[40px]"
          />
          <p className={clsx("text-lg font-medium", fredoka.className)}>
            &copy; 2024 Expozone.
          </p>
        </div>
        <div className="flex flex-row mx-auto text-xl md:mx-0 md:text-2xl gap-7">
          <BsInstagram className="cursor-pointer" />
          <BsFacebook className="cursor-pointer" />
          <BsTwitter className="cursor-pointer" />
          <BsLinkedin className="cursor-pointer" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
