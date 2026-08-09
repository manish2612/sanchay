'use client';

import React from 'react';
import Link from 'next/link';
import { LinkProps } from '@prime/ui';

/**
 * Adapts next/link to the UniversalLink interface.
 */
export const NextLinkAdapter = ({ href, children, target, style, ...props }: LinkProps) => {
  // Using LinkProps from @prime/ui ensures compatibility
  return (
    <Link
      href={href}
      target={target}
      style={style as React.CSSProperties} // Cast for React generic vs DOM conflict
      {...props}
    >
      {children}
    </Link>
  );
};
