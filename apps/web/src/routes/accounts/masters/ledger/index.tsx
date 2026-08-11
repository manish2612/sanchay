import { createFileRoute } from '@tanstack/react-router';
import Page from '../../../../../app/accounts/masters/ledger/page';

export const Route = createFileRoute('/accounts/masters/ledger/')({
  component: Page,
});
