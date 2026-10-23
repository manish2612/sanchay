import { createFileRoute } from '@tanstack/react-router';
import { LedgerListPage } from '@/features/Masters/pages/LedgerListPage';

export const Route = createFileRoute('/accounts/masters/ledger/')({
  component: LedgerListPage,
});
