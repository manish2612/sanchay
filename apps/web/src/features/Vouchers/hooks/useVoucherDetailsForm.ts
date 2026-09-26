import { useState, useMemo, useEffect } from "react";
import { useGetVoucherTypesQuery } from "@/features/Accounts/VoucherType/api";
import { useParams, useNavigate, useLocation } from "@tanstack/react-router";

const PARTY_ACCOUNT_OPTIONS = [
  { label: "Cash", value: "cash" },
  { label: "Bank", value: "bank" },
];

export function useVoucherDetailsForm() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [mitiDate, setMitiDate] = useState<Date | undefined>(new Date());
  const [mitiString, setMitiString] = useState<string>("");
  const [adDate, setAdDate] = useState<Date | undefined>(new Date());
  const [refMitiDate, setRefMitiDate] = useState<Date | undefined>();
  const [refMitiString, setRefMitiString] = useState<string>("");
  const [refAdDate, setRefAdDate] = useState<Date | undefined>();
  const [partyQuery, setPartyQuery] = useState("");

  const [applyTax, setApplyTax] = useState("Item Level");
  const [mode, setMode] = useState("Item Mode");
  const [paymentMode, setPaymentMode] = useState("Credit");
  const [salesAc, setSalesAc] = useState("13% Sales");

  const { data: voucherTypes, isLoading: isLoadingVoucherTypes, isError: isErrorVoucherTypes } = useGetVoucherTypesQuery();
  const navigate = useNavigate();
  
  // Safely extract parameters. When rendered on old routes (like /inventory/transactions/voucher-type),
  // voucherId will be undefined.
  const location = useLocation();
  const { voucherId, module: routeModule } = useParams({ strict: false });

  // 1. Identify the active category from the URL's voucherId
  const activeVoucher = useMemo(() => {
    return voucherTypes?.find(vt => vt.id === voucherId);
  }, [voucherTypes, voucherId]);

  const activeCategory = activeVoucher?.category;

  // 2. Filter options by that active category
  const voucherTypeOptions = useMemo(() => {
    if (!activeCategory) return voucherTypes?.map(vt => ({ id: vt.id, name: vt.name })) || [];
    return voucherTypes
      ?.filter(vt => vt.category === activeCategory)
      ?.map(vt => ({ id: vt.id, name: vt.name })) || [];
  }, [voucherTypes, activeCategory]);

  // 3. Local state for the selected voucher (storing the name for now as existing components expect the name string)
  const [voucherType, setVoucherType] = useState<string>("");

  // Sync default selection
  useEffect(() => {
    if (voucherTypes && voucherTypeOptions.length > 0) {
      if (!voucherType || !voucherTypeOptions.some(opt => opt.name === voucherType)) {
        // If we found the exact voucher from URL, use it, else fallback to default logic
        if (activeVoucher) {
          setVoucherType(activeVoucher.name);
        } else {
          // If no active voucher (e.g. invalid ID or legacy route), fallback to first default
          const defaultOpt = voucherTypeOptions.find(vt => {
            const fullVt = voucherTypes.find(v => v.id === vt.id);
            return fullVt?.is_set_as_default;
          }) || voucherTypeOptions[0];
          setVoucherType(defaultOpt.name);
        }
      }
    }
  }, [voucherTypes, voucherTypeOptions, activeVoucher, voucherType]);

  // Handler for dropdown selection
  const handleVoucherTypeChange = (selectedName: string) => {
    setVoucherType(selectedName);
    
    // Optionally update the URL to match the newly selected voucher ID to keep UI in sync
    const selectedVt = voucherTypes?.find(vt => vt.name === selectedName);
    if (selectedVt && routeModule) {
      const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      navigate({
        to: '/$module/transactions/$voucherName/$voucherId',
        params: { module: routeModule, voucherName: slugify(selectedVt.name), voucherId: selectedVt.id },
        replace: true
      });
    }
  };

  const filteredPartyOptions = PARTY_ACCOUNT_OPTIONS.filter((opt) =>
    opt.label.toLowerCase().includes(partyQuery.toLowerCase())
  );

  return {
    isDrawerOpen, setIsDrawerOpen,
    mitiDate, setMitiDate,
    mitiString, setMitiString,
    adDate, setAdDate,
    refMitiDate, setRefMitiDate,
    refMitiString, setRefMitiString,
    refAdDate, setRefAdDate,
    partyQuery, setPartyQuery,
    voucherType, setVoucherType: handleVoucherTypeChange,
    applyTax, setApplyTax,
    mode, setMode,
    paymentMode, setPaymentMode,
    salesAc, setSalesAc,
    voucherTypeOptions,
    filteredPartyOptions,
    isLoading: isLoadingVoucherTypes,
    isError: isErrorVoucherTypes,
  };
}

export type VoucherDetailsFormState = ReturnType<typeof useVoucherDetailsForm>;
