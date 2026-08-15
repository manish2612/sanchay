import { createFileRoute } from '@tanstack/react-router';
import CreateStockItemPage from '@/features/Inventory/StockItem/CreateStockItem';

export const Route = createFileRoute('/inventory/masters/stock-item/new/')({
  component: CreateStockItemPage,
});
