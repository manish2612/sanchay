import React, { ReactNode } from "react";

export interface FormHeaderProps {
  graphic?: ReactNode;
  title: string;
  subtitle?: ReactNode;
}

export const FormHeader = ({ graphic, title, subtitle }: FormHeaderProps) => {
  return (
    <div className="flex-shrink-0 relative flex flex-col items-center text-center gap-2 px-8 py-9 border-b border-surface-border">
      {graphic && (
        <div className="relative flex-shrink-0 flex items-center justify-center w-[140px] h-[80px] bg-transparent border-none text-primary mb-1">
          {graphic}
        </div>
      )}
      <div className="flex flex-col items-center gap-1.5 w-full min-w-0">
        <div className="font-head text-[26px] font-semibold text-fg tracking-tight">
          {title}
        </div>
        {subtitle && (
          <div className="text-base text-muted-fg leading-relaxed max-w-[480px]">
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
};
