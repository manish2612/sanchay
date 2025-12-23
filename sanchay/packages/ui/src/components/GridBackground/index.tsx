import React from 'react';
import { useTheme } from '@sanchay/theme-provider';

export const GridBackground = () => {
    const { density, theme } = useTheme();

    // Map density to grid size
    const sizeMap = {
        compact: 20,
        comfortable: 30,
        spacious: 40,
    };
    
    // Fallback if density is unset
    const size = sizeMap[density as keyof typeof sizeMap] || 30;
    
    // We use a CSS variable for color if possible, or a fallback. 
    // Since theme.colors.border might be a var, we can't use it directly in the data URI easily 
    // unless we use a mask or direct SVG element.
    // Direct SVG element is safer for CSS vars.
    
    // Stroke color from theme (assuming theme.colors.border exists, else gray)
    // We use a common color directly because SVG patterns with CSS vars is tricky across browsers 
    // unless the SVG is in the DOM.
    // So we will render the SVG in the DOM.
    
    return (
        <div 
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                pointerEvents: 'none',
            }}
        >
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="grid-pattern" width={size} height={size} patternUnits="userSpaceOnUse">
                        <path d={`M ${size} 0 L 0 0 0 ${size}`} fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="1"/>
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid-pattern)" style={{ color: 'var(--colors-onSurface, #000)' }} />
            </svg>
        </div>
    );
};
