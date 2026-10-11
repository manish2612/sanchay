import { useState, useMemo, useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { LedgerFormValues } from '../schema';
import { LEDGER_FORM_FIELDS } from '../constants';
import { useGetGroupsQuery } from '@/features/Masters/api/groupsApi';

export const useParentOptions = (form: UseFormReturn<LedgerFormValues>) => {
  const { data: groups = [], isLoading: isGroupsLoading } = useGetGroupsQuery();
  
  const parentOptions = useMemo(() => {
    return groups.map((group) => ({
      label: group.name,
      value: group.id,
    }));
  }, [groups]);

  const [parentQuery, setParentQuery] = useState('');

  // Initialize query with label if we already have a value (e.g. edit mode)
  useEffect(() => {
    const currentValue = form.getValues(LEDGER_FORM_FIELDS.PARENT);
    if (currentValue && groups.length > 0) {
      const selected = parentOptions.find((opt) => opt.value === currentValue);
      if (selected) {
        setParentQuery(selected.label);
      }
    }
  }, [form, groups, parentOptions]);

  const filteredParent = parentOptions.filter((u) =>
    u.label.toLowerCase().includes(parentQuery.toLowerCase()),
  );

  return {
    parentQuery,
    setParentQuery,
    filteredParent,
    isGroupsLoading,
  };
};
