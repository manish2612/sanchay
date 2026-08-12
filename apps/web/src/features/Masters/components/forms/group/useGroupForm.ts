import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { groupSchema, GroupFormValues } from './schema';

export function useGroupForm(onSuccess: () => void) {
  const form = useForm<GroupFormValues>({
    resolver: zodResolver(groupSchema),
    defaultValues: { name: '', alias: '', parentId: ''  }
  });

  const onSubmit = (data: GroupFormValues) => {
    console.log('Group Data:', data);
    onSuccess();
  };

  return { form, onSubmit };
}
