import type { Meta, StoryObj } from '@storybook/react';
import React, { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { FormWizard, Form, useFormWizardContext, Switch, Table } from '../../../index';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Monitor,
  Building2,
  CreditCard,
  Landmark,
  ShieldCheck,
  FileText,
  BarChart3,
} from 'lucide-react';
import { flexRender, createColumnHelper } from '@tanstack/react-table';

// ─── Shared primitives (re-used from MultiStep.stories) ──────────────────────

type SellingPrice = {
  srNo: string;
  fromDate: string;
  mrp: string;
  netRate: string;
  rate: string;
};

const columnHelper = createColumnHelper<SellingPrice>();

const sellingPriceColumns = [
  columnHelper.accessor('srNo', {
    header: 'Sr.No.',
    cell: (info) => info.getValue(),
    size: 60,
  }),
  columnHelper.accessor('fromDate', {
    header: 'From Date',
    cell: (info) => (
      <input
        type="date"
        defaultValue={info.getValue()}
        className="h-8 px-2 w-full bg-transparent border border-border rounded-md focus:ring-1 focus:ring-primary outline-none"
      />
    ),
    size: 150,
  }),
  columnHelper.accessor('mrp', {
    header: 'MRP',
    cell: (info) => <span className="text-muted-fg">{info.getValue()}</span>,
    size: 100,
  }),
  columnHelper.accessor('netRate', {
    header: 'Net Rate',
    cell: (info) => <span className="text-muted-fg">{info.getValue()}</span>,
    size: 100,
  }),
  columnHelper.accessor('rate', {
    header: 'Rate',
    cell: (info) => (
      <input
        type="number"
        placeholder="0.00"
        defaultValue={info.getValue()}
        className="h-8 px-2 w-full bg-transparent border border-border rounded-md focus:ring-1 focus:ring-primary outline-none"
      />
    ),
    size: 150,
  }),
];

const mockSellingPriceData = [
  { srNo: '1', fromDate: '2026-08-13', mrp: 'MRP', netRate: 'Net Rate', rate: '' },
];

/** Identical class strings from MultiStep.stories — co-located for portability */
const inputCls =
  'w-full h-10 px-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-transparent text-foreground';
const textareaCls =
  'w-full p-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-transparent text-foreground resize-none';

// ─── Shared field building blocks ─────────────────────────────────────────────
// These are extracted from MultiStep.stories' DemoWizardContent so all three
// stories below can compose them without duplication.

const AccountBasicsFields = ({ control }: { control: any }) => (
  <>
    <Form.Field
      control={control}
      name="accountName"
      render={({ field }) => (
        <Form.Item>
          <Form.Label>Account Name *</Form.Label>
          <Form.Control>
            <input {...field} className={inputCls} placeholder="e.g. Current Assets" />
          </Form.Control>
          <Form.Message />
        </Form.Item>
      )}
    />
    <FormWizard.Separator />
    <Form.Field
      control={control}
      name="accountCode"
      render={({ field }) => (
        <Form.Item>
          <Form.Label>Account Code *</Form.Label>
          <Form.Control>
            <input {...field} className={inputCls} placeholder="e.g. 1000" />
          </Form.Control>
          <Form.Message />
        </Form.Item>
      )}
    />
  </>
);

const InternalNotesField = ({ control }: { control: any }) => (
  <Form.Field
    control={control}
    name="internalNotes"
    render={({ field }) => (
      <Form.Item>
        <Form.Label>Internal Notes (Optional)</Form.Label>
        <Form.Control>
          <textarea
            {...field}
            rows={4}
            className={textareaCls}
            placeholder="Add any internal classification notes here..."
          />
        </Form.Control>
        <Form.Message />
      </Form.Item>
    )}
  />
);

