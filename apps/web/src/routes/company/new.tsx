import { createFileRoute } from '@tanstack/react-router';
import Page from '@/features/Company/CreateCompany';

export const Route = createFileRoute('/company/new')({
  component: Page,
});
