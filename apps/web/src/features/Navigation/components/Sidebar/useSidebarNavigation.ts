'use client';
import { useState, useCallback } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useSidebar } from './useSidebar';

export function useSidebarNavigation() {
  const { activeL1ItemId, setActiveL1ItemId, setMobileMenuOpen, isMobileMenuOpen } = useSidebar();
  
  // Track if we are in a drilldown state on mobile
  const [isDrilldown, setIsDrilldown] = useState(false);

  const navigate = useNavigate();

  const handleMobileMenuClick = useCallback((itemId: string, hasChildren: boolean, href?: string) => {
    setActiveL1ItemId(itemId);
    if (hasChildren) {
      setIsDrilldown(true);
    } else {
      setMobileMenuOpen(false);
      setIsDrilldown(false);
      if (href) {
        navigate({ to: href });
      }
    }
  }, [setActiveL1ItemId, setMobileMenuOpen, navigate]);

  const handleBack = useCallback(() => {
    setIsDrilldown(false);
  }, []);

  const closeMobileSidebar = useCallback(() => {
    setMobileMenuOpen(false);
    setTimeout(() => {
      setIsDrilldown(false);
    }, 300);
  }, [setMobileMenuOpen]);

  return {
    isDrilldown,
    handleMobileMenuClick,
    handleBack,
    closeMobileSidebar,
    isMobileMenuOpen,
  };
}
