import React from "react";
import { Text as RNText, TextStyle, StyleSheet } from "react-native";
import { useTheme } from "@sanchay/theme-provider";
import { TextProps, TextColor } from "./types";

export const Text = ({
  variant = "body",
  size = "md",
  weight = "regular",
  align,
  color = "foreground",
  truncate,
  style,
  children,
  ...props
}: TextProps) => {
  const { theme } = useTheme();
  const t = theme as any;

  // Resolve styles from theme
  // Note: The theme adapter returns processed values (numbers for sizes, strings for colors/fonts)
  const fontFamily = t.typography?.fontFamily?.[variant];
  const fontSize = t.typography?.fontSize?.[size];
  const fontWeightValue = t.typography?.fontWeight?.[weight];
  const lineHeight = t.typography?.lineHeight?.normal; // Default to normal line height

  // Resolve color
  // Check if the provided color prop is a key in the theme's colors object
  const textColor = t.colors?.[color as TextColor] ?? color;

  // Construct base style
  const baseStyle: TextStyle = {
    fontFamily,
    fontSize,
    fontWeight: fontWeightValue as TextStyle["fontWeight"], // safe cast as we expect valid weight strings or numbers
    color: textColor,
    textAlign: align,
  };

  // Truncate logic
  const truncateProps = truncate
    ? {
        numberOfLines: 1,
        ellipsizeMode: "tail" as const,
      }
    : {};

  return (
    <RNText style={[baseStyle, style]} {...truncateProps} {...props}>
      {children}
    </RNText>
  );
};
