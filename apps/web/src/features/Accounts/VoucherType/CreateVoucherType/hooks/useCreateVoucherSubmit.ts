import { useState } from 'react';
import { useCreateVoucherTypeMutation } from '../../api';
import { VOUCHER_TYPE_FIELDS } from '../constants';
import type { VoucherTypeFormValues } from '../schema';

export const useCreateVoucherSubmit = () => {
  const [createVoucherType, mutationState] = useCreateVoucherTypeMutation();
  const [createdItemName, setCreatedItemName] = useState<string>('');

  const onSubmit = async (data: VoucherTypeFormValues) => {
    try {
      const payload = {
        name: data[VOUCHER_TYPE_FIELDS.NAME],
        parent_id: data[VOUCHER_TYPE_FIELDS.PARENT],
        view_mode: data[VOUCHER_TYPE_FIELDS.DEFAULT_VIEWING_MODE],
        is_set_as_default: data[VOUCHER_TYPE_FIELDS.SET_AS_DEFAULT],
        declaration: data[VOUCHER_TYPE_FIELDS.DECLARATION],
        apply_tax: data[VOUCHER_TYPE_FIELDS.APPLY_TAX],
        // is_excise_appl: data[VOUCHER_TYPE_FIELDS.EXCISE_DUTY_APPLICABLE], // Asked not to pass
        apply_disc_bill: data[VOUCHER_TYPE_FIELDS.DISCOUNT_AT_BILL_LEVEL],
        apply_disc_item: data[VOUCHER_TYPE_FIELDS.DISCOUNT_AT_ITEM_LEVEL],
        allow_zero_value_item: data[VOUCHER_TYPE_FIELDS.ALLOW_ZERO_VALUE_ITEM],
        allow_zero_value_ledger: data[VOUCHER_TYPE_FIELDS.ALLOW_ZERO_VALUE_LEDGER],
        is_pos_mode: data[VOUCHER_TYPE_FIELDS.USE_FOR_POS],
        printing_config: data[VOUCHER_TYPE_FIELDS.PRINT_CONFIGURABLE],
        print_after_save: data[VOUCHER_TYPE_FIELDS.PRINT_AFTER_SAVE],
        create_mode_after_save: data[VOUCHER_TYPE_FIELDS.NEW_MODE_AFTER_SAVE],
        free_qty_column: data[VOUCHER_TYPE_FIELDS.COL_FREE_QTY],
        alt_qty_olumn: data[VOUCHER_TYPE_FIELDS.COL_ALT_QTY],
        rate_column: data[VOUCHER_TYPE_FIELDS.COL_RATE],
        net_rate_column: data[VOUCHER_TYPE_FIELDS.COL_NET_RATE],
        gross_column: data[VOUCHER_TYPE_FIELDS.COL_GROSS_AMOUNT],
        voucher_type_numbering_info: data[VOUCHER_TYPE_FIELDS.VOUCHER_NUMBERING],
        
        default_cash_ledger_id: data[VOUCHER_TYPE_FIELDS.CASH_LEDGER] || null,
        default_bank_ledger_id: data[VOUCHER_TYPE_FIELDS.BANK_LEDGER] || null,
        default_local_trade_ledger_id: data[VOUCHER_TYPE_FIELDS.SALES_PURCHASE_LEDGER] || null,
        default_global_trade_ledger_id: data[VOUCHER_TYPE_FIELDS.EXPORT_IMPORT_LEDGER] || null,
        default_discount_ledger_id: data[VOUCHER_TYPE_FIELDS.DISCOUNT_LEDGER] || null,
        default_roundoff_ledger_id: data[VOUCHER_TYPE_FIELDS.ROUNDING_OFF_LEDGER] || null,

        code: "",

        // category: "", // Removed from backend
        // is_tax_applicable: true, // Asked not to pass
        // is_predefined: true, // Asked not to pass
        use_for_hsg_society: true,
        bottom_margin: 100,
        top_margin: 100,
        left_margin: 100,
        right_margin: 100,
        page_height: 100,
        page_width: 100,
        no_of_copies: 100,
        page_orientation: "",
        page_size: "",
        print_format: ""
      };

      const submittedName = data[VOUCHER_TYPE_FIELDS.NAME] || '';
      await (createVoucherType(payload as any) as any).unwrap();
      setCreatedItemName(submittedName);
    } catch (err) {
      console.error('Failed to create voucher type', err);
    }
  };

  const reset = () => {
    setCreatedItemName('');
    mutationState.reset();
  };

  return { onSubmit, createdItemName, ...mutationState, reset };
};
