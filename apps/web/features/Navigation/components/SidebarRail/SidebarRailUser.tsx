"use client";
import React, { useState, useRef, useEffect } from "react";
import { Icon } from "@prime/ui";

interface SidebarRailUserProps {
  user: {
    name: string;
    email: string;
    avatarUrl?: string;
  };
  onLogout?: () => void;
  onMouseEnter: (e: React.MouseEvent, text: string) => void;
  onMouseLeave: () => void;
  onPopoverToggle: (isOpen: boolean) => void;
  forceClose: boolean;
}

export function SidebarRailUser({
  user,
  onLogout,
  onMouseEnter,
  onMouseLeave,
  onPopoverToggle,
  forceClose,
}: SidebarRailUserProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Allow parent to force close this popover (e.g. when user clicks Settings)
  useEffect(() => {
    if (forceClose) {
      setIsOpen(false);
    }
  }, [forceClose]);

  // Handle clicking outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        onPopoverToggle(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onPopoverToggle]);

  const handleToggle = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    onPopoverToggle(nextState);
    if (nextState) {
      onMouseLeave(); // Hide tooltip when popover opens
    }
  };

  return (
    <div className="relative flex justify-center w-full" ref={menuRef}>
      <button
        onClick={handleToggle}
        onMouseEnter={(e) => !isOpen && onMouseEnter(e, user.name)}
        onMouseLeave={onMouseLeave}
        className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold shadow-sm transition-all ${
          isOpen
            ? "bg-white/30 text-white ring-2 ring-white/50"
            : "bg-white/20 text-white hover:ring-2 hover:ring-white/50"
        }`}
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
      {isOpen && (
        <div className="absolute left-full ml-4 bottom-0 w-[240px] bg-surface border border-border shadow-xl rounded-lg p-2 z-[100] flex flex-col cursor-default">
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
  );
}
