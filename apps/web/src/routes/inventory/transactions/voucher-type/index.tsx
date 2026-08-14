import { createFileRoute } from '@tanstack/react-router';
import Page from '@/features/Accounts/VoucherType';

export const Route = createFileRoute('/inventory/transactions/voucher-type/')({
  component: Page,
});
