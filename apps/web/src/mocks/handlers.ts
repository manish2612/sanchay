import { authHandlers } from './domains/auth/index';
import { globalHandlers } from './domains/global/index';
import { coreHandlers } from './domains/core/index';
import { accountingHandlers } from './domains/accounting/index';

export const handlers = [
  ...authHandlers,
  ...globalHandlers,
  ...coreHandlers,
  ...accountingHandlers,
];
