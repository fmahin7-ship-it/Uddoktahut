import { browserRequest, type BackendBody } from "@/shared/api/browser";
import type { AuthMethod } from "@/features/auth/schemas/LoginFormValidation";

/** Resolves to the backend's JSON body, or { success: false, message }. */
export const OtpVerify = async ({
  identifier,
  otp,
  selectedMethod,
}: {
  identifier: string;
  otp: string;
  selectedMethod: AuthMethod;
}) => {
  const sendVia = selectedMethod === "email" ? "mail" : "sms";
  return browserRequest<BackendBody & { verified?: boolean }>(`/user/${sendVia}/verify`, {
    method: "POST",
    body: { identifier, otp: Number(otp) },
  });
};
