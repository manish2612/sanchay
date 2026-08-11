import * as React from 'react';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { cn } from '../../../utils';
import { useToastContext } from './ToastRoot';
import { toastActionVariants, type ToastDensity } from './styles.dom';

export interface ToastActionProps
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Action> {
  density?: ToastDensity;
}

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Action>,
  ToastActionProps
>(({ className, density: densityProp, ...props }, ref) => {
  const context = useToastContext();
  const density = densityProp ?? context.density ?? 'comfortable';

  return (
    <ToastPrimitive.Action
      ref={ref}
      className={cn(toastActionVariants({ density }), className)}
      {...props}
    />
  );
});

ToastAction.displayName = ToastPrimitive.Action.displayName;

export { ToastAction };
