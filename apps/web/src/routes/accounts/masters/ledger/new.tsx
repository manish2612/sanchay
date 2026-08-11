import { createFileRoute } from '@tanstack/react-router';
import Page from '@/features/Accounts/Ledger/CreateLedger';

export const Route = createFileRoute('/accounts/masters/ledger/new')({
  component: Page,
});
