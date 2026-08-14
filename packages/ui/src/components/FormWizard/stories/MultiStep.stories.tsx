import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FormWizard, Form, useFormWizardContext, Switch, Table } from '../../../index';
import { Monitor } from 'lucide-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { flexRender, createColumnHelper } from '@tanstack/react-table';

type SellingPrice = {
  srNo: string;
  fromDate: string;
  mrp: string;
  netRate: string;
  rate: string;
};

const columnHelper = createColumnHelper<SellingPrice>();
const columns = [
  columnHelper.accessor('srNo', {
    header: 'Sr.No.',
    cell: info => info.getValue(),
    size: 60,
  }),
  columnHelper.accessor('fromDate', {
    header: 'From Date',
    cell: info => <input type="date" defaultValue={info.getValue()} className="h-8 px-2 w-full bg-transparent border border-border rounded-md focus:ring-1 focus:ring-primary outline-none" />,
    size: 150,
  }),
  columnHelper.accessor('mrp', {
    header: 'MRP',
    cell: info => <span className="text-muted-fg">{info.getValue()}</span>,
    size: 100,
  }),
  columnHelper.accessor('netRate', {
    header: 'Net Rate',
    cell: info => <span className="text-muted-fg">{info.getValue()}</span>,
    size: 100,
  }),
  columnHelper.accessor('rate', {
    header: 'Rate',
    cell: info => <input type="number" placeholder="0.00" defaultValue={info.getValue()} className="h-8 px-2 w-full bg-transparent border border-border rounded-md focus:ring-1 focus:ring-primary outline-none" />,
    size: 150,
  })
];

const mockData = [
  {
    srNo: '1',
    fromDate: '2026-08-13',
    mrp: 'MRP',
    netRate: 'Net Rate',
    rate: '',
  }
];

const meta = {
  title: 'Components/FormWizard/MultiStep',
  component: FormWizard,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof FormWizard>;

export default meta;
type Story = StoryObj<typeof meta>;

const formSchema = z.object({
  accountName: z.string().min(1, 'Account Name is required'),
  accountCode: z.string().min(1, 'Account Code is required'),
  internalNotes: z.string().optional(),
  setStandardRates: z.boolean().optional(),
});

const STEPS = [
  {
    id: 1,
    title: 'Initial Setup',
    description: 'Basic details',
    fields: ['accountName', 'accountCode'],
  },
  {
    id: 2,
    title: 'General Details',
    description: 'Name, code & classification',
    isOptional: true,
    fields: ['internalNotes'],
  },
  {
    id: 3,
    title: 'Tax & Compliance',
    description: 'VAT, PAN & rates',
  },
];

const DemoWizardContent = ({ form }: { form: any }) => {
  const { currentStep } = useFormWizardContext();

  return (
    <FormWizard.Content>
      <div className="space-y-6">
        {currentStep === 1 && (
          <>
            <Form.Field
              control={form.control}
              name="accountName"
              render={({ field }) => (
                <Form.Item>
                  <Form.Label>Account Name *</Form.Label>
                  <Form.Control>
                    <input
                      {...field}
                      className="w-full h-10 px-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-transparent text-foreground"
                      placeholder="e.g. Current Assets"
                    />
                  </Form.Control>
                  <Form.Message />
                </Form.Item>
              )}
            />

            <FormWizard.Separator />

            <Form.Field
              control={form.control}
              name="accountCode"
              render={({ field }) => (
                <Form.Item>
                  <Form.Label>Account Code *</Form.Label>
                  <Form.Control>
                    <input
                      {...field}
                      className="w-full h-10 px-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-transparent text-foreground"
                      placeholder="e.g. 1000"
                    />
                  </Form.Control>
                  <Form.Message />
                </Form.Item>
              )}
            />

            <FormWizard.Separator />

            <div className="flex flex-col gap-1">
              <Form.Field
                control={form.control}
                name="setStandardRates"
                render={({ field }) => (
                  <Form.Item className="flex items-center gap-3 space-y-0">
                    <Form.Control>
                      <Switch 
                        checked={field.value} 
                        onCheckedChange={field.onChange} 
                      />
                    </Form.Control>
                    <div className="space-y-1 leading-none">
                      <Form.Label>Set Standard Rates</Form.Label>
                      <p className="text-sm text-muted-fg">
                        Enable advanced selling price configurations
                      </p>
                    </div>
                  </Form.Item>
                )}
              />
            </div>

            {form.watch('setStandardRates') && (
              <div className="mt-4 animate-in fade-in slide-in-from-top-4">
                <Table.Root data={mockData} columns={columns}>
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
                            style={{
                              width: cell.column.getSize(),
                              flex: `${cell.column.getSize()} 0 auto`,
                            }}
                          >
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </Table.Cell>
                        ))}
                      </Table.Row>
                    )}
                  </Table.Body>
                </Table.Root>
              </div>
            )}
          </>
        )}

        {currentStep === 2 && (
          <>
            <Form.Field
              control={form.control}
              name="internalNotes"
              render={({ field }) => (
                <Form.Item>
                  <Form.Label>Internal Notes (Optional)</Form.Label>
                  <Form.Control>
                    <textarea
                      {...field}
                      rows={4}
                      className="w-full p-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-transparent text-foreground resize-none"
                      placeholder="Add any internal classification notes here..."
                    />
                  </Form.Control>
                  <Form.Message />
                </Form.Item>
              )}
            />
          </>
        )}

        {currentStep === 3 && (
          <div className="py-8 text-center text-muted-fg">
            <p>Tax and compliance details go here.</p>
            <p className="text-sm mt-2">Click Submit to finish the setup.</p>
          </div>
        )}
      </div>
    </FormWizard.Content>
  );
};

const MultiStepDemo = () => {
  const form = useForm({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
    defaultValues: {
      accountName: '',
      accountCode: '',
      internalNotes: '',
      setStandardRates: false,
    },
  });

  const onSubmit = (data: any) => {
    console.log('Submitted data:', data);
    alert('Form submitted! See console for data.');
  };

  return (
    <div className="h-[100dvh] w-full bg-bg relative">
      <FormWizard form={form} initialStep={1} steps={STEPS} onSubmit={onSubmit}>
        <FormWizard.StepNav title="Create Account" />

        <FormWizard.Container>
          <FormWizard.Header graphic={<Monitor className="w-12 h-12 stroke-[1.25]" />} />

          <DemoWizardContent form={form} />

          <FormWizard.Footer
            onCancel={() => console.log('Cancelled')}
            onSave={() => console.log('Saved draft')}
          />
        </FormWizard.Container>
      </FormWizard>
    </div>
  );
};

export const Default: Story = {
  render: () => <MultiStepDemo />,
  args: {} as React.ComponentProps<typeof FormWizard>,
};
