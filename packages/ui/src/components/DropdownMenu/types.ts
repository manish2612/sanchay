export interface DropdownMenuItem {
  id: string;
  label: string;
  onSelect: () => void;
  icon?: string;
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
