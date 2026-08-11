import { createFileRoute } from '@tanstack/react-router';
import Page from '../../../app/company/new/page';

export const Route = createFileRoute('/company/new')({
  component: Page,
});
