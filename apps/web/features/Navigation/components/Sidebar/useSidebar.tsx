"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import { NAVIGATION_TREE } from "../../data/navigationTree";

interface SidebarContextType {
  isPanelOpen: boolean;
  togglePanel: () => void;
  setPanelOpen: (isOpen: boolean) => void;
  activeL1ItemId: string | null;
  setActiveL1ItemId: (id: string | null) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [activeL1ItemId, setActiveL1ItemId] = useState<string | null>(null);
  const pathname = usePathname();

  // Set initial panel state based on screen size, but do not override on resize
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setIsPanelOpen(false);
    }
  }, []);

  // Sync active L1 item based on route
  useEffect(() => {
    if (!pathname) return;

    // Find which L1 item contains the current pathname
    const activeL1 = NAVIGATION_TREE.find((l1) => {
      if (l1.href && pathname.startsWith(l1.href)) return true;
      if (l1.children) {
        return l1.children.some((l2) => {
          if (l2.href && pathname.startsWith(l2.href)) return true;
          if (l2.children) {
            return l2.children.some(
              (l3) => l3.href && pathname.startsWith(l3.href),
            );
          }
          return false;
        });
      }
      return false;
    });

    if (activeL1) {
      setActiveL1ItemId(activeL1.id);
    }
  }, [pathname]);

  const togglePanel = () => setIsPanelOpen((prev) => !prev);
  const setPanelOpen = (isOpen: boolean) => setIsPanelOpen(isOpen);

  return (
    <SidebarContext.Provider
      value={{
        isPanelOpen,
        togglePanel,
        setPanelOpen,
        activeL1ItemId,
        setActiveL1ItemId,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}
