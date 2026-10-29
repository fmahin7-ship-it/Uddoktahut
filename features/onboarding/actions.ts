import { browserRequest, type BackendBody } from "@/shared/api/browser";

/**
 * Creates the seller's store. Runs in the browser so the backend can set the
 * refreshed auth cookies. Resolves to the backend's JSON body, or
 * { success: false, message } (e.g. a reserved or taken store name).
 */
export interface OnboardProceedPayload {
  userId: number;
  roles: number[];
  storeName: string;
  storeType: string;
  storeAddress?: string;
  country: string;
}

export interface OnboardProceedResponse extends BackendBody {
  onboarded?: boolean;
}

export const OnboardProceed = async (data: OnboardProceedPayload) => {
  const { userId, roles, storeName, storeType, storeAddress, country } = data;
  return browserRequest<OnboardProceedResponse>("/user/assign-role", {
    method: "POST",
    body: { userId, roles, storeName, storeType, storeAddress, country },
  });
};
