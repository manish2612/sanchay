import * as React from 'react';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { cn } from '../../../utils';
import { Icon } from '../../Icon/Icon.dom';
import { type IconName } from '../../Icon/types';
import {
  toastVariants,
  type ToastVariant,
  type ToastDensity,
} from './styles.dom';

export interface ToastContextValue {
  variant?: ToastVariant;
  density?: ToastDensity;
}

export const ToastContext = React.createContext<ToastContextValue>({
  variant: 'default',
  density: 'comfortable',
});

export const useToastContext = () => React.useContext(ToastContext);

export interface ToastRootProps
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root> {
  variant?: ToastVariant;
  density?: ToastDensity;
  icon?: IconName | React.ReactNode;
  showIcon?: boolean;
}

const defaultVariantIconMap: Record<ToastVariant, IconName> = {
  default: 'Bell',
  info: 'Info',
  success: 'BadgeCheck',
  warning: 'TriangleAlert',
  destructive: 'BadgeAlert',
};

const defaultVariantIconColorMap: Record<ToastVariant, string> = {
  default: 'text-foreground',
  info: 'text-blue-600 dark:text-blue-400',
  success: 'text-emerald-600 dark:text-emerald-400',
  warning: 'text-amber-600 dark:text-amber-400',
  destructive: 'text-destructive dark:text-red-400',
};

const iconSizeMap: Record<ToastDensity, number> = {
  compact: 20,
  comfortable: 24,
  spacious: 32,
};

const ToastRoot = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Root>,
  ToastRootProps
>(
  (
    {
      className,
      variant = 'default',
      density = 'comfortable',
      icon,
      showIcon = true,
      children,
      ...props
    },
    ref
  ) => {
    const contextValue = React.useMemo(
      () => ({ variant, density }),
      [variant, density]
    );

    const renderIcon = () => {
      if (!showIcon && !icon) return null;
      if (React.isValidElement(icon)) return icon;

      const iconName = (
        typeof icon === 'string'
          ? icon
          : defaultVariantIconMap[variant]
      ) as IconName;

      const size = iconSizeMap[density];

      return (
        <div className="shrink-0 flex items-center justify-center pt-0.5">
          <Icon
            name={iconName}
            size={size}
            className={cn(defaultVariantIconColorMap[variant])}
          />
        </div>
      );
    };

    return (
      <ToastContext.Provider value={contextValue}>
        <ToastPrimitive.Root
          ref={ref}
          className={cn(toastVariants({ variant, density }), className)}
          {...props}
        >
          <div className="flex w-full items-start gap-3">
            {renderIcon()}
            <div className="grid flex-1 gap-1 pr-6">{children}</div>
          </div>
        </ToastPrimitive.Root>
      </ToastContext.Provider>
    );
  }
);

ToastRoot.displayName = ToastPrimitive.Root.displayName;

export { ToastRoot };
