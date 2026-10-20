import { stockGroupHandlers } from './getStockGroups';
import { stockCategoryHandlers } from './getStockCategories';
import { stockUnitHandlers } from './getStockUnits';
import { godownHandlers } from './getGodowns';
import { createStockItem } from './createStockItem';
import { stockItemHandlers } from './getStockItems';

export const inventoryHandlers = [
  ...stockGroupHandlers,
  ...stockCategoryHandlers,
  ...stockUnitHandlers,
  ...godownHandlers,
  createStockItem,
  ...stockItemHandlers,
];
