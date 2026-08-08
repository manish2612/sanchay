import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@prime/theme-provider';

export const GridBackground = () => {
  const { theme } = useTheme();

  // Native implementation of grid requires more work/deps.
  // For now returning a simple background view that respects theme.

  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        { zIndex: -1, backgroundColor: (theme as any).colors?.background || '#fff' },
      ]}
    />
  );
};
