'use client';

import { useState, useId, useCallback } from 'react';

export function useTextInput(
  idProp?: string,
  onFocusProp?: (...args: any[]) => void,
  onBlurProp?: (...args: any[]) => void,
) {
  const generatedId = useId();
  const id = idProp || generatedId;
  const [isFocused, setIsFocused] = useState(false);

  const onFocus = useCallback(
    (...args: any[]) => {
      setIsFocused(true);
      if (onFocusProp) {
        onFocusProp(...args);
      }
    },
    [onFocusProp],
  );

  const onBlur = useCallback(
    (...args: any[]) => {
      setIsFocused(false);
      if (onBlurProp) {
        onBlurProp(...args);
      }
    },
    [onBlurProp],
  );

  return {
    id,
    isFocused,
    onFocus,
    onBlur,
  };
}
