import { http, HttpResponse, delay } from 'msw';
import { isMockEnabled } from '../../store/mockConfig';
import type { GetLedgersResponse } from '@/features/Accounts/Ledger/types';

const mockLedgers: GetLedgersResponse = [
    {
        "id": "01a0dcc9-8ba6-76d1-adbe-424efbde29be",
        "name": "Cash",
        "code": "",
        "is_bill_wise_enabled": false,
        "block_sales_on_credit_limit_exceed": false,
        "credit_period_days": 0,
        "credit_limit_amount": "0",
        "opening_balance": "0",
        "is_predefined": true,
        "tax_rates": []
    },
    {
        "id": "01a0dcc9-8ba6-7ebb-af97-96b71070526e",
        "name": "Profit \u0026 Loss A/c",
        "code": "",
        "is_bill_wise_enabled": false,
        "block_sales_on_credit_limit_exceed": false,
        "credit_period_days": 0,
        "credit_limit_amount": "0",
        "opening_balance": "0",
        "is_predefined": true,
        "tax_rates": []
    },
    {
        "id": "01a0dcc9-8ba6-7ebc-9460-96250e5c3e64",
        "name": "Input VAT @ 13%",
        "code": "",
        "is_bill_wise_enabled": false,
        "block_sales_on_credit_limit_exceed": false,
        "credit_period_days": 0,
        "credit_limit_amount": "0",
        "opening_balance": "0",
        "is_predefined": true,
        "tax_rates": []
    },
    {
        "id": "01a0dcc9-8ba7-776f-9a5c-06d1fde62dde",
        "name": "Output VAT @ 13%",
        "code": "",
        "is_bill_wise_enabled": false,
        "block_sales_on_credit_limit_exceed": false,
        "credit_period_days": 0,
        "credit_limit_amount": "0",
        "opening_balance": "0",
        "is_predefined": true,
        "tax_rates": []
    },
    {
        "id": "01a0dcc9-8ba7-7770-8b5c-2e9913aad8d7",
        "name": "13% Sales",
        "code": "",
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
                                "input_ledger_id": "01a0dcc9-8ba6-7ebc-9460-96250e5c3e64",
                                "output_ledger_id": "01a0dcc9-8ba7-776f-9a5c-06d1fde62dde",
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
        "id": "01a0dcc9-8ba8-7017-a9dd-53c0660417ce",
        "name": "13% Export Sales",
        "code": "",
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
                                "input_ledger_id": "01a0dcc9-8ba6-7ebc-9460-96250e5c3e64",
                                "output_ledger_id": "01a0dcc9-8ba7-776f-9a5c-06d1fde62dde",
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
        "id": "01a0dcc9-8ba8-77fa-807b-0e9bc8cdecf9",
        "name": "Exempted Sales",
        "code": "",
        "is_bill_wise_enabled": false,
        "block_sales_on_credit_limit_exceed": false,
        "credit_period_days": 0,
        "credit_limit_amount": "0",
        "opening_balance": "0",
        "is_predefined": true,
        "tax_rates": []
    },
    {
        "id": "01a0dcc9-8ba8-77fb-8bcf-4fd57a9e8a0d",
        "name": "Exempted Export Sales",
        "code": "",
        "is_bill_wise_enabled": false,
        "block_sales_on_credit_limit_exceed": false,
        "credit_period_days": 0,
        "credit_limit_amount": "0",
        "opening_balance": "0",
        "is_predefined": true,
        "tax_rates": []
    },
    {
        "id": "01a0dcc9-8ba9-7095-a937-bc413353c2f6",
        "name": "13% Purchase",
        "code": "",
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
                                "input_ledger_id": "01a0dcc9-8ba6-7ebc-9460-96250e5c3e64",
                                "output_ledger_id": "01a0dcc9-8ba7-776f-9a5c-06d1fde62dde",
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
        "id": "01a0dcc9-8ba9-7096-afcf-0be983040a53",
        "name": "13% Import Purchase",
        "code": "",
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
                                "input_ledger_id": "01a0dcc9-8ba6-7ebc-9460-96250e5c3e64",
                                "output_ledger_id": "01a0dcc9-8ba7-776f-9a5c-06d1fde62dde",
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
        "id": "01a0dcc9-8ba9-7879-87aa-cd121af1af0b",
        "name": "Exempted Purchase",
        "code": "",
        "is_bill_wise_enabled": false,
        "block_sales_on_credit_limit_exceed": false,
        "credit_period_days": 0,
        "credit_limit_amount": "0",
        "opening_balance": "0",
        "is_predefined": true,
        "tax_rates": []
    },
    {
        "id": "01a0dcc9-8ba9-787a-9aea-d1f75c034c4b",
        "name": "Exempted Import Purchase",
        "code": "",
        "is_bill_wise_enabled": false,
        "block_sales_on_credit_limit_exceed": false,
        "credit_period_days": 0,
        "credit_limit_amount": "0",
        "opening_balance": "0",
        "is_predefined": true,
        "tax_rates": []
    },
    {
        "id": "01a0dcc9-8baa-711e-a24e-a3313019269b",
        "name": "Rounding Off",
        "code": "",
        "is_bill_wise_enabled": false,
        "block_sales_on_credit_limit_exceed": false,
        "credit_period_days": 0,
        "credit_limit_amount": "0",
        "opening_balance": "0",
        "is_predefined": true,
        "tax_rates": []
    },
    {
        "id": "01a0dcc9-8baa-711f-b28c-ca96266afef3",
        "name": "Discount A/c",
        "code": "",
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
