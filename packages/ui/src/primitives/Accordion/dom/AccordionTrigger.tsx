import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { cn } from '../../../utils';
import { Icon } from '../../Icon/Icon.dom';
import { IconName } from '../../Icon/types';
import {
  accordionTriggerVariants,
  accordionChevronVariants,
  type AccordionDensity,
} from './styles.dom';
import { useAccordionContext } from './AccordionRoot';

export interface AccordionTriggerProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> {
  density?: AccordionDensity;
  icon?: string | React.ReactNode;
  iconClassName?: string;
  hideChevron?: boolean;
  chevronIcon?: React.ReactNode;
}

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  AccordionTriggerProps
>(
  (
    {
      className,
      children,
      density: densityProp,
      icon,
      iconClassName,
      hideChevron = false,
      chevronIcon,
      ...props
    },
    ref
  ) => {
    const context = useAccordionContext();
    const density = densityProp ?? context.density ?? 'comfortable';

    const iconSizeMap: Record<AccordionDensity, number> = {
      compact: 14,
      comfortable: 16,
      spacious: 18,
    };

    const iconSize = iconSizeMap[density];

    const renderLeadIcon = () => {
      if (!icon) return null;
      if (typeof icon === 'string') {
        return (
          <Icon
            name={icon as IconName}
            size={iconSize}
            className={cn('shrink-0 text-muted-foreground', iconClassName)}
          />
        );
      }
      return <span className={cn('shrink-0 flex items-center justify-center', iconClassName)}>{icon}</span>;
    };

    return (
      <AccordionPrimitive.Header className="flex">
        <AccordionPrimitive.Trigger
          ref={ref}
          className={cn(accordionTriggerVariants({ density }), className)}
          {...props}
        >
          <span className="flex items-center gap-2.5 min-w-0 text-left">
            {renderLeadIcon()}
            <span className="truncate">{children}</span>
          </span>

          {!hideChevron && (
            chevronIcon ? (
              <span className={cn(accordionChevronVariants(), 'flex items-center justify-center')}>
                {chevronIcon}
              </span>
            ) : (
              <Icon
                name="ChevronDown"
                size={iconSize}
                className={accordionChevronVariants()}
              />
            )
          )}
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>
    );
  }
);

AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

export { AccordionTrigger };
