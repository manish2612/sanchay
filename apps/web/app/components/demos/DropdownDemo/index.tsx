"use client";

import React from "react";
import { DropdownBasic } from "./DropdownBasic";
import { DropdownSearchable } from "./DropdownSearchable";
import { DropdownMenuDemoExample } from "./DropdownMenuDemoExample";

export const DropdownDemo = () => {
  return (
    <div className="p-6 border rounded-lg bg-card text-card-foreground">
      <h2 className="text-2xl font-bold mb-4">Dropdown Demos</h2>
      <div className="flex flex-col gap-8">
        <div className="space-y-2">
          <h3 className="tex-lg font-semibold text-muted-foreground">
            Primitives: Basic
          </h3>
          <DropdownBasic />
        </div>
        <div className="space-y-2">
          <h3 className="tex-lg font-semibold text-muted-foreground">
            Primitives: Searchable
          </h3>
          <DropdownSearchable />
        </div>
        <div className="space-y-2">
          <h3 className="tex-lg font-semibold text-muted-foreground">
            High-Level: DropdownMenu
          </h3>
          <DropdownMenuDemoExample />
        </div>
      </div>
    </div>
  );
};
