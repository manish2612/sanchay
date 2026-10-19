import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from '@tanstack/react-router';
import { Icon } from '@prime/ui';
import { selectActiveCompany } from '@/store/authSlice';
import { useGetGlobalMastersQuery } from '@/features/Masters/api/globalMastersApi';
import { NepaliDate } from '@prime/ui';
import {
  CompanySettingsSheet,
  OPEN_COMPANY_SETTINGS_EVENT,
} from '@/features/Company/CompanySettings';

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
    ('company_fiscal_years' in activeCompany &&
      activeCompany.company_fiscal_years?.[0]?.from_date) ||
    ('fy_start_date' in activeCompany ? activeCompany.fy_start_date : undefined);

  const fyDisplay = getFYDisplay(activeFiscalYearDate, isNepali);

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F11') {
        e.preventDefault();
        setIsSettingsOpen((prev) => !prev);
      }
    };

    const handleOpenEvent = () => setIsSettingsOpen(true);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener(OPEN_COMPANY_SETTINGS_EVENT, handleOpenEvent);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener(OPEN_COMPANY_SETTINGS_EVENT, handleOpenEvent);
    };
  }, []);

  return (
    <>
      <div className="w-full bg-background border-b border-border/60 flex items-center justify-between px-5 py-1.5 shrink-0 z-40 transition-colors">
        {/* Left: Active Entity Workspace Switcher & Preferances */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <button
            onClick={() => navigate({ to: '/company/select' })}
            className="group flex items-center gap-2 text-foreground font-medium text-[13px] hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm min-w-0"
            aria-label="Switch active company"
            title="Switch Company"
          >
            <div className="flex items-center justify-center bg-primary/10 text-primary w-5 h-5 rounded-[4px] shrink-0">
              <Icon name="Building" size={12} />
            </div>
            <span className="truncate max-w-[140px] sm:max-w-[200px] md:max-w-xs tracking-tight">
              {activeCompany.name}
            </span>
            <Icon
              name="ChevronDown"
              size={14}
              className="text-muted-foreground group-hover:text-primary opacity-50 group-hover:opacity-100 transition-all shrink-0"
            />
          </button>

          <div className="h-3.5 w-px bg-border/60 shrink-0" />

          {/* Quick Action: Company Preferances */}
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="flex items-center gap-1.5 px-2 py-0.5 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/70 transition-colors rounded shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            title="Company Preferances (F11)"
            aria-label="Company Preferances"
          >
            <Icon name="SlidersHorizontal" size={13} className="text-primary/80" />
            <span className="hidden sm:inline font-medium">Preferances</span>
            <span className="hidden md:inline text-[10px] font-mono text-muted-foreground/70 bg-muted px-1 rounded">
              F11
            </span>
          </button>
        </div>

        {/* Right: Compliance & Context Metadata */}
        <div className="hidden sm:flex items-center gap-5 text-[11px] font-mono uppercase tracking-wider shrink-0">
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

      <CompanySettingsSheet
        open={isSettingsOpen}
        onOpenChange={setIsSettingsOpen}
        company={activeCompany}
      />
    </>
  );
}
