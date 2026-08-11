import { cva, type VariantProps } from 'class-variance-authority';

export type AccordionDensity = 'compact' | 'comfortable' | 'spacious';
export type AccordionVariant = 'default' | 'bordered' | 'separated' | 'ghost';

export const accordionVariants = cva('w-full', {
  variants: {
    variant: {
      default: 'divide-y divide-border border-y border-border',
      bordered: 'rounded-lg border border-border divide-y divide-border overflow-hidden bg-card',
      separated: 'space-y-3',
      ghost: 'divide-y divide-transparent',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const accordionItemVariants = cva(
  'transition-colors focus-within:relative focus-within:z-10',
  {
    variants: {
      variant: {
        default: '',
        bordered: 'bg-card',
        separated: 'rounded-lg border border-border bg-card shadow-xs overflow-hidden',
        ghost: 'rounded-md hover:bg-muted/40',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export const accordionTriggerVariants = cva(
  'flex flex-1 items-center justify-between w-full font-medium text-foreground transition-all duration-200 hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg.accordion-chevron]:rotate-180',
  {
    variants: {
      density: {
        compact: 'py-2 px-3 text-xs gap-2',
        comfortable: 'py-3 px-4 text-sm gap-2.5',
        spacious: 'py-4 px-5 text-base gap-3',
      },
    },
    defaultVariants: {
      density: 'comfortable',
    },
  }
);

export const accordionContentVariants = cva(
  'overflow-hidden text-muted-foreground transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
  {
    variants: {
      density: {
        compact: 'px-3 pb-2 pt-0 text-xs',
        comfortable: 'px-4 pb-3 pt-0 text-sm',
        spacious: 'px-5 pb-4 pt-0 text-base',
      },
    },
    defaultVariants: {
      density: 'comfortable',
    },
  }
);

export const accordionChevronVariants = cva(
  'accordion-chevron shrink-0 text-muted-foreground transition-transform duration-200'
);

export type AccordionVariantsProps = VariantProps<typeof accordionVariants>;
export type AccordionItemVariantsProps = VariantProps<typeof accordionItemVariants>;
export type AccordionTriggerVariantsProps = VariantProps<typeof accordionTriggerVariants>;
export type AccordionContentVariantsProps = VariantProps<typeof accordionContentVariants>;
