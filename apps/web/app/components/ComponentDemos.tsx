"use client";

import React from "react";
import { GridBackground } from "@sanchay/ui";
import { APP_NAME } from "@sanchay/config";

import { AppMenuBarExample } from "./AppMenuBarExample";
import { ShortcutDemo } from "./ShortcutDemo";

import { ThemeControls } from "./demos/ThemeControls";
import { FontDemo } from "./demos/FontDemo";
import { ButtonDemo } from "./demos/ButtonDemo";
import { TextInputDemo } from "./demos/TextInputDemo";
import { MenuBarDemo } from "./demos/MenuBarDemo";
import { ModalDemo } from "./demos/ModalDemo";
import { NavDemoWrapper } from "./demos/NavDemoWrapper";
import { TableDemo } from "./demos/TableDemo/index";

export function ComponentDemos() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-background text-foreground selection:bg-primary/30">
      {/* App Menu Bar - Top Placement */}
      <div className="sticky top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="px-4 py-2">
          <AppMenuBarExample />
        </div>
      </div>

      {/* Background Grid & Glow */}
      <GridBackground className="opacity-60 fixed inset-0 z-0 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center py-16 px-4">
        {/* Header Content */}
        <div className="text-center max-w-xl mb-12">
          <h1 className="text-4xl font-extrabold mb-2 font-heading tracking-tight text-foreground">
            Welcome to {APP_NAME}
          </h1>
          <p className="text-lg font-body text-gray-400 font-normal">
            Theme & Density Demonstration
          </p>
        </div>

        {/* Main Demos Container - Full Width / Responsive */}
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Column 1: Controls & Config */}
          <div className="flex flex-col gap-6">
            <ThemeControls />
            <NavDemoWrapper />
            <ShortcutDemo />
          </div>

          {/* Column 2: Component Showcase */}
          <div className="flex flex-col gap-6">
            <FontDemo />

            <div className="space-y-6">
              <ButtonDemo />
              <TextInputDemo />
              <MenuBarDemo />
              <ModalDemo />
            </div>
          </div>
        </div>

        {/* Full Width Demos */}
        <div className="w-full max-w-7xl mt-8">
          <TableDemo />
        </div>
      </div>
    </div>
  );
}
