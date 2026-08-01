export interface AutoSuggestOption {
    label: string;
    value: string;
    disabled?: boolean;
    icon?: string; // Assuming icon name if needed
}

export interface AutoSuggestProps<T extends boolean = false> {
    // Value Management (Uncontrolled or Controlled)
    value?: T extends true ? string[] : string;
    onChange?: (value: T extends true ? string[] : string) => void;
    
    // Input Management
    inputValue?: string;
    onInputChange?: (value: string) => void;
    
    // Custom Rendering
    renderItem?: (option: AutoSuggestOption) => React.ReactNode;
    
    // Options
    options: (AutoSuggestOption | { group: string; items: AutoSuggestOption[] })[];
    isLoading?: boolean;

    // Creatable State
    creatable?: boolean;
    onCreate?: (value: string) => void;
    createLabel?: string;
    
    // Advanced Features
    multiple?: T;
    virtualized?: boolean;

    // Aesthetics & UI
    placeholder?: string;
    emptyMessage?: string;
    clearable?: boolean;
    disabled?: boolean;
    error?: boolean; // Maps to variant="error"
    success?: boolean; // Maps to variant="success"
    
    className?: string;
    label?: string;
    labelVariant?: 'default' | 'in-field' | 'inline' | 'hidden';
}
