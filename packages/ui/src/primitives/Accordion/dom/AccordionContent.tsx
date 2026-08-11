import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { cn } from '../../../utils';
import {
  accordionContentVariants,
  type AccordionDensity,
} from './styles.dom';
import { useAccordionContext } from './AccordionRoot';

export interface AccordionContentProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> {
  density?: AccordionDensity;
  containerClassName?: string;
}

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  AccordionContentProps
>(({ className, children, density: densityProp, containerClassName, ...props }, ref) => {
  const context = useAccordionContext();
  const density = densityProp ?? context.density ?? 'comfortable';

  return (
    <AccordionPrimitive.Content
      ref={ref}
      className={cn(
        'overflow-hidden transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
        containerClassName
      )}
      {...props}
    >
      <div className={cn(accordionContentVariants({ density }), className)}>
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
});

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { AccordionContent };
