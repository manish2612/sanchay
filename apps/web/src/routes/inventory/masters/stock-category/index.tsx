import { createFileRoute } from '@tanstack/react-router';
import { StockCategoryListPage } from '@/features/Masters/pages/StockCategoryListPage';

export const Route = createFileRoute('/inventory/masters/stock-category/')({
  component: StockCategoryListPage,
});
