import React, { createContext, useContext, useState, ReactNode } from 'react';

type MasterType = 'group' | 'cost-category' | 'cost-center' | 'cost-centre' | 'stock-group' | 'stock-category' | 'unit-of-measure' | 'godown';

interface MasterFormSheetContextType {
  isOpen: boolean;
  activeMaster: MasterType | null;
  openMasterSheet: (masterType: MasterType) => void;
  closeMasterSheet: () => void;
}

const MasterFormSheetContext = createContext<MasterFormSheetContextType | undefined>(undefined);

export function GlobalMasterSheetProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMaster, setActiveMaster] = useState<MasterType | null>(null);

  const openMasterSheet = (masterType: MasterType) => {
    setActiveMaster(masterType);
    setIsOpen(true);
  };

  const closeMasterSheet = () => {
    setIsOpen(false);
  };

  return (
    <MasterFormSheetContext.Provider value={{ isOpen, activeMaster, openMasterSheet, closeMasterSheet }}>
      {children}
    </MasterFormSheetContext.Provider>
  );
}

export function useGlobalMasterSheet() {
  const context = useContext(MasterFormSheetContext);
  if (!context) {
    throw new Error('useGlobalMasterSheet must be used within a GlobalMasterSheetProvider');
  }
  return context;
}
