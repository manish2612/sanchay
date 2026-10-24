import { http, HttpResponse, delay } from 'msw';
import { isMockEnabled } from '../../store/mockConfig';
import type { GetVoucherTypesResponse } from '@/features/Accounts/VoucherType/types';

// Storing partial mock data here to keep it clean, but could paste the full JSON.
const mockVoucherTypes: GetVoucherTypesResponse = [
  {
    "id": "01a0ddd8-39e1-799c-9b99-00d6dedd6fbf",
    "is_active": true,
    "name": "Receipt",
    "category": "RCPT",
    "apply_tax": "",
    "apply_disc_bill": false,
    "apply_disc_item": false,
    "is_excise_appl": false,
    "print_after_save": false,
    "create_mode_after_save": false,
    "view_mode": "",
    "is_set_as_default": false,
    "allow_zero_value_item": false,
    "allow_zero_value_ledger": false,
    "voucher_mode": "ACC",
    "posting_affects": "A",
    "printing_config": false,
    "page_size": "",
    "page_orientation": "",
    "page_width": 0,
    "page_height": 0,
    "top_margin": 0,
    "bottom_margin": 0,
    "left_margin": 0,
    "right_margin": 0,
    "no_of_copies": 0,
    "print_format": "",
    "is_pos_mode": false,
    "free_qty_column": false,
    "alt_qty_olumn": false,
    "rate_column": false,
    "net_rate_column": false,
    "gross_column": false,
    "use_for_hsg_society": false,
    "is_tax_applicable": true,
    "is_predefined": true,
    "numbering_info": [
      {
        "numbering_type": "AUTO",
        "reset_on": "YEARLY",
        "prefix": "",
        "suffix": "",
        "effective_from": "2026-09-26T00:00:00Z",
        "starting_number": 1,
        "prefill_padding": 3
      }
    ]
  },
  {
    "id": "01a0ddd8-39e1-799d-8c38-51bc8983a7ca",
    "is_active": true,
    "name": "Payment",
    "category": "PYMT",
    "apply_tax": "",
    "apply_disc_bill": false,
    "apply_disc_item": false,
    "is_excise_appl": false,
    "print_after_save": false,
    "create_mode_after_save": false,
    "view_mode": "",
    "is_set_as_default": false,
    "allow_zero_value_item": false,
    "allow_zero_value_ledger": false,
    "voucher_mode": "ACC",
    "posting_affects": "A",
    "printing_config": false,
    "page_size": "",
    "page_orientation": "",
    "page_width": 0,
    "page_height": 0,
    "top_margin": 0,
    "bottom_margin": 0,
    "left_margin": 0,
    "right_margin": 0,
    "no_of_copies": 0,
    "print_format": "",
    "is_pos_mode": false,
    "free_qty_column": false,
    "alt_qty_olumn": false,
    "rate_column": false,
    "net_rate_column": false,
    "gross_column": false,
    "use_for_hsg_society": false,
    "is_tax_applicable": true,
    "is_predefined": true,
    "numbering_info": [
      {
        "numbering_type": "AUTO",
        "reset_on": "YEARLY",
        "prefix": "",
        "suffix": "",
        "effective_from": "2026-09-26T00:00:00Z",
        "starting_number": 1,
        "prefill_padding": 3
      }
    ]
  },
  {
    "id": "01a0ddd8-39e1-799e-aaa1-fc13e606af65",
    "is_active": true,
    "name": "Contra",
    "category": "CNTR",
    "apply_tax": "",
    "apply_disc_bill": false,
    "apply_disc_item": false,
    "is_excise_appl": false,
    "print_after_save": false,
    "create_mode_after_save": false,
    "view_mode": "",
    "is_set_as_default": false,
    "allow_zero_value_item": false,
    "allow_zero_value_ledger": false,
    "voucher_mode": "ACC",
    "posting_affects": "A",
    "printing_config": false,
    "page_size": "",
    "page_orientation": "",
    "page_width": 0,
    "page_height": 0,
    "top_margin": 0,
    "bottom_margin": 0,
    "left_margin": 0,
    "right_margin": 0,
    "no_of_copies": 0,
    "print_format": "",
    "is_pos_mode": false,
    "free_qty_column": false,
    "alt_qty_olumn": false,
    "rate_column": false,
    "net_rate_column": false,
    "gross_column": false,
    "use_for_hsg_society": false,
    "is_tax_applicable": true,
    "is_predefined": true,
    "numbering_info": [
      {
        "numbering_type": "AUTO",
        "reset_on": "YEARLY",
        "prefix": "",
        "suffix": "",
        "effective_from": "2026-09-26T00:00:00Z",
        "starting_number": 1,
        "prefill_padding": 3
      }
    ]
  },
  {
    "id": "01a0ddd8-39e1-799f-9e61-d755d831542f",
    "is_active": true,
    "name": "Journal",
    "category": "JRNL",
    "apply_tax": "",
    "apply_disc_bill": false,
    "apply_disc_item": false,
    "is_excise_appl": false,
    "print_after_save": false,
    "create_mode_after_save": false,
    "view_mode": "",
    "is_set_as_default": false,
    "allow_zero_value_item": false,
    "allow_zero_value_ledger": false,
    "voucher_mode": "ACC",
    "posting_affects": "A",
    "printing_config": false,
    "page_size": "",
    "page_orientation": "",
    "page_width": 0,
    "page_height": 0,
    "top_margin": 0,
    "bottom_margin": 0,
    "left_margin": 0,
    "right_margin": 0,
    "no_of_copies": 0,
    "print_format": "",
    "is_pos_mode": false,
    "free_qty_column": false,
    "alt_qty_olumn": false,
    "rate_column": false,
    "net_rate_column": false,
    "gross_column": false,
    "use_for_hsg_society": false,
    "is_tax_applicable": true,
    "is_predefined": true,
    "numbering_info": [
      {
        "numbering_type": "AUTO",
        "reset_on": "YEARLY",
        "prefix": "",
        "suffix": "",
        "effective_from": "2026-09-26T00:00:00Z",
        "starting_number": 1,
        "prefill_padding": 3
      }
    ]
  },
  {
    "id": "01a0ddd8-39e1-79a0-8ee1-31d6b26117a3",
    "is_active": true,
    "name": "Sales",
    "category": "SL",
    "apply_tax": "B",
    "apply_disc_bill": true,
    "apply_disc_item": false,
    "is_excise_appl": false,
    "print_after_save": false,
    "create_mode_after_save": false,
    "view_mode": "",
    "is_set_as_default": false,
    "allow_zero_value_item": false,
    "allow_zero_value_ledger": false,
    "voucher_mode": "INV",
    "posting_affects": "IA",
    "printing_config": false,
    "page_size": "",
    "page_orientation": "",
    "page_width": 0,
    "page_height": 0,
    "top_margin": 0,
    "bottom_margin": 0,
    "left_margin": 0,
    "right_margin": 0,
    "no_of_copies": 0,
    "print_format": "",
    "is_pos_mode": false,
    "free_qty_column": false,
    "alt_qty_olumn": false,
    "rate_column": false,
    "net_rate_column": false,
    "gross_column": true,
    "use_for_hsg_society": false,
    "is_tax_applicable": true,
    "is_predefined": true,
    "numbering_info": [
      {
        "numbering_type": "AUTO",
        "reset_on": "YEARLY",
        "prefix": "",
        "suffix": "",
        "effective_from": "2026-09-26T00:00:00Z",
        "starting_number": 1,
        "prefill_padding": 3
      }
    ],
    "default_cash_ledger": {
      "id": "01a0ddd8-39c9-7d15-b05e-006acafbacfa",
      "name": "Cash",
      "code": "",
      "parent_id": "01a0ddd8-39bb-76ed-9e3c-787b74793622",
      "is_cost_centre_enabled": false,
      "is_bill_wise_enabled": false,
      "block_sales_on_credit_limit_exceed": false,
      "credit_period_days": 0,
      "credit_limit_amount": "0",
      "opening_balance": "0",
      "is_party_ledger": false,
      "is_predefined": true,
      "tax_rates": []
    },
    "default_local_trade_ledger": {
      "id": "01a0ddd8-39cc-73e6-823a-6909dfa61032",
      "name": "13% Sales",
      "code": "",
      "parent_id": "01a0ddd8-39bb-7703-a16d-5d1cf13cd0ac",
      "is_cost_centre_enabled": true,
      "is_bill_wise_enabled": false,
      "block_sales_on_credit_limit_exceed": false,
      "credit_period_days": 0,
      "credit_limit_amount": "0",
      "opening_balance": "0",
      "is_party_ledger": false,
      "is_predefined": true,
      "tax_rates": [
        {
          "effective_from": "2026-09-26T00:00:00Z",
          "applicability": "BOTH",
          "tax_rate": "0.13",
          "tax_group": [
            {
              "taxgroup_name": "VAT @ 13%",
              "taxgroup_code": "VAT13",
              "taxgroup_combined_rate": "13",
              "tax_component": [
                {
                  "taxgroup_component_name": "VAT @ 13%",
                  "taxgroup_component_scope": "ALL",
                  "taxgroup_component_compute_method": "PCT_BASE",
                  "taxgroup_component_rate": "13",
                  "input_ledger_id": "01a0ddd8-39cb-7a08-89e8-b57695a3a33b",
                  "output_ledger_id": "01a0ddd8-39cc-73e5-aac7-d555cd2c32b3"
                }
              ]
            }
          ]
        }
      ]
    },
    "default_global_trade_ledger": {
      "id": "01a0ddd8-39cd-747e-aee3-62fdffae568f",
      "name": "Exempted Export Sales",
      "code": "",
      "parent_id": "01a0ddd8-39bb-7703-a16d-5d1cf13cd0ac",
      "is_cost_centre_enabled": false,
      "is_bill_wise_enabled": false,
      "block_sales_on_credit_limit_exceed": false,
      "credit_period_days": 0,
      "credit_limit_amount": "0",
      "opening_balance": "0",
      "is_party_ledger": false,
      "is_predefined": true,
      "tax_rates": []
    },
    "default_discount_ledger": {
      "id": "01a0ddd8-39cf-7061-b5a9-b1eeb7ac872b",
      "name": "Discount A/c",
      "code": "",
      "parent_id": "01a0ddd8-39bb-76f2-b3b0-c9767d9bcb8f",
      "is_cost_centre_enabled": false,
      "is_bill_wise_enabled": false,
      "block_sales_on_credit_limit_exceed": false,
      "credit_period_days": 0,
      "credit_limit_amount": "0",
      "opening_balance": "0",
      "is_party_ledger": false,
      "is_predefined": true,
      "tax_rates": []
    },
    "default_roundoff_ledger": {
      "id": "01a0ddd8-39cf-7060-bbc7-a3081a8c72c4",
      "name": "Rounding Off",
      "code": "",
      "parent_id": "01a0ddd8-39bb-76f2-b3b0-c9767d9bcb8f",
      "is_cost_centre_enabled": false,
      "is_bill_wise_enabled": false,
      "block_sales_on_credit_limit_exceed": false,
      "credit_period_days": 0,
      "credit_limit_amount": "0",
      "opening_balance": "0",
      "is_party_ledger": false,
      "is_predefined": true,
      "tax_rates": []
    }
  },
  {
    "id": "01a0ddd8-39e1-79a1-b3ac-124886ee990b",
    "is_active": true,
    "name": "Purchase",
    "category": "PU",
    "apply_tax": "B",
    "apply_disc_bill": true,
    "apply_disc_item": false,
    "is_excise_appl": false,
    "print_after_save": false,
    "create_mode_after_save": false,
    "view_mode": "",
    "is_set_as_default": false,
    "allow_zero_value_item": false,
    "allow_zero_value_ledger": false,
    "voucher_mode": "INV",
    "posting_affects": "IA",
    "printing_config": false,
    "page_size": "",
    "page_orientation": "",
    "page_width": 0,
    "page_height": 0,
    "top_margin": 0,
    "bottom_margin": 0,
    "left_margin": 0,
    "right_margin": 0,
    "no_of_copies": 0,
    "print_format": "",
    "is_pos_mode": false,
    "free_qty_column": false,
    "alt_qty_olumn": false,
    "rate_column": false,
    "net_rate_column": false,
    "gross_column": true,
    "use_for_hsg_society": false,
    "is_tax_applicable": true,
    "is_predefined": true,
    "numbering_info": [
      {
        "numbering_type": "AUTO",
        "reset_on": "YEARLY",
        "prefix": "",
        "suffix": "",
        "effective_from": "2026-09-26T00:00:00Z",
        "starting_number": 1,
        "prefill_padding": 3
      }
    ],
    "default_cash_ledger": {
      "id": "01a0ddd8-39c9-7d15-b05e-006acafbacfa",
      "name": "Cash",
      "code": "",
      "parent_id": "01a0ddd8-39bb-76ed-9e3c-787b74793622",
      "is_cost_centre_enabled": false,
      "is_bill_wise_enabled": false,
      "block_sales_on_credit_limit_exceed": false,
      "credit_period_days": 0,
      "credit_limit_amount": "0",
      "opening_balance": "0",
      "is_party_ledger": false,
      "is_predefined": true,
      "tax_rates": []
    },
    "default_local_trade_ledger": {
      "id": "01a0ddd8-39cd-7c46-b80e-991ba582fdf2",
      "name": "13% Purchase",
      "code": "",
      "parent_id": "01a0ddd8-39bb-7702-b32b-c639752559b8",
      "is_cost_centre_enabled": true,
      "is_bill_wise_enabled": false,
      "block_sales_on_credit_limit_exceed": false,
      "credit_period_days": 0,
      "credit_limit_amount": "0",
      "opening_balance": "0",
      "is_party_ledger": false,
      "is_predefined": true,
      "tax_rates": [
        {
          "effective_from": "2026-09-26T00:00:00Z",
          "applicability": "BOTH",
          "tax_rate": "0.13",
          "tax_group": [
            {
              "taxgroup_name": "VAT @ 13%",
              "taxgroup_code": "VAT13",
              "taxgroup_combined_rate": "13",
              "tax_component": [
                {
                  "taxgroup_component_name": "VAT @ 13%",
                  "taxgroup_component_scope": "ALL",
                  "taxgroup_component_compute_method": "PCT_BASE",
                  "taxgroup_component_rate": "13",
                  "input_ledger_id": "01a0ddd8-39cb-7a08-89e8-b57695a3a33b",
                  "output_ledger_id": "01a0ddd8-39cc-73e5-aac7-d555cd2c32b3"
                }
              ]
            }
          ]
        }
      ]
    },
    "default_global_trade_ledger": {
      "id": "01a0ddd8-39ce-7755-86c5-6d87d3baf14b",
      "name": "Exempted Import Purchase",
      "code": "",
      "parent_id": "01a0ddd8-39bb-7702-b32b-c639752559b8",
      "is_cost_centre_enabled": false,
      "is_bill_wise_enabled": false,
      "block_sales_on_credit_limit_exceed": false,
      "credit_period_days": 0,
      "credit_limit_amount": "0",
      "opening_balance": "0",
      "is_party_ledger": false,
      "is_predefined": true,
      "tax_rates": []
    },
    "default_discount_ledger": {
      "id": "01a0ddd8-39cf-7061-b5a9-b1eeb7ac872b",
      "name": "Discount A/c",
      "code": "",
      "parent_id": "01a0ddd8-39bb-76f2-b3b0-c9767d9bcb8f",
      "is_cost_centre_enabled": false,
      "is_bill_wise_enabled": false,
      "block_sales_on_credit_limit_exceed": false,
      "credit_period_days": 0,
      "credit_limit_amount": "0",
      "opening_balance": "0",
      "is_party_ledger": false,
      "is_predefined": true,
      "tax_rates": []
    },
    "default_roundoff_ledger": {
      "id": "01a0ddd8-39cf-7060-bbc7-a3081a8c72c4",
      "name": "Rounding Off",
      "code": "",
      "parent_id": "01a0ddd8-39bb-76f2-b3b0-c9767d9bcb8f",
      "is_cost_centre_enabled": false,
      "is_bill_wise_enabled": false,
      "block_sales_on_credit_limit_exceed": false,
      "credit_period_days": 0,
      "credit_limit_amount": "0",
      "opening_balance": "0",
      "is_party_ledger": false,
      "is_predefined": true,
      "tax_rates": []
    }
  },
  {
    "id": "01a0ddd8-39e1-79a2-ac88-36ed73a97f61",
    "is_active": true,
    "name": "Credit Note",
    "category": "CN",
    "apply_tax": "B",
    "apply_disc_bill": true,
    "apply_disc_item": false,
    "is_excise_appl": false,
    "print_after_save": false,
    "create_mode_after_save": false,
    "view_mode": "",
    "is_set_as_default": false,
    "allow_zero_value_item": false,
    "allow_zero_value_ledger": false,
    "voucher_mode": "INV",
    "posting_affects": "IA",
    "printing_config": false,
    "page_size": "",
    "page_orientation": "",
    "page_width": 0,
    "page_height": 0,
    "top_margin": 0,
    "bottom_margin": 0,
    "left_margin": 0,
    "right_margin": 0,
    "no_of_copies": 0,
    "print_format": "",
    "is_pos_mode": false,
    "free_qty_column": false,
    "alt_qty_olumn": false,
    "rate_column": false,
    "net_rate_column": false,
    "gross_column": true,
    "use_for_hsg_society": false,
    "is_tax_applicable": true,
    "is_predefined": true,
    "numbering_info": [
      {
        "numbering_type": "AUTO",
        "reset_on": "YEARLY",
        "prefix": "",
        "suffix": "",
        "effective_from": "2026-09-26T00:00:00Z",
        "starting_number": 1,
        "prefill_padding": 3
      }
    ],
    "default_cash_ledger": {
      "id": "01a0ddd8-39c9-7d15-b05e-006acafbacfa",
      "name": "Cash",
      "code": "",
      "parent_id": "01a0ddd8-39bb-76ed-9e3c-787b74793622",
      "is_cost_centre_enabled": false,
      "is_bill_wise_enabled": false,
      "block_sales_on_credit_limit_exceed": false,
      "credit_period_days": 0,
      "credit_limit_amount": "0",
      "opening_balance": "0",
      "is_party_ledger": false,
      "is_predefined": true,
      "tax_rates": []
    },
    "default_local_trade_ledger": {
      "id": "01a0ddd8-39cc-73e6-823a-6909dfa61032",
      "name": "13% Sales",
      "code": "",
      "parent_id": "01a0ddd8-39bb-7703-a16d-5d1cf13cd0ac",
      "is_cost_centre_enabled": true,
      "is_bill_wise_enabled": false,
      "block_sales_on_credit_limit_exceed": false,
      "credit_period_days": 0,
      "credit_limit_amount": "0",
      "opening_balance": "0",
      "is_party_ledger": false,
      "is_predefined": true,
      "tax_rates": [
        {
          "effective_from": "2026-09-26T00:00:00Z",
          "applicability": "BOTH",
          "tax_rate": "0.13",
          "tax_group": [
            {
              "taxgroup_name": "VAT @ 13%",
              "taxgroup_code": "VAT13",
              "taxgroup_combined_rate": "13",
              "tax_component": [
                {
                  "taxgroup_component_name": "VAT @ 13%",
                  "taxgroup_component_scope": "ALL",
                  "taxgroup_component_compute_method": "PCT_BASE",
                  "taxgroup_component_rate": "13",
                  "input_ledger_id": "01a0ddd8-39cb-7a08-89e8-b57695a3a33b",
                  "output_ledger_id": "01a0ddd8-39cc-73e5-aac7-d555cd2c32b3"
                }
              ]
            }
          ]
        }
      ]
    },
    "default_global_trade_ledger": {
      "id": "01a0ddd8-39cd-747e-aee3-62fdffae568f",
      "name": "Exempted Export Sales",
      "code": "",
      "parent_id": "01a0ddd8-39bb-7703-a16d-5d1cf13cd0ac",
      "is_cost_centre_enabled": false,
      "is_bill_wise_enabled": false,
      "block_sales_on_credit_limit_exceed": false,
      "credit_period_days": 0,
      "credit_limit_amount": "0",
      "opening_balance": "0",
      "is_party_ledger": false,
      "is_predefined": true,
      "tax_rates": []
    },
    "default_discount_ledger": {
      "id": "01a0ddd8-39cf-7061-b5a9-b1eeb7ac872b",
      "name": "Discount A/c",
      "code": "",
      "parent_id": "01a0ddd8-39bb-76f2-b3b0-c9767d9bcb8f",
      "is_cost_centre_enabled": false,
      "is_bill_wise_enabled": false,
      "block_sales_on_credit_limit_exceed": false,
      "credit_period_days": 0,
      "credit_limit_amount": "0",
      "opening_balance": "0",
      "is_party_ledger": false,
      "is_predefined": true,
      "tax_rates": []
    },
    "default_roundoff_ledger": {
      "id": "01a0ddd8-39cf-7060-bbc7-a3081a8c72c4",
      "name": "Rounding Off",
      "code": "",
      "parent_id": "01a0ddd8-39bb-76f2-b3b0-c9767d9bcb8f",
      "is_cost_centre_enabled": false,
      "is_bill_wise_enabled": false,
      "block_sales_on_credit_limit_exceed": false,
      "credit_period_days": 0,
      "credit_limit_amount": "0",
      "opening_balance": "0",
      "is_party_ledger": false,
      "is_predefined": true,
      "tax_rates": []
    }
  },
  {
    "id": "01a0ddd8-39e1-79a3-9113-0de357927c15",
    "is_active": true,
    "name": "Debit Note",
    "category": "DN",
    "apply_tax": "B",
    "apply_disc_bill": true,
    "apply_disc_item": false,
    "is_excise_appl": false,
    "print_after_save": false,
    "create_mode_after_save": false,
    "view_mode": "",
    "is_set_as_default": false,
    "allow_zero_value_item": false,
    "allow_zero_value_ledger": false,
    "voucher_mode": "INV",
    "posting_affects": "IA",
    "printing_config": false,
    "page_size": "",
    "page_orientation": "",
    "page_width": 0,
    "page_height": 0,
    "top_margin": 0,
    "bottom_margin": 0,
    "left_margin": 0,
    "right_margin": 0,
    "no_of_copies": 0,
    "print_format": "",
    "is_pos_mode": false,
    "free_qty_column": false,
    "alt_qty_olumn": false,
    "rate_column": false,
    "net_rate_column": false,
    "gross_column": true,
    "use_for_hsg_society": false,
    "is_tax_applicable": true,
    "is_predefined": true,
    "numbering_info": [
      {
        "numbering_type": "AUTO",
        "reset_on": "YEARLY",
        "prefix": "",
        "suffix": "",
        "effective_from": "2026-09-26T00:00:00Z",
        "starting_number": 1,
        "prefill_padding": 3
      }
    ],
    "default_cash_ledger": {
      "id": "01a0ddd8-39c9-7d15-b05e-006acafbacfa",
      "name": "Cash",
      "code": "",
      "parent_id": "01a0ddd8-39bb-76ed-9e3c-787b74793622",
      "is_cost_centre_enabled": false,
      "is_bill_wise_enabled": false,
      "block_sales_on_credit_limit_exceed": false,
      "credit_period_days": 0,
      "credit_limit_amount": "0",
      "opening_balance": "0",
      "is_party_ledger": false,
      "is_predefined": true,
      "tax_rates": []
    },
    "default_local_trade_ledger": {
      "id": "01a0ddd8-39cd-7c46-b80e-991ba582fdf2",
      "name": "13% Purchase",
      "code": "",
      "parent_id": "01a0ddd8-39bb-7702-b32b-c639752559b8",
      "is_cost_centre_enabled": true,
      "is_bill_wise_enabled": false,
      "block_sales_on_credit_limit_exceed": false,
      "credit_period_days": 0,
      "credit_limit_amount": "0",
      "opening_balance": "0",
      "is_party_ledger": false,
      "is_predefined": true,
      "tax_rates": [
        {
          "effective_from": "2026-09-26T00:00:00Z",
          "applicability": "BOTH",
          "tax_rate": "0.13",
          "tax_group": [
            {
              "taxgroup_name": "VAT @ 13%",
              "taxgroup_code": "VAT13",
              "taxgroup_combined_rate": "13",
              "tax_component": [
                {
                  "taxgroup_component_name": "VAT @ 13%",
                  "taxgroup_component_scope": "ALL",
                  "taxgroup_component_compute_method": "PCT_BASE",
                  "taxgroup_component_rate": "13",
                  "input_ledger_id": "01a0ddd8-39cb-7a08-89e8-b57695a3a33b",
                  "output_ledger_id": "01a0ddd8-39cc-73e5-aac7-d555cd2c32b3"
                }
              ]
            }
          ]
        }
      ]
    },
    "default_global_trade_ledger": {
      "id": "01a0ddd8-39ce-7755-86c5-6d87d3baf14b",
      "name": "Exempted Import Purchase",
      "code": "",
      "parent_id": "01a0ddd8-39bb-7702-b32b-c639752559b8",
      "is_cost_centre_enabled": false,
      "is_bill_wise_enabled": false,
      "block_sales_on_credit_limit_exceed": false,
      "credit_period_days": 0,
      "credit_limit_amount": "0",
      "opening_balance": "0",
      "is_party_ledger": false,
      "is_predefined": true,
      "tax_rates": []
    },
    "default_discount_ledger": {
      "id": "01a0ddd8-39cf-7061-b5a9-b1eeb7ac872b",
      "name": "Discount A/c",
      "code": "",
      "parent_id": "01a0ddd8-39bb-76f2-b3b0-c9767d9bcb8f",
      "is_cost_centre_enabled": false,
      "is_bill_wise_enabled": false,
      "block_sales_on_credit_limit_exceed": false,
      "credit_period_days": 0,
      "credit_limit_amount": "0",
      "opening_balance": "0",
      "is_party_ledger": false,
      "is_predefined": true,
      "tax_rates": []
    },
    "default_roundoff_ledger": {
      "id": "01a0ddd8-39cf-7060-bbc7-a3081a8c72c4",
      "name": "Rounding Off",
      "code": "",
      "parent_id": "01a0ddd8-39bb-76f2-b3b0-c9767d9bcb8f",
      "is_cost_centre_enabled": false,
      "is_bill_wise_enabled": false,
      "block_sales_on_credit_limit_exceed": false,
      "credit_period_days": 0,
      "credit_limit_amount": "0",
      "opening_balance": "0",
      "is_party_ledger": false,
      "is_predefined": true,
      "tax_rates": []
    }
  },
  {
    "id": "01a0ddd8-39e1-79a4-9e7b-8d62c7ae3a4b",
    "is_active": true,
    "name": "Stock Journal",
    "category": "SJCP",
    "apply_tax": "",
    "apply_disc_bill": false,
    "apply_disc_item": false,
    "is_excise_appl": false,
    "print_after_save": false,
    "create_mode_after_save": false,
    "view_mode": "",
    "is_set_as_default": false,
    "allow_zero_value_item": false,
    "allow_zero_value_ledger": false,
    "voucher_mode": "INV",
    "posting_affects": "I",
    "printing_config": false,
    "page_size": "",
    "page_orientation": "",
    "page_width": 0,
    "page_height": 0,
    "top_margin": 0,
    "bottom_margin": 0,
    "left_margin": 0,
    "right_margin": 0,
    "no_of_copies": 0,
    "print_format": "",
    "is_pos_mode": false,
    "free_qty_column": false,
    "alt_qty_olumn": false,
    "rate_column": false,
    "net_rate_column": false,
    "gross_column": false,
    "use_for_hsg_society": false,
    "is_tax_applicable": true,
    "is_predefined": true,
    "numbering_info": [
      {
        "numbering_type": "AUTO",
        "reset_on": "YEARLY",
        "prefix": "",
        "suffix": "",
        "effective_from": "2026-09-26T00:00:00Z",
        "starting_number": 1,
        "prefill_padding": 3
      }
    ]
  },
  {
    "id": "01a0ddd8-39e1-79a5-b735-26ec58448eb5",
    "is_active": true,
    "name": "Sales Order",
    "category": "SO",
    "apply_tax": "B",
    "apply_disc_bill": true,
    "apply_disc_item": false,
    "is_excise_appl": false,
    "print_after_save": false,
    "create_mode_after_save": false,
    "view_mode": "",
    "is_set_as_default": false,
    "allow_zero_value_item": false,
    "allow_zero_value_ledger": false,
    "voucher_mode": "INV",
    "posting_affects": "I",
    "printing_config": false,
    "page_size": "",
    "page_orientation": "",
    "page_width": 0,
    "page_height": 0,
    "top_margin": 0,
    "bottom_margin": 0,
    "left_margin": 0,
    "right_margin": 0,
    "no_of_copies": 0,
    "print_format": "",
    "is_pos_mode": false,
    "free_qty_column": false,
    "alt_qty_olumn": false,
    "rate_column": false,
    "net_rate_column": false,
    "gross_column": true,
    "use_for_hsg_society": false,
    "is_tax_applicable": true,
    "is_predefined": true,
    "numbering_info": [
      {
        "numbering_type": "AUTO",
        "reset_on": "YEARLY",
        "prefix": "",
        "suffix": "",
        "effective_from": "2026-09-26T00:00:00Z",
        "starting_number": 1,
        "prefill_padding": 3
      }
    ],
    "default_cash_ledger": {
      "id": "01a0ddd8-39c9-7d15-b05e-006acafbacfa",
      "name": "Cash",
      "code": "",
      "parent_id": "01a0ddd8-39bb-76ed-9e3c-787b74793622",
      "is_cost_centre_enabled": false,
      "is_bill_wise_enabled": false,
      "block_sales_on_credit_limit_exceed": false,
      "credit_period_days": 0,
      "credit_limit_amount": "0",
      "opening_balance": "0",
      "is_party_ledger": false,
      "is_predefined": true,
      "tax_rates": []
    },
    "default_local_trade_ledger": {
      "id": "01a0ddd8-39cc-73e6-823a-6909dfa61032",
      "name": "13% Sales",
      "code": "",
      "parent_id": "01a0ddd8-39bb-7703-a16d-5d1cf13cd0ac",
      "is_cost_centre_enabled": true,
      "is_bill_wise_enabled": false,
      "block_sales_on_credit_limit_exceed": false,
      "credit_period_days": 0,
      "credit_limit_amount": "0",
      "opening_balance": "0",
      "is_party_ledger": false,
      "is_predefined": true,
      "tax_rates": [
        {
          "effective_from": "2026-09-26T00:00:00Z",
          "applicability": "BOTH",
          "tax_rate": "0.13",
          "tax_group": [
            {
              "taxgroup_name": "VAT @ 13%",
              "taxgroup_code": "VAT13",
              "taxgroup_combined_rate": "13",
              "tax_component": [
                {
                  "taxgroup_component_name": "VAT @ 13%",
                  "taxgroup_component_scope": "ALL",
                  "taxgroup_component_compute_method": "PCT_BASE",
                  "taxgroup_component_rate": "13",
                  "input_ledger_id": "01a0ddd8-39cb-7a08-89e8-b57695a3a33b",
                  "output_ledger_id": "01a0ddd8-39cc-73e5-aac7-d555cd2c32b3"
                }
              ]
            }
          ]
        }
      ]
    },
    "default_global_trade_ledger": {
      "id": "01a0ddd8-39cd-747e-aee3-62fdffae568f",
      "name": "Exempted Export Sales",
      "code": "",
      "parent_id": "01a0ddd8-39bb-7703-a16d-5d1cf13cd0ac",
      "is_cost_centre_enabled": false,
      "is_bill_wise_enabled": false,
      "block_sales_on_credit_limit_exceed": false,
      "credit_period_days": 0,
      "credit_limit_amount": "0",
      "opening_balance": "0",
      "is_party_ledger": false,
      "is_predefined": true,
      "tax_rates": []
    },
    "default_discount_ledger": {
      "id": "01a0ddd8-39cf-7061-b5a9-b1eeb7ac872b",
      "name": "Discount A/c",
      "code": "",
      "parent_id": "01a0ddd8-39bb-76f2-b3b0-c9767d9bcb8f",
      "is_cost_centre_enabled": false,
      "is_bill_wise_enabled": false,
      "block_sales_on_credit_limit_exceed": false,
      "credit_period_days": 0,
      "credit_limit_amount": "0",
      "opening_balance": "0",
      "is_party_ledger": false,
      "is_predefined": true,
      "tax_rates": []
    },
    "default_roundoff_ledger": {
      "id": "01a0ddd8-39cf-7060-bbc7-a3081a8c72c4",
      "name": "Rounding Off",
      "code": "",
      "parent_id": "01a0ddd8-39bb-76f2-b3b0-c9767d9bcb8f",
      "is_cost_centre_enabled": false,
      "is_bill_wise_enabled": false,
      "block_sales_on_credit_limit_exceed": false,
      "credit_period_days": 0,
      "credit_limit_amount": "0",
      "opening_balance": "0",
      "is_party_ledger": false,
      "is_predefined": true,
      "tax_rates": []
    }
  },
  {
    "id": "01a0ddd8-39e1-79a6-91e3-5a1a75078db2",
    "is_active": true,
    "name": "Purchase Order",
    "category": "PO",
    "apply_tax": "B",
    "apply_disc_bill": true,
    "apply_disc_item": false,
    "is_excise_appl": false,
    "print_after_save": false,
    "create_mode_after_save": false,
    "view_mode": "",
    "is_set_as_default": false,
    "allow_zero_value_item": false,
    "allow_zero_value_ledger": false,
    "voucher_mode": "INV",
    "posting_affects": "I",
    "printing_config": false,
    "page_size": "",
    "page_orientation": "",
    "page_width": 0,
    "page_height": 0,
    "top_margin": 0,
    "bottom_margin": 0,
    "left_margin": 0,
    "right_margin": 0,
    "no_of_copies": 0,
    "print_format": "",
    "is_pos_mode": false,
    "free_qty_column": false,
    "alt_qty_olumn": false,
    "rate_column": false,
    "net_rate_column": false,
    "gross_column": true,
    "use_for_hsg_society": false,
    "is_tax_applicable": true,
    "is_predefined": true,
    "numbering_info": [
      {
        "numbering_type": "AUTO",
        "reset_on": "YEARLY",
        "prefix": "",
        "suffix": "",
        "effective_from": "2026-09-26T00:00:00Z",
        "starting_number": 1,
        "prefill_padding": 3
      }
    ],
    "default_cash_ledger": {
      "id": "01a0ddd8-39c9-7d15-b05e-006acafbacfa",
      "name": "Cash",
      "code": "",
      "parent_id": "01a0ddd8-39bb-76ed-9e3c-787b74793622",
      "is_cost_centre_enabled": false,
      "is_bill_wise_enabled": false,
      "block_sales_on_credit_limit_exceed": false,
      "credit_period_days": 0,
      "credit_limit_amount": "0",
      "opening_balance": "0",
      "is_party_ledger": false,
      "is_predefined": true,
      "tax_rates": []
    },
    "default_local_trade_ledger": {
      "id": "01a0ddd8-39cd-7c46-b80e-991ba582fdf2",
      "name": "13% Purchase",
      "code": "",
      "parent_id": "01a0ddd8-39bb-7702-b32b-c639752559b8",
      "is_cost_centre_enabled": true,
      "is_bill_wise_enabled": false,
      "block_sales_on_credit_limit_exceed": false,
      "credit_period_days": 0,
      "credit_limit_amount": "0",
      "opening_balance": "0",
      "is_party_ledger": false,
      "is_predefined": true,
      "tax_rates": [
        {
          "effective_from": "2026-09-26T00:00:00Z",
          "applicability": "BOTH",
          "tax_rate": "0.13",
          "tax_group": [
            {
              "taxgroup_name": "VAT @ 13%",
              "taxgroup_code": "VAT13",
              "taxgroup_combined_rate": "13",
              "tax_component": [
                {
                  "taxgroup_component_name": "VAT @ 13%",
                  "taxgroup_component_scope": "ALL",
                  "taxgroup_component_compute_method": "PCT_BASE",
                  "taxgroup_component_rate": "13",
                  "input_ledger_id": "01a0ddd8-39cb-7a08-89e8-b57695a3a33b",
                  "output_ledger_id": "01a0ddd8-39cc-73e5-aac7-d555cd2c32b3"
                }
              ]
            }
          ]
        }
      ]
    },
    "default_global_trade_ledger": {
      "id": "01a0ddd8-39ce-7755-86c5-6d87d3baf14b",
      "name": "Exempted Import Purchase",
      "code": "",
      "parent_id": "01a0ddd8-39bb-7702-b32b-c639752559b8",
      "is_cost_centre_enabled": false,
      "is_bill_wise_enabled": false,
      "block_sales_on_credit_limit_exceed": false,
      "credit_period_days": 0,
      "credit_limit_amount": "0",
      "opening_balance": "0",
      "is_party_ledger": false,
      "is_predefined": true,
      "tax_rates": []
    },
    "default_discount_ledger": {
      "id": "01a0ddd8-39cf-7061-b5a9-b1eeb7ac872b",
      "name": "Discount A/c",
      "code": "",
      "parent_id": "01a0ddd8-39bb-76f2-b3b0-c9767d9bcb8f",
      "is_cost_centre_enabled": false,
      "is_bill_wise_enabled": false,
      "block_sales_on_credit_limit_exceed": false,
      "credit_period_days": 0,
      "credit_limit_amount": "0",
      "opening_balance": "0",
      "is_party_ledger": false,
      "is_predefined": true,
      "tax_rates": []
    },
    "default_roundoff_ledger": {
      "id": "01a0ddd8-39cf-7060-bbc7-a3081a8c72c4",
      "name": "Rounding Off",
      "code": "",
      "parent_id": "01a0ddd8-39bb-76f2-b3b0-c9767d9bcb8f",
      "is_cost_centre_enabled": false,
      "is_bill_wise_enabled": false,
      "block_sales_on_credit_limit_exceed": false,
      "credit_period_days": 0,
      "credit_limit_amount": "0",
      "opening_balance": "0",
      "is_party_ledger": false,
      "is_predefined": true,
      "tax_rates": []
    }
  },
  {
    "id": "01a0ddd8-39ef-76b2-a636-40a2a018d06e",
    "is_active": true,
    "name": "Quotation",
    "category": "QUOT",
    "apply_tax": "B",
    "apply_disc_bill": true,
    "apply_disc_item": false,
    "is_excise_appl": false,
    "print_after_save": false,
    "create_mode_after_save": false,
    "view_mode": "",
    "is_set_as_default": false,
    "allow_zero_value_item": false,
    "allow_zero_value_ledger": false,
    "voucher_mode": "INV",
    "posting_affects": "I",
    "printing_config": false,
    "page_size": "",
    "page_orientation": "",
    "page_width": 0,
    "page_height": 0,
    "top_margin": 0,
    "bottom_margin": 0,
    "left_margin": 0,
    "right_margin": 0,
    "no_of_copies": 0,
    "print_format": "",
    "is_pos_mode": false,
    "free_qty_column": false,
    "alt_qty_olumn": false,
    "rate_column": false,
    "net_rate_column": false,
    "gross_column": true,
    "use_for_hsg_society": false,
    "is_tax_applicable": true,
    "is_predefined": true,
    "numbering_info": [
      {
        "numbering_type": "AUTO",
        "reset_on": "YEARLY",
        "prefix": "",
        "suffix": "",
        "effective_from": "2026-09-26T00:00:00Z",
        "starting_number": 1,
        "prefill_padding": 3
      }
    ],
    "default_cash_ledger": {
      "id": "01a0ddd8-39c9-7d15-b05e-006acafbacfa",
      "name": "Cash",
      "code": "",
      "parent_id": "01a0ddd8-39bb-76ed-9e3c-787b74793622",
      "is_cost_centre_enabled": false,
      "is_bill_wise_enabled": false,
      "block_sales_on_credit_limit_exceed": false,
      "credit_period_days": 0,
      "credit_limit_amount": "0",
      "opening_balance": "0",
      "is_party_ledger": false,
      "is_predefined": true,
      "tax_rates": []
    },
    "default_local_trade_ledger": {
      "id": "01a0ddd8-39cc-73e6-823a-6909dfa61032",
      "name": "13% Sales",
      "code": "",
      "parent_id": "01a0ddd8-39bb-7703-a16d-5d1cf13cd0ac",
      "is_cost_centre_enabled": true,
      "is_bill_wise_enabled": false,
      "block_sales_on_credit_limit_exceed": false,
      "credit_period_days": 0,
      "credit_limit_amount": "0",
      "opening_balance": "0",
      "is_party_ledger": false,
      "is_predefined": true,
      "tax_rates": [
        {
          "effective_from": "2026-09-26T00:00:00Z",
          "applicability": "BOTH",
          "tax_rate": "0.13",
          "tax_group": [
            {
              "taxgroup_name": "VAT @ 13%",
              "taxgroup_code": "VAT13",
              "taxgroup_combined_rate": "13",
              "tax_component": [
                {
                  "taxgroup_component_name": "VAT @ 13%",
                  "taxgroup_component_scope": "ALL",
                  "taxgroup_component_compute_method": "PCT_BASE",
                  "taxgroup_component_rate": "13",
                  "input_ledger_id": "01a0ddd8-39cb-7a08-89e8-b57695a3a33b",
                  "output_ledger_id": "01a0ddd8-39cc-73e5-aac7-d555cd2c32b3"
                }
              ]
            }
          ]
        }
      ]
    },
    "default_global_trade_ledger": {
      "id": "01a0ddd8-39cd-747e-aee3-62fdffae568f",
      "name": "Exempted Export Sales",
      "code": "",
      "parent_id": "01a0ddd8-39bb-7703-a16d-5d1cf13cd0ac",
      "is_cost_centre_enabled": false,
      "is_bill_wise_enabled": false,
      "block_sales_on_credit_limit_exceed": false,
      "credit_period_days": 0,
      "credit_limit_amount": "0",
      "opening_balance": "0",
      "is_party_ledger": false,
      "is_predefined": true,
      "tax_rates": []
    },
    "default_discount_ledger": {
      "id": "01a0ddd8-39cf-7061-b5a9-b1eeb7ac872b",
      "name": "Discount A/c",
      "code": "",
      "parent_id": "01a0ddd8-39bb-76f2-b3b0-c9767d9bcb8f",
      "is_cost_centre_enabled": false,
      "is_bill_wise_enabled": false,
      "block_sales_on_credit_limit_exceed": false,
      "credit_period_days": 0,
      "credit_limit_amount": "0",
      "opening_balance": "0",
      "is_party_ledger": false,
      "is_predefined": true,
      "tax_rates": []
    },
    "default_roundoff_ledger": {
      "id": "01a0ddd8-39cf-7060-bbc7-a3081a8c72c4",
      "name": "Rounding Off",
      "code": "",
      "parent_id": "01a0ddd8-39bb-76f2-b3b0-c9767d9bcb8f",
      "is_cost_centre_enabled": false,
      "is_bill_wise_enabled": false,
      "block_sales_on_credit_limit_exceed": false,
      "credit_period_days": 0,
      "credit_limit_amount": "0",
      "opening_balance": "0",
      "is_party_ledger": false,
      "is_predefined": true,
      "tax_rates": []
    }
  },
  {
    "id": "01a0ddd8-39ef-76b3-8577-29060a22a007",
    "is_active": true,
    "name": "Purchase Indent",
    "category": "PI",
    "apply_tax": "B",
    "apply_disc_bill": true,
    "apply_disc_item": false,
    "is_excise_appl": false,
    "print_after_save": false,
    "create_mode_after_save": false,
    "view_mode": "",
    "is_set_as_default": false,
    "allow_zero_value_item": false,
    "allow_zero_value_ledger": false,
    "voucher_mode": "INV",
    "posting_affects": "I",
    "printing_config": false,
    "page_size": "",
    "page_orientation": "",
    "page_width": 0,
    "page_height": 0,
    "top_margin": 0,
    "bottom_margin": 0,
    "left_margin": 0,
    "right_margin": 0,
    "no_of_copies": 0,
    "print_format": "",
    "is_pos_mode": false,
    "free_qty_column": false,
    "alt_qty_olumn": false,
    "rate_column": false,
    "net_rate_column": false,
    "gross_column": true,
    "use_for_hsg_society": false,
    "is_tax_applicable": true,
    "is_predefined": true,
    "numbering_info": [
      {
        "numbering_type": "AUTO",
        "reset_on": "YEARLY",
        "prefix": "",
        "suffix": "",
        "effective_from": "2026-09-26T00:00:00Z",
        "starting_number": 1,
        "prefill_padding": 3
      }
    ],
    "default_cash_ledger": {
      "id": "01a0ddd8-39c9-7d15-b05e-006acafbacfa",
      "name": "Cash",
      "code": "",
      "parent_id": "01a0ddd8-39bb-76ed-9e3c-787b74793622",
      "is_cost_centre_enabled": false,
      "is_bill_wise_enabled": false,
      "block_sales_on_credit_limit_exceed": false,
      "credit_period_days": 0,
      "credit_limit_amount": "0",
      "opening_balance": "0",
      "is_party_ledger": false,
      "is_predefined": true,
      "tax_rates": []
    },
    "default_local_trade_ledger": {
      "id": "01a0ddd8-39cd-7c46-b80e-991ba582fdf2",
      "name": "13% Purchase",
      "code": "",
      "parent_id": "01a0ddd8-39bb-7702-b32b-c639752559b8",
      "is_cost_centre_enabled": true,
      "is_bill_wise_enabled": false,
      "block_sales_on_credit_limit_exceed": false,
      "credit_period_days": 0,
      "credit_limit_amount": "0",
      "opening_balance": "0",
      "is_party_ledger": false,
      "is_predefined": true,
      "tax_rates": [
        {
          "effective_from": "2026-09-26T00:00:00Z",
          "applicability": "BOTH",
          "tax_rate": "0.13",
          "tax_group": [
            {
              "taxgroup_name": "VAT @ 13%",
              "taxgroup_code": "VAT13",
              "taxgroup_combined_rate": "13",
              "tax_component": [
                {
                  "taxgroup_component_name": "VAT @ 13%",
                  "taxgroup_component_scope": "ALL",
                  "taxgroup_component_compute_method": "PCT_BASE",
                  "taxgroup_component_rate": "13",
                  "input_ledger_id": "01a0ddd8-39cb-7a08-89e8-b57695a3a33b",
                  "output_ledger_id": "01a0ddd8-39cc-73e5-aac7-d555cd2c32b3"
                }
              ]
            }
          ]
        }
      ]
    },
    "default_global_trade_ledger": {
      "id": "01a0ddd8-39ce-7755-86c5-6d87d3baf14b",
      "name": "Exempted Import Purchase",
      "code": "",
      "parent_id": "01a0ddd8-39bb-7702-b32b-c639752559b8",
      "is_cost_centre_enabled": false,
      "is_bill_wise_enabled": false,
      "block_sales_on_credit_limit_exceed": false,
      "credit_period_days": 0,
      "credit_limit_amount": "0",
      "opening_balance": "0",
      "is_party_ledger": false,
      "is_predefined": true,
      "tax_rates": []
    },
    "default_discount_ledger": {
      "id": "01a0ddd8-39cf-7061-b5a9-b1eeb7ac872b",
      "name": "Discount A/c",
      "code": "",
      "parent_id": "01a0ddd8-39bb-76f2-b3b0-c9767d9bcb8f",
      "is_cost_centre_enabled": false,
      "is_bill_wise_enabled": false,
      "block_sales_on_credit_limit_exceed": false,
      "credit_period_days": 0,
      "credit_limit_amount": "0",
      "opening_balance": "0",
      "is_party_ledger": false,
      "is_predefined": true,
      "tax_rates": []
    },
    "default_roundoff_ledger": {
      "id": "01a0ddd8-39cf-7060-bbc7-a3081a8c72c4",
      "name": "Rounding Off",
      "code": "",
      "parent_id": "01a0ddd8-39bb-76f2-b3b0-c9767d9bcb8f",
      "is_cost_centre_enabled": false,
      "is_bill_wise_enabled": false,
      "block_sales_on_credit_limit_exceed": false,
      "credit_period_days": 0,
      "credit_limit_amount": "0",
      "opening_balance": "0",
      "is_party_ledger": false,
      "is_predefined": true,
      "tax_rates": []
    }
  },
  {
    "id": "01a0ddd8-39ef-76b4-afdc-6a05886738d3",
    "is_active": true,
    "name": "Delivery Note",
    "category": "DLNT",
    "apply_tax": "B",
    "apply_disc_bill": true,
    "apply_disc_item": false,
    "is_excise_appl": false,
    "print_after_save": false,
    "create_mode_after_save": false,
    "view_mode": "",
    "is_set_as_default": false,
    "allow_zero_value_item": false,
    "allow_zero_value_ledger": false,
    "voucher_mode": "INV",
    "posting_affects": "I",
    "printing_config": false,
    "page_size": "",
    "page_orientation": "",
    "page_width": 0,
    "page_height": 0,
    "top_margin": 0,
    "bottom_margin": 0,
    "left_margin": 0,
    "right_margin": 0,
    "no_of_copies": 0,
    "print_format": "",
    "is_pos_mode": false,
    "free_qty_column": false,
    "alt_qty_olumn": false,
    "rate_column": false,
    "net_rate_column": false,
    "gross_column": true,
    "use_for_hsg_society": false,
    "is_tax_applicable": true,
    "is_predefined": true,
    "numbering_info": [
      {
        "numbering_type": "AUTO",
        "reset_on": "YEARLY",
        "prefix": "",
        "suffix": "",
        "effective_from": "2026-09-26T00:00:00Z",
        "starting_number": 1,
        "prefill_padding": 3
      }
    ],
    "default_cash_ledger": {
      "id": "01a0ddd8-39c9-7d15-b05e-006acafbacfa",
      "name": "Cash",
      "code": "",
      "parent_id": "01a0ddd8-39bb-76ed-9e3c-787b74793622",
      "is_cost_centre_enabled": false,
      "is_bill_wise_enabled": false,
      "block_sales_on_credit_limit_exceed": false,
      "credit_period_days": 0,
      "credit_limit_amount": "0",
      "opening_balance": "0",
      "is_party_ledger": false,
      "is_predefined": true,
      "tax_rates": []
    },
    "default_local_trade_ledger": {
      "id": "01a0ddd8-39cc-73e6-823a-6909dfa61032",
      "name": "13% Sales",
      "code": "",
      "parent_id": "01a0ddd8-39bb-7703-a16d-5d1cf13cd0ac",
      "is_cost_centre_enabled": true,
      "is_bill_wise_enabled": false,
      "block_sales_on_credit_limit_exceed": false,
      "credit_period_days": 0,
      "credit_limit_amount": "0",
      "opening_balance": "0",
      "is_party_ledger": false,
      "is_predefined": true,
      "tax_rates": [
        {
          "effective_from": "2026-09-26T00:00:00Z",
          "applicability": "BOTH",
          "tax_rate": "0.13",
          "tax_group": [
            {
              "taxgroup_name": "VAT @ 13%",
              "taxgroup_code": "VAT13",
              "taxgroup_combined_rate": "13",
              "tax_component": [
                {
                  "taxgroup_component_name": "VAT @ 13%",
                  "taxgroup_component_scope": "ALL",
                  "taxgroup_component_compute_method": "PCT_BASE",
                  "taxgroup_component_rate": "13",
                  "input_ledger_id": "01a0ddd8-39cb-7a08-89e8-b57695a3a33b",
                  "output_ledger_id": "01a0ddd8-39cc-73e5-aac7-d555cd2c32b3"
                }
              ]
            }
          ]
        }
      ]
    },
    "default_global_trade_ledger": {
      "id": "01a0ddd8-39cd-747e-aee3-62fdffae568f",
      "name": "Exempted Export Sales",
      "code": "",
      "parent_id": "01a0ddd8-39bb-7703-a16d-5d1cf13cd0ac",
      "is_cost_centre_enabled": false,
      "is_bill_wise_enabled": false,
      "block_sales_on_credit_limit_exceed": false,
      "credit_period_days": 0,
      "credit_limit_amount": "0",
      "opening_balance": "0",
      "is_party_ledger": false,
      "is_predefined": true,
      "tax_rates": []
    },
    "default_discount_ledger": {
      "id": "01a0ddd8-39cf-7061-b5a9-b1eeb7ac872b",
      "name": "Discount A/c",
      "code": "",
      "parent_id": "01a0ddd8-39bb-76f2-b3b0-c9767d9bcb8f",
      "is_cost_centre_enabled": false,
      "is_bill_wise_enabled": false,
      "block_sales_on_credit_limit_exceed": false,
      "credit_period_days": 0,
      "credit_limit_amount": "0",
      "opening_balance": "0",
      "is_party_ledger": false,
      "is_predefined": true,
      "tax_rates": []
    },
    "default_roundoff_ledger": {
      "id": "01a0ddd8-39cf-7060-bbc7-a3081a8c72c4",
      "name": "Rounding Off",
      "code": "",
      "parent_id": "01a0ddd8-39bb-76f2-b3b0-c9767d9bcb8f",
      "is_cost_centre_enabled": false,
      "is_bill_wise_enabled": false,
      "block_sales_on_credit_limit_exceed": false,
      "credit_period_days": 0,
      "credit_limit_amount": "0",
      "opening_balance": "0",
      "is_party_ledger": false,
      "is_predefined": true,
      "tax_rates": []
    }
  },
  {
    "id": "01a0ddd8-39ef-76b5-a22a-498d1c4d03a5",
    "is_active": true,
    "name": "Receipt Note",
    "category": "RCNT",
    "apply_tax": "B",
    "apply_disc_bill": true,
    "apply_disc_item": false,
    "is_excise_appl": false,
    "print_after_save": false,
    "create_mode_after_save": false,
    "view_mode": "",
    "is_set_as_default": false,
    "allow_zero_value_item": false,
    "allow_zero_value_ledger": false,
    "voucher_mode": "INV",
    "posting_affects": "I",
    "printing_config": false,
    "page_size": "",
    "page_orientation": "",
    "page_width": 0,
    "page_height": 0,
    "top_margin": 0,
    "bottom_margin": 0,
    "left_margin": 0,
    "right_margin": 0,
    "no_of_copies": 0,
    "print_format": "",
    "is_pos_mode": false,
    "free_qty_column": false,
    "alt_qty_olumn": false,
    "rate_column": false,
    "net_rate_column": false,
    "gross_column": true,
    "use_for_hsg_society": false,
    "is_tax_applicable": true,
    "is_predefined": true,
    "numbering_info": [
      {
        "numbering_type": "AUTO",
        "reset_on": "YEARLY",
        "prefix": "",
        "suffix": "",
        "effective_from": "2026-09-26T00:00:00Z",
        "starting_number": 1,
        "prefill_padding": 3
      }
    ],
    "default_cash_ledger": {
      "id": "01a0ddd8-39c9-7d15-b05e-006acafbacfa",
      "name": "Cash",
      "code": "",
      "parent_id": "01a0ddd8-39bb-76ed-9e3c-787b74793622",
      "is_cost_centre_enabled": false,
      "is_bill_wise_enabled": false,
      "block_sales_on_credit_limit_exceed": false,
      "credit_period_days": 0,
      "credit_limit_amount": "0",
      "opening_balance": "0",
      "is_party_ledger": false,
      "is_predefined": true,
      "tax_rates": []
    },
    "default_local_trade_ledger": {
      "id": "01a0ddd8-39cd-7c46-b80e-991ba582fdf2",
      "name": "13% Purchase",
      "code": "",
      "parent_id": "01a0ddd8-39bb-7702-b32b-c639752559b8",
      "is_cost_centre_enabled": true,
      "is_bill_wise_enabled": false,
      "block_sales_on_credit_limit_exceed": false,
      "credit_period_days": 0,
      "credit_limit_amount": "0",
      "opening_balance": "0",
      "is_party_ledger": false,
      "is_predefined": true,
      "tax_rates": [
        {
          "effective_from": "2026-09-26T00:00:00Z",
          "applicability": "BOTH",
          "tax_rate": "0.13",
          "tax_group": [
            {
              "taxgroup_name": "VAT @ 13%",
              "taxgroup_code": "VAT13",
              "taxgroup_combined_rate": "13",
              "tax_component": [
                {
                  "taxgroup_component_name": "VAT @ 13%",
                  "taxgroup_component_scope": "ALL",
                  "taxgroup_component_compute_method": "PCT_BASE",
                  "taxgroup_component_rate": "13",
                  "input_ledger_id": "01a0ddd8-39cb-7a08-89e8-b57695a3a33b",
                  "output_ledger_id": "01a0ddd8-39cc-73e5-aac7-d555cd2c32b3"
                }
              ]
            }
          ]
        }
      ]
    },
    "default_global_trade_ledger": {
      "id": "01a0ddd8-39ce-7755-86c5-6d87d3baf14b",
      "name": "Exempted Import Purchase",
      "code": "",
      "parent_id": "01a0ddd8-39bb-7702-b32b-c639752559b8",
      "is_cost_centre_enabled": false,
      "is_bill_wise_enabled": false,
      "block_sales_on_credit_limit_exceed": false,
      "credit_period_days": 0,
      "credit_limit_amount": "0",
      "opening_balance": "0",
      "is_party_ledger": false,
      "is_predefined": true,
      "tax_rates": []
    },
    "default_discount_ledger": {
      "id": "01a0ddd8-39cf-7061-b5a9-b1eeb7ac872b",
      "name": "Discount A/c",
      "code": "",
      "parent_id": "01a0ddd8-39bb-76f2-b3b0-c9767d9bcb8f",
      "is_cost_centre_enabled": false,
      "is_bill_wise_enabled": false,
      "block_sales_on_credit_limit_exceed": false,
      "credit_period_days": 0,
      "credit_limit_amount": "0",
      "opening_balance": "0",
      "is_party_ledger": false,
      "is_predefined": true,
      "tax_rates": []
    },
    "default_roundoff_ledger": {
      "id": "01a0ddd8-39cf-7060-bbc7-a3081a8c72c4",
      "name": "Rounding Off",
      "code": "",
      "parent_id": "01a0ddd8-39bb-76f2-b3b0-c9767d9bcb8f",
      "is_cost_centre_enabled": false,
      "is_bill_wise_enabled": false,
      "block_sales_on_credit_limit_exceed": false,
      "credit_period_days": 0,
      "credit_limit_amount": "0",
      "opening_balance": "0",
      "is_party_ledger": false,
      "is_predefined": true,
      "tax_rates": []
    }
  }
];

