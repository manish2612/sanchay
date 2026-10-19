import React, { useEffect, useRef } from 'react';
import { TextInput, Icon } from '@prime/ui';
import { searchInputClasses } from './styles.dom';

export interface MasterSearchBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onClear: () => void;
  placeholder?: string;
  id?: string;
  className?: string;
  enableShortcut?: boolean;
}

export function MasterSearchBar({
  searchQuery,
  onSearchChange,
  onClear,
  placeholder = 'Search records...',
  id = 'master-list-search',
  className = searchInputClasses,
  enableShortcut = true,
}: MasterSearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!enableShortcut) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === '/' &&
        !(
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        )
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [enableShortcut]);

  return (
    <div className="w-full sm:w-auto">
      <TextInput
        ref={inputRef}
        id={id}
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className={className}
        leftSlot={<Icon name="Search" size={14} className="opacity-50" />}
        rightSlot={
          searchQuery ? (
            <button
              type="button"
              onClick={onClear}
              className="text-muted-foreground hover:text-foreground transition-colors p-0.5"
              aria-label="Clear search"
            >
              <Icon name="X" size={13} />
            </button>
          ) : (
            <div className="hidden sm:flex items-center justify-center w-4 h-4 rounded border border-border bg-muted/60 text-[10px] font-mono text-muted-foreground select-none">
              /
            </div>
          )
        }
        aria-label={placeholder}
      />
    </div>
  );
}
