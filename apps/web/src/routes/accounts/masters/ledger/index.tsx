import { createFileRoute } from '@tanstack/react-router';
import Page from '@/features/Accounts/Ledger/LedgerList';

export const Route = createFileRoute('/accounts/masters/ledger/')({
  component: Page,
});
