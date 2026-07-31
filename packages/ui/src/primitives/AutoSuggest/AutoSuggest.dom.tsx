"use client";

import * as React from "react";
import * as Popover from "@radix-ui/react-popover";
import { Command as CommandPrimitive } from "cmdk";
import { useAutoSuggest } from "./useAutoSuggest";
import { AutoSuggestProps } from "./types";
import { TextInput } from "../TextInput/TextInput.dom";
import { cn } from "../../utils";
import { Icon } from "../Icon/Icon.dom";

const AutoSuggestInner = <T extends boolean = false>(
  {
    value,
    onChange,
    inputValue,
    onInputChange,
    options,
    isLoading,
    placeholder = "Search...",
    emptyMessage = "No results found.",
    creatable,
    onCreate,
    createLabel = "Create '{query}'",
    clearable,
    multiple,
    virtualized,
    disabled,
    error,
    success,
    renderItem,
    className,
  }: AutoSuggestProps<T>,
  ref: React.ForwardedRef<HTMLInputElement>
) => {
  const {
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
  } = useAutoSuggest({
    value,
    onChange,
    inputValue,
    onInputChange,
    options,
    multiple,
    virtualized,
    creatable,
    onCreate,
  });

  const variant = error ? "error" : success ? "success" : "default";



  const renderCommandItem = (
    option: import("./types").AutoSuggestOption,
    style?: React.CSSProperties
  ) => {
    const isSelected = multiple
      ? ((currentValue as string[]) || []).includes(option.value)
      : currentValue === option.value;

    return (
      <CommandPrimitive.Item
        key={option.value}
        value={option.label}
        disabled={option.disabled}
        onSelect={() => handleSelect(option.value)}
        style={style}
        data-chosen={isSelected ? "" : undefined}
        className={cn(
          "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors",
          "aria-selected:bg-secondary aria-selected:text-secondary-foreground",
          "data-[selected=true]:bg-secondary data-[selected=true]:text-secondary-foreground", // cmdk keyboard focus
          "data-[chosen]:bg-primary/10 data-[chosen]:text-primary data-[chosen]:font-medium", // our chosen selection
          "hover:bg-secondary hover:text-secondary-foreground",
          "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50"
        )}
      >
        {renderItem ? (
          renderItem(option)
        ) : (
          <>
            {option.icon && (
              <Icon
                name={option.icon as any}
                size={16}
                className="mr-2 opacity-50"
              />
            )}
            {option.label}
            {isSelected && (
              <Icon name="Check" size={14} className="ml-auto text-primary" />
            )}
          </>
        )}
      </CommandPrimitive.Item>
    );
  };

  const containerRef = React.useRef<HTMLDivElement>(null);

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <CommandPrimitive
        shouldFilter={virtualized || exactMatchSelected ? false : !isControlledInput}
        className={cn("w-full relative", className)}
        ref={containerRef}
      >
        <Popover.Anchor asChild>
          <TextInput.Root variant={variant} disabled={disabled} className="w-full flex-wrap h-auto min-h-10 py-1">
            {multiple && Array.isArray(currentValue) && currentValue.length > 0 && (
              <div className="flex flex-wrap gap-1 mr-1 items-center">
                {currentValue.map((v) => {
                  const opt = flatOptions.find((o) => o.value === v);
                  return (
                    <span
                      key={v}
                      className="bg-secondary text-secondary-foreground rounded px-1.5 py-0.5 text-xs flex items-center gap-1"
                    >
                      {opt ? opt.label : v}
                      {!disabled && (
                        <div
                          role="button"
                          className="cursor-pointer opacity-70 hover:opacity-100 flex items-center"
                          onPointerDown={(e: React.PointerEvent) => {
                            e.stopPropagation();
                            e.preventDefault();
                            handleRemove(v);
                          }}
                          onClick={(e: React.MouseEvent) => {
                            e.stopPropagation();
                            e.preventDefault();
                          }}
                        >
                          <Icon name="X" size={12} />
                        </div>
                      )}
                    </span>
                  );
                })}
              </div>
            )}

            <CommandPrimitive.Input
              asChild
              value={currentInputValue}
              onValueChange={handleInputChange}
            >
              <TextInput.Input
                ref={ref}
                placeholder={
                  multiple && Array.isArray(currentValue) && currentValue.length > 0
                    ? ""
                    : placeholder
                }
                disabled={disabled}
                onFocus={(e) => {
                  setOpen(true);
                  if (exactMatchSelected) {
                    e.target.select();
                  }
                }}
                onKeyDown={handleKeyDown}
                className="min-w-[60px]" // ensure input doesn't collapse too much in multi-select
              />
            </CommandPrimitive.Input>

            {(isLoading || (clearable && hasValue)) && (
              <TextInput.Slot side="right" className="flex items-center gap-2 pr-1 ml-auto shrink-0">
                {isLoading && (
                  <Icon
                    name="Loader"
                    className="animate-spin text-muted-foreground"
                    size={16}
                  />
                )}
                {clearable && hasValue && !disabled && (
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={handleClear}
                    className="cursor-pointer text-muted-foreground hover:text-foreground transition-colors p-0.5 rounded-sm hover:bg-secondary"
                  >
                    <Icon name="X" size={14} />
                  </div>
                )}
              </TextInput.Slot>
            )}
          </TextInput.Root>
        </Popover.Anchor>

        <Popover.Portal>
          <Popover.Content
            asChild
            sideOffset={4}
            align="start"
            onOpenAutoFocus={(e) => e.preventDefault()}
            onInteractOutside={(e) => {
              if (
                e.target instanceof Node &&
                containerRef.current?.contains(e.target)
              ) {
                e.preventDefault();
              }
            }}
            style={{ width: "var(--radix-popover-trigger-width)" }}
            className="z-50"
          >
            <div
              className={cn(
                "flex w-full flex-col overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
              )}
            >
              <CommandPrimitive.List
                ref={setListElement}
                className="overflow-y-auto overflow-x-hidden p-1 max-h-[300px]"
              >
                {isLoading && flatOptions.length === 0 ? (
                  <CommandPrimitive.Loading className="py-6 text-center text-sm text-muted-foreground">
                    Loading...
                  </CommandPrimitive.Loading>
                ) : virtualized ? (
                  filteredFlatOptions.length === 0 && !showCreate && (
                    <div className="py-6 text-center text-sm text-muted-foreground">
                      {emptyMessage}
                    </div>
                  )
                ) : (
                  !showCreate && (
                    <CommandPrimitive.Empty className="py-6 text-center text-sm">
                      {emptyMessage}
                    </CommandPrimitive.Empty>
                  )
                )}

                {virtualized ? (
                  <div
                    style={{
                      height: `${virtualizer.getTotalSize()}px`,
                      width: "100%",
                      position: "relative",
                    }}
                  >
                    {virtualizer.getVirtualItems().map((virtualItem) => {
                      const option = filteredFlatOptions[virtualItem.index];
                      return renderCommandItem(option, {
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: `${virtualItem.size}px`,
                        transform: `translateY(${virtualItem.start}px)`,
                      });
                    })}
                  </div>
                ) : (
                  options.map((optionOrGroup, index) => {
                    if ("group" in optionOrGroup) {
                      return (
                        <CommandPrimitive.Group
                          key={optionOrGroup.group || index}
                          heading={optionOrGroup.group}
                          className="overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:mt-2 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-disabled-foreground mb-1"
                        >
                          {optionOrGroup.items.map((opt) =>
                            renderCommandItem(opt)
                          )}
                        </CommandPrimitive.Group>
                      );
                    }
                    return renderCommandItem(optionOrGroup as import("./types").AutoSuggestOption);
                  })
                )}

                {showCreate && (
                  <CommandPrimitive.Item
                    value={currentInputValue}
                    onSelect={handleCreate}
                    forceMount
                    className={cn(
                      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
                      "aria-selected:bg-secondary aria-selected:text-secondary-foreground",
                      "data-[selected=true]:bg-secondary data-[selected=true]:text-secondary-foreground",
                      "hover:bg-secondary hover:text-secondary-foreground text-primary font-medium mt-1 border-t border-border pt-2"
                    )}
                  >
                    <Icon name="Plus" size={16} className="mr-2" />
                    {createLabel.replace("{query}", currentInputValue.trim())}
                  </CommandPrimitive.Item>
                )}
              </CommandPrimitive.List>
            </div>
          </Popover.Content>
        </Popover.Portal>
      </CommandPrimitive>
    </Popover.Root>
  );
};

export const AutoSuggest = React.forwardRef(AutoSuggestInner) as <
  T extends boolean = false
>(
  props: AutoSuggestProps<T> & React.RefAttributes<HTMLInputElement>
) => React.ReactElement;

(AutoSuggest as any).displayName = "AutoSuggest";
