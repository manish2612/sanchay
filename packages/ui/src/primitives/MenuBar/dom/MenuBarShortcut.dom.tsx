"use client";

import * as React from "react";
import { cn } from "../../../utils";
import { menuBarStyles } from "./styles.dom";

const MenuBarShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return <span className={cn(menuBarStyles.shortcut, className)} {...props} />;
};
MenuBarShortcut.displayName = "MenuBarShortcut";

export { MenuBarShortcut };
