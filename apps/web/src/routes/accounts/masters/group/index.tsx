import { createFileRoute } from '@tanstack/react-router';
import { GroupListPage } from '@/features/Masters/pages/GroupListPage';

export const Route = createFileRoute('/accounts/masters/group/')({
  component: GroupListPage,
});
