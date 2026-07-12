"use client";

import React from "react";
import { GridBackground } from "@prime/ui";
import { APP_NAME } from "@prime/config";

import { AppMenuBarExample } from "./AppMenuBarExample";
import { ShortcutDemo } from "./ShortcutDemo";

import { ThemeControls } from "./demos/ThemeControls";
import { FontDemo } from "./demos/FontDemo";
import { ButtonDemo } from "./demos/ButtonDemo";
import { TextInputDemo } from "./demos/TextInputDemo";
import { DatePickerDemo } from "./demos/DatePickerDemo";
import { MenuBarDemo } from "./demos/MenuBarDemo";
import { ModalDemo } from "./demos/ModalDemo";
import { NavDemoWrapper } from "./demos/NavDemoWrapper";
import { TableDemo } from "./demos/TableDemo/index";
import { DropdownDemo } from "./demos/DropdownDemo";
import { AutoSuggestDemo } from "./demos/AutoSuggestDemo";
import { Sidebar } from "../../features/Navigation/components/Sidebar";

export function ComponentDemos() {
  return (
    <div className="min-h-screen flex bg-background text-foreground selection:bg-primary/30">
      {/* Navigation Sidebar */}
      <Sidebar 
        appName={APP_NAME} 
        user={{ name: "Admin User", email: "admin@example.com" }} 
        onLogout={() => console.log("Logout clicked")}
      />
      
      <div className="flex flex-col flex-1 relative overflow-hidden">
        {/* App Menu Bar - Top Placement */}

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
              <AutoSuggestDemo />
              <DatePickerDemo />
              <MenuBarDemo />
              <ModalDemo />
              <DropdownDemo />
            </div>
          </div>
        </div>

        {/* Full Width Demos */}
        <div className="w-full max-w-7xl mt-8">
          <TableDemo />
        </div>
      </div>
      </div>
    </div>
  );
}
