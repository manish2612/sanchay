'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Icon, type IconName } from '@prime/ui';
import { NavItemConfig } from '../../data/navigationTree';
import { useSidebar } from '../Sidebar/useSidebar';
import { SidebarRailSettings } from './SidebarRailSettings';
import { SidebarRailUser } from './SidebarRailUser';

interface SidebarRailProps {
  appName: string;
  items: NavItemConfig[];
  user: {
    name: string;
    email: string;
    avatarUrl?: string;
  };
  onLogout?: () => void;
}

export function SidebarRail({ appName, items, user, onLogout }: SidebarRailProps) {
  const { activeL1ItemId, setActiveL1ItemId, setPanelOpen, isPanelOpen } = useSidebar();
  const router = useRouter();

  // Shared popover state to ensure only one is open at a time
  const [openPopover, setOpenPopover] = useState<'settings' | 'user' | null>(null);

  // State for the robust fixed-position tooltip to escape overflow clipping
  const [tooltip, setTooltip] = useState<{
    text: string;
    top: number;
    left: number;
  } | null>(null);

  const activeL1Config = items.find((i) => i.id === activeL1ItemId);
  const hasChildren = activeL1Config?.children && activeL1Config.children.length > 0;
  const isPanelActuallyOpen = isPanelOpen && hasChildren;

  const handleL1Click = (item: NavItemConfig) => {
    setActiveL1ItemId(item.id);
    if (item.children && item.children.length > 0) {
      setPanelOpen(true);
      if (item.href) router.push(item.href);
    } else {
      setPanelOpen(false);
      if (item.href) router.push(item.href);
    }
  };

  const handleMouseEnter = (e: React.MouseEvent, text: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({
      text,
      top: rect.top + rect.height / 2,
      left: rect.right + 12,
    });
  };

  const handleMouseLeave = () => {
    setTooltip(null);
  };

  return (
    <>
      <div className="flex flex-col items-center w-[72px] h-dvh bg-primary border-r border-primary-dark shadow-sm z-20 py-4 flex-shrink-0">
        {/* App Logo / Master Toggle */}
        <div
          className="relative group flex items-center justify-center w-12 h-12 mb-6 cursor-pointer"
          onClick={() => {
            if (!isPanelActuallyOpen && hasChildren) {
              setPanelOpen(true);
            } else if (!hasChildren && items.length > 0) {
              const firstWithChildren = items.find((i) => i.children && i.children.length > 0);
              if (firstWithChildren) {
                setActiveL1ItemId(firstWithChildren.id);
                setPanelOpen(true);
              }
            }
          }}
          onMouseEnter={(e) => !isPanelActuallyOpen && handleMouseEnter(e, 'Expand Menu')}
          onMouseLeave={handleMouseLeave}
        >
          {/* Solid white card logo — high contrast against green sidebar */}
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white shadow-md transition-all duration-200 group-hover:shadow-lg group-hover:scale-105">
            <Icon name="Layers" className="text-primary text-[22px]" />
          </div>
        </div>

        {/* L1 Nav Items */}
        <nav className="flex-1 w-full flex flex-col items-center space-y-3 overflow-y-auto no-scrollbar px-2">
          {items.map((item) => {
            const isActive = activeL1ItemId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleL1Click(item)}
                onMouseEnter={(e) => handleMouseEnter(e, item.label)}
                onMouseLeave={handleMouseLeave}
                className={`flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-white/20 text-white shadow-inner'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon name={(item.icon as IconName) || 'Folder'} className="text-[24px]" />
              </button>
            );
          })}
        </nav>

        {/* Footer Controls */}
        <div className="flex flex-col items-center space-y-4 mt-auto pt-4 relative w-full">
          <SidebarRailSettings
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onPopoverToggle={(isOpen) => setOpenPopover(isOpen ? 'settings' : null)}
            forceClose={openPopover === 'user'}
          />

          <SidebarRailUser
            user={user}
            onLogout={onLogout}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onPopoverToggle={(isOpen) => setOpenPopover(isOpen ? 'user' : null)}
            forceClose={openPopover === 'settings'}
          />
        </div>
      </div>

      {/* Global Fixed Tooltip (escapes all overflow clipping) */}
      {tooltip && (
        <div
          className="fixed px-2.5 py-1.5 bg-gray-900 text-white text-[13px] rounded shadow-xl border border-white/10 z-[999] font-medium whitespace-nowrap pointer-events-none"
          style={{
            top: tooltip.top,
            left: tooltip.left,
            transform: 'translateY(-50%)',
          }}
        >
          {tooltip.text}
        </div>
      )}
    </>
  );
}
