"use client";

import * as React from "react";
import * as Popover from "@radix-ui/react-popover";
import { Command as CommandPrimitive } from "cmdk";
import { useAutoSuggest, AutoSuggestContextValue } from "./useAutoSuggest";
import {
  AutoSuggestRootProps,
  AutoSuggestInputProps,
  AutoSuggestContentProps,
  AutoSuggestListProps,
  AutoSuggestEmptyProps,
  AutoSuggestGroupProps,
  AutoSuggestItemProps,
  AutoSuggestCreateItemProps,
  AutoSuggestVirtualizedListProps,
} from "./types";
import { TextInput } from "../TextInput/TextInput.dom";
import { cn } from "../../utils";
import { Icon } from "../Icon/Icon.dom";

type ContextType = AutoSuggestContextValue & {
  containerRef: React.RefObject<HTMLDivElement | null>;
};

const AutoSuggestContext = React.createContext<ContextType | null>(null);

function useAutoSuggestContext() {
  const context = React.useContext(AutoSuggestContext);
  if (!context) {
    throw new Error(
      "AutoSuggest components must be used within an <AutoSuggestRoot>"
    );
  }
  return context;
}

// ---------------------------
// Root
// ---------------------------
export function AutoSuggestRoot<T extends boolean = false>({
  children,
  className,
  ...hookProps
}: AutoSuggestRootProps<T>) {
  const contextValue = useAutoSuggest(hookProps);
  const containerRef = React.useRef<HTMLDivElement>(null);

  return (
    <AutoSuggestContext.Provider value={{ ...contextValue, containerRef }}>
      <Popover.Root
        open={contextValue.open}
        onOpenChange={contextValue.setOpen}
      >
        <CommandPrimitive
          shouldFilter={
            contextValue.virtualized || contextValue.exactMatchSelected
              ? false
              : !contextValue.isControlledInput
          }
          className={cn("w-full relative", className)}
          ref={containerRef}
        >
          {children}
        </CommandPrimitive>
      </Popover.Root>
    </AutoSuggestContext.Provider>
  );
}

// ---------------------------
// Input
// ---------------------------
export const AutoSuggestInput = React.forwardRef<
  HTMLInputElement,
  AutoSuggestInputProps
>(
  (
    {
      className,
      placeholder,
      disabled,
      label,
      labelVariant,
      labelClassName,
      error,
      success,
      clearable,
      isLoading,
      ...props
    },
    ref
  ) => {
    const {
      setOpen,
      currentValue,
      currentInputValue,
      flatOptions,
      exactMatchSelected,
      multiple,
      hasValue,
      handleRemove,
      handleClear,
      handleInputChange,
      handleKeyDown,
      open,
    } = useAutoSuggestContext();

    const variant = error ? "error" : success ? "success" : "default";

    return (
      <Popover.Anchor asChild>
        <CommandPrimitive.Input
          asChild
          value={currentInputValue}
          onValueChange={handleInputChange}
        >
          <TextInput
            ref={ref}
            variant={variant}
            disabled={disabled}
            label={label}
            labelVariant={labelVariant}
            labelClassName={labelClassName}
            className={cn(
              "w-full h-auto",
              labelVariant !== "in-field" && "py-1 min-h-10",
              className
            )}
            inputClassName="min-w-0"
            placeholder={
              multiple && Array.isArray(currentValue) && currentValue.length > 0
                ? ""
                : placeholder
            }
            onFocus={(e) => {
              setOpen(true);
              if (exactMatchSelected) {
                e.target.select();
              }
            }}
            onKeyDown={handleKeyDown}
            data-expanded={open ? "true" : "false"}
            prefixContent={
              multiple &&
              Array.isArray(currentValue) &&
              currentValue.length > 0 ? (
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
              ) : null
            }
            rightSlot={
              isLoading || (clearable && hasValue) ? (
                <div className="flex items-center gap-2 pr-1 ml-auto shrink-0">
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
                </div>
              ) : null
            }
            {...props}
          />
        </CommandPrimitive.Input>
      </Popover.Anchor>
    );
  }
);
AutoSuggestInput.displayName = "AutoSuggestInput";

// ---------------------------
// Content
// ---------------------------
export const AutoSuggestContent = React.forwardRef<
  HTMLDivElement,
  AutoSuggestContentProps
>(({ className, children }, ref) => {
  const { containerRef } = useAutoSuggestContext();

  return (
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
        className={cn("z-50", className)}
        ref={ref}
      >
        <div
          className={cn(
            "flex w-full flex-col overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
          )}
        >
          {children}
        </div>
      </Popover.Content>
    </Popover.Portal>
  );
});
AutoSuggestContent.displayName = "AutoSuggestContent";

// ---------------------------
// List
// ---------------------------
export const AutoSuggestList = React.forwardRef<
  HTMLDivElement,
  AutoSuggestListProps
>(({ className, children }, ref) => {
  const { setListElement } = useAutoSuggestContext();

  return (
    <CommandPrimitive.List
      ref={(node) => {
        setListElement(node);
        if (typeof ref === "function") ref(node);
        else if (ref && "current" in ref)
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }}
      className={cn(
        "overflow-y-auto overflow-x-hidden p-1 max-h-[300px]",
        className
      )}
    >
      {children}
    </CommandPrimitive.List>
  );
});
AutoSuggestList.displayName = "AutoSuggestList";

