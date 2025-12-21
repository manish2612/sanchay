import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle } from 'react-native';

export interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  style?: ViewStyle;
}

export function Button({ onClick, children, style }: ButtonProps) {
  return (
    <Pressable 
      onPress={onClick}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed,
        style
      ]}
    >
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#0070f3',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  }
});
