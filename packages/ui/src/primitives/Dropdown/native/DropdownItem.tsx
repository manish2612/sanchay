import React from 'react';
import { Pressable, View } from 'react-native';
import { Text } from '../../Text/Text.native';
import { useDropdownContext } from './DropdownRoot';
import { getDropdownThemeStyles, styles } from './styles';
import { useTheme } from '@prime/theme-provider';

const DropdownItem = ({ children, onSelect, shortcut, style, textValue }: any) => {
  const { setOpen, searchQuery } = useDropdownContext();
  const { theme } = useTheme();

  // Filter logic
  const textContent = textValue || (typeof children === 'string' ? children : '');
  if (
    searchQuery &&
    textContent &&
    !textContent.toLowerCase().includes(searchQuery.toLowerCase())
  ) {
    return null;
  }

  const handlePress = () => {
    onSelect?.();
    setOpen(false); // Close on select
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.item,
        style,
        {
          backgroundColor: pressed
            ? getDropdownThemeStyles(theme).pressedItem.backgroundColor
            : 'transparent',
        },
      ]}
    >
      {/* If children is string, wrap in Text. If element, render as is. */}
      {typeof children === 'string' ? (
        <Text style={[styles.itemText, getDropdownThemeStyles(theme).itemText]}>{children}</Text>
      ) : (
        children
      )}

      {shortcut && (
        <Text style={[styles.shortcut, { color: theme.colors.mutedForeground }]}>{shortcut}</Text>
      )}
    </Pressable>
  );
};

export { DropdownItem };
