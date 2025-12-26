
export interface ShortcutItem {
  id: string;
  label: string;
  keys: string[]; // e.g. ['⌘', 'K']
}

export interface ShortcutCategory {
  title: string;
  items: ShortcutItem[];
}

export interface ShortcutCheatSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: ShortcutCategory[];
}
