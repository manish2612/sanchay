import React from "react";
import { View } from "react-native";
import {
  Text,
  MenuBar,
  MenuBarMenu,
  MenuBarTrigger,
  MenuBarContent,
  MenuBarItem,
  MenuBarSeparator,
  MenuBarCheckboxItem,
  useResponsiveValues,
} from "@sanchay/ui";

export function MenuBarDemo() {
  const { width } = useResponsiveValues({
    width: { base: "100%", xl: "48%" } as const,
  });

  return (
    <View style={{ width, margin: 0 }}>
      <Text size="sm" color="mutedForeground" style={{ marginBottom: 8 }}>
        MenuBar (Simulated)
      </Text>
      <View style={{ gap: 12 }}>
        <MenuBar style={{ width: "100%" }}>
          <MenuBarMenu>
            <MenuBarTrigger>File</MenuBarTrigger>
            <MenuBarContent>
              <MenuBarItem>New File</MenuBarItem>
              <MenuBarItem>Open...</MenuBarItem>
              <MenuBarSeparator />
              <MenuBarItem>Exit</MenuBarItem>
            </MenuBarContent>
          </MenuBarMenu>
          <MenuBarMenu>
            <MenuBarTrigger>Edit</MenuBarTrigger>
            <MenuBarContent>
              <MenuBarItem>Undo</MenuBarItem>
              <MenuBarItem>Redo</MenuBarItem>
              <MenuBarItem disabled>Copy</MenuBarItem>
              <MenuBarItem disabled>Paste</MenuBarItem>
            </MenuBarContent>
          </MenuBarMenu>
          <MenuBarMenu>
            <MenuBarTrigger>View</MenuBarTrigger>
            <MenuBarContent>
              <MenuBarCheckboxItem checked>Show Toolbar</MenuBarCheckboxItem>
              <MenuBarCheckboxItem>Show Sidebar</MenuBarCheckboxItem>
            </MenuBarContent>
          </MenuBarMenu>
        </MenuBar>
      </View>
    </View>
  );
}
