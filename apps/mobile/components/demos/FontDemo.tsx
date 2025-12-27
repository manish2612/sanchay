import React from "react";
import { View } from "react-native";
import { Text } from "@sanchay/ui";
import { useTheme } from "@sanchay/theme-provider";

export function FontDemo() {
  const { theme } = useTheme();
  const t = theme as any;

  return (
    <View
      style={{
        padding: t.spacing[4],
        backgroundColor: t.colors.background,
        borderRadius: 8,
        marginTop: 20,
      }}
    >
      <Text weight="bold" style={{ marginBottom: 10 }}>
        Font Demo:
      </Text>

      <Text size="xs" color="mutedForeground" style={{ marginBottom: 4 }}>
        IBM Plex Sans (Body)
      </Text>
      <Text weight="light" style={{ marginBottom: 2 }}>
        Light 300
      </Text>
      <Text weight="light" style={{ marginBottom: 2, fontStyle: "italic" }}>
        Light Italic 300
      </Text>
      <Text weight="regular" style={{ marginBottom: 2 }}>
        Regular 400
      </Text>
      <Text weight="regular" style={{ marginBottom: 2, fontStyle: "italic" }}>
        Regular Italic 400
      </Text>
      <Text weight="medium" style={{ marginBottom: 2 }}>
        Medium 500
      </Text>
      <Text weight="medium" style={{ marginBottom: 15, fontStyle: "italic" }}>
        Medium Italic 500
      </Text>

      <Text size="xs" color="mutedForeground" style={{ marginBottom: 4 }}>
        Work Sans (Heading)
      </Text>
      <Text variant="heading" weight="regular" style={{ marginBottom: 2 }}>
        Regular 400
      </Text>
      <Text variant="heading" weight="medium" style={{ marginBottom: 2 }}>
        Medium 500
      </Text>
      <Text variant="heading" weight="semibold" style={{ marginBottom: 2 }}>
        SemiBold 600
      </Text>
      <Text variant="heading" weight="bold" style={{ marginBottom: 2 }}>
        Bold 700
      </Text>
    </View>
  );
}
