"use client";
import React, { useState, useRef, useEffect } from "react";
import { Icon } from "@prime/ui";
import { NavItemConfig } from "../../data/navigationTree";
import { useSidebar } from "../Sidebar/useSidebar";

interface SidebarRailProps {
  appName: string;
  items: NavItemConfig[];
  user: {
    name: string;
    email: string;
    avatarUrl?: string;
  };
  onLogout?: () => void;
}

export function SidebarRail({
  appName,
  items,
  user,
  onLogout,
}: SidebarRailProps) {
  const { activeL1ItemId, setActiveL1ItemId, setPanelOpen, isPanelOpen } =
    useSidebar();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // State for the robust fixed-position tooltip to escape overflow clipping
  const [tooltip, setTooltip] = useState<{
    text: string;
    top: number;
    left: number;
  } | null>(null);

  const activeL1Config = items.find((i) => i.id === activeL1ItemId);
  const hasChildren =
    activeL1Config?.children && activeL1Config.children.length > 0;
  const isPanelActuallyOpen = isPanelOpen && hasChildren;

  const handleL1Click = (item: NavItemConfig) => {
    setActiveL1ItemId(item.id);
    if (item.children && item.children.length > 0) {
      setPanelOpen(true);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleMouseEnter = (e: React.MouseEvent, text: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    // Position tooltip to the right of the hovered element, vertically centered
    setTooltip({
      text,
      top: rect.top + rect.height / 2,
      left: rect.right + 12,
    });
  };

  const handleMouseLeave = () => {
    setTooltip(null);
  };

  // Close user popover when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div className="flex flex-col items-center w-[72px] h-screen bg-primary border-r border-primary-dark shadow-sm z-20 py-4 flex-shrink-0">
        {/* App Logo / Master Toggle (Only toggles when collapsed) */}
        <div
          className="relative group flex items-center justify-center w-12 h-12 mb-6 cursor-pointer"
          onClick={() => {
            if (!isPanelActuallyOpen && hasChildren) {
              setPanelOpen(true);
            } else if (!hasChildren && items.length > 0) {
              const firstWithChildren = items.find(
                (i) => i.children && i.children.length > 0,
              );
              if (firstWithChildren) {
                setActiveL1ItemId(firstWithChildren.id);
                setPanelOpen(true);
              }
            }
          }}
          onMouseEnter={(e) =>
            !isPanelActuallyOpen && handleMouseEnter(e, "Expand Menu")
          }
          onMouseLeave={handleMouseLeave}
        >
          <div className="relative flex items-center justify-center w-full h-full rounded-xl bg-white/10 text-white shadow-sm transition-all duration-200 overflow-hidden">
            <Icon
              name="Layers"
              className={`text-[24px] absolute transition-opacity duration-200 ${!isPanelActuallyOpen ? "group-hover:opacity-0" : "opacity-100"}`}
            />
            {!isPanelActuallyOpen && (
              <Icon
                name="Menu"
                className="text-[26px] absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              />
            )}
          </div>
        </div>

        {/* L1 Nav Items */}
        <nav className="flex-1 w-full flex flex-col items-center space-y-3 overflow-y-auto no-scrollbar px-2">
          {items.map((item) => {
            const isActive = activeL1ItemId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleL1Click(item)}
                onMouseEnter={(e) => handleMouseEnter(e, item.label)}
                onMouseLeave={handleMouseLeave}
                className={`flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-white/20 text-white shadow-inner"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon name={item.icon || "folder"} className="text-[24px]" />
              </button>
            );
          })}
        </nav>

        {/* Footer Controls */}
        <div className="flex flex-col items-center space-y-4 mt-auto pt-4 relative w-full">
          {/* Settings */}
          <button
            onMouseEnter={(e) => handleMouseEnter(e, "Settings")}
            onMouseLeave={handleMouseLeave}
            className="flex items-center justify-center w-10 h-10 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <Icon name="settings" className="text-[22px]" />
          </button>

          {/* User Avatar with Popover */}
          <div
            className="relative flex justify-center w-full"
            ref={userMenuRef}
          >
            <button
              onClick={() => {
                setIsUserMenuOpen(!isUserMenuOpen);
                setTooltip(null); // hide tooltip when popover opens
              }}
              onMouseEnter={(e) =>
                !isUserMenuOpen && handleMouseEnter(e, user.name)
              }
              onMouseLeave={handleMouseLeave}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 text-white text-sm font-bold shadow-sm hover:ring-2 hover:ring-white/50 transition-all"
            >
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                getInitials(user.name)
              )}
            </button>

            {/* Popover Menu */}
            {isUserMenuOpen && (
              <div className="absolute left-full ml-4 bottom-0 w-[240px] bg-surface border border-border shadow-xl rounded-lg p-2 z-[100] flex flex-col">
                <div className="px-3 py-3 border-b border-border mb-1">
                  <div className="font-bold text-sm text-foreground truncate">
                    {user.name}
                  </div>
                  <div className="text-xs text-mutedForeground truncate">
                    {user.email}
                  </div>
                </div>
                <button className="flex items-center px-3 py-2 text-sm text-foreground hover:bg-surfaceHover rounded-md transition-colors w-full text-left">
                  <Icon
                    name="User"
                    className="text-[18px] mr-2 text-mutedForeground"
                  />
                  Profile & Account
                </button>
                {onLogout && (
                  <button
                    onClick={onLogout}
                    className="flex items-center px-3 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-md transition-colors w-full text-left mt-1"
                  >
                    <Icon name="LogOut" className="text-[18px] mr-2" />
                    Sign Out
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Global Fixed Tooltip (escapes all overflow clipping) */}
      {tooltip && (
        <div
          className="fixed px-2.5 py-1.5 bg-gray-900 text-white text-[13px] rounded shadow-xl border border-white/10 z-[999] font-medium whitespace-nowrap pointer-events-none"
          style={{
            top: tooltip.top,
            left: tooltip.left,
            transform: "translateY(-50%)", // Vertically center relative to the top coordinate
          }}
        >
          {tooltip.text}
        </div>
      )}
    </>
  );
}