/** Identical table from MultiStep.stories — shown when the standard-rates toggle is ON */
const SellingPriceTable = () => (
  <div className="mt-4 animate-in fade-in slide-in-from-top-4">
    <Table.Root data={mockSellingPriceData} columns={sellingPriceColumns}>
      <Table.Header>
        {({ table }) => (
          <>
            {table.getHeaderGroups().map((headerGroup) => (
              <Table.HeaderRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Table.Head
                    key={header.id}
                    style={{ width: header.getSize(), flex: `${header.getSize()} 0 auto` }}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </Table.Head>
                ))}
              </Table.HeaderRow>
            ))}
          </>
        )}
      </Table.Header>
      <Table.Body>
        {(row, isFocused) => (
          <Table.Row
            key={row.id}
            data-state={row.getIsSelected() ? 'selected' : undefined}
            data-focused={isFocused}
          >
            {row.getVisibleCells().map((cell) => (
              <Table.Cell
                key={cell.id}
                style={{ width: cell.column.getSize(), flex: `${cell.column.getSize()} 0 auto` }}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Table.Cell>
            ))}
          </Table.Row>
        )}
      </Table.Body>
    </Table.Root>
  </div>
);

/** Generic placeholder for steps that have no specific field UI in the demo */
const StepPlaceholder = ({
  label,
  icon: Icon,
}: {
  label: string;
  icon: React.ElementType;
}) => (
  <div className="py-8 flex flex-col items-center gap-3 text-muted-fg">
    <Icon className="w-10 h-10 opacity-40" strokeWidth={1.25} />
    <p className="text-sm text-center">{label}</p>
  </div>
);

// ─── Storybook meta ───────────────────────────────────────────────────────────

const meta = {
  title: 'Components/FormWizard/DynamicMultiStep',
  component: FormWizard,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof FormWizard>;

export default meta;
type Story = StoryObj<typeof meta>;

// =============================================================================
// Story 1 — Toggle Injects a Step
// Demonstrates: addStep / removeStep driven by a single boolean switch.
// A "Standard Rates" step appears between step 2 and step 3 when the toggle
// is ON, and disappears (along with its form data) when flipped OFF.
// Reuses: AccountBasicsFields, InternalNotesField, SellingPriceTable, Switch.
// =============================================================================

const toggleSchema = z
  .object({
    accountName: z.string().min(1, 'Account Name is required'),
    accountCode: z.string().min(1, 'Account Code is required'),
    internalNotes: z.string().optional(),
    setStandardRates: z.boolean().optional(),
    // Optional at schema level; superRefine makes it required when toggle is ON
    creditLimit: z.number().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.setStandardRates && !data.creditLimit) {
      ctx.addIssue({
        code: 'custom',
        message: 'Credit limit is required when standard rates are enabled',
        path: ['creditLimit'],
      });
    }
  });

/**
 * Lives inside <FormWizard> so it can access useFormWizardContext + useFormContext.
 * Watches `setStandardRates` and adds/removes the injected step reactively.
 */
