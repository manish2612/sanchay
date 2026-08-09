export interface MenuBarProps {
  children?: React.ReactNode;
  style?: any;
}

export interface MenuBarMenuProps {
  children?: React.ReactNode;
}

export interface MenuBarTriggerProps {
  children?: React.ReactNode;
  style?: any;
}

export interface MenuBarContentProps {
  children?: React.ReactNode;
  style?: any;
}

export interface MenuBarItemProps {
  children?: React.ReactNode;
  style?: any;
  onSelect?: () => void;
  disabled?: boolean;
}

export interface MenuBarLabelProps {
  children?: React.ReactNode;
  style?: any;
}

export interface MenuBarSeparatorProps {
  style?: any;
}
