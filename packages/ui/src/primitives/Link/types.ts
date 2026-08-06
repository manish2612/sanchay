"use client";
import React, { createContext, ReactNode } from "react";
/**
 * Platform-agnostic Link props
 */
export interface LinkProps {
  href: string;
  children: ReactNode;
  /**
   * Optional accessibility label
   */
  accessibilityLabel?: string;
  /**
   * Pass-through styles
   */
  style?: any;
  /**
   * Open in new tab? (Web only)
   */
  target?: "_blank" | "_self" | "_parent" | "_top";
  /**
   * Additional props passed to the underlying platform link
   */
  [key: string]: any;
}

/**
 * The Contract: What the specific Link implementation must accept.
 */
export type LinkUiComponent = React.ComponentType<LinkProps>;

export const LinkContext = createContext<LinkUiComponent | null>(null);
