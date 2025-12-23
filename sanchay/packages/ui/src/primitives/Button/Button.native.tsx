import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle } from 'react-native';

export interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  style?: ViewStyle;
}

import { useTheme } from '@sanchay/theme-provider';

export function Button({ onClick, children, style }: ButtonProps) {
  const { theme } = useTheme();
  // Cast theme spacing/sizes to number for RN styles as the adapter converts them at runtime
  const t = theme as any;
  
  return (
    <Pressable 
      onPress={onClick}
      style={({ pressed }) => [
        styles.button,
        {
            paddingVertical: t.spacing[2],
            paddingHorizontal: t.spacing[4],
            backgroundColor: t.colors.primary || '#0070f3',
            borderRadius: t.radii.sm || 4,
            height: t.sizes.buttonHeight,
        },
        pressed && styles.pressed,
        style
      ]}
    >
      <Text style={[styles.text, { fontSize: t.typography.fontSize.md }]}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
  text: {
    color: 'white',
    fontWeight: '600',
  }
});
