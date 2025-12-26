import { createContext } from "react";

// Context to manage open menu state
export interface MenuBarContextType {
  openMenuId: string | null;
  setOpenMenuId: (id: string | null) => void;
}

export const MenuBarContext = createContext<MenuBarContextType>({
  openMenuId: null,
  setOpenMenuId: () => {},
});

// Context for individual Menu items to know their ID
export const MenuContext = createContext<{ value: string } | null>(null);
