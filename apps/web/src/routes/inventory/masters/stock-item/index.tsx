import { createFileRoute } from '@tanstack/react-router';
import { StockItemListPage } from '@/features/Masters/pages/StockItemListPage';

export const Route = createFileRoute('/inventory/masters/stock-item/')({
  component: StockItemListPage,
});
