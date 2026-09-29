import { useState } from "react";
import { useSelector } from "react-redux";
import { selectActiveCompanyId } from "@/store/authSlice";
import { useCreateVoucherMutation } from "../api";
import { useVoucherPayloadGenerator } from "./useVoucherPayloadGenerator";
import { VoucherFormValues } from "../schema/voucherSchema";

export type ToastMessageState = { title: string; desc: string; variant: 'success' | 'destructive' } | null;

export function useVoucherSubmit() {
  const [createVoucher, { isLoading }] = useCreateVoucherMutation();
  const activeCompanyId = useSelector(selectActiveCompanyId);
  const { generatePayload } = useVoucherPayloadGenerator();
  
  const [toastMessage, setToastMessage] = useState<ToastMessageState>(null);

  const onSubmit = async (data: VoucherFormValues) => {
    try {
      const apiPayload = generatePayload(data);
      console.log("Final API Payload:", apiPayload);
      
      const response = await createVoucher({
        payload: apiPayload,
        companyId: activeCompanyId,
      }).unwrap();
      
      console.log("Voucher saved successfully:", response);
      setToastMessage({ title: "Success", desc: "Voucher saved successfully.", variant: "success" });
    } catch (error) {
      console.error("Failed to save voucher:", error);
      const errMsg = (error as any)?.data?.message || "Failed to save voucher. Please try again.";
      setToastMessage({ title: "Error", desc: errMsg, variant: "destructive" });
    }
  };

  return { onSubmit, isSubmitting: isLoading, toastMessage, setToastMessage };
}
