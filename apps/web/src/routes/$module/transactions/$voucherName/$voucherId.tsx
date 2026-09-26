import { createFileRoute } from '@tanstack/react-router';
import Page from '@/features/Accounts/VoucherType';

export const Route = createFileRoute('/$module/transactions/$voucherName/$voucherId')({
  component: Page,
});
