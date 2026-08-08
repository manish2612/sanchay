import React from 'react';
import { TouchableOpacity, Pressable, View } from 'react-native'; // Using TouchableOpacity for feedback or Pressable
import { useDropdownContext } from './DropdownRoot';

const DropdownTrigger = ({ children, asChild, ...props }: any) => {
  const { setOpen } = useDropdownContext();

  const handlePress = () => {
    setOpen(true);
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      onPress: (e: any) => {
        handlePress();
        (children as React.ReactElement<any>).props.onPress?.(e);
      },

      ...props,
    });
  }

  return (
    <Pressable
      onPress={handlePress}
      accessibilityRole="button"
      style={({ pressed }) => ({
        opacity: pressed ? 0.7 : 1,
      })}
      {...props}
    >
      {children}
    </Pressable>
  );
};

export { DropdownTrigger };
