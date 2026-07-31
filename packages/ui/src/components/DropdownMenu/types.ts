import { IconName } from "../../primitives/Icon/types";

export interface DropdownMenuItem {
  id: string;
  label: string;
  onSelect: () => void;
  icon?: IconName;
  shortcut?: string;
  disabled?: boolean;
}

export interface DropdownMenuProps {
    items: DropdownMenuItem[];
    triggerLabel?: React.ReactNode;
    children?: React.ReactNode; // Can be used as custom trigger
    searchable?: boolean;
    align?: "start" | "center" | "end";
}
