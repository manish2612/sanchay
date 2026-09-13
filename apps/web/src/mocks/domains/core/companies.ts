import { http, HttpResponse, delay } from 'msw';
import { isMockEnabled } from '../../store/mockConfig';

export const createCompanyHandler = http.post('*/core/companies', async ({ request }) => {
  if (!isMockEnabled('core', 'createCompany')) return;
  await delay(1200);

  return HttpResponse.json({
    id: "01a098e5-8747-71a4-95de-f72ab84344bf",
    created_at: "2026-09-13T09:37:54.3431076+05:45",
    updated_at: "2026-09-13T09:37:54.3431076+05:45",
    deleted_at: null,
    name: "New Company Mock",
    mailing_name: "test pvt ltd",
    fy_start_date: "2026-08-31T18:30:00Z",
    book_start_date: "2026-09-08T18:30:00Z",
    no_of_decimal: 2,
    mobile_no: "",
    whatsApp_no: "",
    tele_no: "",
    email: "",
    registration_type: "VAT",
    registration_no: "4234234",
    cin_no: "",
    address: "somewhere",
    fk_country_id: "01a0983d-d62c-75e2-a7fb-7fa12fd26087",
    fk_state_id: "01a0983d-d6b4-78c4-ae5f-46f71c2788fe",
    timezone: "01a0983d-d6d0-7e8d-b79b-3b795833895a",
    zip_code: "",
    fk_user_id: "01a098e2-caba-7e52-b479-0e0da5d59659",
    last_vch_date: "0001-01-01T00:00:00Z",
    is_active: true,
    company_fiscal_years: []
  });
});
