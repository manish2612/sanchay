"use client";

import React from "react";
import * as DropdownPrimitive from "@sanchay/ui";
import { Button } from "@sanchay/ui";

export const DropdownSearchable = () => {
  return (
    <DropdownPrimitive.DropdownRoot>
      <DropdownPrimitive.DropdownTrigger asChild>
        <Button variant="outline">Searchable Dropdown</Button>
      </DropdownPrimitive.DropdownTrigger>
      <DropdownPrimitive.DropdownContent>
        <DropdownPrimitive.DropdownSearch placeholder="Filter actions..." />
        <DropdownPrimitive.DropdownLabel>Users</DropdownPrimitive.DropdownLabel>
        <DropdownPrimitive.DropdownItem>Alice</DropdownPrimitive.DropdownItem>
        <DropdownPrimitive.DropdownItem>Bob</DropdownPrimitive.DropdownItem>
        <DropdownPrimitive.DropdownItem>Charlie</DropdownPrimitive.DropdownItem>
        <DropdownPrimitive.DropdownItem>David</DropdownPrimitive.DropdownItem>
        <DropdownPrimitive.DropdownSeparator />
        <DropdownPrimitive.DropdownItem>Eve</DropdownPrimitive.DropdownItem>
      </DropdownPrimitive.DropdownContent>
    </DropdownPrimitive.DropdownRoot>
  );
};
