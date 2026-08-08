export const dropdownContentClassName =
  'z-[1000] min-w-[8rem] overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md';

// Combined base styles + interactive states for Item
export const dropdownItemClassName =
  'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-secondary focus:text-secondary-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[highlighted]:bg-secondary data-[highlighted]:text-secondary-foreground data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground';

export const dropdownItemContentClassName = 'flex items-center gap-2';

export const dropdownSearchContainerClassName = 'flex w-full items-center border-b border-border';

export const dropdownSearchClassName =
  'flex flex-1 items-center rounded-none border-none bg-transparent px-2 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50';

export const dropdownLabelClassName = 'px-2 py-1.5 text-xs font-semibold text-muted-foreground';

export const dropdownSeparatorClassName = '-mx-1 my-1 h-px bg-border';

export const dropdownSubTriggerClassName =
  'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-secondary focus:text-secondary-foreground data-[state=open]:bg-secondary data-[state=open]:text-secondary-foreground';

export const dropdownSubContentClassName =
  'z-[1000] min-w-[8rem] overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2';
