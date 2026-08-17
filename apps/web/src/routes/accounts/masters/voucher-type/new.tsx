import { createFileRoute } from '@tanstack/react-router';
import { CreateVoucherType } from '@/features/Accounts/VoucherType/CreateVoucherType';

export const Route = createFileRoute('/accounts/masters/voucher-type/new')({
  component: CreateVoucherTypeRoute,
});

function CreateVoucherTypeRoute() {
  return <CreateVoucherType />;
}
