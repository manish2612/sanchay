import { createFileRoute } from '@tanstack/react-router';
import Page from '../../../../../app/accounts/masters/ledger/new/page';

export const Route = createFileRoute('/accounts/masters/ledger/new')({
  component: Page,
});
