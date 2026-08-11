import React from 'react';
import { MasterConfig } from '../data/mastersConfig';
import { MasterFolderCard } from './MasterFolderCard.dom';

interface MasterCategorySectionProps {
  label: string;
  masters: MasterConfig[];
}

export function MasterCategorySection({ label, masters }: MasterCategorySectionProps) {
  if (masters.length === 0) return null;

  return (
    <section className="mb-10 px-4 sm:px-6" role="region" aria-label={label}>
      <div className="mb-6 flex items-center">
        <div className="w-1 h-4 bg-gradient-to-b from-primary/40 to-transparent mr-2 rounded-sm" />
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {label}
        </h2>
      </div>
      <hr className="mb-6 border-border opacity-50" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {masters.map((master) => (
          <MasterFolderCard key={master.id} config={master} />
        ))}
      </div>
    </section>
  );
}
