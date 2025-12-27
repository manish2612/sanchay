import React from "react";
import { View, ViewStyle } from "react-native";
import { useTheme } from "@sanchay/theme-provider";
import { getMenuBarStyles } from "./styles";

export function MenuBarSeparator({ style }: { style?: ViewStyle }) {
  const { theme } = useTheme();
  const styles = getMenuBarStyles(theme);
  return <View style={[styles.separator, style]} />;
}
