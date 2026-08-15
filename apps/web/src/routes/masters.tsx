import { createFileRoute } from '@tanstack/react-router';
import { MasterHub } from '@/features/Masters/components/MasterHub.dom';

export const Route = createFileRoute('/masters')({
  component: MasterHub,
});
