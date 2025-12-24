import React from 'react';
import { useTheme } from '@sanchay/theme-provider';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface GridBackgroundProps {
    className?: string;
}

export const GridBackground = ({ className }: GridBackgroundProps) => {
    const { density } = useTheme();

    // Map density to grid size
    const sizeMap = {
        compact: 20,
        comfortable: 30,
        spacious: 40,
    };
    
    // Fallback if density is unset
    const size = sizeMap[density as keyof typeof sizeMap] || 30;
    
    return (
        <div 
            className={twMerge(
                clsx(
                    "fixed top-0 left-0 w-full h-full pointer-events-none -z-10", 
                    className
                )
            )}
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
