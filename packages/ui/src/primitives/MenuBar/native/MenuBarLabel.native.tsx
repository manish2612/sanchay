import React from 'react';
import { Text, ViewStyle } from 'react-native';
import { useTheme } from '@prime/theme-provider';

export function MenuBarLabel({
  children,
  style,
  inset,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
  inset?: boolean;
}) {
  const { theme } = useTheme();
  const t = theme as any;
  return (
    <Text
      style={[
        {
          fontSize: 12,
          fontWeight: '600',
          paddingHorizontal: 8,
          paddingVertical: 4,
          marginTop: 4,
          color: t.colors.foreground,
        },
        inset && { paddingLeft: 32 },
        style,
      ]}
    >
      {children}
    </Text>
  );
}
