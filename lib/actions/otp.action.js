"use client";

import { toast } from "sonner";

export const OtpVerify = async ({ identifier, otp, selectedMethod }) => {
  const sendVia = selectedMethod === "email" ? "mail" : "sms";
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/${sendVia}/verify`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, otp: Number(otp) }),
      }
    );
    return await response.json();
  } catch (err) {
    toast("Something went wrong", {
      description: err.message,
    });
  }
};
