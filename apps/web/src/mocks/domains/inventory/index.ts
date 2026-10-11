import { getStockGroups } from './getStockGroups';
import { getStockCategories } from './getStockCategories';
import { getStockUnits } from './getStockUnits';

export const inventoryHandlers = [
  getStockGroups,
  getStockCategories,
  getStockUnits,
];

