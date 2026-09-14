'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from '@tanstack/react-router';
import { Icon } from '@prime/ui';
import { selectActiveCompany } from '@/store/authSlice';

export function GlobalCompanyRibbon() {
  const navigate = useNavigate();
  const activeCompany = useSelector(selectActiveCompany);

  if (!activeCompany) return null;

  // Helper to format "2026-09-01T..." into "26-27"
  const getFYDisplay = (dateString?: string) => {
    try {
      if (!dateString) return null;
      const date = new Date(dateString);
      const startYear = date.getFullYear();
      const endYear = startYear + 1;
      return `${startYear.toString().slice(-2)}-${endYear.toString().slice(-2)}`;
    } catch {
      return null;
    }
  };
  const fyDisplay = getFYDisplay(activeCompany.fy_start_date);

  return (
    <div className="w-full bg-background border-b border-border/60 flex items-center justify-between px-5 py-1.5 shrink-0 z-40 transition-colors">
      {/* Left: Active Entity Workspace Switcher */}
      <button
        onClick={() => navigate({ to: '/company/select' })}
        className="group flex items-center gap-2 text-foreground font-medium text-[13px] hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
        aria-label="Switch active company"
        title="Switch Company"
      >
        <div className="flex items-center justify-center bg-primary/10 text-primary w-5 h-5 rounded-[4px]">
          <Icon name="Building" size={12} />
        </div>
        <span className="truncate max-w-[200px] md:max-w-md tracking-tight">
          {activeCompany.name}
        </span>
        <Icon
          name="ChevronDown"
          size={14}
          className="text-muted-foreground group-hover:text-primary opacity-50 group-hover:opacity-100 transition-all"
        />
      </button>

      {/* Right: Compliance & Context Metadata */}
      <div className="hidden sm:flex items-center gap-5 text-[11px] font-mono uppercase tracking-wider">
        {activeCompany.registration_no && (
          <div className="flex items-center gap-1.5" title="Registration Number">
            <span className="text-muted-foreground/50">REG:</span>
            <span className="text-foreground/80 font-medium">{activeCompany.registration_no}</span>
          </div>
        )}

        {fyDisplay && (
          <div className="flex items-center gap-1.5" title="Active Financial Year">
            <span className="text-muted-foreground/50">FY:</span>
            <span className="text-foreground/80 font-medium">{fyDisplay}</span>
          </div>
        )}
      </div>
    </div>
  );
}
