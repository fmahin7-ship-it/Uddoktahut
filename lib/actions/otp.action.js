"use client";

import { toast } from "sonner";

export const OtpVerify = async ({ identifier, otp }) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/mail/verify`,
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
