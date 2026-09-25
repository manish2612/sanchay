'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from '@tanstack/react-router';
import { Icon } from '@prime/ui';
import { selectActiveCompany } from '@/store/authSlice';
import { useGetGlobalMastersQuery } from '@/features/Masters/api/globalMastersApi';
import { NepaliDate } from '@prime/ui';

export function GlobalCompanyRibbon() {
  const navigate = useNavigate();
  const activeCompany = useSelector(selectActiveCompany);
  const { data: globalMasters } = useGetGlobalMastersQuery();

  if (!activeCompany) return null;

  const activeCountry = globalMasters?.countries?.find((c) => c.id === activeCompany.country_id);

  const currencySymbol = activeCountry?.currency_info?.symbol;
  const isNepali = activeCountry?.iso3 === 'NPL' || activeCountry?.name?.toLowerCase() === 'nepal';

  // Helper to format "2026-09-01T..." into "26-27" or "83-84"
  const getFYDisplay = (dateString?: string, isNepali = false) => {
    try {
      if (!dateString) return null;
      const date = new Date(dateString);

      let startYear, endYear;
      if (isNepali) {
        const bs = new NepaliDate(date);
        startYear = bs.getYear();
        endYear = startYear + 1;
      } else {
        startYear = date.getFullYear();
        endYear = startYear + 1;
      }
      return `${startYear.toString()}-${endYear.toString()}`;
    } catch {
      return null;
    }
  };

  const activeFiscalYearDate =
    ('fiscal_years' in activeCompany && activeCompany.fiscal_years?.[0]?.from_date) ||
    ('company_fiscal_years' in activeCompany && activeCompany.company_fiscal_years?.[0]?.from_date) ||
    ('fy_start_date' in activeCompany ? activeCompany.fy_start_date : undefined);
    
  const fyDisplay = getFYDisplay(activeFiscalYearDate, isNepali);

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
        {activeCompany.tax_identifier && (
          <div className="flex items-center gap-1.5" title="Registration Number">
            <span className="text-muted-foreground/50">REG:</span>
            <span className="text-foreground/80 font-medium">{activeCompany.tax_identifier}</span>
          </div>
        )}

        {currencySymbol && (
          <div className="flex items-center gap-1.5" title="Currency">
            <span className="text-muted-foreground/50">CUR:</span>
            <span className="text-foreground/80 font-medium">{currencySymbol}</span>
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
