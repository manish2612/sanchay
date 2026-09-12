import { http, HttpResponse, delay } from 'msw';
import { isMockEnabled } from '../../store/mockConfig';
import { GlobalMastersResponse } from '../../../features/Masters/api/globalMastersApi';

const mockGlobalMastersResponse: GlobalMastersResponse = {
  "countries": [
    {
      "id": "01a094ea-4346-75ec-a7b1-1f141c3738db",
      "iso": "IN",
      "name": "India",
      "iso3": "IND",
      "numcode": 356,
      "is_active": true,
      "currency_info": {
        "id": "01a094ea-43cd-70c7-b1ed-d14ba61ba4fa",
        "fk_country_id": "01a094ea-4346-75ec-a7b1-1f141c3738db",
        "name": "Indian Rupees",
        "symbol": "₹",
        "is_active": true
      },
      "state_info": [
        {
          "id": "01a094ea-43d7-7dad-a09b-5dff483ea7f5",
          "fk_country_id": "01a094ea-4346-75ec-a7b1-1f141c3738db",
          "name": "Andaman and Nicobar Islands",
          "code": "AN",
          "numcode": "35",
          "is_active": true
        },
        {
          "id": "01a094ea-43d9-774f-b0d7-6ce8fc2f81b6",
          "fk_country_id": "01a094ea-4346-75ec-a7b1-1f141c3738db",
          "name": "Andhra Pradesh",
          "code": "AP",
          "numcode": "28",
          "is_active": true
        },
        {
          "id": "01a094ea-43db-7553-a15b-349e128c06bc",
          "fk_country_id": "01a094ea-4346-75ec-a7b1-1f141c3738db",
          "name": "Andhra Pradesh (New)",
          "code": "AD",
          "numcode": "37",
          "is_active": true
        },
        {
          "id": "01a094ea-43dc-748f-a47e-2ce15c20a081",
          "fk_country_id": "01a094ea-4346-75ec-a7b1-1f141c3738db",
          "name": "Arunachal Pradesh",
          "code": "AR",
          "numcode": "12",
          "is_active": true
        },
        {
          "id": "01a094ea-43dd-78f0-ac7f-a1edda91a279",
          "fk_country_id": "01a094ea-4346-75ec-a7b1-1f141c3738db",
          "name": "Assam",
          "code": "AS",
          "numcode": "18",
          "is_active": true
        },
        {
          "id": "01a094ea-43de-7cbb-aa2e-53388078a092",
          "fk_country_id": "01a094ea-4346-75ec-a7b1-1f141c3738db",
          "name": "Bihar",
          "code": "BH",
          "numcode": "10",
          "is_active": true
        },
        {
          "id": "01a094ea-43e0-76d8-a5d3-135698b9f4d1",
          "fk_country_id": "01a094ea-4346-75ec-a7b1-1f141c3738db",
          "name": "Chandigarh",
          "code": "CH",
          "numcode": "4",
          "is_active": true
        },
        {
          "id": "01a094ea-43e1-71b7-a72e-5aa7eb53f141",
          "fk_country_id": "01a094ea-4346-75ec-a7b1-1f141c3738db",
          "name": "Chattisgarh",
          "code": "CT",
          "numcode": "22",
          "is_active": true
        },
        {
          "id": "01a094ea-43e2-752b-8ba3-f42239136dad",
          "fk_country_id": "01a094ea-4346-75ec-a7b1-1f141c3738db",
          "name": "Dadra and Nagar Haveli",
          "code": "DN",
          "numcode": "26",
          "is_active": true
        },
        {
          "id": "01a094ea-43e3-71b3-b920-44c5895818d5",
          "fk_country_id": "01a094ea-4346-75ec-a7b1-1f141c3738db",
          "name": "Daman and Diu",
          "code": "DD",
          "numcode": "25",
          "is_active": true
        },
        {
          "id": "01a094ea-43e3-7e2e-93b6-e4863f1ea7a5",
          "fk_country_id": "01a094ea-4346-75ec-a7b1-1f141c3738db",
          "name": "Delhi",
          "code": "DL",
          "numcode": "7",
          "is_active": true
        },
        {
          "id": "01a094ea-43e5-7272-8479-5774d2735711",
          "fk_country_id": "01a094ea-4346-75ec-a7b1-1f141c3738db",
          "name": "Goa",
          "code": "GA",
          "numcode": "30",
          "is_active": true
        },
        {
          "id": "01a094ea-43e6-72c3-8171-4b45b40d6407",
          "fk_country_id": "01a094ea-4346-75ec-a7b1-1f141c3738db",
          "name": "Gujarat",
          "code": "GJ",
          "numcode": "24",
          "is_active": true
        },
        {
          "id": "01a094ea-43e7-7151-bca9-2d94574151c0",
          "fk_country_id": "01a094ea-4346-75ec-a7b1-1f141c3738db",
          "name": "Haryana",
          "code": "HR",
          "numcode": "6",
          "is_active": true
        },
        {
          "id": "01a094ea-43e7-7bc1-be76-d3d57709c68d",
          "fk_country_id": "01a094ea-4346-75ec-a7b1-1f141c3738db",
          "name": "Himachal Pradesh",
          "code": "HP",
          "numcode": "2",
          "is_active": true
        },
        {
          "id": "01a094ea-43e8-781e-9523-5a0cae9b54bb",
          "fk_country_id": "01a094ea-4346-75ec-a7b1-1f141c3738db",
          "name": "Jammu and Kashmir",
          "code": "JK",
          "numcode": "1",
          "is_active": true
        },
        {
          "id": "01a094ea-43e9-7576-9a68-3a4763611923",
          "fk_country_id": "01a094ea-4346-75ec-a7b1-1f141c3738db",
          "name": "Jharkhand",
          "code": "JH",
          "numcode": "20",
          "is_active": true
        },
        {
          "id": "01a094ea-43e9-7d5f-9db9-172b9d9bab04",
          "fk_country_id": "01a094ea-4346-75ec-a7b1-1f141c3738db",
          "name": "Karnataka",
          "code": "KA",
          "numcode": "29",
          "is_active": true
        },
        {
          "id": "01a094ea-43ea-7d68-8984-d1cbc7c4595e",
          "fk_country_id": "01a094ea-4346-75ec-a7b1-1f141c3738db",
          "name": "Kerala",
          "code": "KL",
          "numcode": "32",
          "is_active": true
        },
        {
          "id": "01a094ea-43eb-7d74-aa15-38cc3be027fe",
          "fk_country_id": "01a094ea-4346-75ec-a7b1-1f141c3738db",
          "name": "Lakshadweep Islands",
          "code": "LD",
          "numcode": "31",
          "is_active": true
        },
        {
          "id": "01a094ea-43ec-7d97-bf96-0af7977fdb9f",
          "fk_country_id": "01a094ea-4346-75ec-a7b1-1f141c3738db",
          "name": "Madhya Pradesh",
          "code": "MP",
          "numcode": "23",
          "is_active": true
        },
        {
          "id": "01a094ea-43ed-7d4d-98d7-53062e5b73f5",
          "fk_country_id": "01a094ea-4346-75ec-a7b1-1f141c3738db",
          "name": "Maharashtra",
          "code": "MH",
          "numcode": "27",
          "is_active": true
        },
        {
          "id": "01a094ea-43ee-7d62-9caa-f49a0a29746c",
          "fk_country_id": "01a094ea-4346-75ec-a7b1-1f141c3738db",
          "name": "Manipur",
          "code": "MN",
          "numcode": "14",
          "is_active": true
        },
        {
          "id": "01a094ea-43f0-7d52-b749-543d99134095",
          "fk_country_id": "01a094ea-4346-75ec-a7b1-1f141c3738db",
          "name": "Meghalaya",
          "code": "ME",
          "numcode": "17",
          "is_active": true
        },
        {
          "id": "01a094ea-43f1-7d51-8ce0-12dd29d8eb47",
          "fk_country_id": "01a094ea-4346-75ec-a7b1-1f141c3738db",
          "name": "Mizoram",
          "code": "MI",
          "numcode": "15",
          "is_active": true
        },
        {
          "id": "01a094ea-43f3-7a8b-9c90-d211066a8364",
          "fk_country_id": "01a094ea-4346-75ec-a7b1-1f141c3738db",
          "name": "Nagaland",
          "code": "NL",
          "numcode": "13",
          "is_active": true
        },
        {
          "id": "01a094ea-43f4-76a9-87ef-9150ac7c0360",
          "fk_country_id": "01a094ea-4346-75ec-a7b1-1f141c3738db",
          "name": "Odisha",
          "code": "OR",
          "numcode": "21",
          "is_active": true
        },
        {
          "id": "01a094ea-43f5-784c-b8dd-339c9864fd4b",
          "fk_country_id": "01a094ea-4346-75ec-a7b1-1f141c3738db",
          "name": "Pondicherry",
          "code": "PY",
          "numcode": "34",
          "is_active": true
        },
        {
          "id": "01a094ea-43f6-7b35-9e14-89b4f476a27f",
          "fk_country_id": "01a094ea-4346-75ec-a7b1-1f141c3738db",
          "name": "Punjab",
          "code": "PB",
          "numcode": "3",
          "is_active": true
        },
        {
          "id": "01a094ea-43f7-7515-97ef-60c5da911eae",
          "fk_country_id": "01a094ea-4346-75ec-a7b1-1f141c3738db",
          "name": "Rajasthan",
          "code": "RJ",
          "numcode": "8",
          "is_active": true
        },
        {
          "id": "01a094ea-43f8-7219-ab96-e6b5ca2c3a43",
          "fk_country_id": "01a094ea-4346-75ec-a7b1-1f141c3738db",
          "name": "Sikkim",
          "code": "SK",
          "numcode": "11",
          "is_active": true
        },
        {
          "id": "01a094ea-43f9-7153-8448-33ca6f736199",
          "fk_country_id": "01a094ea-4346-75ec-a7b1-1f141c3738db",
          "name": "Tamil Nadu",
          "code": "TN",
          "numcode": "33",
          "is_active": true
        },
        {
          "id": "01a094ea-43fa-7440-a1ab-5132ecf14fab",
          "fk_country_id": "01a094ea-4346-75ec-a7b1-1f141c3738db",
          "name": "Telangana",
          "code": "TS",
          "numcode": "36",
          "is_active": true
        },
        {
          "id": "01a094ea-43fa-7c1d-acd1-13880a404e89",
          "fk_country_id": "01a094ea-4346-75ec-a7b1-1f141c3738db",
          "name": "Tripura",
          "code": "TR",
          "numcode": "16",
          "is_active": true
        },
        {
          "id": "01a094ea-43fb-7e94-874b-f3ea62d5bb13",
          "fk_country_id": "01a094ea-4346-75ec-a7b1-1f141c3738db",
          "name": "Uttar Pradesh",
          "code": "UP",
          "numcode": "9",
          "is_active": true
        },
        {
          "id": "01a094ea-43fd-77db-8918-f2bcbadaa511",
          "fk_country_id": "01a094ea-4346-75ec-a7b1-1f141c3738db",
          "name": "Uttarakhand",
          "code": "UT",
          "numcode": "5",
          "is_active": true
        },
        {
          "id": "01a094ea-43fe-756e-a7de-379e3e66d932",
          "fk_country_id": "01a094ea-4346-75ec-a7b1-1f141c3738db",
          "name": "West Bengal",
          "code": "WB",
          "numcode": "19",
          "is_active": true
        }
      ]
    },
    {
      "id": "01a094ea-4376-76e9-a518-c2ab1aa069c5",
      "iso": "NP",
      "name": "Nepal",
      "iso3": "NPL",
      "numcode": 524,
      "is_active": true,
      "currency_info": {
        "id": "01a094ea-43cd-7a6c-afce-b49d1f96f8c6",
        "fk_country_id": "01a094ea-4376-76e9-a518-c2ab1aa069c5",
        "name": "Nepalese Rupees",
        "symbol": "₨",
        "is_active": true
      },
      "state_info": [
        {
          "id": "01a094ea-43ff-74bc-b40c-4e7f87350bd7",
          "fk_country_id": "01a094ea-4376-76e9-a518-c2ab1aa069c5",
          "name": "Far West",
          "code": "P1",
          "numcode": "1",
          "is_active": true
        },
        {
          "id": "01a094ea-4400-73f0-a7d7-b4b49f62eda3",
          "fk_country_id": "01a094ea-4376-76e9-a518-c2ab1aa069c5",
          "name": "Janakpur",
          "code": "P2",
          "numcode": "2",
          "is_active": true
        },
        {
          "id": "01a094ea-4401-7242-9011-852d1531d3e9",
          "fk_country_id": "01a094ea-4376-76e9-a518-c2ab1aa069c5",
          "name": "Bagmati",
          "code": "P3",
          "numcode": "3",
          "is_active": true
        },
        {
          "id": "01a094ea-4402-72f8-ace4-6755671dadcc",
          "fk_country_id": "01a094ea-4376-76e9-a518-c2ab1aa069c5",
          "name": "Gandaki",
          "code": "P4",
          "numcode": "4",
          "is_active": true
        },
        {
          "id": "01a094ea-4403-707e-87b1-2c61ed9cf0b5",
          "fk_country_id": "01a094ea-4376-76e9-a518-c2ab1aa069c5",
          "name": "Lumbini",
          "code": "P5",
          "numcode": "5",
          "is_active": true
        },
        {
          "id": "01a094ea-4403-7ec3-950e-6aab976029c1",
          "fk_country_id": "01a094ea-4376-76e9-a518-c2ab1aa069c5",
          "name": "Kamali",
          "code": "P6",
          "numcode": "6",
          "is_active": true
        },
        {
          "id": "01a094ea-4404-7d63-a818-9b6d8fd1b299",
          "fk_country_id": "01a094ea-4376-76e9-a518-c2ab1aa069c5",
          "name": "Koshi",
          "code": "P7",
          "numcode": "7",
          "is_active": true
        }
      ]
    }
  ],
  "timezones": [
    {
      "id": "01a094ea-4405-760d-8c77-93c063190b6d",
      "name": "Pacific/Midway",
      "utc_offset": "-11:00",
      "raw_offset_seconds": 80,
      "abbreviation": "SST",
      "representative_region": "Midway, American Samoa"
    },
    {
      "id": "01a094ea-4407-7870-948e-c5ec27a7183a",
      "name": "Pacific/Honolulu",
      "utc_offset": "-10:00",
      "raw_offset_seconds": 96,
      "abbreviation": "HST",
      "representative_region": "Hawaii, Tahiti"
    },
    {
      "id": "01a094ea-4408-7af5-9545-f2b79db1e9c2",
      "name": "Pacific/Marquesas",
      "utc_offset": "-09:30",
      "raw_offset_seconds": 104,
      "abbreviation": "MART",
      "representative_region": "Marquesas Islands"
    },
    {
      "id": "01a094ea-4409-73ba-a6f3-14f10f8202e9",
      "name": "America/Anchorage",
      "utc_offset": "-09:00",
      "raw_offset_seconds": 112,
      "abbreviation": "AKST",
      "representative_region": "Anchorage, Juneau"
    },
    {
      "id": "01a094ea-440a-777c-bd12-71317bccdae3",
      "name": "America/Los_Angeles",
      "utc_offset": "-08:00",
      "raw_offset_seconds": 128,
      "abbreviation": "PST",
      "representative_region": "Los Angeles, Vancouver, Tijuana"
    },
    {
      "id": "01a094ea-440b-7637-9db5-961c74982262",
      "name": "America/Denver",
      "utc_offset": "-07:00",
      "raw_offset_seconds": 144,
      "abbreviation": "MST",
      "representative_region": "Denver, Phoenix, Calgary"
    },
    {
      "id": "01a094ea-440b-7e29-9020-e66c9c096c0b",
      "name": "America/Chicago",
      "utc_offset": "-06:00",
      "raw_offset_seconds": 160,
      "abbreviation": "CST",
      "representative_region": "Chicago, Dallas, Mexico City"
    },
    {
      "id": "01a094ea-440c-7e25-8533-23b02a3ad616",
      "name": "America/New_York",
      "utc_offset": "-05:00",
      "raw_offset_seconds": 176,
      "abbreviation": "EST",
      "representative_region": "New York, Toronto, Bogota, Lima"
    },
    {
      "id": "01a094ea-440e-7e2d-a6a1-e4adff334498",
      "name": "America/Halifax",
      "utc_offset": "-04:00",
      "raw_offset_seconds": 192,
      "abbreviation": "AST",
      "representative_region": "Halifax, Caracas, Santiago"
    },
    {
      "id": "01a094ea-440f-7b89-b742-311700d1c83b",
      "name": "America/St_Johns",
      "utc_offset": "-03:30",
      "raw_offset_seconds": 200,
      "abbreviation": "NST",
      "representative_region": "St. Johns (Newfoundland)"
    },
    {
      "id": "01a094ea-4410-7bb3-9680-fa1dc23f73e4",
      "name": "America/Sao_Paulo",
      "utc_offset": "-03:00",
      "raw_offset_seconds": 208,
      "abbreviation": "BRT",
      "representative_region": "Sao Paulo, Buenos Aires"
    },
    {
      "id": "01a094ea-4412-7c29-8c2c-b727e23df896",
      "name": "America/Noronha",
      "utc_offset": "-02:00",
      "raw_offset_seconds": 224,
      "abbreviation": "FNT",
      "representative_region": "Fernando de Noronha"
    },
    {
      "id": "01a094ea-4414-7082-9001-57087bdf271c",
      "name": "Atlantic/Cape_Verde",
      "utc_offset": "-01:00",
      "raw_offset_seconds": 240,
      "abbreviation": "CVT",
      "representative_region": "Cape Verde, Azores"
    },
    {
      "id": "01a094ea-4414-7cf8-b6a4-ac7a6348261f",
      "name": "UTC",
      "utc_offset": "+00:00",
      "raw_offset_seconds": 0,
      "abbreviation": "UTC",
      "representative_region": "London, Dublin, Lisbon, Accra"
    },
    {
      "id": "01a094ea-4415-75be-a126-d90be4160750",
      "name": "Europe/Paris",
      "utc_offset": "+01:00",
      "raw_offset_seconds": 16,
      "abbreviation": "CET",
      "representative_region": "Paris, Berlin, Rome, Lagos"
    },
    {
      "id": "01a094ea-4416-787e-abdf-1c9993f1334c",
      "name": "Europe/Athens",
      "utc_offset": "+02:00",
      "raw_offset_seconds": 32,
      "abbreviation": "EET",
      "representative_region": "Cairo, Athens, Johannesburg"
    },
    {
      "id": "01a094ea-4417-7734-91e9-b4e368200789",
      "name": "Europe/Moscow",
      "utc_offset": "+03:00",
      "raw_offset_seconds": 48,
      "abbreviation": "MSK",
      "representative_region": "Moscow, Riyadh, Nairobi, Istanbul"
    },
    {
      "id": "01a094ea-4417-7f1c-a0da-e1e960a04677",
      "name": "Asia/Tehran",
      "utc_offset": "+03:30",
      "raw_offset_seconds": 56,
      "abbreviation": "IRST",
      "representative_region": "Tehran"
    },
    {
      "id": "01a094ea-4418-7b8b-a9d4-0540e7a01be7",
      "name": "Asia/Dubai",
      "utc_offset": "+04:00",
      "raw_offset_seconds": 64,
      "abbreviation": "GST",
      "representative_region": "Dubai, Baku, Tbilisi"
    },
    {
      "id": "01a094ea-4419-7c3d-b2d7-d6b71e152fb6",
      "name": "Asia/Kabul",
      "utc_offset": "+04:30",
      "raw_offset_seconds": 72,
      "abbreviation": "AFT",
      "representative_region": "Kabul"
    },
    {
      "id": "01a094ea-441a-7c45-9c63-ef4c5aaa1710",
      "name": "Asia/Karachi",
      "utc_offset": "+05:00",
      "raw_offset_seconds": 80,
      "abbreviation": "PKT",
      "representative_region": "Karachi, Tashkent, Yekaterinburg"
    },
    {
      "id": "01a094ea-441b-7b3c-b992-7e188f063d25",
      "name": "Asia/Kolkata",
      "utc_offset": "+05:30",
      "raw_offset_seconds": 88,
      "abbreviation": "IST",
      "representative_region": "Mumbai, New Delhi, Colombo"
    },
    {
      "id": "01a094ea-441c-7895-87fe-aedfe452adba",
      "name": "Asia/Kathmandu",
      "utc_offset": "+05:45",
      "raw_offset_seconds": 220,
      "abbreviation": "NPT",
      "representative_region": "Kathmandu"
    },
    {
      "id": "01a094ea-441d-7826-a213-b987a1df20fb",
      "name": "Asia/Dhaka",
      "utc_offset": "+06:00",
      "raw_offset_seconds": 96,
      "abbreviation": "BST",
      "representative_region": "Dhaka, Almaty, Omsk"
    },
    {
      "id": "01a094ea-441d-7827-bacb-5c81f8539b71",
      "name": "Asia/Yangon",
      "utc_offset": "+06:30",
      "raw_offset_seconds": 104,
      "abbreviation": "MMT",
      "representative_region": "Yangon, Cocos Islands"
    },
    {
      "id": "01a094ea-441e-781b-8e08-72cd9f86de57",
      "name": "Asia/Bangkok",
      "utc_offset": "+07:00",
      "raw_offset_seconds": 112,
      "abbreviation": "ICT",
      "representative_region": "Bangkok, Jakarta, Ho Chi Minh City"
    },
    {
      "id": "01a094ea-441f-782e-b46b-f6db294c9790",
      "name": "Asia/Singapore",
      "utc_offset": "+08:00",
      "raw_offset_seconds": 128,
      "abbreviation": "SGT",
      "representative_region": "Singapore, Hong Kong, Beijing, Perth"
    },
    {
      "id": "01a094ea-4420-794f-aa09-45f7215f9c2b",
      "name": "Australia/Eucla",
      "utc_offset": "+08:45",
      "raw_offset_seconds": 12,
      "abbreviation": "ACWST",
      "representative_region": "Eucla (Western Australia)"
    },
    {
      "id": "01a094ea-4420-7950-97bb-b6fbbe682ce9",
      "name": "Asia/Tokyo",
      "utc_offset": "+09:00",
      "raw_offset_seconds": 144,
      "abbreviation": "JST",
      "representative_region": "Tokyo, Seoul"
    },
    {
      "id": "01a094ea-4421-781b-b0eb-ae8dbe59c565",
      "name": "Australia/Darwin",
      "utc_offset": "+09:30",
      "raw_offset_seconds": 152,
      "abbreviation": "ACST",
      "representative_region": "Darwin, Adelaide"
    },
    {
      "id": "01a094ea-4423-7820-8fcb-9f242e0279ed",
      "name": "Australia/Sydney",
      "utc_offset": "+10:00",
      "raw_offset_seconds": 160,
      "abbreviation": "AEST",
      "representative_region": "Sydney, Melbourne, Brisbane, Guam"
    },
    {
      "id": "01a094ea-442a-789f-a83d-987a01a6d415",
      "name": "Australia/Lord_Howe",
      "utc_offset": "+10:30",
      "raw_offset_seconds": 168,
      "abbreviation": "LHST",
      "representative_region": "Lord Howe Island"
    },
    {
      "id": "01a094ea-442b-7729-9282-ec48b509f726",
      "name": "Pacific/Guadalcanal",
      "utc_offset": "+11:00",
      "raw_offset_seconds": 176,
      "abbreviation": "SBT",
      "representative_region": "Solomon Islands, New Caledonia"
    },
    {
      "id": "01a094ea-442b-7f2f-abf0-526c7b218daa",
      "name": "Pacific/Auckland",
      "utc_offset": "+12:00",
      "raw_offset_seconds": 192,
      "abbreviation": "NZST",
      "representative_region": "Auckland, Fiji"
    },
    {
      "id": "01a094ea-442e-70d9-89d1-3a21cab09e25",
      "name": "Pacific/Chatham",
      "utc_offset": "+12:45",
      "raw_offset_seconds": 76,
      "abbreviation": "CHAST",
      "representative_region": "Chatham Islands"
    },
    {
      "id": "01a094ea-4430-713b-a1b1-a327ae0e940e",
      "name": "Pacific/Tongatapu",
      "utc_offset": "+13:00",
      "raw_offset_seconds": 208,
      "abbreviation": "TOT",
      "representative_region": "Tonga, Samoa"
    },
    {
      "id": "01a094ea-4431-7549-8969-3a7f251aa8cd",
      "name": "Pacific/Kiritimati",
      "utc_offset": "+14:00",
      "raw_offset_seconds": 224,
      "abbreviation": "LINT",
      "representative_region": "Kiritimati (Line Islands)"
    }
  ]
};

export const globalMastersHandler = http.get<never, never, GlobalMastersResponse>('*/global/globalmasters', async () => {
  if (!isMockEnabled('global', 'getGlobalMasters')) return;
  await delay(800);
  return HttpResponse.json(mockGlobalMastersResponse);
});
