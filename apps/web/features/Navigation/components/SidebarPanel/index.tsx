'use client';
import React, { useState } from 'react';
import { Icon } from '@prime/ui';
import { NavItemConfig } from '../../data/navigationTree';
import { useSidebar } from '../Sidebar/useSidebar';
import { SidebarPanelItem } from '../SidebarPanelItem';

interface SidebarPanelProps {
  activeL1Config?: NavItemConfig;
  isOpen: boolean;
}

export function SidebarPanel({ activeL1Config, isOpen }: SidebarPanelProps) {
  const { setPanelOpen } = useSidebar();

  // Fixed tooltip state to escape overflow-hidden clipping
  const [tooltip, setTooltip] = useState<{
    text: string;
    top: number;
    left: number;
  } | null>(null);

  // If no children, we don't render the panel contents
  const hasChildren = activeL1Config?.children && activeL1Config.children.length > 0;

  // Calculate width: if closed or no children, width is 0 (hidden). Otherwise 240px.
  const panelWidth = isOpen && hasChildren ? 'w-[240px]' : 'w-0';

  const handleMouseEnter = (e: React.MouseEvent, text: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    // Position tooltip to the right of the hovered element, vertically centered
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
      <div
        className={`relative h-dvh bg-surface border-r border-border shadow-sm flex flex-col transition-[width] duration-300 ease-in-out overflow-hidden z-10 flex-shrink-0 ${panelWidth}`}
      >
        {activeL1Config && (
          <div className="w-[240px] h-full flex flex-col">
            {/* Panel Header */}
            <div className="flex items-center justify-between h-14 px-5 border-b border-border flex-shrink-0">
              <h2 className="font-heading font-bold text-base text-foreground whitespace-nowrap overflow-hidden text-ellipsis mr-2">
                {activeL1Config.label}
              </h2>
              <div className="flex-shrink-0">
                <button
                  onClick={() => setPanelOpen(false)}
                  onMouseEnter={(e) => handleMouseEnter(e, 'Collapse Menu')}
                  onMouseLeave={handleMouseLeave}
                  className="w-8 h-8 flex items-center justify-center rounded-md text-mutedForeground hover:text-foreground hover:bg-surfaceHover transition-all cursor-pointer"
                >
                  <Icon name="PanelLeftClose" className="text-[22px]" />
                </button>
              </div>
            </div>

            {/* Sub Navigation (L2 / L3 Flattened) */}
            <nav className="flex-1 overflow-y-auto py-5 px-3 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
              {activeL1Config.children?.map((l2Item) => {
                const isSectionHeader = l2Item.children && l2Item.children.length > 0;

                if (isSectionHeader) {
                  // Render as a group with a non-clickable header
                  return (
                    <div key={l2Item.id} className="flex flex-col mb-6 last:mb-0">
                      <h3 className="px-3 mb-2 text-[11px] font-bold uppercase tracking-wider text-mutedForeground select-none">
                        {l2Item.label}
                      </h3>
                      <div className="flex flex-col space-y-0.5">
                        {l2Item.children!.map((l3Item) => (
                          <SidebarPanelItem key={l3Item.id} item={l3Item} level={0} />
                        ))}
                      </div>
                    </div>
                  );
                } else {
                  // Render as a direct clickable link
                  return (
                    <div key={l2Item.id} className="mb-1">
                      <SidebarPanelItem item={l2Item} level={0} />
                    </div>
                  );
                }
              })}
            </nav>
          </div>
        )}
      </div>

      {/* Global Fixed Tooltip (escapes all overflow clipping) */}
      {tooltip && (
        <div
          className="fixed px-2.5 py-1.5 bg-gray-900 text-white text-[13px] rounded shadow-xl border border-white/10 z-[999] font-medium whitespace-nowrap pointer-events-none"
          style={{
            top: tooltip.top,
            left: tooltip.left,
            transform: 'translateY(-50%)', // Vertically center relative to the top coordinate
          }}
        >
          {tooltip.text}
        </div>
      )}
    </>
  );
}
