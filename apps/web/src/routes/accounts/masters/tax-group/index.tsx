import { createFileRoute } from '@tanstack/react-router';
import { TaxGroupListPage } from '@/features/Masters/pages/TaxGroupListPage';

export const Route = createFileRoute('/accounts/masters/tax-group/')({
  component: TaxGroupListPage,
});
