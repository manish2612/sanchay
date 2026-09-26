import { getLedgersHandler } from './getLedgers';
import { getVoucherTypesHandler } from './getVoucherTypes';
import { getCostCentersHandler } from './getCostCenters';
import { getCostCategoriesHandler } from './getCostCategories';

export const accountingHandlers = [
  getLedgersHandler, 
  getVoucherTypesHandler,
  getCostCentersHandler,
  getCostCategoriesHandler
];
