import { useState } from 'react';
import { useCreateCompanyMutation } from '../../api/companyApi';
import { CompanyFormValues } from '../schema';
import { useGetGlobalMastersQuery } from '../../../Masters/api/globalMastersApi';
import { useDispatch } from 'react-redux';
import { addCompany, setActiveCompany } from '@/store/authSlice';

export const useCreateCompany = () => {
  const dispatch = useDispatch();
  const [createCompany, { isLoading, isSuccess, isError, error }] = useCreateCompanyMutation();
  const { data: globalMasters } = useGetGlobalMastersQuery();

  const onSubmit = async (data: CompanyFormValues) => {
    // 1. Resolve currency ID based on selected country
    const selectedCountry = globalMasters?.countries?.find(c => c.id === data.country);
    const fk_country_currency_id = selectedCountry?.currency_info?.id || "";

    // 2. Format Dates
    const fyStartDateISO = data.financialYearStartDate.toISOString();
    const booksStartDateISO = data.booksStartDate.toISOString();

    // 3. Construct Fiscal Years (as requested: pass booksStartDate for both for now)
    const company_fiscal_years = [
      {
        from_date: booksStartDateISO,
        sr_no: 0,
        to_date: booksStartDateISO,
      }
    ];

    try {
      const response = await createCompany({
        address: data.address || "",
        book_start_date: booksStartDateISO,
        cin_no: "",
        company_fiscal_years,
        email: data.email || "",
        fk_country_currency_id,
        fk_country_id: data.country,
        fk_state_id: data.state,
        fy_start_date: fyStartDateISO,
        mailing_name: data.mailingName,
        mobile_no: data.mobileNumber || "",
        name: data.name,
        no_of_decimal: data.decimalCount,
        registration_no: data.registrationNumber || "",
        registration_type: data.registrationType || "",
        tele_no: data.landlineNo || "",
        timezone: data.timezone,
        whatsApp_no: data.whatsappNumber || "",
        zip_code: data.pincode || ""
      }).unwrap();

      // Dispatch to Redux state
      dispatch(addCompany(response));
      dispatch(setActiveCompany(response.id));
    } catch (err) {
      console.error("Failed to create company", err);
      // Let the component handle rendering the error state
    }
  };

  return {
    onSubmit,
    isLoading,
    isSuccess,
    isError,
    error,
  };
};
