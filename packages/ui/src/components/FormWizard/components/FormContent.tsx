import React, { ReactNode } from "react";

export interface FormContentProps {
  children: ReactNode;
  className?: string;
}

export const FormContent = ({ children, className = "" }: FormContentProps) => {
  return (
    <div className={`flex-1 overflow-y-auto overflow-x-hidden px-7 py-6 ${className}`}>
      {children}
    </div>
  );
};
