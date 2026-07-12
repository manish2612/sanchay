import React from 'react';
import { 
  Pressable, 
  Text, 
  ViewStyle, 
  TextStyle, 
  ActivityIndicator, 
  PressableProps
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@prime/theme-provider';
import { styles, getVariantStyles, getSizeStyles } from './styles';

export interface ButtonProps extends PressableProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  loading?: boolean;
  iconLeft?: keyof typeof MaterialIcons.glyphMap;
  iconRight?: keyof typeof MaterialIcons.glyphMap;
  children?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({ 
  variant = 'primary',
  size = 'default',
  loading = false,
  iconLeft,
  iconRight,
  children,
  style,
  textStyle,
  disabled,
  ...props 
}: ButtonProps) {
  const { theme } = useTheme();
  const t = theme as any;

  const { backgroundColor, textColor, borderColor, borderWidth } = getVariantStyles(t, variant);
  const { height, paddingHorizontal, fontSize, iconSize, width } = getSizeStyles(t, size);

  // --- Render Content ---
  const content = (
    <>
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={textColor} 
          style={{ marginRight: children ? 8 : 0 }}
        />
      ) : iconLeft ? (
        <MaterialIcons 
            name={iconLeft} 
            size={iconSize} 
            color={textColor} 
            style={{ marginRight: children ? 8 : 0 }}
        />
      ) : null}

      {children && (
        <Text style={[
          styles.text, 
          { color: textColor, fontSize, fontWeight: '500' },
          textStyle
        ]}>
          {children}
        </Text>
      )}

      {!loading && iconRight && (
        <MaterialIcons 
            name={iconRight} 
            size={iconSize} 
            color={textColor} 
            style={{ marginLeft: children ? 8 : 0 }}
        />
      )}
    </>
  );

  return (
    <Pressable
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor,
          borderColor,
          borderWidth,
          height,
          paddingHorizontal,
          borderRadius: t.radii.md,
          opacity: (pressed || disabled) ? 0.7 : 1, // Standard pressed/disabled opacity
        },
        width ? { width } : {}, // For icon button
        style
      ]}
      {...props}
    >
      {content}
    </Pressable>
  );
}

