import * as React from "react";
import { View, Text } from "react-native";
import { AutoSuggestRootProps, AutoSuggestInputProps } from "./types";
import { TextInput } from "../TextInput/TextInput.native";

export const AutoSuggestRoot = React.forwardRef<any, AutoSuggestRootProps>(
  ({ children }, ref) => {
    return <View ref={ref}>{children}</View>;
  }
);
AutoSuggestRoot.displayName = "AutoSuggestRoot";

export const AutoSuggestInput = React.forwardRef<any, AutoSuggestInputProps>(
  (
    {
      placeholder = "Search...",
      disabled,
      error,
      success,
      label,
      labelVariant,
      labelClassName,
    },
    ref
  ) => {
    const [internalInputValue, setInternalInputValue] = React.useState("");

    const handleTextChange = (text: string) => {
      setInternalInputValue(text);
    };

    const variant = error ? "error" : success ? "success" : "default";

    return (
      <View style={{ width: "100%" }}>
        <TextInput
          ref={ref}
          variant={variant}
          label={label}
          labelVariant={labelVariant}
          labelClassName={labelClassName}
          value={internalInputValue}
          onChangeText={handleTextChange}
          placeholder={placeholder}
          editable={!disabled}
        />
        <Text style={{ fontSize: 10, color: "gray", marginTop: 4 }}>
          [AutoSuggest Dropdown Native Stub - Not Implemented]
        </Text>
      </View>
    );
  }
);
AutoSuggestInput.displayName = "AutoSuggestInput";

export const AutoSuggestContent = ({ children }: { children?: React.ReactNode }) => null;
export const AutoSuggestList = ({ children }: { children?: React.ReactNode }) => null;
export const AutoSuggestEmpty = ({ children }: { children?: React.ReactNode }) => null;
export const AutoSuggestGroup = ({ children }: { children?: React.ReactNode; heading?: React.ReactNode }) => null;
export const AutoSuggestItem = ({ children }: { children?: React.ReactNode; value?: string }) => null;
export const AutoSuggestCreateItem = () => null;
export const AutoSuggestVirtualizedList = () => null;

