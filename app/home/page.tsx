import { Fredoka } from "next/font/google";
import { Patrick_Hand } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

import Header from "@/components/navbar/Header";

import clsx from "clsx";
import {
  VscDebugBreakpointDataUnverified,
  VscDebugBreakpointLogUnverified,
} from "react-icons/vsc";
import Footer from "@/components/navbar/Footer";

const fredoka = Fredoka({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--fredoka-font",
});

const patrickHand = Patrick_Hand({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--patrick-hand",
});

const LandingPage = () => {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex flex-col w-full mt-16 border-b-2 border-black lg:flex-row lg:mt-0">
        <div className="flex flex-col items-center border-b-2 xl:border-b-0 lg:border-r-2 border-black justify-center mx-auto space-y-6 lg:space-y-4 bg-[#FF6D28] w-full lg:w-1/2 h-[500px] text-center">
          <h2
            className={clsx(
              "text-3xl md:text-5xl w-full md:w-2/3 mx-auto font-medium",
              fredoka.className
            )}
          >
            SELL YOUR PRODUCT IN EXPOZONE
          </h2>
          <p
            className={clsx(
              "text-xl md:text-2xl w-4/5 md:w-2/3 text-white mx-auto tracking-wider",
              patrickHand.className
            )}
          >
            Make your money from $0 without charge And make your product to be
            number one.
          </p>
          <Link
            href="/"
            className={clsx(
              "bg-black text-white py-2 px-5 rounded-sm w-1/2 lg:w-auto tracking-wider text-lg border-2 border-white ease-in-out duration-300 shadow-button",
              patrickHand.className
            )}
          >
            See Product
          </Link>
        </div>
        <div className="bg-[#FCE700] w-full lg:w-1/2 h-[500px] flex justify-center my-auto relative">
          <Image
            src="/assets/landing-page/blob.svg"
            alt="..."
            width={500}
            height={500}
          />
          <Image
            src="/assets/landing-page/person.svg"
            alt="..."
            width={250}
            height={250}
            className="absolute top-10"
          />
        </div>
      </div>
      <div
        className={clsx(
          "flex flex-col justify-center items-center py-10",
          patrickHand.className
        )}
      >
        <p className="text-2xl tracking-wider md:text-3xl">
          START YOUR JOURNEY!
        </p>
        <p className="flex text-lg text-center md:text-xl text-neutral-400">
          Create a shop now and make a lot of money later...
        </p>
      </div>
      <div className="flex flex-col w-full border-black lg:flex-row border-y-2">
        <div className="flex flex-col items-center border-b-2 xl:border-b-0 lg:border-r-2 border-black justify-center bg-[#006E7F] w-full lg:w-1/2 h-[500px]">
          <div className="relative w-4/5 overflow-hidden bg-white border-2 md:w-2/3 h-3/4 group aspect-square border-neutral-200">
            <Image
              alt="warning new seller"
              src="/assets/landing-page/shopping.jpg"
              fill
              className="object-cover w-full h-full transition group-hover:scale-110"
            />
          </div>
        </div>
        <div className="bg-[#323232] w-full lg:w-1/2 h-[500px]">
          <div className="flex flex-col gap-5 px-5 pt-16 text-white md:px-10">
            <p
              className={clsx(
                "text-3xl md:text-4xl font-medium tracking-wider",
                fredoka.className
              )}
            >
              SELL PRODUCT!
            </p>
            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-center gap-2">
                <VscDebugBreakpointDataUnverified className="text-lg" />
                <p className={clsx("md:text-lg", patrickHand.className)}>
                  Don&apos;t take big risks
                </p>
              </div>
              <div className="flex flex-row items-center gap-2">
                <VscDebugBreakpointDataUnverified className="text-lg" />
                <p className={clsx("text-lg", patrickHand.className)}>
                  Start selling product on a small scale
                </p>
              </div>
              <div className="flex flex-row items-center gap-2">
                <VscDebugBreakpointDataUnverified className="text-lg" />
                <p className={clsx("text-lg", patrickHand.className)}>
                  Makes your product as attractive as possible
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={clsx(
          "flex justify-center mx-auto text-2xl md:text-3xl py-10 tracking-wider w-4/5 md:w-3/4 text-center",
          patrickHand.className
        )}
      >
        “Only you can initiate change in your life. Dare to take action, and
        believe in the extraordinary potential that you have”.
      </div>
      <div className="flex flex-col w-full border-black lg:flex-row border-y-2">
        <div className="flex flex-col border-b-2 xl:border-b-0 lg:border-r-2 border-black bg-[#F5C6EC] w-full lg:w-1/2 h-[500px]">
          <div className="flex flex-col items-center justify-center my-auto">
            <div className="relative w-4/5 overflow-hidden bg-white border-2 shadow md:w-2/3 h-3/4 group aspect-square border-neutral-200">
              <Image
                alt="warning new seller"
                src="/assets/landing-page/video.jpg"
                fill
                className="object-cover w-full h-full transition group-hover:scale-110"
              />
            </div>
          </div>
        </div>
        <div className="bg-[#AA77FF] w-full lg:w-1/2 h-[500px]">
          <div className="flex flex-col gap-5 px-5 pt-16 text-white md:px-10">
            <p
              className={clsx(
                "text-3xl md:text-4xl font-medium tracking-wider",
                fredoka.className
              )}
            >
              SELL ANYTHING!
            </p>
            <p
              className={clsx(
                "text-lg md:text-xl font-medium tracking-wider",
                patrickHand.className
              )}
            >
              You can sell your product like video digital, design, physicall
              product, or your app if you are developer.
            </p>
            <div className="flex flex-col gap-2 tracking-wider">
              <div className="flex flex-row items-center gap-2">
                <VscDebugBreakpointLogUnverified className="text-lg" />
                <p className={clsx("md:text-lg", patrickHand.className)}>
                  Blogs
                </p>
              </div>
              <div className="flex flex-row items-center gap-2">
                <VscDebugBreakpointLogUnverified className="text-lg" />
                <p className={clsx("text-lg", patrickHand.className)}>
                  Nice Stuff
                </p>
              </div>
              <div className="flex flex-row items-center gap-2">
                <VscDebugBreakpointLogUnverified className="text-lg" />
                <p className={clsx("text-lg", patrickHand.className)}>
                  Application
                </p>
              </div>
              <div className="flex flex-row items-center gap-2">
                <VscDebugBreakpointLogUnverified className="text-lg" />
                <p className={clsx("text-lg", patrickHand.className)}>
                  Video Digital
                </p>
              </div>
              <div className="flex flex-row items-center gap-2">
                <VscDebugBreakpointLogUnverified className="text-lg" />
                <p className={clsx("text-lg", patrickHand.className)}>
                  Template Design
                </p>
              </div>
              <div className="flex flex-row items-center gap-2">
                <VscDebugBreakpointLogUnverified className="text-lg" />
                <p className={clsx("text-lg", patrickHand.className)}>
                  Sell Anything Whatever You Want
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={clsx(
          "flex flex-col gap-5 justify-center mx-auto py-10 tracking-wider w-4/5 text-center",
          patrickHand.className
        )}
      >
        <p className="text-5xl tracking-wider md:text-6xl">1,450,290 +</p>
        <p className="text-2xl tracking-wider md:text-3xl">
          Sellers who trust to sell their products at Expozone. What are you
          waiting for?
        </p>
      </div>
      <div className="flex flex-col items-center gap-5 py-20 md:py-28 bg-[#23A094] text-white border-black border-y-2">
        <div
          className={clsx(
            "text-xl md:text-4xl flex flex-col justify-center items-center tracking-wider font-semibold",
            fredoka.className
          )}
        >
          <p>Share your product!</p>
          <p>For someone in need out there.</p>
        </div>
        <button
          className={clsx(
            "px-5 py-2 bg-black border border-white rounded-sm tracking-wider hover:scale-105 duration-100 ease-in-out",
            patrickHand.className
          )}
        >
          Start Selling
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
