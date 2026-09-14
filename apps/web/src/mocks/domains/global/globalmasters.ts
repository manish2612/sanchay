import { http, HttpResponse, delay } from 'msw';
import { isMockEnabled } from '../../store/mockConfig';
import { GlobalMastersResponse } from '../../../features/Masters/api/globalMastersApi';

const mockGlobalMastersResponse: GlobalMastersResponse = {
    "countries": [
        {
            "id": "01a09ec4-0dfd-7a02-a7ff-a9eae873fc12",
            "name": "India",
            "iso3": "IND",
            "numcode": 356,
            "currency_info": {
                "id": "",
                "name": "Indian Rupees",
                "symbol": "₹"
            },
            "state_info": [
                {
                    "id": "01a09ec4-0e7a-7443-927e-81a64dd2d383",
                    "name": "Andaman and Nicobar Islands",
                    "code": "AN",
                    "numcode": "35"
                },
                {
                    "id": "01a09ec4-0e7c-7443-8db1-5e3275e4b030",
                    "name": "Andhra Pradesh",
                    "code": "AP",
                    "numcode": "28"
                }
            ]
        },
        {
            "id": "01a09ec4-0e27-75ca-888e-a10ddc3431b3",
            "name": "Nepal",
            "iso3": "NPL",
            "numcode": 524,
            "currency_info": {
                "id": "",
                "name": "Nepalese Rupees",
                "symbol": "₨"
            },
            "state_info": [
                {
                    "id": "01a09ec4-0e9f-7265-bc60-3726b00af545",
                    "name": "Far West",
                    "code": "P1",
                    "numcode": "1"
                }
            ]
        }
    ],
    "timezones": [
        {
            "name": "Pacific/Midway",
            "representative_region": "Midway, American Samoa",
            "utc_offset": "-11:00"
        }
    ]
};

export const globalMastersHandler = http.get<never, never, GlobalMastersResponse>('*/global/globalmasters', async () => {
  if (!isMockEnabled('global', 'getGlobalMasters')) return;
  await delay(800);
  return HttpResponse.json(mockGlobalMastersResponse);
});
