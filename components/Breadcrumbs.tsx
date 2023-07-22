import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface BreadcrumbsItem {
  href?: string;
  label: string;
  disabled?: boolean;
}

interface Breadcrumbs {
  children: React.ReactNode;
}

export function BreadcrumbsItem({ href, label, disabled }: BreadcrumbsItem) {
  return disabled ? (
    <p className="text-gray-400 hover:cursor-default">{label}</p>
  ) : (
    <Link href={href || ""} className="font-medium">
      {label}
    </Link>
  );
}

export function BreadcrumbsIcon() {
  return <ChevronRight size={14} />;
}

export function Breadcrumbs({ children }: Breadcrumbs) {
  return <div className="flex items-center gap-1 mb-5">{children}</div>;
}
