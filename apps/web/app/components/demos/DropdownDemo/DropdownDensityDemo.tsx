"use client";

import React, { useState } from "react";
import { DropdownMenu, Button, Text } from "@sanchay/ui";
import { Density } from "@sanchay/ui/src/types/density"; // direct import for demo or expose it in index

export const DropdownDensityDemo = () => {
  const [density, setDensity] = useState<Density>("default");

  const items = [
    {
      id: "1",
      label: "Profile",
      icon: "person",
      onSelect: () => console.log("Profile"),
    },
    {
      id: "2",
      label: "Settings",
      icon: "settings",
      onSelect: () => console.log("Settings"),
    },
    {
      id: "3",
      label: "Keyboard Shortcuts",
      icon: "keyboard",
      shortcut: "⌘K",
      onSelect: () => console.log("Shortcuts"),
    },
    {
      id: "4",
      label: "Logout",
      icon: "logout",
      disabled: true,
      onSelect: () => console.log("Logout"),
    },
  ];

  return (
    <div className="flex flex-col gap-8 p-8 border rounded-lg">
      <div className="flex gap-4 items-center">
        <Text>Select Density:</Text>
        <div className="flex gap-2">
          {(["comfortable", "default", "compact"] as Density[]).map((d) => (
            <Button
              key={d}
              variant={density === d ? "primary" : "outline"}
              onClick={() => setDensity(d)}
            >
              {d}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex gap-8 items-start p-8 bg-muted/20 rounded-md">
        <div className="flex flex-col gap-2">
          <Text className="font-bold">Primitive Dropdown</Text>
          {/* We'll implement primitive demo if needed, but DropdownMenu is easier to show */}
        </div>

        <div className="flex flex-col gap-2">
          <Text className="font-bold">High-Level DropdownMenu</Text>
          <DropdownMenu
            triggerLabel={`Density: ${density}`}
            items={items}
            density={density}
            searchable
          />
        </div>
      </div>
    </div>
  );
};
