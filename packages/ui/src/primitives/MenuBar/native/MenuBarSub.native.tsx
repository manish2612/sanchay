import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@prime/theme-provider';
import { MaterialIcons } from '@expo/vector-icons';
import { getMenuBarStyles } from './styles';

export function MenuBarSub({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function MenuBarSubTrigger({ children, inset }: any) {
  const { theme } = useTheme();
  const t = theme as any;
  const styles = getMenuBarStyles(theme);
  return (
    <View style={[styles.item, inset && { paddingLeft: 32 }]}>
      <Text style={[styles.itemText, { color: t.colors.foreground, flex: 1 }]}>{children}</Text>
      <MaterialIcons name="chevron-right" size={14} color={t.colors.foreground} />
    </View>
  );
}

export function MenuBarSubContent({ children }: { children: React.ReactNode }) {
  return null;
}
