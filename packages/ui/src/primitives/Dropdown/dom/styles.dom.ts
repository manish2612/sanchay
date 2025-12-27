import { cva } from "class-variance-authority";
import { densityTextClasses } from "../../../utils/density";

export const dropdownContentClassName =
  "z-[1000] min-w-[8rem] overflow-hidden rounded-md border border-border bg-background p-1 text-popover-foreground shadow-md";

// Combined base styles + interactive states for Item
export const dropdownItemStyle = cva(
  "relative flex cursor-default select-none items-center rounded-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[highlighted]:bg-secondary data-[highlighted]:text-secondary-foreground",
  {
    variants: {
      density: {
        comfortable: `${densityTextClasses.comfortable} px-3 py-2.5`,
        default: `${densityTextClasses.default} px-2 py-1.5`,
        compact: `${densityTextClasses.compact} px-2 py-1`,
      },
    },
    defaultVariants: {
      density: "default",
    },
  }
);

export const dropdownItemContentClassName = "flex items-center gap-2";

export const dropdownSearchContainerClassName =
  "flex w-full items-center border-b border-border";

export const dropdownSearchStyle = cva(
  "flex flex-1 items-center rounded-none border-none bg-transparent py-0 focus-within:bg-secondary focus-within:text-secondary-foreground outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      density: {
        comfortable: `${densityTextClasses.comfortable} h-10`,
        default: `${densityTextClasses.default} h-9`,
        compact: `${densityTextClasses.compact} h-8`,
      },
    },
    defaultVariants: {
      density: "default",
    },
  }
);

export const dropdownLabelStyle = cva(
  "font-semibold text-muted-foreground",
  {
    variants: {
      density: {
        comfortable: "px-3 py-2.5 text-sm", // slightly smaller than item text usually
        default: "px-2 py-1.5 text-xs",
        compact: "px-2 py-1 text-[10px]", 
      },
    },
    defaultVariants: {
      density: "default",
    },
  }
);

export const dropdownSeparatorStyle = cva(
  "-mx-1 h-px bg-border",
  {
    variants: {
      density: {
        comfortable: "my-1.5",
        default: "my-1",
        compact: "my-0.5",
      },
    },
    defaultVariants: {
      density: "default",
    },
  }
);

export const dropdownSubTriggerStyle = cva(
  "flex cursor-default select-none items-center rounded-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
  {
    variants: {
      density: {
        comfortable: `${densityTextClasses.comfortable} px-3 py-2.5`,
        default: `${densityTextClasses.default} px-2 py-1.5`,
        compact: `${densityTextClasses.compact} px-2 py-1`,
      },
    },
    defaultVariants: {
      density: "default",
    },
  }
);

export const dropdownSubContentClassName =
  "z-[1000] min-w-[8rem] overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2";
