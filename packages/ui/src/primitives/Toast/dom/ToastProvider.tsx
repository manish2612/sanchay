import * as React from 'react';
import * as ToastPrimitive from '@radix-ui/react-toast';

export type ToastProviderProps = React.ComponentPropsWithoutRef<typeof ToastPrimitive.Provider>;

const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  swipeDirection = 'right',
  duration = 5000,
  label = 'Notifications (F8)',
  ...props
}) => {
  return (
    <ToastPrimitive.Provider
      swipeDirection={swipeDirection}
      duration={duration}
      label={label}
      {...props}
    >
      {children}
    </ToastPrimitive.Provider>
  );
};

ToastProvider.displayName = 'ToastProvider';

export { ToastProvider };
