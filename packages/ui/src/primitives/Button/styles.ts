import { StyleSheet } from 'react-native';
import { ButtonProps } from './Button.native';

export const getVariantStyles = (t: any, variant: ButtonProps['variant']) => {
  switch (variant) {
    case 'secondary':
      return {
        backgroundColor: t.colors.secondary,
        textColor: t.colors.secondaryForeground,
        borderColor: 'transparent',
        borderWidth: 0,
      };
    case 'outline':
      return {
        backgroundColor: t.colors.background,
        textColor: t.colors.foreground,
        borderColor: t.colors.border,
        borderWidth: 1,
      };
    case 'ghost':
      return {
        backgroundColor: 'transparent',
        textColor: t.colors.foreground,
        borderColor: 'transparent',
        borderWidth: 0,
      };
    case 'destructive':
      return {
        backgroundColor: t.colors.danger,
        textColor: t.colors.dangerForeground,
        borderColor: 'transparent',
        borderWidth: 0,
      };
    case 'primary':
    default:
      return {
        backgroundColor: t.colors.primary,
        textColor: t.colors.primaryForeground,
        borderColor: 'transparent',
        borderWidth: 0,
      };
  }
};

export const getSizeStyles = (t: any, size: ButtonProps['size']) => {
  switch (size) {
    case 'sm':
      return {
        height: t.sizes.buttonHeightSm || 32, // Fallback if token missing
        paddingHorizontal: t.space[3],
        fontSize: t.fontSizes.xs,
        iconSize: 14,
      };
    case 'lg':
      return {
        height: t.sizes.buttonHeightLg || 48,
        paddingHorizontal: t.space[8],
        fontSize: t.fontSizes.md,
        iconSize: 20,
      };
    case 'icon':
      const iconHeight = t.sizes.buttonHeight || 40;
      return {
        height: iconHeight,
        width: iconHeight,
        paddingHorizontal: 0,
        fontSize: t.fontSizes.sm,
        iconSize: 18,
      };
    case 'default':
    default:
      return {
        height: t.sizes.buttonHeight || 40,
        paddingHorizontal: t.space[4],
        fontSize: t.fontSizes.sm,
        iconSize: 18,
      };
  }
};

export const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    // fontFamily: 'System', // Let theme provider handle font family globally if possible, or pass via t.typography
    textAlign: 'center',
  },
});
