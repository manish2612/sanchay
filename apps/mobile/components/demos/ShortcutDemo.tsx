import React, { useState } from "react";
import { View, Alert } from "react-native";
import {
  Button,
  Text,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  ShortcutCheatSheet,
  useResponsiveValues,
} from "@prime/ui";
import { useTheme } from "@prime/theme-provider";

export const ShortcutDemo = () => {
  const [triggered, setTriggered] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [cheatSheetOpen, setCheatSheetOpen] = useState(false);
  const { theme } = useTheme();
  const t = theme as any;
  const { width } = useResponsiveValues({
    width: { base: "100%", xl: "48%" } as const,
  });

  // Native doesn't support keyboard hooks the same way, so we just use buttons to demo
  const handleGlobalShortcut = () => {
    setTriggered("Global Shortcut (Shift+G)");
    Alert.alert("Global Shortcut Triggered!");
  };

  return (
    <View
      style={{
        width, // Use responsive width
        padding: t.space?.[4] || 16,
        borderColor: t.colors.border,
        borderWidth: 1,
        borderRadius: 8,
        marginVertical: 16,
      }}
    >
      <Text weight="bold" size="lg" style={{ marginBottom: 8 }}>
        Shortcut System Demo
      </Text>
      <Text style={{ marginBottom: 16 }}>
        On mobile, use the buttons below to trigger actions:
      </Text>

      {triggered && (
        <View
          style={{
            backgroundColor: t.colors.primary + "20",
            padding: 8,
            borderRadius: 4,
            marginTop: 8,
            marginBottom: 16,
          }}
        >
          <Text style={{ color: t.colors.primary }}>
            Last triggered: {triggered}
          </Text>
        </View>
      )}

      <View style={{ gap: 8 }}>
        <Button onPress={() => setTriggered(null)} variant="outline">
          Clear Log
        </Button>
        {/* Simulate Shift+G */}
        <Button onPress={handleGlobalShortcut} variant="secondary">
          Trigger Global Action
        </Button>
        <Button onPress={() => setOpen(true)}>Open Command Palette</Button>
        <Button onPress={() => setCheatSheetOpen(true)} variant="secondary">
          Show Cheat Sheet
        </Button>
      </View>

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
              {/* <CommandShortcut>⌘S</CommandShortcut> */}
              {/* CommandShortcut might not be exported for native or not needed */}
            </CommandItem>
            <CommandItem
              onSelect={() => {
                setTriggered("Selected: Profile");
                setOpen(false);
              }}
            >
              Profile
            </CommandItem>
            <CommandItem
              onSelect={() => {
                setTriggered("Selected: Billing");
                setOpen(false);
              }}
            >
              Billing
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
    </View>
  );
};
