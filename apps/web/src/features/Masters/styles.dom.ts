

export const paperLayerBase =
  'absolute inset-0 rounded-xl bg-surface border border-border transition-all duration-150 ease-out';

export const paper1Classes = `${paperLayerBase} z-0 group-hover:translate-y-[-6px] group-hover:rotate-[-3deg] group-hover:translate-x-[-3px] group-focus-within:translate-y-[-6px] group-focus-within:rotate-[-3deg] group-focus-within:translate-x-[-3px]`;

export const paper2Classes = `${paperLayerBase} z-[1] group-hover:translate-y-[-3px] group-hover:rotate-[1.5deg] group-hover:translate-x-[2px] group-focus-within:translate-y-[-3px] group-focus-within:rotate-[1.5deg] group-focus-within:translate-x-[2px]`;

export const mainCardClasses =
  'relative z-[2] rounded-xl bg-surface border border-border shadow-sm transition-all duration-150 ease-out group-hover:shadow-lg group-hover:shadow-primary/10 group-hover:border-primary/30 group-hover:-translate-y-1 group-focus-within:shadow-lg group-focus-within:shadow-primary/10 group-focus-within:border-primary/30 group-focus-within:-translate-y-1 overflow-hidden p-5';

export const folderTabClasses =
  'absolute -top-[10px] left-4 w-16 h-[10px] bg-surface border-t border-l border-r border-border rounded-t-md z-[3] transition-all duration-150 ease-out group-hover:border-primary/30 group-focus-within:border-primary/30';

export const iconContainerClasses =
  'w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 transition-colors duration-150 group-hover:bg-primary/20';

export const primaryBadgeClasses =
  'absolute top-3 right-3 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20';

export const viewListClasses =
  'text-xs text-muted-foreground hover:text-foreground transition-colors duration-100 flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring rounded px-1';

export const addNewButtonClasses =
  'transition-all duration-150 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary group-focus-within:bg-primary group-focus-within:text-primary-foreground group-focus-within:border-primary';

export const backgroundSvgClasses =
  'absolute top-0 -right-5 opacity-[0.13] -rotate-15 pointer-events-none overflow-hidden';

export const radialGlowClasses =
  'absolute bottom-0 right-0 w-24 h-24 rounded-full bg-primary/5 blur-2xl pointer-events-none group-hover:bg-primary/10 transition-colors duration-150';

export const pageHeaderWrapperClasses =
  'flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 bg-surface';

// export const pageBackgroundClasses =
//   'bg-gradient-to-br from-bg to-surface min-h-full';
export const pageBackgroundClasses = 'flex-1 min-h-0 w-full overflow-y-auto pb-10';
