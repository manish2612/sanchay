import React from "react";
import { View, Text, Pressable, FlatList, ScrollView } from "react-native";
import { CommandListProps, CommandItemProps } from "../types";
import { useCommandContext } from "./CommandPalette";
import { styles } from "../styles";
import { useTheme } from "@sanchay/theme-provider";

export const CommandList = ({ children, ...props }: CommandListProps) => {
  // In native, children are typically passed directly.
  // If we wanted virtualization, we'd need a data prop, but for simple command palettes, ScrollView is fine.
  return (
    <ScrollView style={styles.list} keyboardShouldPersistTaps="handled">
      {children}
    </ScrollView>
  );
};

export const CommandEmpty = ({ children }: { children: React.ReactNode }) => {
  const { search, shouldFilter } = useCommandContext();
  // Logic to show/hide empty state is tricky with children composition in Native without inspecting children.
  // For MVP, we render it, but ideally we'd filter children.
  // Actually, to make "filtering" work in Native with composition, we'd need to clone children or use a Context-based registry.

  return (
    <View style={{ padding: 20, alignItems: "center" }}>
      <Text>{children}</Text>
    </View>
  );
};

export const CommandGroup = ({
  children,
  heading,
}: {
  children: React.ReactNode;
  heading?: string;
}) => {
  const theme = useTheme();
  return (
    <View>
      {heading && (
        <Text
          style={{
            paddingHorizontal: 16,
            paddingVertical: 8,
            fontSize: 12,
            fontWeight: "600",
            color: theme.colors.mutedForeground,
          }}
        >
          {heading}
        </Text>
      )}
      {children}
    </View>
  );
};

export const CommandItem = ({
  children,
  onSelect,
  value,
  disabled,
}: CommandItemProps) => {
  const { search, shouldFilter, filter } = useCommandContext();
  const theme = useTheme();

  // Filter logic
  if (shouldFilter && value && search) {
    const score = filter(value, search);
    if (score === 0) return null;
  }

  return (
    <Pressable
      onPress={() => !disabled && onSelect?.(value || "")}
      style={({ pressed }) => [
        styles.item,
        { backgroundColor: pressed ? theme.colors.surfaceHover : "transparent" },
        disabled && { opacity: 0.5 },
      ]}
      disabled={disabled}
    >
      <Text style={[styles.itemText, { color: theme.colors.foreground }]}>
        {children}
      </Text>
    </Pressable>
  );
};

export const CommandShortcut = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const theme = useTheme();
  return (
    <Text
      style={{
        marginLeft: "auto",
        fontSize: 12,
        color: theme.colors.mutedForeground,
      }}
    >
      {children}
    </Text>
  );
};

export const CommandSeparator = () => {
  const theme = useTheme();
  return (
    <View
      style={{
        height: 1,
        backgroundColor: theme.colors.border,
        marginVertical: 4,
      }}
    />
  );
};
