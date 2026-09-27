import { getLedgersHandler } from './getLedgers';
import { getVoucherTypesHandler } from './getVoucherTypes';
import { getCostCentersHandler } from './getCostCenters';
import { getCostCategoriesHandler } from './getCostCategories';
import { getNextVoucherNumberHandler } from './getNextVoucherNumber';

export const accountingHandlers = [
  getLedgersHandler, 
  getVoucherTypesHandler,
  getCostCentersHandler,
  getCostCategoriesHandler,
  getNextVoucherNumberHandler
];
