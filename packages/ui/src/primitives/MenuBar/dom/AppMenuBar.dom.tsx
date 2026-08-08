'use client';

import React from 'react';
import { MenuColumn } from '../schema';
import { MenuBar } from './MenuBar.dom';
import { MenuBarMenu } from './MenuBarMenu.dom';
import { MenuBarTrigger } from './MenuBarTrigger.dom';
import { MenuBarContent } from './MenuBarContent.dom';
import { MenuContentRenderer } from './MenuContentRenderer.dom';

export interface AppMenuBarProps {
  menus: MenuColumn[];
  className?: string;
}

export const AppMenuBar = ({ menus, className }: AppMenuBarProps) => {
  return (
    <MenuBar className={className}>
      {menus.map((menu, index) => (
        <MenuBarMenu key={index}>
          <MenuBarTrigger>{menu.trigger}</MenuBarTrigger>
          <MenuBarContent>
            <MenuContentRenderer items={menu.content} />
          </MenuBarContent>
        </MenuBarMenu>
      ))}
    </MenuBar>
  );
};
