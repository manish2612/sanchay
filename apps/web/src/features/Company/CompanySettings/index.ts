export * from './types';
export * from './constants';
export * from './api/companySettingsApi';
export * from './hooks/useCompanySettingsDrawer';
export * from './components/CompanySettingsSheet';
export * from './components/CompanySettingsForm';
export * from './components/ToggleRow';
export * from './components/MinimalSectionHeader';

export const OPEN_COMPANY_SETTINGS_EVENT = 'open-company-settings';
export const triggerCompanySettings = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(OPEN_COMPANY_SETTINGS_EVENT));
  }
};
