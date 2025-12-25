import React, { useContext } from "react";
import { Text, Pressable } from "react-native";
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
 * Universal Link Component (Native Implementation).
 */
export const UniversalLink = (props: LinkProps) => {
  const LinkImpl = useContext(LinkContext);

  if (!LinkImpl) {
    if (__DEV__) {
      console.warn(
        "UniversalLink: No LinkProvider found. Navigation will not work. Please wrap your app root in <LinkProvider>."
      );
    }
    // Native Fallback
    return (
      <Pressable disabled>
        {/*@ts-ignore*/}
        <Text style={props.style}>{props.children}</Text>
      </Pressable>
    );
  }

  return <LinkImpl {...props} />;
};

export const useLinkComponent = () => useContext(LinkContext);
