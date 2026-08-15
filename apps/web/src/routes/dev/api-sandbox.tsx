import { createFileRoute } from '@tanstack/react-router';
import { ApiSandboxPage } from '@/features/dev/pages/ApiSandboxPage';

export const Route = createFileRoute('/dev/api-sandbox')({
  component: ApiSandboxPage,
});
