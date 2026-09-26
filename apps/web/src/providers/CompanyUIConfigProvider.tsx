import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectActiveCompany } from '@/store/authSlice';
import { UIConfigProvider } from '@prime/ui';
import { useGetGlobalMastersQuery } from '@/features/Masters/api/globalMastersApi';

export function CompanyUIConfigProvider({ children }: { children: React.ReactNode }) {
  const activeCompany = useSelector(selectActiveCompany);
  const { data: globalMasters } = useGetGlobalMastersQuery();

  const uiConfig = useMemo(() => {
    // 1. Try to check populated country on activeCompany (if it's DetailedCompany)
    let iso3 = (activeCompany as any)?.iso3 || (activeCompany as any)?.country?.iso3;
    let name = (activeCompany as any)?.country?.name;

    // 2. If we just have country_id (LoginCompany), look it up in globalMasters
    if (!iso3 && activeCompany?.country_id && globalMasters?.countries) {
      const selectedCountry = globalMasters.countries.find(
        (c: any) => c.id === activeCompany.country_id
      );
      if (selectedCountry) {
        iso3 = selectedCountry.iso3;
        name = selectedCountry.name;
      }
    }

    const isNepali = iso3 === 'NPL' || name?.toLowerCase() === 'nepal';

    return {
      country: isNepali ? 'NPL' : (iso3 || 'UNKNOWN'),
    };
  }, [activeCompany, globalMasters]);

  return <UIConfigProvider config={uiConfig}>{children}</UIConfigProvider>;
}
