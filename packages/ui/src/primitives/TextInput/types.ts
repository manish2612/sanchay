import type { TextInputProps as RNTextInputProps } from 'react-native';

export type TextInputVariant = 'default' | 'error' | 'success';
export type LabelVariant = 'default' | 'in-field' | 'inline' | 'hidden';

export interface TextInputBaseProps {
    variant?: TextInputVariant;
    label?: string;
    labelVariant?: LabelVariant;
    leftSlot?: React.ReactNode;
    rightSlot?: React.ReactNode;
    prefixContent?: React.ReactNode;
    id?: string;
}

// Web Input Props
export interface WebTextInputProps extends React.InputHTMLAttributes<HTMLInputElement>, TextInputBaseProps {
    inputClassName?: string;
}

// Native Input Props
export interface NativeTextInputProps extends RNTextInputProps, TextInputBaseProps {
    className?: string; // Sometimes passed by cross-platform wrappers
    inputStyle?: any;
}
