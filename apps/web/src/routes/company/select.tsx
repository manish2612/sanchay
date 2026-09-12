import { createFileRoute } from '@tanstack/react-router';
import Page from '@/features/Auth/CompanySelect';

export const Route = createFileRoute('/company/select')({
  component: Page,
});