const ToggleStepContent = ({ control }: { control: any }) => {
  const { currentStep, addStep, removeStep } = useFormWizardContext();
  const setStandardRates = useWatch({ control, name: 'setStandardRates' });

  useEffect(() => {
    if (setStandardRates) {
      // addStep is idempotent — safe to call on every effect without extra guards.
      // Inserts after step id=2 (General Details).
      addStep(
        {
          id: 'standard-rates',
          title: 'Standard Rates',
          description: 'Pricing configuration',
          fields: ['creditLimit'],
        },
        /* afterStepId */ 2,
      );
    } else {
      // autoUnregisterFields (default true) will clear the creditLimit value automatically.
      removeStep('standard-rates');
    }
  }, [setStandardRates, addStep, removeStep]);

  return (
    <FormWizard.Content>
      <div className="space-y-6">
        {currentStep === 1 && (
          <>
            <AccountBasicsFields control={control} />
            <FormWizard.Separator />
            <Form.Field
              control={control}
              name="setStandardRates"
              render={({ field }) => (
                <Form.Item className="flex items-center gap-3 space-y-0">
                  <Form.Control>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </Form.Control>
                  <div className="space-y-1 leading-none">
                    <Form.Label>Set Standard Rates</Form.Label>
                    <p className="text-sm text-muted-fg">
                      Enable advanced selling price configurations — adds a new step
                    </p>
                  </div>
                </Form.Item>
              )}
            />
            {setStandardRates && <SellingPriceTable />}
          </>
        )}

        {currentStep === 2 && <InternalNotesField control={control} />}

        {/* Injected step — only in the list when toggle is ON */}
        {currentStep === 3 && setStandardRates && (
          <>
            <Form.Field
              control={control}
              name="creditLimit"
              render={({ field }) => (
                <Form.Item>
                  <Form.Label>Credit Limit *</Form.Label>
                  <Form.Control>
                    <input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      className={inputCls}
                      placeholder="e.g. 50000"
                    />
                  </Form.Control>
                  <Form.Message />
                </Form.Item>
              )}
            />
            <FormWizard.Separator />
            <StepPlaceholder
              label="Additional rate configuration details go here."
              icon={BarChart3}
            />
          </>
        )}

        {/* Tax step — always last; position shifts depending on toggle */}
        {((currentStep === 3 && !setStandardRates) || currentStep === 4) && (
          <StepPlaceholder
            label="Tax and compliance details go here. Click Submit to finish."
            icon={ShieldCheck}
          />
        )}
      </div>
    </FormWizard.Content>
  );
};

const TOGGLE_INITIAL_STEPS = [
  { id: 1, title: 'Initial Setup', description: 'Basic details', fields: ['accountName', 'accountCode'] },
  { id: 2, title: 'General Details', description: 'Notes & classification', isOptional: true, fields: ['internalNotes'] },
  { id: 3, title: 'Tax & Compliance', description: 'VAT, PAN & rates' },
];

const ToggleInjectsStepDemo = () => {
  const form = useForm({
    mode: 'onChange',
    resolver: zodResolver(toggleSchema),
    defaultValues: {
      accountName: '',
      accountCode: '',
      internalNotes: '',
      setStandardRates: false,
      creditLimit: undefined,
    },
  });

  return (
    <div className="h-[100dvh] w-full bg-bg relative">
      <FormWizard
        form={form}
        initialStep={1}
        steps={TOGGLE_INITIAL_STEPS}
        onSubmit={(data) => {
          console.log('Submitted:', data);
          alert('Submitted! See console for data.');
        }}
      >
        <FormWizard.StepNav title="Create Account" />
        <FormWizard.Container>
          <FormWizard.Header graphic={<Monitor className="w-12 h-12 stroke-[1.25]" />} />
          <ToggleStepContent control={form.control} />
          <FormWizard.Footer
            onCancel={() => console.log('Cancelled')}
            onSave={() => console.log('Saved draft')}
          />
        </FormWizard.Container>
      </FormWizard>
    </div>
  );
};

export const ToggleInjectsAStep: Story = {
  name: 'Toggle Injects a Step',
  render: () => <ToggleInjectsStepDemo />,
  args: {} as React.ComponentProps<typeof FormWizard>,
};

// =============================================================================
// Story 2 — Account Type Branches Steps
// Demonstrates: A radio-selector on step 1 completely swaps the follow-up
// steps depending on the chosen account type (Asset / Liability / Equity).
// Each type has a different set of steps injected via addStep.
// Previously injected steps are removed before the new set is added.
// =============================================================================

const branchSchema = z
  .object({
    accountName: z.string().min(1, 'Account Name is required'),
    accountCode: z.string().min(1, 'Account Code is required'),
    accountType: z.enum(['asset', 'liability', 'equity']).optional(),
    bankName: z.string().optional(),
    bankIfsc: z.string().optional(),
    loanProvider: z.string().optional(),
    loanRate: z.number().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.accountType === 'asset' && !data.bankName) {
      ctx.addIssue({ code: 'custom', message: 'Bank name is required', path: ['bankName'] });
    }
    if (data.accountType === 'liability' && !data.loanProvider) {
      ctx.addIssue({ code: 'custom', message: 'Loan provider is required', path: ['loanProvider'] });
    }
  });

