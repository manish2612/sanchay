import React from 'react';
import { Icon, Button, IconName } from '@prime/ui';
import { MasterBreadcrumb } from './MasterBreadcrumb.dom';
import {
  pageHeaderWrapperClasses,
  headerTitleWrapperClasses,
  titleSectionClasses,
  entityIconWrapperClasses,
  titleClasses,
  subtitleClasses,
  countBadgeClasses,
} from './styles.dom';

export interface MasterListHeaderProps {
  domain?: string;
  masterName: string;
  entityIcon: IconName;
  totalCount: number;
  itemLabel?: { singular: string; plural: string };
  subtitle: string;
  isLoading?: boolean;
  onRefresh: () => void;
  onAddNew: () => void;
  addNewLabel?: string;
  hubPath?: string;
  hubLabel?: string;
  extraActions?: React.ReactNode;
}

export function MasterListHeader({
  domain = 'Accounting',
  masterName,
  entityIcon,
  totalCount,
  itemLabel,
  subtitle,
  isLoading = false,
  onRefresh,
  onAddNew,
  addNewLabel,
  hubPath = '/masters',
  hubLabel = 'Masters Hub',
  extraActions,
}: MasterListHeaderProps) {
  const singular = itemLabel?.singular ?? masterName.toLowerCase();
  const plural = itemLabel?.plural ?? `${singular}s`;
  const countText = `${totalCount} ${totalCount === 1 ? singular : plural}`;
  const addActionText = addNewLabel ?? `Add ${masterName}`;

  return (
    <div className={pageHeaderWrapperClasses}>
      {/* Top Breadcrumb */}
      <MasterBreadcrumb
        domain={domain}
        masterName={masterName}
        hubPath={hubPath}
        hubLabel={hubLabel}
      />

      {/* Main Header Title & Primary Action Controls */}
      <div className={headerTitleWrapperClasses}>
        <div className={titleSectionClasses}>
          <div className={entityIconWrapperClasses}>
            <Icon name={entityIcon} size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className={titleClasses}>{masterName}</h1>
              <span className={countBadgeClasses}>{countText}</span>
            </div>
            <p className={subtitleClasses}>{subtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          {extraActions}

          <Button
            variant="outline"
            size="sm"
            className="h-9 px-3 text-muted-foreground hover:text-foreground"
            onClick={onRefresh}
            title={`Refresh ${masterName.toLowerCase()} list`}
            aria-label={`Refresh ${masterName.toLowerCase()} list`}
          >
            <Icon name="RefreshCw" size={14} className={isLoading ? 'animate-spin' : ''} />
          </Button>

          <Button
            variant="primary"
            size="sm"
            className="h-9 px-4 gap-1.5 shadow-sm font-medium"
            onClick={onAddNew}
            aria-label={addActionText}
          >
            <Icon name="Plus" size={15} />
            <span>{addActionText}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
