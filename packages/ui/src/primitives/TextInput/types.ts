import type { TextInputProps as RNTextInputProps } from 'react-native';

export type TextInputVariant = 'default' | 'error' | 'success';

export interface TextInputRootProps {
    children: React.ReactNode;
    variant?: TextInputVariant;
    className?: string; // For Web overrides
    style?: any; // For Native overrides
}

export interface TextInputSlotProps {
    children: React.ReactNode;
    className?: string;
    style?: any;
    side?: 'left' | 'right';
}

// Web Input Props
export interface WebTextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    // Add any specific web props here if needed
}

// Native Input Props
export interface NativeTextInputProps extends RNTextInputProps {
    // Add any specific native props here if needed
}
