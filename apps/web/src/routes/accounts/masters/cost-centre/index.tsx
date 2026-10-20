import { createFileRoute } from '@tanstack/react-router';
import { CostCentreListPage } from '@/features/Masters/pages/CostCentreListPage';

export const Route = createFileRoute('/accounts/masters/cost-centre/')({
  component: CostCentreListPage,
});
