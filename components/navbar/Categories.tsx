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
import { IoShirtOutline } from "react-icons/io5";
import { IoPizzaOutline } from "react-icons/io5";
import { FiBookOpen } from "react-icons/fi";
import CategoryItem from "./CategoryItem";

export const categories = [
  {
    href: "/discover/search?st=video",
    label: "Video",
    description:
      "Discover captivating movies, series, and educational content.",
    icon: MdOutlineOndemandVideo,
    color: "bg-[#FF90E8]",
  },
  {
    href: "/discover/search?st=design",
    label: "Design",
    description: "Unlock stunning design templates for your creativity.",
    icon: MdOutlineDesignServices,
    color: "bg-[#889FE0]",
  },
  {
    href: "/discover/search?st=books",
    label: "Books",
    description:
      "Immerse in a digital library with enticing cookbooks and more.",
    icon: FiBookOpen,
    color: "bg-[#98EECC]",
  },
  {
    href: "/discover/search?st=music",
    label: "Music",
    description: "Discover your favorite music from pop to rock and more.",
    icon: MdOutlineMusicNote,
    color: "bg-[#F1F333]",
  },
  {
    href: "/discover/search?st=fashion",
    label: "Fashion",
    description: "Elevate your style with trendy fashion from renowned brands.",
    icon: IoShirtOutline,
    color: "bg-[#FFB6C1]",
  },
  {
    href: "/discover/search?st=foods",
    label: "Foods",
    description: "Indulge in delectable dishes and culinary delights.",
    icon: IoPizzaOutline,
    color: "bg-[#FF6347]",
  },
  {
    href: "/discover/search?st=gaming",
    label: "Gaming",
    description: "Embark on thrilling gaming adventures and more.",
    icon: CgGames,
    color: "bg-[#FF9900]",
  },
  {
    href: "/discover/search?st=software",
    label: "Software",
    description: "Enhance your digital experience with cutting-edge software.",
    icon: HiOutlineCodeBracket,
    color: "bg-[#F5EFE7]",
  },
  {
    href: "/discover/search?st=photography",
    label: "Photography",
    description: "Immerse in unique photos of breathtaking natural scenery.",
    icon: MdOutlinePhotoCameraBack,
    color: "bg-[#79E0EE]",
  },
  {
    href: "/discover/search?st=electronic",
    label: "Electronic",
    description: "Explore electrifying videos, movies, series, and lessons.",
    icon: MdElectricBolt,
    color: "bg-[#23A094]",
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
