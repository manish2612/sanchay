import React from 'react';
import { 
    View, 
    TextInput as RNTextInput, 
    StyleSheet, 
    Pressable 
} from 'react-native';
import { useTheme } from '@prime/theme-provider';
import { styles, getRootStyles } from './styles';
import { TextInputRootProps, TextInputSlotProps, NativeTextInputProps } from './types';

// --- Components ---

const Root = ({ children, variant, style }: TextInputRootProps) => {
    const { theme } = useTheme();
    const t = theme as any;
    const variantStyles = getRootStyles(t, variant);

    return (
        <View style={[styles.root, variantStyles, style]}>
            {children}
        </View>
    );
};

const Slot = ({ children, side = 'left', style }: TextInputSlotProps) => {
    return (
        <View style={[
            styles.slot, 
            side === 'left' ? styles.slotLeft : styles.slotRight,
            style
        ]}>
            {children}
        </View>
    );
};

// We forward ref to the underlying RNTextInput
const Input = React.forwardRef<RNTextInput, NativeTextInputProps>(
    ({ style, placeholderTextColor, ...props }, ref) => {
        const { theme } = useTheme();
        const t = theme as any;

        return (
            <RNTextInput
                ref={ref}
                style={[
                    styles.input,
                    { 
                        color: t.colors.foreground,
                        fontSize: t.fontSizes.sm,
                    },
                    style
                ]}
                placeholderTextColor={placeholderTextColor || t.colors.mutedForeground}
                {...props}
            />
        );
    }
);
Input.displayName = "TextInput.Input";

export const TextInput = {
    Root,
    Slot,
    Input,
};
