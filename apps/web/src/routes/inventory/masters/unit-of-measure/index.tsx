import { createFileRoute } from '@tanstack/react-router';
import { UnitOfMeasureListPage } from '@/features/Masters/pages/UnitOfMeasureListPage';

export const Route = createFileRoute('/inventory/masters/unit-of-measure/')({
  component: UnitOfMeasureListPage,
});
