import React from 'react';
import * as icons from 'lucide-react-native';
import { IconProps, IconName } from './types';

export function Icon({ name, size = 24, color, style }: IconProps) {
  const LucideIcon = icons[name as IconName] as React.ElementType;

  if (!LucideIcon) {
    return null;
  }

  return <LucideIcon size={size} color={color} style={style} />;
}
