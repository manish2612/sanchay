'use client';

import React, { useEffect, useRef } from 'react';
import { useDropdownContext } from './DropdownRoot';
import { TextInput } from '../../TextInput/TextInput.dom';
import { Icon } from '../../Icon/Icon.dom';
import { dropdownSearchClassName, dropdownSearchContainerClassName } from './styles.dom';

interface DropdownSearchProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const DropdownSearch = React.forwardRef<HTMLInputElement, DropdownSearchProps>(
  ({ style, className, ...props }, ref) => {
    const context = useDropdownContext();
    // Removed useTheme

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      context?.setSearchQuery(e.target.value);
      props.onChange?.(e);
    };

    return (
      <div className={dropdownSearchContainerClassName} style={style}>
        <TextInput
          className={dropdownSearchClassName}
          leftSlot={<Icon name="Search" size={16} className="text-muted-foreground" />}
          ref={ref}
          placeholder="Search..."
          value={context?.searchQuery}
          inputClassName="rounded-none"
          onChange={handleChange}
          autoFocus
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') {
              e.preventDefault();
              const content = e.currentTarget.closest('[role="menu"]');
              if (content) {
                const items = content.querySelectorAll(
                  '[role="menuitem"]:not([aria-disabled="true"])',
                );
                if (items.length > 0) {
                  (items[0] as HTMLElement).focus();
                }
              }
              return;
            }

            if (e.key === 'ArrowUp') {
              e.preventDefault();
              return;
            }

            if (e.key === 'Enter' || e.key === 'Escape') {
              return;
            }

            e.stopPropagation();
          }}
          {...props}
        />
      </div>
    );
  },
);

DropdownSearch.displayName = 'DropdownSearch';

export { DropdownSearch };
