import { getLedgersHandler } from './getLedgers';
import { getVoucherTypesHandler } from './getVoucherTypes';
import {
  getCostCentersHandler,
  getCostCenterByIdHandler,
  createCostCenterHandler,
  updateCostCenterHandler,
  deleteCostCenterHandler,
} from './getCostCenters';
import {
  getCostCategoriesHandler,
  getCostCategoryByIdHandler,
  createCostCategoryHandler,
  updateCostCategoryHandler,
  deleteCostCategoryHandler,
} from './getCostCategories';
import { getNextVoucherNumberHandler } from './getNextVoucherNumber';
import { getTaxTypesHandler } from './getTaxTypes';
import {
  getTaxGroupsHandler,
  getTaxGroupByIdHandler,
  updateTaxGroupHandler,
  deleteTaxGroupHandler,
} from './getTaxGroups';
import { createTaxGroupHandler } from './createTaxGroup';
import {
  getGroupsHandler,
  getGroupByIdHandler,
  updateGroupHandler,
  deleteGroupHandler,
} from './getGroups';

export const accountingHandlers = [
  getLedgersHandler, 
  getVoucherTypesHandler,
  getCostCentersHandler,
  getCostCenterByIdHandler,
  createCostCenterHandler,
  updateCostCenterHandler,
  deleteCostCenterHandler,
  getCostCategoriesHandler,
  getCostCategoryByIdHandler,
  createCostCategoryHandler,
  updateCostCategoryHandler,
  deleteCostCategoryHandler,
  getNextVoucherNumberHandler,
  getTaxTypesHandler,
  getTaxGroupsHandler,
  getTaxGroupByIdHandler,
  createTaxGroupHandler,
  updateTaxGroupHandler,
  deleteTaxGroupHandler,
  getGroupsHandler,
  getGroupByIdHandler,
  updateGroupHandler,
  deleteGroupHandler,
];
