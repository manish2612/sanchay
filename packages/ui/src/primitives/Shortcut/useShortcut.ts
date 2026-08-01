'use client';

import { useHotkeys } from 'react-hotkeys-hook';
import { ShortcutHandler, ShortcutOptions } from './types';

/**
 * Hook to register a keyboard shortcut.
 * 
 * @param keys The key(s) to listen for. e.g. 'ctrl+s', ['meta+k', 'ctrl+k']
 * @param callback The function to call when the key is pressed.
 * @param options Configuration options.
 */
export const useShortcut = (
  keys: string | string[],
  callback: ShortcutHandler,
  options: ShortcutOptions = {}
) => {
  const {
    enabled = true,
    preventDefault = true,
    stopPropagation = true,
    enableOnFormTags = false,
    scopes = ['*'], // Default to all scopes/global if not specified.
    description,
  } = options;

  // We wrap the library's hook.
  // We can add additional logic here for logging or registry if needed.
  
  useHotkeys(
    keys,
    callback,
    {
      enabled,
      preventDefault,
      enableOnFormTags,
      // scopes, // Library support for scopes
      // We might want to pass scopes if we use the Provider's scope management.
      // For now, simpler is better.
    },
    [enabled, preventDefault, stopPropagation, enableOnFormTags, JSON.stringify(scopes)]
  );
};
