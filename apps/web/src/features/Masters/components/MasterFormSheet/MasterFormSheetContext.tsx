import React, { createContext, useContext, useState, ReactNode } from 'react';

export type MasterType =
  | 'group'
  | 'cost-category'
  | 'cost-center'
  | 'cost-centre'
  | 'tax-group'
  | 'stock-group'
  | 'stock-category'
  | 'unit-of-measure'
  | 'godown'
  | 'ledger';

export type MasterSheetMode = 'create' | 'edit';

export interface MasterFormSheetContextType {
  isOpen: boolean;
  activeMaster: MasterType | null;
  mode: MasterSheetMode;
  initialData?: any;
  openMasterSheet: (masterType: MasterType, mode?: MasterSheetMode, initialData?: any) => void;
  closeMasterSheet: () => void;
}

const MasterFormSheetContext = createContext<MasterFormSheetContextType | undefined>(undefined);

export function GlobalMasterSheetProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMaster, setActiveMaster] = useState<MasterType | null>(null);
  const [mode, setMode] = useState<MasterSheetMode>('create');
  const [initialData, setInitialData] = useState<any>(undefined);

  const openMasterSheet = (
    masterType: MasterType,
    sheetMode: MasterSheetMode = 'create',
    data?: any
  ) => {
    setActiveMaster(masterType);
    setMode(sheetMode);
    setInitialData(data);
    setIsOpen(true);
  };

  const closeMasterSheet = () => {
    setIsOpen(false);
    setInitialData(undefined);
    setMode('create');
  };

  return (
    <MasterFormSheetContext.Provider
      value={{
        isOpen,
        activeMaster,
        mode,
        initialData,
        openMasterSheet,
        closeMasterSheet,
      }}
    >
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
