import { createFileRoute } from '@tanstack/react-router';
import { TestApiPage } from '@/features/posts/pages/TestApiPage';

export const Route = createFileRoute('/dev/test-api')({
  component: TestApiPage,
});
