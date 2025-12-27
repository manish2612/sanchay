import React from "react";
import { View } from "react-native";
import { TextInput, Icon, Text, useResponsiveValues } from "@sanchay/ui";
import { useTheme } from "@sanchay/theme-provider";

export function TextInputDemo() {
  const { theme } = useTheme();
  const t = theme as any;
  const { width } = useResponsiveValues({
    width: { base: "100%", xl: "48%" } as const,
  });

  return (
    <View style={{ width, margin: 0 }}>
      <Text size="sm" color="mutedForeground" style={{ marginBottom: 8 }}>
        TextInput
      </Text>
      <View style={{ gap: 12 }}>
        {/* Default */}
        <TextInput.Root>
          <TextInput.Input placeholder="Default Input" />
        </TextInput.Root>

        {/* With Icon Left */}
        <TextInput.Root>
          <TextInput.Slot side="left">
            <Icon name="search" size={20} color={t.colors.mutedForeground} />
          </TextInput.Slot>
          <TextInput.Input placeholder="Search..." />
        </TextInput.Root>

        {/* Error State */}
        <TextInput.Root variant="error">
          <TextInput.Input placeholder="Error State" />
          <TextInput.Slot side="right">
            <Icon name="error" size={20} color={t.colors.destructive} />
          </TextInput.Slot>
        </TextInput.Root>
      </View>
    </View>
  );
}
