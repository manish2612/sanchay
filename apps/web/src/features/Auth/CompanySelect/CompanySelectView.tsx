'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from '@tanstack/react-router';
import { Button, Icon } from '@prime/ui';
import { selectCompanies, setActiveCompany } from '@/store/authSlice';
import { Company } from '@/features/Auth/api';
import { LoginHeaderGraphic } from '../Login/components/LoginHeaderGraphic';
import { LoginGraphic } from '../Login/components/LoginGraphic';
import { CompanyProfileGraphic } from '@/features/Company/CreateCompany/components/graphics/CompanyProfileGraphic';

export default function CompanySelectView() {
  const companies = useSelector(selectCompanies);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSelect = (companyId: number) => {
    dispatch(setActiveCompany(companyId));
    navigate({ to: '/dashboard' });
  };

  const handleKeyDown = (e: React.KeyboardEvent, companyId: number) => {
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
        <div className="border border-surface-border rounded-xl overflow-hidden shadow-sm">
          <ul className="divide-y divide-surface-border">
            {companies.map((company, index) => (
              <li key={company.company_id}>
                <button
                  onClick={() => handleSelect(company.company_id)}
                  onKeyDown={(e) => handleKeyDown(e, company.company_id)}
                  className="w-full flex items-center gap-4 px-5 py-4 text-left transition-colors bg-surface hover:bg-muted/50 focus:outline-none focus-visible:bg-muted/50 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary group"
                  aria-label={`Select company ${company.company_name}`}
                >
                  {/* Number Indicator */}
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm group-hover:bg-primary group-hover:text-primary-foreground group-focus-visible:bg-primary group-focus-visible:text-primary-foreground transition-colors">
                    {index + 1}
                  </div>

                  {/* Company Details */}
                  <div className="flex-grow min-w-0">
                    <div className="text-base font-semibold text-foreground truncate group-hover:text-primary group-focus-visible:text-primary transition-colors">
                      {company.company_name}
                    </div>
                    <div className="text-sm text-muted-foreground truncate mt-0.5">
                      {company.role} &bull; Reg: {company.registration_no}
                    </div>
                  </div>

                  {/* Action Icon */}
                  <div className="flex-shrink-0 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-focus-visible:text-primary group-focus-visible:translate-x-1 transition-all">
                    <Icon name="ChevronRight" size={20} />
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer Action */}
        <div className="mt-8 flex justify-end">
          <Button
            variant="outline"
            onClick={() => navigate({ to: '/company/new' })}
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
