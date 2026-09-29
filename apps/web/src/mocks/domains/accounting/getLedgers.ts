import { http, HttpResponse, delay } from 'msw';
import { isMockEnabled } from '../../store/mockConfig';
import type { GetLedgersResponse, Ledger } from '@/features/Accounts/Ledger/types';

export const mockLedgers: Ledger[] = [
    {
        "id": "01a0ddd8-39c9-7d15-b05e-006acafbacfa",
        "name": "Cash",
        "code": "",
        "is_cost_entre_enabled": false,
        "is_bill_wise_enabled": false,
        "block_sales_on_credit_limit_exceed": false,
        "credit_period_days": 0,
        "credit_limit_amount": "0",
        "opening_balance": "0",
        "is_predefined": true,
        "tax_rates": []
    },
    {
        "id": "01a0ddd8-39cb-7a07-a2f8-9a914e9606cd",
        "name": "Profit \u0026 Loss A/c",
        "code": "",
        "is_cost_entre_enabled": false,
        "is_bill_wise_enabled": false,
        "block_sales_on_credit_limit_exceed": false,
        "credit_period_days": 0,
        "credit_limit_amount": "0",
        "opening_balance": "0",
        "is_predefined": true,
        "tax_rates": []
    },
    {
        "id": "01a0ddd8-39cb-7a08-89e8-b57695a3a33b",
        "name": "Input VAT @ 13%",
        "code": "",
        "is_cost_entre_enabled": false,
        "is_bill_wise_enabled": false,
        "block_sales_on_credit_limit_exceed": false,
        "credit_period_days": 0,
        "credit_limit_amount": "0",
        "opening_balance": "0",
        "is_predefined": true,
        "tax_rates": []
    },
    {
        "id": "01a0ddd8-39cc-73e5-aac7-d555cd2c32b3",
        "name": "Output VAT @ 13%",
        "code": "",
        "is_cost_entre_enabled": false,
        "is_bill_wise_enabled": false,
        "block_sales_on_credit_limit_exceed": false,
        "credit_period_days": 0,
        "credit_limit_amount": "0",
        "opening_balance": "0",
        "is_predefined": true,
        "tax_rates": []
    },
    {
        "id": "01a0ddd8-39cc-73e6-823a-6909dfa61032",
        "name": "13% Sales",
        "code": "",
        "is_cost_entre_enabled": true,
        "is_bill_wise_enabled": false,
        "block_sales_on_credit_limit_exceed": false,
        "credit_period_days": 0,
        "credit_limit_amount": "0",
        "opening_balance": "0",
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
                                "output_ledger_id": "01a0ddd8-39cc-73e5-aac7-d555cd2c32b3",
                                "input_ledger_name": "Input VAT @ 13%",
                                "output_ledger_name": "Output VAT @ 13%"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "01a0ddd8-39cc-7bdc-ab47-710d32338fa3",
        "name": "13% Export Sales",
        "code": "",
        "is_cost_entre_enabled": false,
        "is_bill_wise_enabled": false,
        "block_sales_on_credit_limit_exceed": false,
        "credit_period_days": 0,
        "credit_limit_amount": "0",
        "opening_balance": "0",
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
                                "output_ledger_id": "01a0ddd8-39cc-73e5-aac7-d555cd2c32b3",
                                "input_ledger_name": "Input VAT @ 13%",
                                "output_ledger_name": "Output VAT @ 13%"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "01a0ddd8-39cd-747d-9099-0d4a5e2126f6",
        "name": "Exempted Sales",
        "code": "",
        "is_cost_entre_enabled": false,
        "is_bill_wise_enabled": false,
        "block_sales_on_credit_limit_exceed": false,
        "credit_period_days": 0,
        "credit_limit_amount": "0",
        "opening_balance": "0",
        "is_predefined": true,
        "tax_rates": []
    },
    {
        "id": "01a0ddd8-39cd-747e-aee3-62fdffae568f",
        "name": "Exempted Export Sales",
        "code": "",
        "is_cost_entre_enabled": false,
        "is_bill_wise_enabled": false,
        "block_sales_on_credit_limit_exceed": false,
        "credit_period_days": 0,
        "credit_limit_amount": "0",
        "opening_balance": "0",
        "is_predefined": true,
        "tax_rates": []
    },
    {
        "id": "01a0ddd8-39cd-7c46-b80e-991ba582fdf2",
        "name": "13% Purchase",
        "code": "",
        "is_cost_entre_enabled": false,
        "is_bill_wise_enabled": false,
        "block_sales_on_credit_limit_exceed": false,
        "credit_period_days": 0,
        "credit_limit_amount": "0",
        "opening_balance": "0",
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
                                "output_ledger_id": "01a0ddd8-39cc-73e5-aac7-d555cd2c32b3",
                                "input_ledger_name": "Input VAT @ 13%",
                                "output_ledger_name": "Output VAT @ 13%"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "01a0ddd8-39cd-7c70-ae92-826390df4916",
        "name": "13% Import Purchase",
        "code": "",
        "is_cost_entre_enabled": false,
        "is_bill_wise_enabled": false,
        "block_sales_on_credit_limit_exceed": false,
        "credit_period_days": 0,
        "credit_limit_amount": "0",
        "opening_balance": "0",
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
                                "output_ledger_id": "01a0ddd8-39cc-73e5-aac7-d555cd2c32b3",
                                "input_ledger_name": "Input VAT @ 13%",
                                "output_ledger_name": "Output VAT @ 13%"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "01a0ddd8-39ce-750c-8992-1d2c6032aef4",
        "name": "Exempted Purchase",
        "code": "",
        "is_cost_entre_enabled": false,
        "is_bill_wise_enabled": false,
        "block_sales_on_credit_limit_exceed": false,
        "credit_period_days": 0,
        "credit_limit_amount": "0",
        "opening_balance": "0",
        "is_predefined": true,
        "tax_rates": []
    },
    {
        "id": "01a0ddd8-39ce-7755-86c5-6d87d3baf14b",
        "name": "Exempted Import Purchase",
        "code": "",
        "is_cost_entre_enabled": false,
        "is_bill_wise_enabled": false,
        "block_sales_on_credit_limit_exceed": false,
        "credit_period_days": 0,
        "credit_limit_amount": "0",
        "opening_balance": "0",
        "is_predefined": true,
        "tax_rates": []
    },
    {
        "id": "01a0ddd8-39cf-7060-bbc7-a3081a8c72c4",
        "name": "Rounding Off",
        "code": "",
        "is_cost_entre_enabled": false,
        "is_bill_wise_enabled": false,
        "block_sales_on_credit_limit_exceed": false,
        "credit_period_days": 0,
        "credit_limit_amount": "0",
        "opening_balance": "0",
        "is_predefined": true,
        "tax_rates": []
    },
    {
        "id": "01a0ddd8-39cf-7061-b5a9-b1eeb7ac872b",
        "name": "Discount A/c",
        "code": "",
        "is_cost_entre_enabled": false,
        "is_bill_wise_enabled": false,
        "block_sales_on_credit_limit_exceed": false,
        "credit_period_days": 0,
        "credit_limit_amount": "0",
        "opening_balance": "0",
        "is_predefined": true,
        "tax_rates": []
    }
];

export const getLedgersHandler = http.get<never, never, GetLedgersResponse>(
  '*/api/v1/accounting/ledgers',
  async () => {
    if (!isMockEnabled('accounting', 'getLedgers')) return;
    await delay(800);
    return HttpResponse.json(mockLedgers);
  }
);
