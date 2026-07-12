import React from "react";
import { Pressable, Text } from "react-native";
import { useTheme } from "@prime/theme-provider";
import { getMenuBarStyles } from "./styles";

export function MenuBarItem({
  children,
  style,
  inset,
  disabled,
  ...props
}: any) {
  const { theme } = useTheme();
  const styles = getMenuBarStyles(theme);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.item,
        pressed && styles.itemPressed,
        disabled && styles.itemDisabled,
        inset && { paddingLeft: 32 },
        style,
      ]}
      disabled={disabled}
      {...props}
    >
      <Text style={styles.itemText}>{children}</Text>
    </Pressable>
  );
}
