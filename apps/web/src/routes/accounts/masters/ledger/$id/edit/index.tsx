import { createFileRoute } from '@tanstack/react-router';
import CreateLedgerPage from '@/features/Accounts/Ledger/CreateLedger';

function EditLedgerRoute() {
  const { id } = Route.useParams();
  return <CreateLedgerPage id={id} mode="edit" key={id} />;
}

export const Route = createFileRoute('/accounts/masters/ledger/$id/edit/')({
  component: EditLedgerRoute,
});
