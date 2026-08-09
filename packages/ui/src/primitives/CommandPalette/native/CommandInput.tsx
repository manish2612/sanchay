import React from 'react';
import { View, TextInput as RNTextInput } from 'react-native';
import { CommandInputProps } from '../types';
import { useCommandContext } from './CommandPalette';
import { styles } from '../styles';
import { Icon } from '../../../primitives/Icon/Icon.native';
import { useTheme } from '@prime/theme-provider';

export const CommandInput = ({ placeholder, ...props }: CommandInputProps) => {
  const { search, setSearch } = useCommandContext();
  const { theme } = useTheme() as any;

  return (
    <View style={[styles.inputContainer, { borderBottomColor: theme.colors.border }]}>
      <Icon name="Search" size={20} color={theme.colors.mutedForeground} />
      <RNTextInput
        style={[styles.input, { color: theme.colors.foreground }]}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.mutedForeground}
        value={search}
        onChangeText={setSearch}
        autoCapitalize="none"
        {...props}
      />
    </View>
  );
};
