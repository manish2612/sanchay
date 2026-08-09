import React from 'react';
import { View, TextInput as RNTextInput, Text } from 'react-native';
import { useTheme } from '@prime/theme-provider';
import { styles, getRootStyles } from './styles';
import { NativeTextInputProps } from './types';
import { useTextInput } from './useTextInput';

export const TextInput = React.forwardRef<RNTextInput, NativeTextInputProps>(
  (
    {
      style,
      inputStyle,
      className,
      variant = 'default',
      label,
      labelVariant = 'default',
      leftSlot,
      rightSlot,
      id: idProp,
      onFocus: onFocusProp,
      onBlur: onBlurProp,
      placeholderTextColor,
      ...props
    },
    ref,
  ) => {
    const { theme } = useTheme();
    const t = theme as any;

    const { id, isFocused, onFocus, onBlur } = useTextInput(idProp, onFocusProp, onBlurProp);

    const variantStyles = getRootStyles(t, variant, isFocused);

    const labelColor = t.colors.foreground;
    const inFieldLabelColor = t.colors.mutedForeground;

    const renderInput = (isInField: boolean = false) => (
      <RNTextInput
        ref={ref}
        onFocus={onFocus}
        onBlur={onBlur}
        style={[
          styles.input,
          isInField && styles.inputInField,
          {
            color: t.colors.foreground,
            fontSize: t.fontSizes.sm,
          },
          inputStyle,
        ]}
        placeholderTextColor={placeholderTextColor || t.colors.mutedForeground}
        {...props}
      />
    );

    if (labelVariant === 'in-field') {
      return (
        <View
          style={[styles.root, styles.rootInField, variantStyles, className ? style || {} : {}]}
        >
          {leftSlot && <View style={styles.slotLeft}>{leftSlot}</View>}
          <View style={styles.inputWrapper}>
            {label && (
              <Text style={[styles.labelInField, { color: inFieldLabelColor }]}>{label}</Text>
            )}
            {renderInput(true)}
          </View>
          {rightSlot && <View style={styles.slotRight}>{rightSlot}</View>}
        </View>
      );
    }

    const renderWrapper = () => (
      <View style={[styles.root, variantStyles]}>
        {leftSlot && <View style={styles.slotLeft}>{leftSlot}</View>}
        {renderInput(false)}
        {rightSlot && <View style={styles.slotRight}>{rightSlot}</View>}
      </View>
    );

    if (labelVariant === 'inline') {
      return (
        <View style={[styles.inlineContainer, className ? style || {} : {}]}>
          {label && (
            <Text style={[styles.labelInline, { color: labelColor, fontSize: t.fontSizes.sm }]}>
              {label}
            </Text>
          )}
          <View style={{ flex: 1 }}>{renderWrapper()}</View>
        </View>
      );
    }

    if (labelVariant === 'hidden') {
      return (
        <View style={[styles.defaultContainer, className ? style || {} : {}]}>
          {/* sr-only not fully supported natively in the same way, we just don't render it visually but could use accessibilityLabel */}
          {renderWrapper()}
        </View>
      );
    }

    // Default
    return (
      <View style={[styles.defaultContainer, className ? style || {} : {}]}>
        {label && (
          <Text style={[styles.labelDefault, { color: labelColor, fontSize: t.fontSizes.sm }]}>
            {label}
          </Text>
        )}
        {renderWrapper()}
      </View>
    );
  },
);

TextInput.displayName = 'TextInput';
