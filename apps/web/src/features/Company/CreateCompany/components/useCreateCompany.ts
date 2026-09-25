import { useState } from 'react';
import { useCreateCompanyMutation } from '../../api/companyApi';
import { CompanyFormValues } from '../schema';
import { globalMastersApi } from '../../../Masters/api/globalMastersApi';
import { useDispatch, useStore } from 'react-redux';
import { addCompany, setActiveCompany } from '@/store/authSlice';
import { calculateFiscalYear } from '../utils/fiscalYearCalc';

export const useCreateCompany = () => {
  const dispatch = useDispatch();
  const store = useStore();
  const [createCompany, { isLoading, isSuccess, isError, error }] = useCreateCompanyMutation();

  const onSubmit = async (data: CompanyFormValues) => {
    // 1. Resolve currency ID based on selected country from Redux store (avoids stale closures)
    const state = store.getState();
    const globalMasters = globalMastersApi.endpoints.getGlobalMasters.select()(state as any).data;
    
    const selectedCountry = globalMasters?.countries?.find(c => c.id === data.country);
    const fk_country_currency_id = selectedCountry?.currency_info?.id || "";

    // 2. Automate Fiscal Year Calculations
    const isNepali = selectedCountry?.iso3 === 'NPL' || selectedCountry?.name?.toLowerCase() === 'nepal';
    const { fyStartDateEnglish, fyEndDateEnglish } = calculateFiscalYear(data.booksStartDate, isNepali);

    const fyStartDateISO = fyStartDateEnglish.toISOString();
    const fyEndDateISO = fyEndDateEnglish.toISOString();
    const booksStartDateISO = data.booksStartDate.toISOString();

    // 3. Construct Fiscal Years array
    const fiscal_years = [
      {
        from_date: fyStartDateISO,
        to_date: fyEndDateISO,
      }
    ];

    try {
      const response = await createCompany({
        address: data.address || "",
        book_start_date: booksStartDateISO,
        cin_number: "",
        city: "",
        country_currency_id: fk_country_currency_id,
        country_id: data.country,
        decimal_places: data.decimalCount,
        email: data.email || "",
        fiscal_years,
        fy_start_date: fyStartDateISO,
        mailing_name: data.mailingName,
        mobile_number: data.mobileNumber || "",
        name: data.name,
        pan_number: data.registrationType==="PAN"?data.registrationNumber :"",
        postal_code: data.pincode || "",
        registration_type: data.registrationType || "",
        state_id: data.state,
        tax_identifier: data.registrationNumber || "",
        telephone_number: data.landlineNo || "",
        timezone: data.timezone,
        trade_name: "",
        whatsapp_number: data.whatsappNumber || ""
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
