import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { cn } from '../../../utils';
import {
  accordionVariants,
  type AccordionDensity,
  type AccordionVariant,
} from './styles.dom';

export interface AccordionContextValue {
  density?: AccordionDensity;
  variant?: AccordionVariant;
}

export const AccordionContext = React.createContext<AccordionContextValue>({
  density: 'comfortable',
  variant: 'default',
});

export const useAccordionContext = () => React.useContext(AccordionContext);

export type AccordionSingleProps = AccordionPrimitive.AccordionSingleProps & {
  density?: AccordionDensity;
  variant?: AccordionVariant;
  className?: string;
};

export type AccordionMultipleProps = AccordionPrimitive.AccordionMultipleProps & {
  density?: AccordionDensity;
  variant?: AccordionVariant;
  className?: string;
};

export type AccordionProps = AccordionSingleProps | AccordionMultipleProps;

const AccordionRoot = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  AccordionProps
>(({ className, density = 'comfortable', variant = 'default', children, ...props }, ref) => {
  const contextValue = React.useMemo(
    () => ({ density, variant }),
    [density, variant]
  );

  return (
    <AccordionContext.Provider value={contextValue}>
      <AccordionPrimitive.Root
        ref={ref}
        className={cn(accordionVariants({ variant }), className)}
        {...(props as React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>)}
      >
        {children}
      </AccordionPrimitive.Root>
    </AccordionContext.Provider>
  );
});


AccordionRoot.displayName = 'Accordion';

export { AccordionRoot };
