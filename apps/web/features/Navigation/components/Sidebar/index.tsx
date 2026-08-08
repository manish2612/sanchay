'use client';
import React from 'react';
import { SidebarProvider, useSidebar } from './useSidebar';
import { SidebarRail } from '../SidebarRail';
import { SidebarPanel } from '../SidebarPanel';
import { NAVIGATION_TREE } from '../../data/navigationTree';

interface SidebarContentProps {
  appName: string;
  user: {
    name: string;
    email: string;
    avatarUrl?: string;
  };
  onLogout?: () => void;
}

function SidebarContent({ appName, user, onLogout }: SidebarContentProps) {
  const { isPanelOpen, activeL1ItemId } = useSidebar();

  const activeL1Config = NAVIGATION_TREE.find((item) => item.id === activeL1ItemId);

  return (
    // z-[100] ensures tooltips sit above sticky headers.
    // sticky top-0 h-dvh ensures the sidebar doesn't scroll with the main body content.
    <div className="relative flex h-dvh sticky top-0 bg-background z-[100] flex-shrink-0">
      {/* Level 1 Icon Rail (Primary Color Scheme) */}
      <SidebarRail appName={appName} user={user} items={NAVIGATION_TREE} onLogout={onLogout} />

      {/* Level 2/3 Panel (Secondary Color Scheme) */}
      <SidebarPanel activeL1Config={activeL1Config} isOpen={isPanelOpen} />
    </div>
  );
}

export function Sidebar(props: SidebarContentProps) {
  return (
    <SidebarProvider>
      <SidebarContent {...props} />
    </SidebarProvider>
  );
}
