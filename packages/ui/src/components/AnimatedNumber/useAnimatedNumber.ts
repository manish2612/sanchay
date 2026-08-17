import { useMemo, useRef, useState, useEffect, useId } from 'react';

type Direction = 'increase' | 'decrease' | 'initial';

export interface CharDescriptor {
  char: string;
  key: string;
  animationDelay: string;
  isNumeric: boolean;
  isGrouping?: boolean;
}

interface UseAnimatedNumberProps {
  value: number;
  mode: 'slide' | 'fade';
  duration?: number;
  delay?: number;
  locale?: string | string[];
  formatOptions?: Intl.NumberFormatOptions;
}

export function useAnimatedNumber({
  value,
  mode,
  duration = 500,
  delay = 0,
  locale,
  formatOptions,
}: UseAnimatedNumberProps) {
  const previousValueRef = useRef<number | undefined>(undefined);

  const {
    chars,
    skipAnimation,
    formattedValue
  } = useMemo(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const previousValue = previousValueRef.current;
    
    // Determine direction for stagger (L->R or R->L)
    let dir: Direction = 'increase';
    if (previousValue !== undefined && value < previousValue) {
      dir = 'decrease';
    }

    // Format the number using Intl.NumberFormat
    const formatter = new Intl.NumberFormat(locale, formatOptions);
    const formattedStr = formatter.format(value);
    
    // Align by decimal point to ensure consistent relative indices
    const decIdx = formattedStr.indexOf('.');
    const actualDecIdx = decIdx === -1 ? formattedStr.length : decIdx;

    const staggerBudget = duration * 0.5;
    const totalChars = formattedStr.length;
    const delayPerChar = totalChars > 1 ? staggerBudget / (totalChars - 1) : 0;

    const charDescriptors: CharDescriptor[] = [];

    for (let i = 0; i < totalChars; i++) {
      const char = formattedStr[i];
      const isNumeric = /\d/.test(char);
      const relIdx = i - actualDecIdx;
      
      // Determine if a non-numeric character is an internal grouping separator (e.g. commas)
      // vs an external prefix/suffix (e.g. US$). 
      // Internal separators are surrounded by digits on both sides anywhere in the string.
      let isGrouping = false;
      if (!isNumeric) {
        const hasLeftDigit = /\d/.test(formattedStr.substring(0, i));
        const hasRightDigit = /\d/.test(formattedStr.substring(i + 1));
        isGrouping = hasLeftDigit && hasRightDigit;
      }
      
      let delayMs = 0;
      if (dir === 'decrease') {
        delayMs = i * delayPerChar;
      } else {
        delayMs = (totalChars - i - 1) * delayPerChar;
      }
      
      delayMs += delay;

      charDescriptors.push({
        char,
        key: `rel-${relIdx}`,
        animationDelay: delayMs.toString(),
        isNumeric,
        isGrouping,
      });
    }

    // Update ref for next render
    previousValueRef.current = value;

    return {
      chars: charDescriptors,
      formattedValue: formattedStr,
      skipAnimation: prefersReducedMotion,
    };
  }, [value, duration, delay, locale, formatOptions]);

  return { chars, formattedValue, skipAnimation };
}