type AccountType = 'asset' | 'liability' | 'equity';

const ACCOUNT_TYPE_OPTIONS: {
  value: AccountType;
  label: string;
  description: string;
  icon: React.ElementType;
}[] = [
  { value: 'asset', label: 'Asset', description: 'Bank accounts, receivables', icon: Landmark },
  { value: 'liability', label: 'Liability', description: 'Loans, payables', icon: CreditCard },
  { value: 'equity', label: 'Equity', description: 'Capital & retained earnings', icon: Building2 },
];

// Step definitions per account type — injected dynamically
const BRANCH_STEPS_BY_TYPE: Record<
  AccountType,
  Array<{ id: string; title: string; description: string; fields?: string[] }>
> = {
  asset: [
    { id: 'asset-bank', title: 'Bank Details', description: 'Bank name & IFSC', fields: ['bankName', 'bankIfsc'] },
    { id: 'asset-docs', title: 'Documents', description: 'Supporting documents' },
  ],
  liability: [
    { id: 'liability-loan', title: 'Loan Details', description: 'Provider & interest rate', fields: ['loanProvider', 'loanRate'] },
    { id: 'liability-terms', title: 'Repayment Terms', description: 'EMI schedule' },
  ],
  equity: [
    { id: 'equity-review', title: 'Review & Confirm', description: 'Equity summary' },
  ],
};

// All possible dynamic step ids — used for cleanup before swapping
const ALL_TYPE_STEP_IDS = Object.values(BRANCH_STEPS_BY_TYPE).flatMap((steps) =>
  steps.map((s) => s.id),
);

