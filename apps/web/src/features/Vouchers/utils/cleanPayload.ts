import { type VoucherFormValues } from "../schema/voucherSchema";

export const cleanPayload = (data: VoucherFormValues) => {
  const cleanArray = (arr: any[] | undefined): any[] | undefined => {
    if (!arr) return arr;
    return arr
      .filter((row) => !row.isPhantom) // 1. Remove uncommitted phantom rows
      .map((row) => {
        // 2. Remove isPhantom key from committed rows
        const { isPhantom, costCenterAllocations, ...rest } = row;
        
        // Recursively clean nested tables (e.g., costCenterAllocations)
        if (costCenterAllocations && Array.isArray(costCenterAllocations)) {
          return {
            ...rest,
            costCenterAllocations: cleanArray(costCenterAllocations),
          };
        }
        
        return rest;
      });
  };

  return {
    ...data,
    ...(data.ledgerEntries ? { ledgerEntries: cleanArray(data.ledgerEntries) } : {}),
    ...(data.itemEntries ? { itemEntries: cleanArray(data.itemEntries) } : {}),
  };
};
