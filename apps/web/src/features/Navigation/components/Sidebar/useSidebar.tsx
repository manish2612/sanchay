'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { useLocation } from '@tanstack/react-router';
import { NAVIGATION_TREE, NavItemConfig } from '../../data/navigationTree';
import { useGetVoucherTypesQuery } from '@/features/Accounts/VoucherType/api';

interface SidebarContextType {
  isPanelOpen: boolean;
  togglePanel: () => void;
  setPanelOpen: (isOpen: boolean) => void;
  activeL1ItemId: string | null;
  setActiveL1ItemId: (id: string | null) => void;
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (isOpen: boolean) => void;
  navigationTree: NavItemConfig[];
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeL1ItemId, setActiveL1ItemId] = useState<string | null>(null);
  const location = useLocation();
  const pathname = location.pathname;

  const { data: voucherTypes } = useGetVoucherTypesQuery();

  // Compute dynamic navigation tree
  const navigationTree = useMemo(() => {
    // Deep clone the static tree to avoid mutating the original reference
    const dynamicTree: NavItemConfig[] = JSON.parse(JSON.stringify(NAVIGATION_TREE));

    if (voucherTypes && voucherTypes.length > 0) {
      // Group voucher types by category to avoid duplicate sidebar items
      const accountsMenuMap = new Map<string, any>();
      const inventoryMenuMap = new Map<string, any>();

      voucherTypes.forEach((vt) => {
        const item = {
          id: vt.category.toLowerCase(),
          label: vt.name, // Will be overridden by default voucher if needed
          category: vt.category,
          voucherId: vt.id,
          is_default: vt.is_set_as_default,
        };

        if (vt.posting === 'A' || vt.posting === 'IA') {
          if (!accountsMenuMap.has(vt.category) || vt.is_set_as_default) {
            accountsMenuMap.set(vt.category, item);
          }
        } else if (vt.posting === 'I') {
          if (!inventoryMenuMap.has(vt.category) || vt.is_set_as_default) {
            inventoryMenuMap.set(vt.category, item);
          }
        }
      });

      const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

      const buildChildren = (map: Map<string, any>, module: string) => {
        return Array.from(map.values()).map((vt) => ({
          id: vt.id,
          label: vt.label,
          href: `/${module}/transactions/${slugify(vt.label)}/${vt.voucherId}`,
        }));
      };

      const accountsTransactions = buildChildren(accountsMenuMap, 'accounts');
      const inventoryTransactions = buildChildren(inventoryMenuMap, 'inventory');

      // Inject dynamically generated items into the accounts and inventory nodes
      const accountsNode = dynamicTree.find((n) => n.id === 'accounts');
      if (accountsNode?.children) {
        const transNode = accountsNode.children.find((c) => c.id === 'accounts-transactions');
        if (transNode) transNode.children = accountsTransactions;
      }

      const inventoryNode = dynamicTree.find((n) => n.id === 'inventory');
      if (inventoryNode?.children) {
        const transNode = inventoryNode.children.find((c) => c.id === 'inventory-transactions');
        if (transNode) transNode.children = inventoryTransactions;
      }
    }

    return dynamicTree;
  }, [voucherTypes]);

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
    const activeL1 = navigationTree.find((l1) => {
      if (l1.href && pathname.startsWith(l1.href)) return true;
      if (l1.children) {
        return l1.children.some((l2) => {
          if (l2.href && pathname.startsWith(l2.href)) return true;
          if (l2.children) {
            return l2.children.some((l3) => l3.href && pathname.startsWith(l3.href));
          }
          return false;
        });
      }
      return false;
    });

    if (activeL1) {
      setActiveL1ItemId(activeL1.id);
    }
  }, [pathname, navigationTree]);

  const togglePanel = () => setIsPanelOpen((prev) => !prev);
  const setPanelOpen = (isOpen: boolean) => setIsPanelOpen(isOpen);
  const setMobileMenuOpen = (isOpen: boolean) => setIsMobileMenuOpen(isOpen);

  return (
    <SidebarContext.Provider
      value={{
        isPanelOpen,
        togglePanel,
        setPanelOpen,
        activeL1ItemId,
        setActiveL1ItemId,
        isMobileMenuOpen,
        setMobileMenuOpen,
        navigationTree,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}
