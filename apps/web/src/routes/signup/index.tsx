import { createFileRoute } from '@tanstack/react-router';
import Page from '../../../app/signup/page';

export const Route = createFileRoute('/signup/')({
  component: Page,
});
