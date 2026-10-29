"use client";

import type React from "react";
import type { AuthMethod } from "@/features/auth/schemas/LoginFormValidation";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/shared/ui/alert-dialog";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/shared/ui/input-otp";
import { OtpVerify } from "@/features/auth/otp";
import { toast } from "sonner";
import { useTopLoader } from "nextjs-toploader";

export const OtpVerificationModal = ({ setShowOtpModal, identifier, selectedMethod }: {
    setShowOtpModal: (show: boolean) => void;
    identifier: string;
    selectedMethod: AuthMethod;
}) => {
    const router = useRouter();
    const loader = useTopLoader();
    const [open, setOpen] = useState(true);
    const [passkey, setPasskey] = useState("");
    const [time, setTime] = useState(60);
    const [isLoading, setIsLoading] = useState(false);

    const timeUp = time === 0;

    useEffect(() => {
        if (timeUp) return;

        const timerId = setInterval(() => {
            setTime(prevTime => prevTime - 1);
        }, 1000);

        return () => clearInterval(timerId);
    }, [timeUp]);

    const closeModal = () => {
        setOpen(false);
        setShowOtpModal(false);
    };

    const validatePasskey = async (e: React.FormEvent | React.MouseEvent) => {
        e.preventDefault();
        setIsLoading(true);
        loader.start();
        if (passkey) {
            try {
                const result = await OtpVerify({
                    identifier,
                    otp: passkey,
                    selectedMethod
                });
                if (result && result.verified) {
                    setShowOtpModal(false);
                    setOpen(false);
                    router.push(`/onboarding`);
                } else {
                    toast("Failed", {
                        description: result?.message || "Invalid or expired otp",
                    });
                }
            } catch (err) {
                toast("Something went wrong", {
                    description: err instanceof Error ? err.message : undefined,
                });
            } finally {
                setIsLoading(false);
                loader.done();
            }

        } else {
            toast("Please enter otp");
            setIsLoading(false);
        }
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent className="shad-alert-dialog">
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-start justify-between">
                        Otp Verification
                        {timeUp && <Image
                            src="/assets/icons/close.svg"
                            alt="close"
                            width={20}
                            height={20}
                            onClick={() => closeModal()}
                            className="cursor-pointer"
                        />}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        To sign up, please check your {selectedMethod === 'email' ? 'email' : 'phone'} & enter the otp.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <section>
                    <InputOTP
                        maxLength={5}
                        value={passkey}
                        onChange={(value) => setPasskey(value)}
                    >
                        <InputOTPGroup className="shad-otp">
                            <InputOTPSlot className="shad-otp-slot" index={0} />
                            <InputOTPSlot className="shad-otp-slot" index={1} />
                            <InputOTPSlot className="shad-otp-slot" index={2} />
                            <InputOTPSlot className="shad-otp-slot" index={3} />
                            <InputOTPSlot className="shad-otp-slot" index={4} />
                        </InputOTPGroup>
                    </InputOTP>
                </section>
                <p className="text-dark-600 font-medium text-sm">
                    {timeUp ? 'Time is up please try again' : `Time remaining: ${time} seconds`}
                </p>
                <AlertDialogFooter>
                    <AlertDialogAction
                        onClick={(e) => validatePasskey(e)}
                        className="shad-primary-btn w-full hover:bg-[#05f27c] cursor-pointer"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Loading...' : 'Enter Otp'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
