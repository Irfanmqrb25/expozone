"use client";
import Image from "next/image";
import { Fredoka } from "next/font/google";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import clsx from "clsx";
import {
  MdOutlineOndemandVideo,
  MdOutlineDesignServices,
  MdOutlinePhotoCameraBack,
  MdOutlineMenuBook,
  MdOutlineMusicNote,
  MdOutlineGames,
  MdFilterListAlt,
  MdLogout,
  MdOutlineSettings,
} from "react-icons/md";
import { HiShoppingCart, HiOutlineDotsCircleHorizontal } from "react-icons/hi";
import { FiHelpCircle } from "react-icons/fi";
import { HiOutlineCodeBracket } from "react-icons/hi2";
import { RiCustomerService2Line } from "react-icons/ri";
import { IoFastFoodOutline } from "react-icons/io5";
import { GiClothes } from "react-icons/gi";
import { AiOutlineHeart, AiOutlineStar, AiOutlineShop } from "react-icons/ai";
import { Turn as Hamburger } from "hamburger-react";
import { signOut } from "next-auth/react";

import Container from "../Container";
import Searchbar from "./Searchbar";
import Categories from "./Categories";
import { Button } from "../ui/button";
import MenuItem from "./MenuItem";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { User as UserType } from "@/types";

import {
  LogOut,
  User,
  Heart,
  Star,
  Store,
  ShoppingBag,
  ShoppingCart,
  HelpCircle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const fredoka = Fredoka({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--fredoka-font",
});

interface NavbarProps {
  session?: UserType;
}

const Navbar: React.FC<NavbarProps> = ({ session }) => {
  const router = useRouter();
  const [isOpen, setOpen] = useState(false);
  const handleToggled = () => {
    setOpen(!isOpen);
  };
  useEffect(() => {
    console.log(session);
  });
  return (
    <div
      className={clsx(
        "flex flex-col border-b fixed justify-between w-full bg-white top-0 left-0",
        fredoka.className
      )}
    >
      <Container>
        <div className="flex items-center justify-between">
          <div
            onClick={() => router.push("/home")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Image
              src="/assets/brand-logo.svg"
              alt="brand logo"
              width={35}
              height={35}
            />
            <span className="hidden text-3xl font-semibold xl:block">
              Expozone
            </span>
          </div>
          <div className="flex flex-row items-center justify-center w-[70%] gap-2 md:gap-5">
            <Searchbar />
            <div className="flex items-center gap-2 px-2 py-[6px] border-2 rounded-md border-neutral-300 bg-neutral-100 cursor-pointer">
              <HiShoppingCart className="text-lg" />
              <span>1</span>
            </div>
          </div>
          <div
            className={clsx(
              "items-center md:gap-2",
              isOpen ? "hidden" : "flex"
            )}
          >
            <div className="w-[1.5px] bg-[#e0e0e0] h-9 md:mr-4 hidden md:block"></div>
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="cursor-pointer">
                  <div className="items-center hidden gap-2 md:flex">
                    <Avatar className="w-8 h-8">
                      <AvatarImage
                        src={session?.image || "/assets/blank-user.jpg"}
                        alt="image user"
                      />
                    </Avatar>
                    <span className="hidden lg:block">{session?.name}</span>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-52" align="start">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem className="cursor-pointer">
                      <User className="w-4 h-4 mr-2" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem className="cursor-pointer">
                      <Heart className="w-4 h-4 mr-2" />
                      <span>Wishlist</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <Star className="w-4 h-4 mr-2" />
                      <span>Review</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      <span>Favorite Shop</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">
                    <Store className="w-4 h-4 mr-2" />
                    <span>My Store</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    <span>My Order</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <HelpCircle className="w-4 h-4 mr-2" />
                    <span>Help</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => signOut()}
                    className="cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button
                  onClick={() => router.push("/login")}
                  variant="outline"
                  className="hover:bg-[#006E7F] hover:text-white py-[6px] hidden lg:block"
                >
                  Sign in
                </Button>
                <Button
                  onClick={() => router.push("/register")}
                  className="py-[6px] hidden lg:block"
                >
                  Sign up
                </Button>
              </>
            )}

            <div className="z-10 block lg:hidden">
              <Hamburger
                toggled={isOpen}
                toggle={handleToggled}
                size={30}
                rounded
              />
            </div>
          </div>
        </div>
      </Container>
      <div className="hidden border-t lg:block">
        <Categories />
      </div>
      {isOpen && (
        <div
          className={clsx(
            "bg-black text-white fixed w-full text-lg tracking-wider flex flex-col gap-5 overflow-y-scroll z-10",
            isOpen
              ? " h-screen ease-in duration-500"
              : "h-0 ease-out duration-200",
            fredoka.className
          )}
        >
          <div
            onClick={handleToggled}
            className="fixed flex items-center w-full px-2 py-2 bg-black"
          >
            <Hamburger
              toggled={isOpen}
              toggle={handleToggled}
              size={20}
              rounded
            />
            <span>Menu</span>
          </div>
          <div className="flex flex-col gap-3 px-5 mt-20">
            {session ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage
                      src={session?.image || "/assets/blank-user.jpg"}
                      alt="@shadcn"
                    />
                  </Avatar>
                  <span className="text-xl">{session?.name}</span>
                </div>
                <MdOutlineSettings className="text-2xl hover:text-[#23A094]" />
              </div>
            ) : (
              <div className="flex justify-between">
                <Button
                  onClick={() => router.push("/login")}
                  className="w-[47%] bg-[#23A094] hover:bg-[#23A094]"
                >
                  Sign in
                </Button>
                <Button
                  onClick={() => router.push("/register")}
                  variant="outline"
                  className="w-[47%] hover:bg-transparent hover:text-white"
                >
                  Sign up
                </Button>
              </div>
            )}
            <hr />
          </div>
          <div className="flex flex-col gap-3 px-5">
            <p>Activity</p>
            <div className="flex flex-col gap-3">
              <MenuItem href="" icon={AiOutlineHeart} label="Wishlist" />
              <MenuItem href="" icon={AiOutlineStar} label="Review" />
              <MenuItem href="" icon={AiOutlineShop} label="Favorite Shop" />
            </div>
          </div>
          <div className="flex flex-col gap-3 px-5">
            <p>Category</p>
            <div className="flex flex-col gap-3">
              <MenuItem href="" icon={MdOutlineOndemandVideo} label="Video" />
              <MenuItem href="" icon={MdOutlineMusicNote} label="Music" />
              <MenuItem href="" icon={MdOutlineGames} label="Gaming" />
              <MenuItem href="" icon={GiClothes} label="Fashion" />
              <MenuItem href="" icon={HiOutlineCodeBracket} label="Software" />
              <MenuItem
                href=""
                icon={HiOutlineDotsCircleHorizontal}
                label="Others"
              />
            </div>
          </div>
          <div className="flex flex-col gap-3 px-5">
            <p>Help Center</p>
            <div className="flex flex-col gap-3">
              <MenuItem
                href=""
                icon={RiCustomerService2Line}
                label="Customer Service"
              />
              <MenuItem href="" icon={FiHelpCircle} label="Help" />
              <div
                onClick={() => signOut()}
                className="flex flex-row items-center gap-4 hover:text-[#006E7F]"
              >
                <MdLogout className="text-xl" />
                <span className="font-light">Logout</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
