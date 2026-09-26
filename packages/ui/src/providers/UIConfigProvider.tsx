import React, { createContext, useContext, ReactNode, useMemo } from 'react';

export interface UIConfig {
  country?: string;
  datePicker?: {
    calendarType?: 'gregorian' | 'nepali';
    nepaliLanguage?: 'english' | 'nepali';
  };
}

const UIConfigContext = createContext<UIConfig | undefined>(undefined);

export function UIConfigProvider({ config, children }: { config: UIConfig; children: ReactNode }) {
  // Merge defaults based on country to keep configuration centralized and scalable
  const mergedConfig = useMemo(() => {
    const isNepali = config.country === 'NPL';

    return {
      ...config,
      datePicker: {
        calendarType: isNepali ? 'nepali' : 'gregorian',
        nepaliLanguage: 'english',
        ...config.datePicker, // allow explicit overrides
      },
    };
  }, [config]);

  return (
    <UIConfigContext.Provider value={mergedConfig as UIConfig}>
      {children}
    </UIConfigContext.Provider>
  );
}

export function useUIConfig() {
  return useContext(UIConfigContext) || {};
}
