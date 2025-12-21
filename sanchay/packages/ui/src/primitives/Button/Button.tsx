import React from 'react';

export interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  style?: React.CSSProperties; 
}

export function Button({ onClick, children, style }: ButtonProps) {
  return (
    <button 
      onClick={onClick} 
      style={{
        padding: '10px 20px',
        backgroundColor: '#0070f3',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        cursor: 'pointer',
        ...style 
      }}
    >
      {children}
    </button>
  );
}
