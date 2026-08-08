import React from 'react';
import { Switch as RNSwitch, ViewStyle, Platform } from 'react-native';
import { useTheme } from '@prime/theme-provider';

export interface SwitchProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'sm' | 'default' | 'lg';
  style?: ViewStyle;
}

export function Switch({
  checked = false,
  onCheckedChange,
  disabled = false,
  size = 'default',
  style,
}: SwitchProps) {
  const { theme } = useTheme();
  const t = theme as any;

  // React Native's core Switch has a fixed native size.
  // We can scale it proportionally using the density space tokens.
  const baseUnit = parseFloat(t.space['5']) || 20;

  // Adjust scale factor depending on size variant and density
  let scaleFactor = baseUnit / 20; // 20 is the comfortable default
  if (size === 'sm') scaleFactor = (parseFloat(t.space['4']) || 16) / 20;
  if (size === 'lg') scaleFactor = (parseFloat(t.space['6']) || 24) / 20;

  // On Android, scaling the Switch can cause layout bounding box issues, but standard transform works
  return (
    <RNSwitch
      value={checked}
      onValueChange={onCheckedChange}
      disabled={disabled}
      trackColor={{ false: t.colors.input, true: t.colors.primary }}
      thumbColor={t.colors.background}
      ios_backgroundColor={t.colors.input}
      style={[
        Platform.OS === 'ios'
          ? { transform: [{ scale: scaleFactor }] }
          : { transform: [{ scale: scaleFactor }] },
        style,
      ]}
    />
  );
}
