import { type VoucherFormValues } from "../schema/voucherSchema";

export const cleanPayload = (data: VoucherFormValues) => {
  const cleanArray = (arr: any[] | undefined): any[] | undefined => {
    if (!arr) return arr;
    return arr
      .filter((row) => !row.isPhantom) // 1. Remove uncommitted phantom rows
      .map((row) => {
        /*
         * @AI-NOTE: CRITICAL ID EXPLANATION - DO NOT DELETE IN FUTURE REFACTORS
         * 
         * Why are there two different UUIDs in the payload (e.g., `id` vs `ledger_id`)?
         * 
         * 1. `id` (Row PK): This is the unique identifier for the transactional line itself. 
         *    It is automatically generated as a UUID by React Hook Form's `useFieldArray` 
         *    (which overwrites our default 'row-1' strings due to key collision on 'id').
         *    The backend uses this during Upserts (Update if exists, Insert if new).
         * 
         * 2. `ledger_id` / `item_id` (Master FK): These are the UUIDs of the actual master
         *    data records (e.g., the specific "Cash" ledger or "Keyboard" item). They are
         *    injected silently by the AutoSuggestCell component when a user selects an option.
         */

        // 2. Remove isPhantom and display names from committed rows
        const { 
          isPhantom, 
          name, 
          item, 
          costCategory, 
          costCenter, 
          ledgerId, 
          itemId, 
          costCategoryId, 
          costCenterId, 
          costCenterAllocations, 
          ...rest 
        } = row;
        
        const cleanedRow: any = { ...rest };
        
        // 3. Map internal IDs to API payload keys
        if (ledgerId) cleanedRow.ledger_id = ledgerId;
        if (itemId) cleanedRow.item_id = itemId;
        if (costCategoryId) cleanedRow.cost_category_id = costCategoryId;
        if (costCenterId) cleanedRow.cost_center_id = costCenterId;
        
        // Recursively clean nested tables (e.g., costCenterAllocations)
        if (costCenterAllocations && Array.isArray(costCenterAllocations)) {
          cleanedRow.costCenterAllocations = cleanArray(costCenterAllocations);
        }
        
        return cleanedRow;
      });
  };

  return {
    ...data,
    ...(data.ledgerEntries ? { ledgerEntries: cleanArray(data.ledgerEntries) } : {}),
    ...(data.itemEntries ? { itemEntries: cleanArray(data.itemEntries) } : {}),
  };
};
