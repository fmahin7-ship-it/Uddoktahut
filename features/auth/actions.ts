import { browserRequest, type BackendBody } from "@/shared/api/browser";
import type { AuthMethod } from "@/features/auth/schemas/LoginFormValidation";

interface Credentials {
  name?: string;
  email?: string;
  phoneNumber?: string;
  password: string;
}

export interface LoginResponse extends BackendBody {
  tokens?: unknown;
  onboarded?: boolean;
}

/**
 * Browser-side auth calls. The backend sets the auth cookies on these
 * responses, so they must run in the browser (not as server actions).
 * Each resolves to the backend's JSON body, or { success: false, message }.
 */

export const registerUser = async (selectedMethod: AuthMethod, data: Credentials) => {
  const isEmail = selectedMethod === "email";
  return browserRequest(`/user/${isEmail ? "mail" : "sms"}/send`, {
    method: "POST",
    body: isEmail
      ? { name: data.name, email: data.email, password: data.password }
      : { name: data.name, phoneNumber: data.phoneNumber, password: data.password },
  });
};

export const loginUser = async (selectedMethod: AuthMethod, data: Credentials) =>
  browserRequest<LoginResponse>("/auth/login", {
    method: "POST",
    body:
      selectedMethod === "email"
        ? { email: data.email, password: data.password }
        : { phoneNumber: data.phoneNumber, password: data.password },
  });

export const logoutUser = async () => browserRequest("/auth/logout");
