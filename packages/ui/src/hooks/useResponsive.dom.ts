"use client"

import { useEffect, useState } from 'react';
import { breakpoints, Breakpoint } from '../theme/breakpoints';

type ResponsiveValue<T> = T | Partial<Record<Breakpoint, T>>;

function resolveValue<T>(width: number, values: ResponsiveValue<T>): T {
    if (typeof values !== 'object' || values === null) {
        return values as T;
    }

    const responsiveObject = values as Partial<Record<Breakpoint, T>>;
    const getVal = (bp: Breakpoint) => responsiveObject[bp];

    if (width >= breakpoints.xl && getVal('xl') !== undefined) return getVal('xl') as T;
    if (width >= breakpoints.lg && getVal('lg') !== undefined) return getVal('lg') as T;
    if (width >= breakpoints.md && getVal('md') !== undefined) return getVal('md') as T;
    if (width >= breakpoints.sm && getVal('sm') !== undefined) return getVal('sm') as T;

    return (getVal('base') ?? Object.values(responsiveObject)[0]) as T;
}

export function useResponsiveValue<T>(values: ResponsiveValue<T>): T {
    const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return resolveValue(width, values);
}

export function useResponsiveValues<T extends Record<string, any>>(
    map: { [K in keyof T]: ResponsiveValue<T[K]> }
): T {
    const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    const result: any = {};
    for (const key in map) {
        if (Object.prototype.hasOwnProperty.call(map, key)) {
            result[key] = resolveValue(width, map[key]);
        }
    }
    
    return result as T;
}
