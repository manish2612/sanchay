import { useMemo } from 'react';
import { useGetGlobalMastersQuery } from '../../features/Masters/api/globalMastersApi';

export const useTimezoneSelectField = () => {
  const { data, isLoading } = useGetGlobalMastersQuery();

  const timezoneOptions = useMemo(() => {
    if (!data?.timezones) return [];
    return data.timezones.map((tz) => ({
      id: tz.id,
      label: `(GMT${tz.utc_offset}) ${tz.representative_region}`,
      searchName: tz.name,
    }));
  }, [data?.timezones]);

  return {
    timezoneOptions,
    isLoading,
  };
};
