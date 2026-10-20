import { createFileRoute } from '@tanstack/react-router';
import { StockGroupListPage } from '@/features/Masters/pages/StockGroupListPage';

export const Route = createFileRoute('/inventory/masters/stock-group/')({
  component: StockGroupListPage,
});
