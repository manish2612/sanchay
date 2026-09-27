import { useState, useMemo } from "react";
import { useGetVoucherTypesQuery } from "@/features/Accounts/VoucherType/api";
import { useParams, useNavigate } from "@tanstack/react-router";

const PARTY_ACCOUNT_OPTIONS = [
  { label: "Cash", value: "cash" },
  { label: "Bank", value: "bank" },
];

export function useVoucherDetailsForm(partyAccount: string = "", applyMode: string = "Item Mode") {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { data: voucherTypes, isLoading: isLoadingVoucherTypes, isError: isErrorVoucherTypes } = useGetVoucherTypesQuery();
  const navigate = useNavigate();
  
  const { voucherId, module: routeModule } = useParams({ strict: false });
  const isAccountingMode = routeModule === "accounts";

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

  // Derive the active voucher name directly from the URL to prevent UX desync
  const voucherType = activeVoucher?.name || "";

  // Handler for dropdown selection
  const handleVoucherTypeChange = (selectedName: string) => {
    const selectedVt = voucherTypes?.find(vt => vt.name === selectedName);
    if (selectedVt && routeModule) {
      const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      
      // Navigate to the new route. If the form is dirty, the Leave Prompt will intercept this.
      navigate({
        to: '/$module/transactions/$voucherName/$voucherId',
        params: { module: routeModule, voucherName: slugify(selectedVt.name), voucherId: selectedVt.id },
        replace: true
      });
    }
  };

  const filteredPartyOptions = PARTY_ACCOUNT_OPTIONS.filter((opt) =>
    opt.label.toLowerCase().includes(partyAccount.toLowerCase())
  );

  const showPartyAc = !isAccountingMode || applyMode === "Account Invoice";
  const showPaymentMode = !isAccountingMode || applyMode === "Account Invoice";
  const showSalesAc = !isAccountingMode;

  return {
    isDrawerOpen, setIsDrawerOpen,
    voucherType, setVoucherType: handleVoucherTypeChange,
    voucherTypeOptions,
    filteredPartyOptions,
    isLoading: isLoadingVoucherTypes,
    isError: isErrorVoucherTypes,
    showPartyAc,
    showPaymentMode,
    showSalesAc,
  };
}

export type VoucherDetailsFormState = ReturnType<typeof useVoucherDetailsForm>;
