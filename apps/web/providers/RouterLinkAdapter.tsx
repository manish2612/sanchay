import React from 'react';
import { Link } from '@tanstack/react-router';
import { LinkProps } from '@prime/ui';

/**
 * Adapts @tanstack/react-router to the UniversalLink interface.
 */
export const RouterLinkAdapter = ({ href, children, target, style, ...props }: LinkProps) => {
  return (
    <Link
      to={href}
      target={target}
      style={style as React.CSSProperties}
      {...props}
    >
      {children}
    </Link>
  );
};
