import { useMemo } from 'react';
import { useGetGlobalMastersQuery } from '../../features/Masters/api/globalMastersApi';
import { useWatch } from 'react-hook-form';
import { getCountryFlag } from '@/utils/countryFlags';

export const useCountrySelectField = () => {
  const { data } = useGetGlobalMastersQuery();

  const countryOptions = useMemo(() => {
    if (!data?.countries) return [];
    return data.countries
      .filter((c) => c.is_active !== false) // fallback to true if undefined
      .map((c) => ({
        label: c.name,
        value: c.id,
        icon: getCountryFlag(c.iso3) 
      }));
  }, [data?.countries]);

  return { countryOptions };
};

export const useStateSelectField = (control: any, watchCountryName: string) => {
  const { data } = useGetGlobalMastersQuery();
  const selectedCountryId = useWatch({ control, name: watchCountryName });

  const stateOptions = useMemo(() => {
    if (!data?.countries || !selectedCountryId) return [];
    
    const country = data.countries.find(c => c.id === selectedCountryId);
    if (!country?.state_info) return [];

    return country.state_info
      .filter((s) => s.is_active !== false)
      .map((s) => ({
        label: s.name,
        value: s.id,
      }));
  }, [data?.countries, selectedCountryId]);

  return { stateOptions };
};
