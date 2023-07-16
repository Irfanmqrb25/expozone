import { usePathname, useSearchParams } from "next/navigation";

import {
  MdOutlineOndemandVideo,
  MdOutlineDesignServices,
  MdOutlinePhotoCameraBack,
  MdOutlineMusicNote,
  MdFilterListAlt,
  MdElectricBolt,
} from "react-icons/md";
import { HiOutlineCodeBracket } from "react-icons/hi2";
import { CgGames } from "react-icons/cg";
import { CiBurger } from "react-icons/ci";
import { IoShirtOutline } from "react-icons/io5";
import { IoPizzaOutline } from "react-icons/io5";
import { FiBookOpen } from "react-icons/fi";
import CategoryItem from "./CategoryItem";

export const categories = [
  {
    label: "Electronic",
    description:
      "Find the various videos you want here such as movies, series, lessons and others.",
    icon: MdElectricBolt,
  },
  {
    label: "Video",
    description:
      "Find the various videos you want here such as movies, series, lessons and others.",
    icon: MdOutlineOndemandVideo,
  },
  {
    label: "Design",
    description:
      "Find the various design templates you want here with a variety of attractive and modern looks.",
    icon: MdOutlineDesignServices,
  },
  {
    label: "Books",
    description:
      "Find the books you need such as cookbooks and others in digital form",
    icon: FiBookOpen,
  },
  {
    label: "Music",
    description:
      "Find your favorite music from pop, rock, and other genres here.",
    icon: MdOutlineMusicNote,
  },
  {
    label: "Fashion",
    description: "Find your fashion from various famous brands in the world.",
    icon: IoShirtOutline,
  },
  {
    label: "Foods",
    description: "Find your clothes from various famous brands in the world.",
    icon: IoPizzaOutline,
  },
  {
    label: "Gaming",
    description:
      "Find and sell various activities in games such as game accounts, game digital money and more.",
    icon: CgGames,
  },
  {
    label: "Software",
    description:
      "Find and sell various activities in games such as game accounts, game digital money and more.",
    icon: HiOutlineCodeBracket,
  },
  {
    label: "Photography",
    description:
      "Find unique photos such as natural scenery, and others taken by professionals.",
    icon: MdOutlinePhotoCameraBack,
  },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();

  const isHomePage = pathname === "/home";

  if (!isHomePage) {
    return null;
  }

  return (
    <div className="px-16 py-3">
      <div className="flex flex-row items-center justify-between gap-2 overflow-x-scroll lg:overflow-x-hidden xl:gap-0">
        <div className="flex items-center gap-2 px-3 py-2 border border-neutral-300 rounded-xl">
          <MdFilterListAlt />
          <span className="text-sm">Filter</span>
        </div>
        {categories.map((item) => (
          <CategoryItem
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}
      </div>
    </div>
  );
};

export default Categories;
