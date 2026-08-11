import { useState, useRef } from "react";
import { useClickOutside } from "../../../hooks/useClickOutside";

export function useVoucherSummaryPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useClickOutside(wrapperRef, () => setIsOpen(false));

  const toggleOpen = () => setIsOpen((prev) => !prev);

  return {
    isOpen,
    wrapperRef,
    toggleOpen,
  };
}
