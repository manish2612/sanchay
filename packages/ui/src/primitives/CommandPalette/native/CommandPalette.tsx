import React, { createContext, useContext, useState, useMemo } from 'react';
import { View } from 'react-native';
import { CommandPaletteProps } from '../types';
import { styles } from '../styles';

interface CommandContextType {
  search: string;
  setSearch: (value: string) => void;
  shouldFilter: boolean;
  filter: (value: string, search: string) => number;
}

const CommandContext = createContext<CommandContextType | null>(null);

export const useCommandContext = () => {
  const context = useContext(CommandContext);
  if (!context) {
    throw new Error('useCommandContext must be used within a CommandPalette');
  }
  return context;
};

// Default filter: simple lowercase contains
const defaultFilter = (value: string, search: string) => {
  if (value.toLowerCase().includes(search.toLowerCase())) return 1;
  return 0;
};

export const CommandPalette = ({
  children,
  shouldFilter = true,
  filter = defaultFilter,
  ...props
}: CommandPaletteProps) => {
  const [search, setSearch] = useState('');

  const value = useMemo(
    () => ({
      search,
      setSearch,
      shouldFilter,
      filter,
    }),
    [search, shouldFilter, filter],
  );

  return (
    <CommandContext.Provider value={value}>
      <View style={styles.container}>{children}</View>
    </CommandContext.Provider>
  );
};
