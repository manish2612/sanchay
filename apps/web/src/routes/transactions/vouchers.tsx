import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/transactions/vouchers')({
  component: VouchersPage,
})

function VouchersPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Voucher</h1>
      <p className="text-gray-500">Dummy text: Voucher page under construction.</p>
    </div>
  );
}
