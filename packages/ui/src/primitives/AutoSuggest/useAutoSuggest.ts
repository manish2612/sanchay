import * as React from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { AutoSuggestProps, AutoSuggestOption } from "./types";

export function useAutoSuggest<T extends boolean = false>({
  value,
  onChange,
  inputValue,
  onInputChange,
  options,
  multiple,
  virtualized,
  creatable,
  onCreate,
}: Pick<
  AutoSuggestProps<T>,
  | "value"
  | "onChange"
  | "inputValue"
  | "onInputChange"
  | "options"
  | "multiple"
  | "virtualized"
  | "creatable"
  | "onCreate"
>) {
  const [open, setOpen] = React.useState(false);

  const [internalValue, setInternalValue] = React.useState<string | string[]>(
    multiple ? [] : ""
  );
  const [internalInputValue, setInternalInputValue] = React.useState(
    inputValue || ""
  );

  const isControlledValue = value !== undefined;
  const isControlledInput = inputValue !== undefined;

  const currentValue = isControlledValue ? value : internalValue;
  const currentInputValue = isControlledInput ? inputValue : internalInputValue;

  // Helper to flatten grouped options
  const flatOptions = React.useMemo(() => {
    return options.reduce<AutoSuggestOption[]>((acc, curr) => {
      if ("group" in curr) {
        return [...acc, ...curr.items];
      }
      return [...acc, curr];
    }, []);
  }, [options]);

  const exactMatchSelected = React.useMemo(() => {
    if (multiple) return false;
    if (!currentValue) return false;
    const selectedOpt = flatOptions.find((o) => o.value === currentValue);
    if (!selectedOpt) return false;
    return selectedOpt.label === currentInputValue;
  }, [multiple, currentValue, flatOptions, currentInputValue]);

  // For virtualization, cmdk cannot filter non-DOM items, so we filter manually.
  const filteredFlatOptions = React.useMemo(() => {
    if (!virtualized) return flatOptions;
    if (!currentInputValue || exactMatchSelected) return flatOptions;
    return flatOptions.filter((opt) =>
      opt.label.toLowerCase().includes(currentInputValue.toLowerCase())
    );
  }, [flatOptions, currentInputValue, virtualized, exactMatchSelected]);

  const [listElement, setListElement] = React.useState<HTMLDivElement | null>(
    null
  );
  const virtualizer = useVirtualizer({
    count: filteredFlatOptions.length,
    getScrollElement: () => listElement,
    estimateSize: () => 32, // estimated height of an item
    overscan: 5,
  });

  const handleSelect = (selectedValue: string) => {
    if (multiple) {
      const currentArray = (currentValue as string[]) || [];
      const isSelected = currentArray.includes(selectedValue);
      let newArray: string[];
      if (isSelected) {
        newArray = currentArray.filter((v) => v !== selectedValue);
      } else {
        newArray = [...currentArray, selectedValue];
      }

      if (!isControlledValue) setInternalValue(newArray);
      if (onChange) onChange(newArray as any);

      // Don't update input value or close on multi-select
      if (!isControlledInput) setInternalInputValue("");
      if (onInputChange) onInputChange("");
    } else {
      if (!isControlledValue) setInternalValue(selectedValue);
      if (onChange) onChange(selectedValue as any);

      const selectedOption = flatOptions.find(
        (opt) => opt.value === selectedValue
      );
      if (selectedOption) {
        if (!isControlledInput) setInternalInputValue(selectedOption.label);
        if (onInputChange) onInputChange(selectedOption.label);
      }

      setOpen(false);
    }
  };

  const handleRemove = (selectedValue: string) => {
    if (!multiple) return;
    const currentArray = (currentValue as string[]) || [];
    const newArray = currentArray.filter((v) => v !== selectedValue);
    if (!isControlledValue) setInternalValue(newArray);
    if (onChange) onChange(newArray as any);
  };

  const handleCreate = () => {
    if (onCreate && currentInputValue.trim()) {
      onCreate(currentInputValue.trim());
      if (multiple) {
        if (!isControlledInput) setInternalInputValue("");
        if (onInputChange) onInputChange("");
      } else {
        setOpen(false);
      }
    }
  };

  const handleInputChange = (val: string) => {
    if (!isControlledInput) setInternalInputValue(val);
    if (onInputChange) onInputChange(val);

    if (!open && val.length > 0) {
      setOpen(true);
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!isControlledValue) setInternalValue(multiple ? [] : "");
    if (onChange) onChange((multiple ? [] : "") as any);
    if (!isControlledInput) setInternalInputValue("");
    if (onInputChange) onInputChange("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && currentInputValue === "" && multiple) {
      e.preventDefault();
      const currentArray = (currentValue as string[]) || [];
      if (currentArray.length > 0) {
        handleRemove(currentArray[currentArray.length - 1]);
      }
    }
  };

  const showCreate =
    creatable &&
    currentInputValue.trim().length > 0 &&
    !flatOptions.some(
      (opt) =>
        opt.label.toLowerCase() === currentInputValue.trim().toLowerCase()
    );

  const hasValue = multiple
    ? (currentValue as string[]).length > 0
    : !!currentValue || currentInputValue.length > 0;

  return {
    open,
    setOpen,
    currentValue,
    currentInputValue,
    flatOptions,
    exactMatchSelected,
    filteredFlatOptions,
    setListElement,
    virtualizer,
    handleSelect,
    handleRemove,
    handleCreate,
    handleInputChange,
    handleClear,
    handleKeyDown,
    showCreate,
    hasValue,
    isControlledInput,
  };
}
