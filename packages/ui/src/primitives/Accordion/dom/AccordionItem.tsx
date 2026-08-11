import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { cn } from '../../../utils';
import { accordionItemVariants, type AccordionVariant } from './styles.dom';
import { useAccordionContext } from './AccordionRoot';

export interface AccordionItemProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> {
  variant?: AccordionVariant;
}

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  AccordionItemProps
>(({ className, variant: variantProp, ...props }, ref) => {
  const context = useAccordionContext();
  const variant = variantProp ?? context.variant;

  return (
    <AccordionPrimitive.Item
      ref={ref}
      className={cn(accordionItemVariants({ variant }), className)}
      {...props}
    />
  );
});

AccordionItem.displayName = 'AccordionItem';

export { AccordionItem };
