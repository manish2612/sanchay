import React from 'react';
import { View } from 'react-native';
import { Text } from '@prime/ui';
import { useTheme } from '@prime/theme-provider';

export function StatsDemo() {
  const { theme } = useTheme();
  const t = theme as any;

  return (
    <View
      style={{
        padding: t.space[4],
        backgroundColor: t.colors.background,
        borderRadius: 8,
      }}
    >
      <Text weight="bold" style={{ marginBottom: 5 }}>
        Resolved Tokens:
      </Text>
      <Text>Button Height: {t.sizes.buttonHeight}px</Text>
      <Text>Base Spacing (4): {t.space[4]}px</Text>
    </View>
  );
}
