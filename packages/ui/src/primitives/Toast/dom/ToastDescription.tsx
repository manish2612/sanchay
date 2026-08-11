import * as React from 'react';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { cn } from '../../../utils';
import { useToastContext } from './ToastRoot';
import { type ToastDensity } from './styles.dom';

const descriptionDensityStyles: Record<ToastDensity, string> = {
  compact: 'text-[11px] opacity-90 leading-normal',
  comfortable: 'text-xs opacity-90 leading-relaxed',
  spacious: 'text-sm opacity-90 leading-relaxed',
};

export interface ToastDescriptionProps
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Description> {
  density?: ToastDensity;
}

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Description>,
  ToastDescriptionProps
>(({ className, density: densityProp, ...props }, ref) => {
  const context = useToastContext();
  const density = densityProp ?? context.density ?? 'comfortable';

  return (
    <ToastPrimitive.Description
      ref={ref}
      className={cn(descriptionDensityStyles[density], className)}
      {...props}
    />
  );
});

ToastDescription.displayName = ToastPrimitive.Description.displayName;

export { ToastDescription };
