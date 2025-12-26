import React, { useState } from "react";
import { View, ViewStyle } from "react-native";
import { useTheme } from "@sanchay/theme-provider";
import { MenuBarContext } from "./contexts.native";
import { getMenuBarStyles } from "./styles";

export function MenuBar({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
}) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const { theme } = useTheme();
  const styles = getMenuBarStyles(theme);

  return (
    <MenuBarContext.Provider value={{ openMenuId, setOpenMenuId }}>
      <View style={[styles.root, style]}>{children}</View>
    </MenuBarContext.Provider>
  );
}
