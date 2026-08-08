import React, { useContext } from 'react';
import { View, ViewStyle } from 'react-native';
import { useTheme } from '@prime/theme-provider';
import { MenuBarContext, MenuContext } from './contexts.native';
import { getMenuBarStyles } from './styles';

export function MenuBarContent({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
}) {
  const { openMenuId } = useContext(MenuBarContext);
  const menuContext = useContext(MenuContext);
  const { theme } = useTheme();
  const styles = getMenuBarStyles(theme);

  const isOpen = menuContext && openMenuId === menuContext.value;

  if (!isOpen) return null;

  return <View style={[styles.content, style]}>{children}</View>;
}
