import { createFileRoute } from '@tanstack/react-router';
import Page from '@/features/Accounts/VoucherType';

function VoucherPageRoute() {
  const { module, voucherName, voucherId } = Route.useParams();
  
  // Creates a descriptive key (e.g., "accounts-receipt-01a0dcc9-...")
  // This guarantees that React destroys the old form instance and mounts a fresh one
  // when navigating between completely different vouchers, preventing data contamination.
  const pageKey = `${module}-${voucherName}-${voucherId}`;

  return <Page key={pageKey} />;
}

export const Route = createFileRoute('/$module/transactions/$voucherName/$voucherId')({
  component: VoucherPageRoute,
});
