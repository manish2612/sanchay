"use client";
import React from "react";
import {
  Text,
  MenuBar,
  MenuBarMenu,
  MenuBarTrigger,
  MenuBarContent,
  MenuBarItem,
  MenuBarSeparator,
  MenuBarSub,
  MenuBarSubTrigger,
  MenuBarSubContent,
  MenuBarCheckboxItem,
  MenuBarRadioGroup,
  MenuBarRadioItem,
  MenuBarShortcut,
} from "@sanchay/ui";

export function MenuBarDemo() {
  return (
    <div className="p-5 bg-background rounded-lg border border-[#222222]">
      <strong className="text-foreground block mb-4 text-sm font-bold font-heading border-b border-[#333333] pb-2">
        MenuBar Example:
      </strong>
      <div className="flex w-full flex-col gap-4">
        <div>
          <Text size="sm" color="mutedForeground" className="mb-2">
            Manual MenuBar:
          </Text>
          <MenuBar>
            <MenuBarMenu>
              <MenuBarTrigger>File</MenuBarTrigger>
              <MenuBarContent>
                <MenuBarItem>
                  New Tab <MenuBarShortcut>⌘T</MenuBarShortcut>
                </MenuBarItem>
                <MenuBarItem>
                  New Window <MenuBarShortcut>⌘N</MenuBarShortcut>
                </MenuBarItem>
                <MenuBarItem disabled>New Incognito Window</MenuBarItem>
                <MenuBarSeparator />
                <MenuBarSub>
                  <MenuBarSubTrigger>Share</MenuBarSubTrigger>
                  <MenuBarSubContent>
                    <MenuBarItem>Email link</MenuBarItem>
                    <MenuBarItem>Messages</MenuBarItem>
                    <MenuBarItem>Notes</MenuBarItem>
                  </MenuBarSubContent>
                </MenuBarSub>
                <MenuBarSeparator />
                <MenuBarItem>
                  Print... <MenuBarShortcut>⌘P</MenuBarShortcut>
                </MenuBarItem>
              </MenuBarContent>
            </MenuBarMenu>

            <MenuBarMenu>
              <MenuBarTrigger>Edit</MenuBarTrigger>
              <MenuBarContent>
                <MenuBarItem>
                  Undo <MenuBarShortcut>⌘Z</MenuBarShortcut>
                </MenuBarItem>
                <MenuBarItem>
                  Redo <MenuBarShortcut>⇧⌘Z</MenuBarShortcut>
                </MenuBarItem>
                <MenuBarSeparator />
                <MenuBarSub>
                  <MenuBarSubTrigger>Find</MenuBarSubTrigger>
                  <MenuBarSubContent>
                    <MenuBarItem>Search the web</MenuBarItem>
                    <MenuBarSeparator />
                    <MenuBarItem>Find...</MenuBarItem>
                    <MenuBarItem>Find Next</MenuBarItem>
                    <MenuBarItem>Find Previous</MenuBarItem>
                  </MenuBarSubContent>
                </MenuBarSub>
                <MenuBarSeparator />
                <MenuBarItem>Cut</MenuBarItem>
                <MenuBarItem>Copy</MenuBarItem>
                <MenuBarItem>Paste</MenuBarItem>
              </MenuBarContent>
            </MenuBarMenu>

            <MenuBarMenu>
              <MenuBarTrigger>View</MenuBarTrigger>
              <MenuBarContent>
                <MenuBarCheckboxItem checked>
                  Always Show Bookmarks Bar
                </MenuBarCheckboxItem>
                <MenuBarCheckboxItem checked={false}>
                  Always Show Full URLs
                </MenuBarCheckboxItem>
                <MenuBarSeparator />
                <MenuBarItem inset>
                  Reload <MenuBarShortcut>⌘R</MenuBarShortcut>
                </MenuBarItem>
                <MenuBarItem disabled inset>
                  Force Reload <MenuBarShortcut>⇧⌘R</MenuBarShortcut>
                </MenuBarItem>
                <MenuBarSeparator />
                <MenuBarItem inset>Toggle Fullscreen</MenuBarItem>
                <MenuBarSeparator />
                <MenuBarItem inset>Hide Sidebar</MenuBarItem>
              </MenuBarContent>
            </MenuBarMenu>

            <MenuBarMenu>
              <MenuBarTrigger>Profiles</MenuBarTrigger>
              <MenuBarContent>
                <MenuBarRadioGroup value="benoit">
                  <MenuBarRadioItem value="andy">Andy</MenuBarRadioItem>
                  <MenuBarRadioItem value="Luis">Luis</MenuBarRadioItem>
                  <MenuBarRadioItem value="benoit">Benoit</MenuBarRadioItem>
                </MenuBarRadioGroup>
                <MenuBarSeparator />
                <MenuBarItem inset>Edit...</MenuBarItem>
                <MenuBarSeparator />
                <MenuBarItem inset>Add Profile...</MenuBarItem>
              </MenuBarContent>
            </MenuBarMenu>
          </MenuBar>
        </div>
      </div>
    </div>
  );
}
