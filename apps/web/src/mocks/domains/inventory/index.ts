import { getStockGroups } from './getStockGroups';
import { getStockCategories } from './getStockCategories';
import { getStockUnits } from './getStockUnits';
import { createStockItem } from './createStockItem';

export const inventoryHandlers = [
  getStockGroups,
  getStockCategories,
  getStockUnits,
  createStockItem,
];

