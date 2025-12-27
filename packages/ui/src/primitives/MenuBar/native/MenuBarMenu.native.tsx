import React, { useState } from "react";
import { MenuContext } from "./contexts.native";

// Menu acts as a provider for its specialized ID
export function MenuBarMenu({ children }: { children: React.ReactNode }) {
  const [menuId] = useState(() => Math.random().toString(36).substr(2, 9));

  return (
    <MenuContext.Provider value={{ value: menuId }}>
      {children}
    </MenuContext.Provider>
  );
}
