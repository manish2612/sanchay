import { useState, useEffect, useMemo, useCallback } from 'react';
import { useGetCompanySettingsQuery, useUpdateCompanySettingsMutation } from '../api/companySettingsApi';
import { CompanySettings } from '../types';
import { DEFAULT_COMPANY_SETTINGS } from '../constants';

export function useCompanySettingsDrawer(companyId?: string, isOpen = false) {
  const {
    data: serverSettings,
    isLoading,
    isFetching,
    error: fetchError,
    refetch,
  } = useGetCompanySettingsQuery(companyId || '', {
    skip: !companyId || !isOpen,
  });

  const [updateSettings, { isLoading: isSaving, error: saveError }] =
    useUpdateCompanySettingsMutation();

  const [draft, setDraft] = useState<CompanySettings>(DEFAULT_COMPANY_SETTINGS);

  // Sync draft whenever server data loads or updates
  useEffect(() => {
    if (serverSettings) {
      setDraft(serverSettings);
    }
  }, [serverSettings]);

  // Compute dirty state
  const isDirty = useMemo(() => {
    if (!serverSettings) return false;
    return JSON.stringify(draft) !== JSON.stringify(serverSettings);
  }, [draft, serverSettings]);

  const setField = useCallback(
    <K extends keyof CompanySettings>(key: K, value: CompanySettings[K]) => {
      setDraft((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const reset = useCallback(() => {
    if (serverSettings) {
      setDraft(serverSettings);
    } else {
      setDraft(DEFAULT_COMPANY_SETTINGS);
    }
  }, [serverSettings]);

  const save = useCallback(async () => {
    if (!companyId || !isDirty) return false;
    try {
      await updateSettings({ companyId, settings: draft }).unwrap();
      return true;
    } catch (err) {
      console.error('Failed to save company settings:', err);
      throw err;
    }
  }, [companyId, draft, isDirty, updateSettings]);

  return {
    draft,
    setField,
    isDirty,
    isLoading: isLoading || isFetching,
    isSaving,
    error: saveError || fetchError,
    reset,
    save,
    refetch,
  };
}
