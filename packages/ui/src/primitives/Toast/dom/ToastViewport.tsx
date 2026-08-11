import * as React from 'react';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { cn } from '../../../utils';
import { toastViewportVariants, type ToastPosition } from './styles.dom';

export interface ToastViewportProps
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport> {
  position?: ToastPosition;
}

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Viewport>,
  ToastViewportProps
>(({ className, position = 'bottom-right', hotkey = ['F8'], label = 'Notifications (F8)', ...props }, ref) => (
  <ToastPrimitive.Viewport
    ref={ref}
    hotkey={hotkey}
    label={label}
    className={cn(toastViewportVariants({ position }), className)}
    {...props}
  />
));

ToastViewport.displayName = ToastPrimitive.Viewport.displayName;

export { ToastViewport };
