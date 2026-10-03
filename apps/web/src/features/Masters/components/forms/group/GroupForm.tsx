import React from 'react';
import { Form, Button, SheetFooter } from '@prime/ui';
import { MasterNameField, MasterAliasField, MasterParentField } from '@/components/shared-fields/MasterFields';
import { useGroupForm } from './useGroupForm';
import { useGetGroupsQuery } from '@/features/Masters/api/groupsApi';

export function GroupForm({ onCancel, onSuccess, onError }: { onCancel: () => void, onSuccess?: () => void; onError?: (title: string, desc: string) => void }) {
  const { form, onSubmit, isSubmitting } = useGroupForm(onSuccess || onCancel, onError);
  
  const { data: groups = [], isLoading: isLoadingGroups } = useGetGroupsQuery();
  
  const groupOptions = [...groups]
    .sort((a, b) => (a.display_order || 0) - (b.display_order || 0))
    .map(g => ({
      label: g.name,
      value: g.id
    }));

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full overflow-hidden flex-1">
        <div className="flex-1 overflow-y-auto py-4 px-6 space-y-4">
          <MasterNameField />
          <MasterAliasField />
          <MasterParentField 
            label="Parent Group" 
            options={groupOptions}
            isLoading={isLoadingGroups}
          />
        </div>
        
        <SheetFooter className="mt-auto border-t border-border/30 p-4 bg-surface sticky bottom-0 flex justify-end gap-2">
          <Button variant="outline" type="button" onClick={onCancel} disabled={isSubmitting}>Cancel</Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create Group'}
          </Button>
        </SheetFooter>
      </form>
    </Form>
  );
}
