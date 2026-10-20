import { createFileRoute } from '@tanstack/react-router';
import StockItemFormPage from '@/features/Inventory/StockItem/CreateStockItem';

function EditStockItemRoute() {
  const { id } = Route.useParams();
  return <StockItemFormPage id={id} mode="edit" key={id} />;
}

export const Route = createFileRoute('/inventory/masters/stock-item/$id/edit/')({
  component: EditStockItemRoute,
});