export const getVoucherTypesHandler = http.get<never, never, GetVoucherTypesResponse>(
  '*/api/v1/accounting/vouchertypes',
  async () => {
    if (!isMockEnabled('accounting', 'getVoucherTypes')) return;

    await delay(400);

    return HttpResponse.json(mockVoucherTypes);
  }
);

export const getVoucherTypeByIdHandler = http.get(
  '*/api/v1/accounting/vouchertypes/:id',
  async ({ params }) => {
    if (!isMockEnabled('accounting', 'getVoucherTypes')) return;

    await delay(300);
    const { id } = params;
    const item = mockVoucherTypes.find((vt) => vt.id === id);
    if (item) {
      return HttpResponse.json(item);
    }
    return new HttpResponse(null, { status: 404 });
  }
);

export const createVoucherTypeHandler = http.post(
  '*/api/v1/accounting/vouchertypes',
  async ({ request }) => {
    if (!isMockEnabled('accounting', 'getVoucherTypes')) return;

    await delay(400);
    const body = (await request.json()) as any;
    const newItem: any = {
      id: `vt-${Date.now()}`,
      is_active: true,
      is_predefined: false,
      ...body,
    };
    mockVoucherTypes.push(newItem);
    return HttpResponse.json(newItem, { status: 201 });
  }
);

export const updateVoucherTypeHandler = http.put(
  '*/api/v1/accounting/vouchertypes/:id',
  async ({ params, request }) => {
    if (!isMockEnabled('accounting', 'getVoucherTypes')) return;

    await delay(400);
    const { id } = params;
    const body = (await request.json()) as any;
    const index = mockVoucherTypes.findIndex((vt) => vt.id === id);
    if (index !== -1) {
      mockVoucherTypes[index] = {
        ...mockVoucherTypes[index],
        ...body,
      };
      return HttpResponse.json(mockVoucherTypes[index]);
    }
    return new HttpResponse(null, { status: 404 });
  }
);

export const deleteVoucherTypeHandler = http.delete(
  '*/api/v1/accounting/vouchertypes/:id',
  async ({ params }) => {
    if (!isMockEnabled('accounting', 'getVoucherTypes')) return;

    await delay(400);
    const { id } = params;
    const index = mockVoucherTypes.findIndex((vt) => vt.id === id);
    if (index !== -1) {
      mockVoucherTypes.splice(index, 1);
      return HttpResponse.json({ message: 'Operation completed successfully' });
    }
    return new HttpResponse(null, { status: 404 });
  }
);
