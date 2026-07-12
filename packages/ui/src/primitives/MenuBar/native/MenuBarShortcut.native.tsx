import React from "react";
import { Text } from "react-native";
import { getMenuBarStyles } from "./styles";
import { useTheme } from "@prime/theme-provider";

export function MenuBarShortcut({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const styles = getMenuBarStyles(theme);
  return <Text style={styles.shortcut}>{children}</Text>;
}
