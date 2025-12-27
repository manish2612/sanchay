"use client";

import React from "react";
import * as DropdownPrimitive from "@sanchay/ui";
import { Button } from "@sanchay/ui";

export const DropdownBasic = () => {
  return (
    <DropdownPrimitive.DropdownRoot>
      <DropdownPrimitive.DropdownTrigger asChild>
        <Button variant="outline">Basic Dropdown</Button>
      </DropdownPrimitive.DropdownTrigger>
      <DropdownPrimitive.DropdownContent>
        <DropdownPrimitive.DropdownLabel>
          Actions
        </DropdownPrimitive.DropdownLabel>
        <DropdownPrimitive.DropdownItem>Edit</DropdownPrimitive.DropdownItem>
        <DropdownPrimitive.DropdownItem>
          Duplicate
        </DropdownPrimitive.DropdownItem>
        <DropdownPrimitive.DropdownSeparator />
        <DropdownPrimitive.DropdownItem className="text-red-500">
          Delete
        </DropdownPrimitive.DropdownItem>
      </DropdownPrimitive.DropdownContent>
    </DropdownPrimitive.DropdownRoot>
  );
};
