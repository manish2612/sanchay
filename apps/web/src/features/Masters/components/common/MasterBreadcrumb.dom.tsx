import React from 'react';
import { Link } from '@tanstack/react-router';
import { Icon } from '@prime/ui';
import { breadcrumbClasses, breadcrumbLinkClasses } from './styles.dom';

export interface MasterBreadcrumbProps {
  domain?: string;
  masterName: string;
  hubPath?: string;
  hubLabel?: string;
}

export function MasterBreadcrumb({
  domain = 'Accounting',
  masterName,
  hubPath = '/masters',
  hubLabel = 'Masters Hub',
}: MasterBreadcrumbProps) {
  return (
    <div className={breadcrumbClasses}>
      <Link to={hubPath} className={breadcrumbLinkClasses}>
        <Icon name="ArrowLeft" size={13} className="opacity-70" />
        <span>{hubLabel}</span>
      </Link>
      <span className="text-muted-foreground/40 font-mono">/</span>
      <span>{domain}</span>
      <span className="text-muted-foreground/40 font-mono">/</span>
      <span className="text-foreground font-semibold">{masterName}</span>
    </div>
  );
}
