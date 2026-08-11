import { createFileRoute } from '@tanstack/react-router';
import Page from '@/features/Accounts/VoucherType';

export const Route = createFileRoute('/accounts/masters/voucher-type/')({
  component: Page,
});
