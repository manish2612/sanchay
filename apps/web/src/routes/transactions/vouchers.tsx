import { createFileRoute } from '@tanstack/react-router';
import { VouchersPage } from '@/features/transactions/pages/VouchersPage';

export const Route = createFileRoute('/transactions/vouchers')({
  component: VouchersPage,
});
