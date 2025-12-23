import React from 'react';

export interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  style?: React.CSSProperties; 
}

import { useTheme } from '@sanchay/theme-provider';

export function Button({ onClick, children, style }: ButtonProps) {
  const { theme } = useTheme();
  
  return (
    <button 
      onClick={onClick} 
      style={{
        padding: `${theme.spacing[2]} ${theme.spacing[4]}`,
        backgroundColor: theme.colors.primary || '#0070f3',
        color: 'white',
        border: 'none',
        borderRadius: theme.radii.sm || '4px',
        fontSize: theme.typography.fontSize.md,
        height: theme.sizes.buttonHeight,
        cursor: 'pointer',
        ...style 
      }}
    >
      {children}
    </button>
  );
}
