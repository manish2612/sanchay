export type ShortcutHandler = (event: KeyboardEvent) => void;

export interface ShortcutOptions {
  /**
   * Whether the shortcut is enabled. Default true.
   */
  enabled?: boolean;
  
  /**
   * Prevent default browser behavior. Default true.
   */
  preventDefault?: boolean; // Note: library defaults to false usually, we might want true as default for app shortcuts
  
  /**
   * Stop event propagation. Default true.
   */
  stopPropagation?: boolean;
  
  /**
   * List of scopes this shortcut is active in.
   * If not provided, it is active in the 'global' scope (unless scoped=false in library, but we'll manage scopes).
   */
  scopes?: string[];
  
  /**
   * Description for the shortcut, used for displaying a help dialog.
   */
  description?: string;
}
