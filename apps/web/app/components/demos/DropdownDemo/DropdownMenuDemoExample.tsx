"use client";

import React from "react";
import { DropdownMenu } from "@prime/ui";

export const DropdownMenuDemoExample = () => {
  return (
    <DropdownMenu
      triggerLabel="Smart Dropdown"
      searchable
      items={[
        {
          id: "1",
          label: "Profile",
          onSelect: () => alert("Profile"),
          icon: "User",
        },
        {
          id: "2",
          label: "Settings",
          onSelect: () => alert("Settings"),
          icon: "Settings",
          shortcut: "⌘S",
        },
        {
          id: "3",
          label: "Logout",
          onSelect: () => alert("Logout"),
          icon: "LogOut",
        },
      ]}
    />
  );
};
