import * as React from 'react';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { cn } from '../../../utils';
import { useToastContext } from './ToastRoot';
import { type ToastDensity } from './styles.dom';

const titleDensityStyles: Record<ToastDensity, string> = {
  compact: 'text-xs font-semibold leading-tight',
  comfortable: 'text-sm font-semibold leading-tight',
  spacious: 'text-base font-semibold leading-snug',
};

export interface ToastTitleProps
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Title> {
  density?: ToastDensity;
}

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Title>,
  ToastTitleProps
>(({ className, density: densityProp, ...props }, ref) => {
  const context = useToastContext();
  const density = densityProp ?? context.density ?? 'comfortable';

  return (
    <ToastPrimitive.Title
      ref={ref}
      className={cn(titleDensityStyles[density], className)}
      {...props}
    />
  );
});

ToastTitle.displayName = ToastPrimitive.Title.displayName;

export { ToastTitle };
