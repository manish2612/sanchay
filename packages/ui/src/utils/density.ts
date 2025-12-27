import { Density } from '../types/density';

export const densityTextClasses: Record<Density, string> = {
  comfortable: "text-base", // 16px
  default: "text-sm",       // 14px
  compact: "text-xs",       // 12px
};
