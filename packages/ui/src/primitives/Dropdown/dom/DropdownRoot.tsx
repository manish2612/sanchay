'use client';

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import React, { createContext, useContext, useState } from 'react';

interface DropdownContextValue {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const DropdownContext = createContext<DropdownContextValue | undefined>(undefined);

export const useDropdownContext = () => {
  return useContext(DropdownContext);
};

const DropdownRoot = ({ children, ...props }: DropdownMenuPrimitive.DropdownMenuProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <DropdownContext.Provider value={{ searchQuery, setSearchQuery }}>
      <DropdownMenuPrimitive.Root {...props}>{children}</DropdownMenuPrimitive.Root>
    </DropdownContext.Provider>
  );
};

export { DropdownRoot };
