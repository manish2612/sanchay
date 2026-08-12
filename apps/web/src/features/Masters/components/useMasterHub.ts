import { useState, useMemo } from 'react';
import { MasterConfig, MASTERS_CONFIG } from '../data/mastersConfig';

export function useMasterHub() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [activeSheetMaster, setActiveSheetMaster] = useState<MasterConfig | null>(null);

  const filteredMasters = useMemo(() => {
    let filtered = MASTERS_CONFIG;
    if (activeTab !== 'all') {
      filtered = filtered.filter((m) => m.group === activeTab);
    }
    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase();
      filtered = filtered.filter((m) => m.label.toLowerCase().includes(lowerQuery));
    }
    return filtered;
  }, [searchQuery, activeTab]);

  return {
    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab,
    filteredMasters,
    activeSheetMaster,
    setActiveSheetMaster,
  };
}
