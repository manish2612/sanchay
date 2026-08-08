import React from 'react';
import { Link } from 'expo-router';
import { LinkProps } from '@prime/ui';
import { Platform } from 'react-native';

/**
 * Adapts expo-router/link to the UniversalLink interface.
 */
export const ExpoLinkAdapter = ({ href, children, target, style, ...props }: LinkProps) => {
  // Using LinkProps from @prime/ui ensures compatibility
  return (
    <Link
      href={href as any} // expo-router types might be narrower than string
      target={target}
      style={style}
      {...props}
    >
      {children}
    </Link>
  );
};
