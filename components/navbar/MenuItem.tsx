import React from "react";
import Link from "next/link";
import { IconType } from "react-icons";

interface MenuItemProps {
  href: string;
  icon: IconType;
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ href, icon: Icon, label }) => {
  return (
    <Link
      href={href}
      className="flex flex-row items-center gap-4 hover:text-[#006E7F]"
    >
      <Icon className="text-xl" />
      <span className="font-light">{label}</span>
    </Link>
  );
};

export default MenuItem;
