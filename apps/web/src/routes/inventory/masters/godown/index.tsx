import { createFileRoute } from '@tanstack/react-router';
import { GodownListPage } from '@/features/Masters/pages/GodownListPage';

export const Route = createFileRoute('/inventory/masters/godown/')({
  component: GodownListPage,
});
