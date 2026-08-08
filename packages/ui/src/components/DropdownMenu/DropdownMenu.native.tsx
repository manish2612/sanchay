import React from 'react';
import {
  DropdownRoot,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownSearch,
} from '../../primitives/Dropdown/native';

import { Button } from '../../primitives/Button/Button.native';
import { DropdownMenuProps } from './types';
import { Icon } from '../../primitives/Icon/Icon.native';
import { View, StyleSheet } from 'react-native';

import { Text } from '../../primitives/Text/Text.native';
import { styles } from './styles.native';

const DropdownMenu = ({ items, triggerLabel, children, searchable = false }: DropdownMenuProps) => {
  return (
    <DropdownRoot>
      <DropdownTrigger asChild>
        {children ? (
          children
        ) : (
          <Button variant="outline">
            {triggerLabel || 'Open Menu'}
            {/* Wrapper for icon if needed, or Button supports it */}
          </Button>
        )}
      </DropdownTrigger>

      <DropdownContent>
        {searchable && <DropdownSearch />}

        {items.map((item) => (
          <DropdownItem
            key={item.id}
            onSelect={item.onSelect}
            shortcut={item.shortcut}
            textValue={item.label} // Important for filter
          >
            {/* Native Item layout usually handles Icon differently or we nest it */}
            <View style={styles.itemRow}>
              {item.icon && <Icon name={item.icon} size={20} style={styles.icon} />}
              {/* Text is rendered by DropdownItem children */}
              <Text>{item.label}</Text>
            </View>
          </DropdownItem>
        ))}
      </DropdownContent>
    </DropdownRoot>
  );
};

export { DropdownMenu };
