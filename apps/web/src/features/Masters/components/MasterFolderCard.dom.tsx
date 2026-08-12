import React from 'react';
import { Link } from '@tanstack/react-router';
import { Icon, Button } from '@prime/ui';
import { MasterConfig } from '../data/mastersConfig';
import { AccountingBgGraphic } from './graphics/AccountingBgGraphic.dom';
import { InventoryBgGraphic } from './graphics/InventoryBgGraphic.dom';
import { useMasterFolderCard } from './useMasterFolderCard';
import {
  paper1Classes,
  paper2Classes,
  mainCardClasses,
  folderTabClasses,
  iconContainerClasses,
  primaryBadgeClasses,
  addNewButtonClasses,
  backgroundSvgClasses,
  radialGlowClasses,
} from '../styles.dom';

interface MasterFolderCardProps {
  config: MasterConfig;
  onOpenSheet: (config: MasterConfig) => void;
}

export function MasterFolderCard({ config, onOpenSheet }: MasterFolderCardProps) {
  const { id, label, description, href, icon, group, isPrimary } = config;
  const { handleAddNew } = useMasterFolderCard(config, onOpenSheet);

  return (
    <div className="group relative cursor-pointer">
      <div className={paper1Classes} />
      <div className={paper2Classes} />

      <div className={mainCardClasses}>
        <div className={folderTabClasses} />

        <div className={backgroundSvgClasses}>
          {group === 'accounting' ? <AccountingBgGraphic /> : <InventoryBgGraphic />}
        </div>

        <Link
          to={href as any}
          className="flex-1 block relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 rounded-md"
          aria-label={`View ${label} list`}
        >
          <div className={iconContainerClasses}>
            <Icon name={icon as any} size={20} className="text-primary" />
          </div>

          {isPrimary && <div className={primaryBadgeClasses}>Primary</div>}

          <div>
            <h3 className="text-base font-semibold text-foreground leading-tight">{label}</h3>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{description}</p>
          </div>
        </Link>

        <hr className="my-4 border-border opacity-50" />

        <div className="flex items-center justify-end gap-2 relative z-10">
          <Button
            variant="outline"
            className={addNewButtonClasses}
            aria-label={`Add new ${label}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleAddNew();
            }}
          >
            + Add New
          </Button>
        </div>

        <div className={radialGlowClasses} />
      </div>
    </div>
  );
}
