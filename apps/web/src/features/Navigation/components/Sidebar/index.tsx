'use client';
import React, { useEffect, useRef } from 'react';
import { SidebarProvider, useSidebar } from './useSidebar';
import { SidebarRail } from '../SidebarRail';
import { SidebarPanel } from '../SidebarPanel';
import { NAVIGATION_TREE } from '../../data/navigationTree';
import { useSidebarNavigation } from './useSidebarNavigation';
import { SidebarPanelItem } from '../SidebarPanelItem';
import { MobileSidebarSettings } from './MobileSidebarSettings';
import { Icon } from '@prime/ui';

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

  const { isMobileMenuOpen, isDrilldown, handleMobileMenuClick, handleBack, closeMobileSidebar } =
    useSidebarNavigation();

  // Trap focus or handle Escape key for accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        closeMobileSidebar();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen, closeMobileSidebar]);

  return (
    <>
      {/* --- Mobile View --- */}
      {/* Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden transition-opacity duration-300"
          onClick={closeMobileSidebar}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-[80%] max-w-sm bg-surface transition-transform duration-300 ease-in-out lg:hidden overflow-hidden ${
          isMobileMenuOpen ? 'translate-x-0 shadow-xl' : '-translate-x-[105%]'
        }`}
        aria-modal="true"
        role="dialog"
      >
        <div
          className={`flex w-[200%] h-full transition-transform duration-300 ${
            isDrilldown ? '-translate-x-1/2' : 'translate-x-0'
          }`}
        >
          {/* Primary Mobile Menu */}
          <div className="w-1/2 flex-shrink-0 h-full overflow-y-auto flex flex-col bg-primary text-primary-foreground">
            <div className="flex items-center justify-between h-14 px-4 border-b border-primary-foreground/10 flex-shrink-0">
              <span className="font-semibold text-lg">{appName}</span>
              <button
                onClick={closeMobileSidebar}
                className="p-2 text-primary-foreground/70 hover:text-primary-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                aria-label="Close menu"
              >
                <Icon name="X" className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
              {NAVIGATION_TREE.map((item) => {
                const hasChildren = item.children && item.children.length > 0;
                const isActive = activeL1ItemId === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleMobileMenuClick(item.id, !!hasChildren, item.href)}
                    className={`flex items-center w-full p-3 rounded-md transition-colors ${
                      isActive
                        ? 'bg-primary-foreground/20 font-medium'
                        : 'hover:bg-primary-foreground/10'
                    }`}
                  >
                    <Icon name={item.icon as any} className="w-5 h-5 mr-3" />
                    <span className="flex-1 text-left text-sm">{item.label}</span>
                    {hasChildren && (
                      <Icon
                        name="ChevronRight"
                        className={`w-5 h-5 ${isActive ? 'text-primary-foreground' : 'text-primary-foreground/50'}`}
                      />
                    )}
                  </button>
                );
              })}
            </nav>
            {/* Mobile Footer / User */}
            <div className="p-4 border-t border-primary-foreground/10 flex flex-col gap-4 flex-shrink-0">
              {/* Settings Toggle Button that we will drill down or open inline */}
              <button
                onClick={() => handleMobileMenuClick('mobile-settings', true)}
                className="flex items-center w-full p-2 rounded-md transition-colors hover:bg-primary-foreground/10 text-sm"
              >
                <Icon name="Settings" className="w-5 h-5 mr-3" />
                <span className="flex-1 text-left">Settings & Theme</span>
                <Icon name="ChevronRight" className="w-5 h-5 text-primary-foreground/60" />
              </button>

              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center font-bold mr-3 flex-shrink-0">
                  {user.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{user.name}</p>
                  <p className="text-xs text-primary-foreground/70 truncate">{user.email}</p>
                </div>
                {onLogout && (
                  <button
                    onClick={onLogout}
                    className="p-2 text-primary-foreground/70 hover:text-primary-foreground"
                  >
                    <Icon name="LogOut" className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Secondary Mobile Menu (Drilldown) */}
          <div className="w-1/2 flex-shrink-0 h-full flex flex-col bg-surface">
            {activeL1ItemId === 'mobile-settings' ? (
              <MobileSidebarSettings onBack={handleBack} />
            ) : activeL1Config ? (
              <>
                <div className="flex items-center h-14 px-2 border-b border-border flex-shrink-0">
                  <button
                    onClick={handleBack}
                    className="flex items-center p-2 text-sm text-mutedForeground hover:text-foreground font-medium"
                  >
                    <Icon name="ChevronLeft" className="w-4 h-4 mr-1" />
                    Main Menu
                  </button>
                </div>
                <div className="px-5 py-4 flex-shrink-0">
                  <h2 className="text-xl font-bold text-foreground">{activeL1Config.label}</h2>
                </div>
                <nav className="flex-1 overflow-y-auto px-3 pb-6">
                  {activeL1Config.children?.map((l2Item) => {
                    const isSectionHeader = l2Item.children && l2Item.children.length > 0;
                    if (isSectionHeader) {
                      return (
                        <div key={l2Item.id} className="flex flex-col mb-6 last:mb-0">
                          <h3 className="px-3 mb-2 text-xs font-bold uppercase tracking-wider text-mutedForeground">
                            {l2Item.label}
                          </h3>
                          <div className="flex flex-col space-y-1">
                            {l2Item.children!.map((l3Item) => (
                              <SidebarPanelItem key={l3Item.id} item={l3Item} level={0} />
                            ))}
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div key={l2Item.id} className="mb-1">
                          <SidebarPanelItem item={l2Item} level={0} />
                        </div>
                      );
                    }
                  })}
                </nav>
              </>
            ) : null}
          </div>
        </div>
      </div>

      {/* --- Desktop View --- */}
      {/* z-[100] ensures tooltips sit above sticky headers. */}
      {/* sticky top-0 h-dvh ensures the sidebar doesn't scroll with the main body content. */}
      <div className="hidden lg:flex relative h-dvh sticky top-0 bg-background z-[100] flex-shrink-0">
        {/* Level 1 Icon Rail (Primary Color Scheme) */}
        <SidebarRail appName={appName} user={user} items={NAVIGATION_TREE} onLogout={onLogout} />

        {/* Level 2/3 Panel (Secondary Color Scheme) */}
        <SidebarPanel activeL1Config={activeL1Config} isOpen={isPanelOpen} />
      </div>
    </>
  );
}

export function Sidebar(props: SidebarContentProps) {
  return <SidebarContent {...props} />;
}
