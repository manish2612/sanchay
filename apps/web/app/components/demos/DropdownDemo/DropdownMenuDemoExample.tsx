"use client";

import React from "react";
import { DropdownMenu } from "@prime/ui";

export const DropdownMenuDemoExample = () => {
  const items = [
    {
      id: "1",
      label: "Profile",
      onSelect: () => alert("Profile"),
      icon: "User" as const,
    },
    {
      id: "2",
      label: "Settings",
      onSelect: () => alert("Settings"),
      icon: "Settings" as const,
      shortcut: "⌘S",
    },
    {
      id: "3",
      label: "Logout",
      onSelect: () => alert("Logout"),
      icon: "LogOut" as const,
    },
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-sm">
      <DropdownMenu
        label="Default Label"
        triggerLabel="Smart Dropdown"
        searchable
        items={items}
      />
      <DropdownMenu
        label="In-Field Label"
        labelVariant="in-field"
        triggerLabel="Smart Dropdown"
        searchable
        items={items}
      />
      <DropdownMenu
        label="Inline Label"
        labelVariant="inline"
        triggerLabel="Smart Dropdown"
        searchable
        items={items}
      />
    </div>
  );
};
