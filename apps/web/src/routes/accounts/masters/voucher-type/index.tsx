import { createFileRoute } from '@tanstack/react-router';
import { VoucherTypeListPage } from '@/features/Accounts/VoucherType';

export const Route = createFileRoute('/accounts/masters/voucher-type/')({
  component: VoucherTypeListPage,
});
