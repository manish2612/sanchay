"use client";

import React, { useState } from "react";
import {
  useShortcut,
  Button,
  Text,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
  ShortcutCheatSheet,
} from "@prime/ui";

export const ShortcutDemo = () => {
  const [triggered, setTriggered] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [cheatSheetOpen, setCheatSheetOpen] = useState(false);

  // Global shortcut
  useShortcut(
    "shift+g",
    () => {
      setTriggered("Global Shortcut (Shift+G)");
      alert("Global Shortcut Triggered!");
    },
    {
      description: "Trigger global alert",
    }
  );

  // Toggle Command Palette
  useShortcut("meta+k", (e) => {
    e.preventDefault();
    setOpen((open) => !open);
    setTriggered("Command Palette Toggled (Cmd+K)");
  });

  // Toggle Cheat Sheet
  useShortcut("shift+?", (e) => {
    e.preventDefault();
    setCheatSheetOpen((open) => !open);
    setTriggered("Cheat Sheet Toggled (?)");
  });

  return (
    <div className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-md my-4">
      <Text className="mb-2 font-bold text-lg">Shortcut System Demo</Text>
      <Text className="mb-4">Try pressing the following keys:</Text>

      <ul className="list-disc pl-5 mb-4 space-y-2">
        <li>
          <code className="bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded">
            Shift + G
          </code>
          : Triggers a global alert
        </li>
        <li>
          <code className="bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded">
            Cmd + K
          </code>
          : Toggle Command Palette
        </li>
        <li>
          <code className="bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded">
            ? (Shift + /)
          </code>
          : Toggle Shortcut Cheat Sheet
        </li>
      </ul>

      {triggered && (
        <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 p-2 rounded mt-2">
          Last triggered: {triggered}
        </div>
      )}

      <div className="mt-4 flex gap-2">
        <Button onClick={() => setTriggered(null)} variant="outline">
          Clear Log
        </Button>
        <Button onClick={() => setOpen(true)}>Open Command Palette</Button>
        <Button onClick={() => setCheatSheetOpen(true)} variant="secondary">
          Show Cheat Sheet
        </Button>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem
              onSelect={() => {
                setTriggered("Selected: Calendar");
                setOpen(false);
              }}
            >
              Calendar
            </CommandItem>
            <CommandItem
              onSelect={() => {
                setTriggered("Selected: Search Emoji");
                setOpen(false);
              }}
            >
              Search Emoji
            </CommandItem>
            <CommandItem
              onSelect={() => {
                setTriggered("Selected: Calculator");
                setOpen(false);
              }}
            >
              Calculator
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem
              value="settings"
              onSelect={() => {
                setTriggered("Selected: Settings");
                setOpen(false);
              }}
            >
              Settings
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                setTriggered("Selected: Profile");
                setOpen(false);
              }}
            >
              Profile
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                setTriggered("Selected: Billing");
                setOpen(false);
              }}
            >
              Billing
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>

      <ShortcutCheatSheet
        open={cheatSheetOpen}
        onOpenChange={setCheatSheetOpen}
        categories={[
          {
            title: "Navigation",
            items: [
              { id: "nav-home", label: "Go to Home", keys: ["G", "H"] },
              { id: "nav-settings", label: "Go to Settings", keys: ["G", "S"] },
            ],
          },
          {
            title: "Actions",
            items: [
              { id: "act-save", label: "Save", keys: ["⌘", "S"] },
              { id: "act-copy", label: "Copy", keys: ["⌘", "C"] },
              { id: "act-paste", label: "Paste", keys: ["⌘", "V"] },
            ],
          },
        ]}
      />
    </div>
  );
};
