import React from "react";
import { View } from "react-native";
import { Text } from "../../Text/Text.native";
import { styles } from "./styles";
import { useTheme } from "@sanchay/theme-provider";

const DropdownGroup = ({ children }: { children: React.ReactNode }) => {
  return <View>{children}</View>;
};

const DropdownLabel = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();
  return (
    <Text style={[styles.label, { color: theme.colors.mutedForeground }]}>
      {children}
    </Text>
  );
};

const DropdownSeparator = () => {
  const { theme } = useTheme();
  return (
    <View
      style={[styles.separator, { backgroundColor: theme.colors.border }]}
    />
  );
};

export { DropdownGroup, DropdownLabel, DropdownSeparator };