const AccountTypeSelector = ({ control }: { control: any }) => {
  const accountType = useWatch({ control, name: 'accountType' }) as AccountType | undefined;
  return (
    <div className="space-y-2.5 mt-1">
      <p className="text-xs text-muted-fg">
        Select an account type. Additional steps will appear in the sidebar based on your choice.
      </p>
      {ACCOUNT_TYPE_OPTIONS.map(({ value, label, description, icon: Icon }) => {
        const isSelected = accountType === value;
        return (
          <Form.Field
            key={value}
            control={control}
            name="accountType"
            render={({ field }) => (
              <label
                className={`flex items-center gap-4 p-3.5 rounded-lg border-2 cursor-pointer transition-all ${
                  isSelected ? 'border-primary bg-primary/5' : 'border-border hover:border-outline'
                }`}
              >
                <input
                  type="radio"
                  value={value}
                  checked={isSelected}
                  onChange={() => field.onChange(value)}
                  className="sr-only"
                />
                <Icon
                  className={`w-5 h-5 flex-shrink-0 ${isSelected ? 'text-primary' : 'text-muted-fg'}`}
                  strokeWidth={1.5}
                />
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-semibold ${isSelected ? 'text-primary' : 'text-fg'}`}>
                    {label}
                  </p>
                  <p className="text-xs text-muted-fg">{description}</p>
                </div>
                {isSelected && <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />}
              </label>
            )}
          />
        );
      })}
    </div>
  );
};

const BranchContent = ({ control }: { control: any }) => {
  const { currentStep, addStep, removeStep } = useFormWizardContext();
  const accountType = useWatch({ control, name: 'accountType' }) as AccountType | undefined;

  // When account type changes:
  // 1. Remove all previously injected type-specific steps (idempotent — no-ops for missing ids).
  // 2. Inject the new type's steps in order, chaining afterStepId to preserve sequence.
  useEffect(() => {
    ALL_TYPE_STEP_IDS.forEach((id) => removeStep(id));

    if (!accountType) return;

    const typeSteps = BRANCH_STEPS_BY_TYPE[accountType];
    typeSteps.forEach((step, i) => {
      const afterId = i === 0 ? 1 : typeSteps[i - 1].id;
      addStep(step, afterId);
    });
  }, [accountType, addStep, removeStep]);

  return (
    <FormWizard.Content>
      <div className="space-y-6">
        {/* Step 1 — always: account basics + type selector */}
        {currentStep === 1 && (
          <>
            <AccountBasicsFields control={control} />
            <FormWizard.Separator />
            <Form.Item>
              <Form.Label>Account Type</Form.Label>
              <AccountTypeSelector control={control} />
            </Form.Item>
          </>
        )}

        {/* Asset branch */}
        {currentStep === 2 && accountType === 'asset' && (
          <>
            <Form.Field
              control={control}
              name="bankName"
              render={({ field }) => (
                <Form.Item>
                  <Form.Label>Bank Name *</Form.Label>
                  <Form.Control>
                    <input {...field} className={inputCls} placeholder="e.g. HDFC Bank" />
                  </Form.Control>
                  <Form.Message />
                </Form.Item>
              )}
            />
            <FormWizard.Separator />
            <Form.Field
              control={control}
              name="bankIfsc"
              render={({ field }) => (
                <Form.Item>
                  <Form.Label>IFSC Code</Form.Label>
                  <Form.Control>
                    <input {...field} className={inputCls} placeholder="e.g. HDFC0001234" />
                  </Form.Control>
                  <Form.Message />
                </Form.Item>
              )}
            />
          </>
        )}
        {currentStep === 3 && accountType === 'asset' && (
          <StepPlaceholder
            label="Upload supporting documents for this asset account."
            icon={FileText}
          />
        )}

        {/* Liability branch */}
        {currentStep === 2 && accountType === 'liability' && (
          <>
            <Form.Field
              control={control}
              name="loanProvider"
              render={({ field }) => (
                <Form.Item>
                  <Form.Label>Loan Provider *</Form.Label>
                  <Form.Control>
                    <input {...field} className={inputCls} placeholder="e.g. SBI Loans" />
                  </Form.Control>
                  <Form.Message />
                </Form.Item>
              )}
            />
            <FormWizard.Separator />
            <Form.Field
              control={control}
              name="loanRate"
              render={({ field }) => (
                <Form.Item>
                  <Form.Label>Interest Rate (%)</Form.Label>
                  <Form.Control>
                    <input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      className={inputCls}
                      placeholder="e.g. 8.5"
                    />
                  </Form.Control>
                  <Form.Message />
                </Form.Item>
              )}
            />
          </>
        )}
        {currentStep === 3 && accountType === 'liability' && (
          <StepPlaceholder label="Configure the repayment schedule and EMI details." icon={BarChart3} />
        )}

        {/* Equity branch */}
        {currentStep === 2 && accountType === 'equity' && (
          <StepPlaceholder
            label="Review the equity account summary before confirming."
            icon={ShieldCheck}
          />
        )}

        {/* No type selected fallback */}
        {currentStep === 2 && !accountType && (
          <div className="py-8 text-center text-muted-fg">
            <p className="text-sm">Please go back to Step 1 and select an account type first.</p>
          </div>
        )}
      </div>
    </FormWizard.Content>
  );
};

const BRANCH_INITIAL_STEPS = [
  { id: 1, title: 'Account Basics', description: 'Name, code & type', fields: ['accountName', 'accountCode'] },
];

const AccountTypeBranchesDemo = () => {
  const form = useForm({
    mode: 'onChange',
    resolver: zodResolver(branchSchema),
    defaultValues: {
      accountName: '',
      accountCode: '',
      accountType: undefined,
      bankName: '',
      bankIfsc: '',
      loanProvider: '',
      loanRate: undefined,
    },
  });

  return (
    <div className="h-[100dvh] w-full bg-bg relative">
      <FormWizard
        form={form}
        initialStep={1}
        steps={BRANCH_INITIAL_STEPS}
        onSubmit={(data) => {
          console.log('Submitted:', data);
          alert('Submitted! See console for data.');
        }}
      >
        <FormWizard.StepNav title="New Account" />
        <FormWizard.Container>
          <FormWizard.Header graphic={<Building2 className="w-12 h-12 stroke-[1.25]" />} />
          <BranchContent control={form.control} />
          <FormWizard.Footer
            onCancel={() => console.log('Cancelled')}
            onSave={() => console.log('Saved draft')}
          />
        </FormWizard.Container>
      </FormWizard>
    </div>
  );
};

export const AccountTypesBranchSteps: Story = {
  name: 'Account Type Branches Steps',
  render: () => <AccountTypeBranchesDemo />,
  args: {} as React.ComponentProps<typeof FormWizard>,
};

// =============================================================================
// Story 3 — Live Step Title & Description via updateStep
// Demonstrates: updateStep changing a step's title and description reactively
// as the user types — no add/remove involved. The sidebar reflects the live
// account name in the step title as the user fills step 1.
// =============================================================================

const updateSchema = z.object({
  accountName: z.string().min(1, 'Account Name is required'),
  accountCode: z.string().min(1, 'Account Code is required'),
  internalNotes: z.string().optional(),
});

const UPDATE_STEPS = [
  { id: 1, title: 'Initial Setup', description: 'Basic details', fields: ['accountName', 'accountCode'] },
  { id: 2, title: 'General Details', description: 'Notes & classification', isOptional: true, fields: ['internalNotes'] },
  { id: 3, title: 'Tax & Compliance', description: 'VAT, PAN & rates' },
];

const LiveUpdateContent = ({ control }: { control: any }) => {
  const { currentStep, updateStep } = useFormWizardContext();
  const accountName = useWatch({ control, name: 'accountName' });

  // As the user types the account name on step 1, step 3's title in the
  // sidebar updates live to reflect the entity name.
  useEffect(() => {
    updateStep(3, {
      title: accountName ? `Tax — ${accountName}` : 'Tax & Compliance',
      description: accountName
        ? `Compliance details for ${accountName}`
        : 'VAT, PAN & rates',
    });
  }, [accountName, updateStep]);

  return (
    <FormWizard.Content>
      <div className="space-y-6">
        {currentStep === 1 && (
          <>
            <p className="text-xs text-muted-fg -mt-2 p-3 bg-primary/5 rounded-lg border border-primary/20">
              💡 <strong>Watch the sidebar:</strong> Step 3's title and description update live as
              you type the Account Name below.
            </p>
            <AccountBasicsFields control={control} />
          </>
        )}

        {currentStep === 2 && <InternalNotesField control={control} />}

        {currentStep === 3 && (
          <StepPlaceholder
            label={
              accountName
                ? `Tax & compliance setup for "${accountName}".`
                : 'Tax and compliance details go here.'
            }
            icon={ShieldCheck}
          />
        )}
      </div>
    </FormWizard.Content>
  );
};

const LiveStepTitleUpdateDemo = () => {
  const form = useForm({
    mode: 'onChange',
    resolver: zodResolver(updateSchema),
    defaultValues: { accountName: '', accountCode: '', internalNotes: '' },
  });

  return (
    <div className="h-[100dvh] w-full bg-bg relative">
      <FormWizard
        form={form}
        initialStep={1}
        steps={UPDATE_STEPS}
        onSubmit={(data) => {
          console.log('Submitted:', data);
          alert('Submitted! See console for data.');
        }}
      >
        <FormWizard.StepNav title="Create Account" />
        <FormWizard.Container>
          <FormWizard.Header graphic={<Monitor className="w-12 h-12 stroke-[1.25]" />} />
          <LiveUpdateContent control={form.control} />
          <FormWizard.Footer
            onCancel={() => console.log('Cancelled')}
            onSave={() => console.log('Saved draft')}
          />
        </FormWizard.Container>
      </FormWizard>
    </div>
  );
};

export const LiveStepTitleUpdates: Story = {
  name: 'Live Step Title Updates (updateStep)',
  render: () => <LiveStepTitleUpdateDemo />,
  args: {} as React.ComponentProps<typeof FormWizard>,
};
