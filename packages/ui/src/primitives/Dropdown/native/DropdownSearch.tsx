import React from 'react';
import { TextInput, View } from 'react-native';
import { useDropdownContext } from './DropdownRoot';
import { styles, getDropdownThemeStyles } from './styles';
import { useTheme } from '@prime/theme-provider';
import { Icon } from '../../Icon/Icon.native';

const DropdownSearch = ({ ...props }) => {
  const { searchQuery, setSearchQuery } = useDropdownContext();
  const { theme } = useTheme();

  return (
    <View style={[styles.searchContainer, getDropdownThemeStyles(theme).searchContainer]}>
      <Icon name="Search" size={20} color={theme.colors.mutedForeground} />
      <TextInput
        style={[
          styles.searchInput,
          getDropdownThemeStyles(theme).searchInput,
          { borderBottomWidth: 0, flex: 1 },
        ]}
        placeholder="Search..."
        placeholderTextColor={theme.colors.mutedForeground}
        value={searchQuery}
        onChangeText={setSearchQuery}
        {...props}
      />
    </View>
  );
};

export { DropdownSearch };
