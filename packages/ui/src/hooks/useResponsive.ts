import { useWindowDimensions } from 'react-native';
import { breakpoints, Breakpoint } from '../theme/breakpoints';

type ResponsiveValue<T> = T | Partial<Record<Breakpoint, T>>;

/**
 * Pure helper to resolve a value based on width.
 * Useful for reusing logic without hook overhead.
 */
function resolveValue<T>(width: number, values: ResponsiveValue<T>): T {
    // If simple value provided, return it
    if (typeof values !== 'object' || values === null) {
        return values as T;
    }

    const responsiveObject = values as Partial<Record<Breakpoint, T>>;
    const getVal = (bp: Breakpoint) => responsiveObject[bp];

    // Explicit check order from largest to smallest that is <= current width
    if (width >= breakpoints.xl && getVal('xl') !== undefined) return getVal('xl') as T;
    if (width >= breakpoints.lg && getVal('lg') !== undefined) return getVal('lg') as T;
    if (width >= breakpoints.md && getVal('md') !== undefined) return getVal('md') as T;
    if (width >= breakpoints.sm && getVal('sm') !== undefined) return getVal('sm') as T;

    return (getVal('base') ?? Object.values(responsiveObject)[0]) as T;
}

/**
 * Single value hook
 */
export function useResponsiveValue<T>(values: ResponsiveValue<T>): T {
    const { width } = useWindowDimensions();
    return resolveValue(width, values);
}

/**
 * Batched hook for multiple values.
 * improves DX and ensures a single useWindowDimensions call.
 */
export function useResponsiveValues<T extends Record<string, any>>(
    map: { [K in keyof T]: ResponsiveValue<T[K]> }
): T {
    const { width } = useWindowDimensions();
    
    // We cast to any here to construct the result accumulator
    const result: any = {};
    
    for (const key in map) {
        if (Object.prototype.hasOwnProperty.call(map, key)) {
            result[key] = resolveValue(width, map[key]);
        }
    }
    
    return result as T;
}
