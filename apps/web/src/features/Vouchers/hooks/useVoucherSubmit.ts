import { useSelector } from "react-redux";
import { selectActiveCompanyId } from "@/store/authSlice";
import { useCreateVoucherMutation } from "../api";
import { useVoucherPayloadGenerator } from "./useVoucherPayloadGenerator";
import { VoucherFormValues } from "../schema/voucherSchema";

export function useVoucherSubmit() {
  const [createVoucher, { isLoading }] = useCreateVoucherMutation();
  const activeCompanyId = useSelector(selectActiveCompanyId);
  const { generatePayload } = useVoucherPayloadGenerator();

  const onSubmit = async (data: VoucherFormValues) => {
    try {
      const apiPayload = generatePayload(data);
      console.log("Final API Payload:", apiPayload);
      
      const response = await createVoucher({
        payload: apiPayload,
        companyId: activeCompanyId,
      }).unwrap();
      
      console.log("Voucher saved successfully:", response);
      // Optional: Add toast success here when toast utility is available
    } catch (error) {
      console.error("Failed to save voucher:", error);
      // Optional: Add toast error here when toast utility is available
    }
  };

  return { onSubmit, isSubmitting: isLoading };
}
