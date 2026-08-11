import * as React from 'react';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { cn } from '../../../utils';
import { Icon } from '../../Icon/Icon.dom';
import { useToastContext } from './ToastRoot';
import { toastCloseVariants, type ToastDensity } from './styles.dom';

export interface ToastCloseProps
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Close> {
  density?: ToastDensity;
}

const closeIconSizeMap: Record<ToastDensity, number> = {
  compact: 12,
  comfortable: 16,
  spacious: 18,
};

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Close>,
  ToastCloseProps
>(({ className, density: densityProp, children, ...props }, ref) => {
  const context = useToastContext();
  const density = densityProp ?? context.density ?? 'comfortable';

  return (
    <ToastPrimitive.Close
      ref={ref}
      className={cn(toastCloseVariants({ density }), className)}
      toast-close=""
      {...props}
    >
      {children || (
        <>
          <Icon name="X" size={closeIconSizeMap[density]} />
          <span className="sr-only">Close</span>
        </>
      )}
    </ToastPrimitive.Close>
  );
});

ToastClose.displayName = ToastPrimitive.Close.displayName;

export { ToastClose };
