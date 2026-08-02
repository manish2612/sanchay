"use client";
import React from "react";
import Link from "next/link";
import { Icon } from "@prime/ui";
import { NavItemConfig } from "../../data/navigationTree";
import { usePathname } from "next/navigation";

interface SidebarPanelItemProps {
  item: NavItemConfig;
  level?: number;
}

export function SidebarPanelItem({ item, level = 0 }: SidebarPanelItemProps) {
  const pathname = usePathname();
  
  // Since this is now a flat list (L3 or standalone L2), we just check exact/starts-with path matching
  const isActive = item.href ? pathname?.startsWith(item.href) : false;

  // Active state styling
  // Fixed Dark Mode Hover Bug: Using `hover:bg-foreground/10 hover:text-foreground`
  // guarantees perfect contrast in ALL themes because `foreground` dynamically maps to 
  // pure white in dark mode and pure black in light mode.
  const activeClasses = isActive
    ? "bg-primary/10 text-primary border-l-[3px] border-primary font-semibold"
    : "text-mutedForeground hover:bg-foreground/10 hover:text-foreground border-l-[3px] border-transparent";

  const content = (
    <div
      className={`relative flex items-center min-h-[36px] py-1.5 cursor-pointer transition-colors duration-200 w-full rounded-r-md pl-4 pr-4 ${activeClasses}`}
    >
      {/* Icon (optional for L2/L3) */}
      {item.icon && (
        <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center mr-3">
          <Icon name={item.icon as any} className="text-[18px]" />
        </div>
      )}

      {/* Label */}
      <div className="flex-1 whitespace-nowrap overflow-hidden text-ellipsis text-sm">
        {item.label}
      </div>
    </div>
  );

  if (item.href) {
    return (
      <Link href={item.href} className="block w-full">
        {content}
      </Link>
    );
  }

  return <div className="w-full">{content}</div>;
}
