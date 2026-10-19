import { createFileRoute } from '@tanstack/react-router';
import { CostCategoryListPage } from '@/features/Masters/pages/CostCategoryListPage';

export const Route = createFileRoute('/accounts/masters/cost-category/')({
  component: CostCategoryListPage,
});