// ---------------------------
// Empty
// ---------------------------
export const AutoSuggestEmpty = React.forwardRef<
  HTMLDivElement,
  AutoSuggestEmptyProps
>(({ className, children }, ref) => {
  const { showCreate } = useAutoSuggestContext();
  if (showCreate) return null;

  return (
    <CommandPrimitive.Empty
      ref={ref}
      className={cn("py-6 text-center text-sm", className)}
    >
      {children}
    </CommandPrimitive.Empty>
  );
});
AutoSuggestEmpty.displayName = "AutoSuggestEmpty";

// ---------------------------
// Group
// ---------------------------
export const AutoSuggestGroup = React.forwardRef<
  HTMLDivElement,
  AutoSuggestGroupProps
>(({ className, heading, children }, ref) => {
  return (
    <CommandPrimitive.Group
      ref={ref}
      heading={heading}
      className={cn(
        "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:mt-2 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-disabled-foreground mb-1",
        className
      )}
    >
      {children}
    </CommandPrimitive.Group>
  );
});
AutoSuggestGroup.displayName = "AutoSuggestGroup";

// ---------------------------
// Item
// ---------------------------
export const AutoSuggestItem = React.forwardRef<
  HTMLDivElement,
  AutoSuggestItemProps
>(({ className, value, disabled, onSelect, children }, ref) => {
  const { currentValue, multiple, handleSelect } = useAutoSuggestContext();

  const isSelected = multiple
    ? (Array.isArray(currentValue) ? currentValue : []).includes(value)
    : currentValue === value;

  return (
    <CommandPrimitive.Item
      ref={ref}
      value={value}
      disabled={disabled}
      onSelect={() => {
        handleSelect(value);
        if (onSelect) onSelect(value);
      }}
      data-chosen={isSelected ? "" : undefined}
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors",
        "aria-selected:bg-secondary aria-selected:text-secondary-foreground",
        "data-[selected=true]:bg-secondary data-[selected=true]:text-secondary-foreground",
        "data-[chosen]:bg-primary/10 data-[chosen]:text-primary data-[chosen]:font-medium",
        "hover:bg-secondary hover:text-secondary-foreground",
        "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
        className
      )}
    >
      {children}
    </CommandPrimitive.Item>
  );
});
AutoSuggestItem.displayName = "AutoSuggestItem";

// ---------------------------
// Create Item
// ---------------------------
export const AutoSuggestCreateItem = React.forwardRef<
  HTMLDivElement,
  AutoSuggestCreateItemProps
>(({ className, createLabel = "Create '{query}'" }, ref) => {
  const { showCreate, currentInputValue, handleCreate } =
    useAutoSuggestContext();

  if (!showCreate) return null;

  return (
    <CommandPrimitive.Item
      ref={ref}
      value={currentInputValue}
      onSelect={handleCreate}
      forceMount
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
        "aria-selected:bg-secondary aria-selected:text-secondary-foreground",
        "data-[selected=true]:bg-secondary data-[selected=true]:text-secondary-foreground",
        "hover:bg-secondary hover:text-secondary-foreground text-primary font-medium mt-1 border-t border-border pt-2",
        className
      )}
    >
      <Icon name="Plus" size={16} className="mr-2" />
      {createLabel.replace("{query}", currentInputValue.trim())}
    </CommandPrimitive.Item>
  );
});
AutoSuggestCreateItem.displayName = "AutoSuggestCreateItem";

// ---------------------------
// Virtualized List
// ---------------------------
export const AutoSuggestVirtualizedList = React.forwardRef<
  HTMLDivElement,
  AutoSuggestVirtualizedListProps
>(({ className, emptyMessage = "No results found.", renderItem }, ref) => {
  const { virtualizer, filteredFlatOptions, setListElement, showCreate } =
    useAutoSuggestContext();

  return (
    <CommandPrimitive.List
      ref={(node) => {
        setListElement(node);
        if (typeof ref === "function") ref(node);
        else if (ref && "current" in ref)
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }}
      className={cn(
        "overflow-y-auto overflow-x-hidden p-1 max-h-[300px]",
        className
      )}
    >
      {filteredFlatOptions.length === 0 && !showCreate ? (
        <div className="py-6 text-center text-sm text-muted-foreground">
          {emptyMessage}
        </div>
      ) : (
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            width: "100%",
            position: "relative",
          }}
        >
          {virtualizer.getVirtualItems().map((virtualItem) => {
            const option = filteredFlatOptions[virtualItem.index];
            return (
              <div
                key={option.value}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: `${virtualItem.size}px`,
                  transform: `translateY(${virtualItem.start}px)`,
                }}
              >
                {renderItem(option)}
              </div>
            );
          })}
        </div>
      )}
    </CommandPrimitive.List>
  );
});
AutoSuggestVirtualizedList.displayName = "AutoSuggestVirtualizedList";
