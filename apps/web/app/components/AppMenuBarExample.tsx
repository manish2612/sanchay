"use client";

import React from "react";
import { AppMenuBar } from "@sanchay/ui";
import { MenuColumn } from "@sanchay/ui";
import { useRouter } from "next/navigation";

// Define the menu structure (could come from backend/config)
const INITIAL_MENU_DATA: MenuColumn[] = [
  {
    trigger: "File",
    content: [
      { kind: "item", label: "New File", actionId: "file.new", shortcut: "⌘N" },
      { kind: "separator" },
      { kind: "item", label: "Settings", href: "/settings", shortcut: "⌘," }, // Navigation
      { kind: "separator" },
      { kind: "item", label: "Exit (Logout)", actionId: "file.exit" },
    ],
  },
  {
    trigger: "View",
    content: [
      {
        kind: "checkbox",
        label: "Show Sidebar",
        checked: true,
        onCheckedChange: () => {}, // Placeholder, overwritten in state
      },
      {
        kind: "radio-group",
        value: "benoit",
        onValueChange: () => {}, // Placeholder
        items: [
          { value: "andy", label: "Andy" },
          { value: "benoit", label: "Benoit" },
          { value: "luis", label: "Luis" },
        ],
      },
    ],
  },
];

export function AppMenuBarExample() {
  const router = useRouter();

  // State for dynamic items
  const [showSidebar, setShowSidebar] = React.useState(true);
  const [profile, setProfile] = React.useState("benoit");

  // Re-construct the menu data whenever state changes
  const menus = React.useMemo(() => {
    return INITIAL_MENU_DATA.map((col) => ({
      ...col,
      content: col.content.map((item) => {
        // Hydrate Checkbox: Sidebar
        if (item.kind === "checkbox" && item.label === "Show Sidebar") {
          return {
            ...item,
            checked: showSidebar,
            onCheckedChange: (checked: boolean) => {
              console.log("Toggling Sidebar:", checked);
              setShowSidebar(checked);
            },
          };
        }

        // Hydrate Radio: Profile
        if (
          item.kind === "radio-group" &&
          item.items.some((i) => i.value === "benoit")
        ) {
          return {
            ...item,
            value: profile,
            onValueChange: (val: string) => {
              console.log("Switching Profile:", val);
              setProfile(val);
            },
          };
        }

        // Hydrate Actions
        if (item.kind === "item" && item.actionId) {
          return {
            ...item,
            onSelect: () => handleAction(item.actionId!),
          };
        }

        return item;
      }),
    }));
  }, [showSidebar, profile]);

  const handleAction = (id: string) => {
    console.log("Action triggered:", id);
    if (id === "file.exit") {
      console.log("Logging out...");
      // router.push('/login');
    }
    if (id === "file.new") {
      alert("New File Action!");
    }
  };

  return <AppMenuBar menus={menus} className="w-fit" />;
}
