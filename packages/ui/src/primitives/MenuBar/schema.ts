import { ReactNode } from "react";

// Icon type - can be a string name (for Icon component) or a React component
export type MenuIcon = string | React.ComponentType<{ className?: string }>;

// Base properties common to all menu items
export interface BaseMenuItem {
  disabled?: boolean;
  inset?: boolean;
  icon?: MenuIcon;
}

// 1. Simple Action Item (Clickable or Link)
export interface MenuActionItem extends BaseMenuItem {
  kind: "item";
  label: string;
  shortcut?: string;
  
  // -- Action Strategy --
  // Option A: Callback (Backend ID mapped to client function)
  onSelect?: () => void; 
  actionId?: string; 

  // Option B: Navigation (Routing Strategy)
  href?: string; 
}

// 2. Checkbox Item (Toggle)
export interface MenuCheckboxItem extends BaseMenuItem {
  kind: "checkbox";
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  shortcut?: string;
}

// 3. Radio Group (One of many)
export interface MenuRadioGroup extends BaseMenuItem {
  kind: "radio-group";
  value: string;
  onValueChange: (value: string) => void;
  items: {
    value: string;
    label: string;
  }[];
}

// 4. Submenu (Nested items)
export interface MenuSub extends BaseMenuItem {
  kind: "sub";
  label: string;
  content: MenuItem[]; // Recursive
}

// 5. Structural Items
export interface MenuSeparator {
  kind: "separator";
}
export interface MenuLabel {
  kind: "label";
  label: string;
}

// Union Type
export type MenuItem =
  | MenuActionItem
  | MenuCheckboxItem
  | MenuRadioGroup
  | MenuSub
  | MenuSeparator
  | MenuLabel;

// Top Level Column (e.g., "File", "Edit")
export interface MenuColumn {
  trigger: string;
  content: MenuItem[];
}
