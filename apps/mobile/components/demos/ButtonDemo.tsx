import React from 'react';
import { View } from 'react-native';
import { Button, Text, useResponsiveValues } from '@prime/ui';

export function ButtonDemo() {
  const { width } = useResponsiveValues({
    width: { base: '100%', xl: '48%' } as const,
  });

  return (
    <View style={{ width, margin: 0 }}>
      <Text size="sm" color="mutedForeground" style={{ marginBottom: 8 }}>
        Buttons
      </Text>
      <View style={{ gap: 8 }}>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button size="sm">Small</Button>
        <Button size="lg">Large</Button>
        <Button loading>Loading</Button>
      </View>
    </View>
  );
}
