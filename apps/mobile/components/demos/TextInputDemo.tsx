import React from "react";
import { View } from "react-native";
import { TextInput, Icon, Text, useResponsiveValues } from "@prime/ui";
import { useTheme } from "@prime/theme-provider";

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
        <TextInput label="Default Label" placeholder="Default Input" />

        {/* In-field Variant with Icon */}
        <TextInput 
          label="In-field Label"
          labelVariant="in-field"
          placeholder="Search..." 
          leftSlot={<Icon name="Search" size={20} color={t.colors.mutedForeground} />} 
        />

        {/* Inline Variant with Icon */}
        <TextInput 
          label="Inline Label"
          labelVariant="inline"
          placeholder="Email address" 
          rightSlot={<Icon name="Mail" size={20} color={t.colors.mutedForeground} />} 
        />

        {/* Error State */}
        <TextInput 
          variant="error" 
          placeholder="Error State" 
          rightSlot={<Icon name="CircleAlert" size={20} color={t.colors.destructive} />} 
        />
      </View>
    </View>
  );
}
