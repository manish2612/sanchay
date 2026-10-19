import { createCompanyHandler } from './companies';
import { getCompanySettingsHandler, updateCompanySettingsHandler } from './companySettings';

export const coreHandlers = [
  createCompanyHandler,
  getCompanySettingsHandler,
  updateCompanySettingsHandler,
];
