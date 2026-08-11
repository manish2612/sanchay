import { createFileRoute } from '@tanstack/react-router';
import Page from '@/features/Auth/Signup';

export const Route = createFileRoute('/signup/')({
  component: Page,
});
