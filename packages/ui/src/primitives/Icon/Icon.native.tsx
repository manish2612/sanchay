import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { IconProps } from "./types";

export function Icon({ name, size = 24, color, style }: IconProps) {
  return (
    <MaterialIcons
      name={name as keyof typeof MaterialIcons.glyphMap}
      size={size}
      color={color}
      style={style}
    />
  );
}
