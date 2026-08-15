import { createFileRoute } from '@tanstack/react-router';
import Page from '@/features/Auth/Login';

export const Route = createFileRoute('/login')({
  component: Page,
});
