import * as React from "react";
import { View, Text } from "react-native";
import { AutoSuggestProps } from "./types";
import { TextInput } from "../TextInput/TextInput.native";

const AutoSuggest = React.forwardRef<any, AutoSuggestProps>(
  (
    {
      value,
      onChange,
      inputValue,
      onInputChange,
      options,
      isLoading,
      placeholder = "Search...",
      disabled,
      error,
      success,
      label,
      labelVariant,
      // React Native specific props can be passed here or extracted
    },
    ref
  ) => {
    // For now, React Native stub just renders a normal TextInput.
    // In a future PR, this would implement a BottomSheet or Modal with a FlatList.

    const isControlledInput = inputValue !== undefined;
    const [internalInputValue, setInternalInputValue] = React.useState(inputValue || "");
    const currentInputValue = isControlledInput ? inputValue : internalInputValue;

    const handleTextChange = (text: string) => {
      if (!isControlledInput) setInternalInputValue(text);
      if (onInputChange) onInputChange(text);
    };

    const variant = error ? "error" : success ? "success" : "default";

    return (
      <View style={{ width: "100%" }}>
        <TextInput
          ref={ref}
          variant={variant}
          label={label}
          labelVariant={labelVariant}
          value={currentInputValue}
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

AutoSuggest.displayName = "AutoSuggest";

export { AutoSuggest };
