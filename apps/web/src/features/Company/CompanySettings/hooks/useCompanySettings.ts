import { useSelector } from 'react-redux';
import { selectActiveCompanyId } from '@/store/authSlice';
import { useGetCompanySettingsQuery } from '../api/companySettingsApi';
import { DEFAULT_COMPANY_SETTINGS } from '../constants';
import { CompanySettings } from '../types';

/**
 * Hook to retrieve the current active company's configuration and feature settings.
 * Pulls the active company ID from Redux authSlice and queries RTK Query cache/server.
 */
export function useCompanySettings() {
  const activeCompanyId = useSelector(selectActiveCompanyId);
  const queryResult = useGetCompanySettingsQuery(activeCompanyId || '', {
    skip: !activeCompanyId,
  });

  const settings: CompanySettings = queryResult.data ?? DEFAULT_COMPANY_SETTINGS;

  return {
    ...queryResult,
    settings,
    enable_branches: settings.enable_branches,
    enable_cost_centres: settings.enable_cost_centres,
    enable_billwise_entry: settings.enable_billwise_entry,
    enable_godowns: settings.enable_godowns,
    enable_batches: settings.enable_batches,
    enable_negative_stock_control: settings.enable_negative_stock_control,
    enable_tracking: settings.enable_tracking,
    enable_dispatch_details: settings.enable_dispatch_details,
    enable_buyer_details: settings.enable_buyer_details,
    enable_stock_item_travel_info: settings.enable_stock_item_travel_info,
    enable_stock_item_description: settings.enable_stock_item_description,
    enable_ledger_description: settings.enable_ledger_description,
    default_stock_valuation_method: settings.default_stock_valuation_method,
  };
}
