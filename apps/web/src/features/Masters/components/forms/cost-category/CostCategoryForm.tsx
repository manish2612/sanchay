import React from 'react';
import { Controller } from 'react-hook-form';
import { Form, Button, SheetFooter, Switch } from '@prime/ui';
import { MasterNameField, MasterAliasField } from '@/components/shared-fields/MasterFields';
import { FormSubmissionError } from '@/components/FormSubmissionError';
import { useCostCategoryForm } from './useCostCategoryForm';
import type { CostCategory } from '../../../api/costCategoriesApi';

export interface CostCategoryFormProps {
  onCancel: () => void;
  onSuccess?: () => void;
  onError?: (title: string, desc: string) => void;
  mode?: 'create' | 'edit';
  initialData?: CostCategory;
}

export function CostCategoryForm({
  onCancel,
  onSuccess,
  onError,
  mode = 'create',
  initialData,
}: CostCategoryFormProps) {
  const { form, onSubmit, isSubmitting, submitError, clearSubmitError, isEditMode } =
    useCostCategoryForm(onSuccess || onCancel, onError, mode, initialData);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col h-full overflow-hidden flex-1"
      >
        <div className="flex-1 overflow-y-auto py-4 px-6 space-y-4">
          <FormSubmissionError error={submitError} onDismiss={clearSubmitError} />
          <MasterNameField />
          <MasterAliasField />

          {/* Allocation Options */}
          {/* <div className="pt-2 border-t border-border/40 space-y-3">
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              Allocation Options
            </p> */}

          {/* Allocate Revenue Switch */}
          {/* <Controller
              name="allocate_revenue"
              control={form.control}
              render={({ field }) => (
                <div
                  className="flex items-center justify-between p-3 rounded-lg border border-border/60 bg-surface-variant/30 cursor-pointer select-none hover:bg-surface-variant/50 transition-colors"
                  onClick={(e) => {
                    if ((e.target as HTMLElement).closest('button, [role="switch"], input')) return;
                    field.onChange(!field.value);
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === ' ' || e.key === 'Enter') {
                      e.preventDefault();
                      field.onChange(!field.value);
                    }
                  }}
                  aria-label="Toggle Allocate Revenue"
                >
                  <div className="pr-3 pointer-events-none">
                    <span className="text-xs font-semibold text-foreground block">
                      Allocate Revenue
                    </span>
                    <span className="text-[11px] text-muted-foreground block mt-0.5">
                      Allocate to revenue accounts (Sales, Direct/Indirect Incomes & Expenses)
                    </span>
                  </div>
                  <div onClick={(e) => e.stopPropagation()} className="flex items-center">
                    <Switch
                      id="cost-cat-alloc-rev"
                      checked={Boolean(field.value)}
                      onCheckedChange={(checked) => field.onChange(checked)}
                      aria-label="Allocate Revenue"
                    />
                  </div>
                </div>
              )}
            /> */}

          {/* Allocate Non-Revenue Switch */}
          {/* <Controller
              name="allocate_non_revenue"
              control={form.control}
              render={({ field }) => (
                <div
                  className="flex items-center justify-between p-3 rounded-lg border border-border/60 bg-surface-variant/30 cursor-pointer select-none hover:bg-surface-variant/50 transition-colors"
                  onClick={(e) => {
                    if ((e.target as HTMLElement).closest('button, [role="switch"], input')) return;
                    field.onChange(!field.value);
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === ' ' || e.key === 'Enter') {
                      e.preventDefault();
                      field.onChange(!field.value);
                    }
                  }}
                  aria-label="Toggle Allocate Non-Revenue"
                >
                  <div className="pr-3 pointer-events-none">
                    <span className="text-xs font-semibold text-foreground block">
                      Allocate Non-Revenue
                    </span>
                    <span className="text-[11px] text-muted-foreground block mt-0.5">
                      Allocate to capital & non-revenue accounts (Assets, Liabilities)
                    </span>
                  </div>
                  <div onClick={(e) => e.stopPropagation()} className="flex items-center">
                    <Switch
                      id="cost-cat-alloc-non-rev"
                      checked={Boolean(field.value)}
                      onCheckedChange={(checked) => field.onChange(checked)}
                      aria-label="Allocate Non-Revenue"
                    />
                  </div>
                </div>
              )}
            /> */}
          {/* </div> */}
        </div>

        <SheetFooter className="mt-auto border-t border-border/30 p-4 bg-surface sticky bottom-0 flex justify-end gap-2">
          <Button variant="outline" type="button" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? isEditMode
                ? 'Updating...'
                : 'Creating...'
              : isEditMode
                ? 'Update Cost Category'
                : 'Create Cost Category'}
          </Button>
        </SheetFooter>
      </form>
    </Form>
  );
}
