import React, { useContext } from 'react';
import { Pressable, Text, ViewStyle } from 'react-native';
import { useTheme } from '@prime/theme-provider';
import { MenuBarContext, MenuContext } from './contexts.native';
import { getMenuBarStyles } from './styles';

export function MenuBarTrigger({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
}) {
  const { openMenuId, setOpenMenuId } = useContext(MenuBarContext);
  const menuContext = useContext(MenuContext);
  const { theme } = useTheme();
  const styles = getMenuBarStyles(theme);

  const isOpen = menuContext && openMenuId === menuContext.value;

  const handlePress = () => {
    if (menuContext) {
      setOpenMenuId(isOpen ? null : menuContext.value);
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      style={[styles.trigger, isOpen && styles.triggerActive, style]}
    >
      {typeof children === 'string' ? <Text style={styles.triggerText}>{children}</Text> : children}
    </Pressable>
  );
}
