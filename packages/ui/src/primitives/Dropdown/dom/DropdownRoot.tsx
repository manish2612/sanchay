"use client";

import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import React, { createContext, useContext, useState } from "react";
import { Density } from "../../../types/density";
import { DensityProvider, useDensity } from "../../../contexts/DensityContext";

interface DropdownContextValue {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const DropdownContext = createContext<DropdownContextValue | undefined>(
  undefined
);

export const useDropdownContext = () => {
  return useContext(DropdownContext);
};

interface DropdownRootProps extends DropdownMenuPrimitive.DropdownMenuProps {
  density?: Density;
}

const DropdownRoot = ({ children, density, ...props }: DropdownRootProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const parentDensity = useDensity();
  const finalDensity = density || parentDensity;

  return (
    <DensityProvider value={finalDensity}>
      <DropdownContext.Provider value={{ searchQuery, setSearchQuery }}>
        <DropdownMenuPrimitive.Root {...props}>
          {children}
        </DropdownMenuPrimitive.Root>
      </DropdownContext.Provider>
    </DensityProvider>
  );
};

export { DropdownRoot };
