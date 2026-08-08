import { IconName } from '../../primitives/Icon/types';
import { LabelVariant } from '../../primitives/TextInput/types';

export interface DropdownMenuItem {
  id: string;
  label: string;
  onSelect: () => void;
  icon?: IconName;
  leadingVisual?: React.ReactNode;
  reserveLeadingSpace?: boolean;
  shortcut?: string;
  disabled?: boolean;
}

export interface DropdownMenuProps {
  items: DropdownMenuItem[];
  triggerLabel?: React.ReactNode;
  children?: React.ReactNode; // Can be used as custom trigger
  searchable?: boolean;
  align?: 'start' | 'center' | 'end';
  label?: string;
  labelVariant?: LabelVariant;
}
