'use client';

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from '@tanstack/react-router';
import { Button, Icon } from '@prime/ui';
import { selectCompanies, setActiveCompany, selectActiveCompanyId } from '@/store/authSlice';
import { useSwitchCompanyMutation } from '@/features/Auth/api';
import { LoginHeaderGraphic } from '../Login/components/LoginHeaderGraphic';
import { LoginGraphic } from '../Login/components/LoginGraphic';
import { CompanyProfileGraphic } from '@/features/Company/CreateCompany/components/graphics/CompanyProfileGraphic';
import { cookieTokenStorage } from '@/utils/tokenStorage';

export default function CompanySelectView() {
  const companies = useSelector(selectCompanies);
  const activeCompanyId = useSelector(selectActiveCompanyId);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [switchCompany, { isLoading }] = useSwitchCompanyMutation();
  const [error, setError] = useState<string | null>(null);

  const handleSelect = async (companyId: string) => {
    if (isLoading) return;

    if (companyId === activeCompanyId) {
      navigate({ to: '/dashboard' });
      return;
    }

    setError(null);
    try {
      const data = await switchCompany({ company_id: companyId }).unwrap();

      if (data.token) {
        cookieTokenStorage.setToken(data.token);
      }

      dispatch(setActiveCompany(companyId));
      navigate({ to: '/dashboard' });
    } catch (err) {
      console.error('Failed to switch company:', err);
      setError('Failed to select the company. Please try again.');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, companyId: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleSelect(companyId);
    }
  };

  return (
    <main className="min-h-dvh w-full flex items-center justify-center bg-background p-4 md:p-8">
      {/* Centered Container Card */}
      <section className="w-full max-w-2xl bg-surface rounded-2xl border border-surface-border shadow-sm overflow-hidden flex flex-col relative z-10 p-6 md:p-10">
        {/* Header area - Mimicking the FormHeader requested style but responsive */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-start md:text-left mb-8 gap-5 border-b border-surface-border pb-6">
          <div className="flex justify-center md:justify-start">
            <div className="relative flex-shrink-0 flex items-center justify-center text-primary transform scale-90 md:scale-100">
              <CompanyProfileGraphic className="w-32 h-32 md:w-28 md:h-28" />
            </div>
          </div>
          <div className="flex flex-col items-center md:items-start w-full">
            <h1 className="font-head text-2xl md:text-3xl font-bold mb-2 text-foreground text-center md:text-left tracking-tight">
              Select Company
            </h1>
            <p className="text-muted-foreground text-sm md:text-base text-center md:text-left leading-relaxed">
              Choose the organization you want to manage today. Your selection will determine the
              data and permissions available in the ERP system.
            </p>
          </div>
        </div>

        {/* Companies List */}
        <div className="flex flex-col gap-4">
          {error && (
            <div className="bg-destructive/10 text-destructive text-sm px-4 py-3 rounded-lg flex items-center gap-2 border border-destructive/20">
              <Icon name="AlertCircle" size={16} />
              {error}
            </div>
          )}
          <div className="border border-surface-border rounded-xl overflow-hidden shadow-sm">
            <ul className="divide-y divide-surface-border">
              {companies.map((company, index) => (
                <li key={company.id}>
                  <button
                    onClick={() => handleSelect(company.id)}
                    onKeyDown={(e) => handleKeyDown(e, company.id)}
                    disabled={isLoading}
                    className="w-full flex items-center gap-4 px-5 py-4 text-left transition-colors bg-surface hover:bg-muted/50 focus:outline-none focus-visible:bg-muted/50 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary group disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label={`Select company ${company.name}`}
                  >
                    {/* Number Indicator */}
                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm group-hover:bg-primary group-hover:text-primary-foreground group-focus-visible:bg-primary group-focus-visible:text-primary-foreground transition-colors">
                      {index + 1}
                    </div>

                    {/* Company Details */}
                    <div className="flex-grow min-w-0">
                      <div className="text-base font-semibold text-foreground truncate group-hover:text-primary group-focus-visible:text-primary transition-colors">
                        {company.name}
                      </div>
                      <div className="text-sm text-muted-foreground truncate mt-0.5">
                        Reg: {company.tax_identifier || 'N/A'}
                      </div>
                    </div>

                    {/* Action Icon */}
                    <div className="flex-shrink-0 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-focus-visible:text-primary group-focus-visible:translate-x-1 transition-all">
                      {isLoading ? (
                        <Icon name="Loader2" size={20} className="animate-spin" />
                      ) : (
                        <Icon name="ChevronRight" size={20} />
                      )}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Action */}
        <div className="mt-8 flex justify-end">
          <Button
            variant="outline"
            onClick={() => navigate({ to: '/company/new' })}
            disabled={isLoading}
            className="gap-2 font-medium bg-background hover:bg-muted"
          >
            <Icon name="Plus" size={16} />
            Add New Company
          </Button>
        </div>
      </section>
    </main>
  );
}
