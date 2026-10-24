import { createFileRoute } from '@tanstack/react-router';
import { CreateVoucherType } from '@/features/Accounts/VoucherType/CreateVoucherType';

export const Route = createFileRoute('/accounts/masters/voucher-type/$id/edit/')({
  component: EditVoucherTypeRoute,
});

function EditVoucherTypeRoute() {
  const { id } = Route.useParams();
  return <CreateVoucherType id={id} mode="edit" />;
}
