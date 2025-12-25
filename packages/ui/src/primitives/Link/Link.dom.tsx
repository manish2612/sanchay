"use client";
import React, { useContext } from "react";
import { LinkContext, LinkProps } from "./types";

/**
 * Provider to inject the platform-specific Link implementation.
 */
export const LinkProvider = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: React.ComponentType<LinkProps>;
}) => {
  return <LinkContext.Provider value={value}>{children}</LinkContext.Provider>;
};

/**
 * Universal Link Component (DOM Implementation).
 */
export const UniversalLink = (props: LinkProps) => {
  const LinkImpl = useContext(LinkContext);

  if (!LinkImpl) {
    if (__DEV__) {
      console.warn(
        "UniversalLink: No LinkProvider found. Navigation will not work. Please wrap your app root in <LinkProvider>."
      );
    }
    // Web Fallback: Render a simple span or anchor if possible, but span is safer if we don't know the router
    // Converting style prop (array or object) to React.CSSProperties slightly if needed,
    // but typically the app shell adapter should be used.
    // For now, simple fallback.
    // @ts-ignore
    return (
      <span style={props.style as any} {...props}>
        {props.children}
      </span>
    );
  }

  return <LinkImpl {...props} />;
};

export const useLinkComponent = () => useContext(LinkContext);
