"use client"

import { useForm } from "react-hook-form";
import { Form } from "@/shared/ui/form"
import { zodResolver } from "@hookform/resolvers/zod";
import {
    OnboardProceedFormValidation,
    type OnboardProceedValues,
} from "@/features/onboarding/schema";
import { useEffect } from "react";
import { useStepper } from "@/shared/providers/stepper-provider";
import { getSignupCountry, getUserId } from "@/features/onboarding/request-context";
import { toast } from "sonner";
import { OnboardProceed } from "@/features/onboarding/actions";
import { useRouter } from "next/navigation";
import { cn } from "@/shared/lib/utils";
import { CustomFormField, FormFieldType } from "@/shared/components/CustomFormField";
import { SelectItem } from "@/shared/ui/select";
import { STORE_COUNTRIES, businessTypes } from "@/shared/constants/rootConstant";
import { useTopLoader } from "nextjs-toploader";
import { previewStoreUrl } from "@/shared/lib/storeUrl";

const OnboardProceedForm = ({ role }: { role: number }) => {
    const router = useRouter();
    const loader = useTopLoader();

    const { setSubmitForm, setIsLoading, setIsFullyComplete } = useStepper();

    const form = useForm<OnboardProceedValues>({
        resolver: zodResolver(OnboardProceedFormValidation),
        defaultValues: {
            storeName: '',
            storeType: '',
            storeAddress: '',
        }
    });

    const storeNameValue = form.watch("storeName");
    const storeUrlPreview = previewStoreUrl(storeNameValue || "");

    useEffect(() => {
        async function fetchUserId() {
            const [id, country] = await Promise.all([getUserId(), getSignupCountry()]);
            form.reset({ userId: Number(id), roles: Number(role), country })
        }
        fetchUserId();
    }, [form]);


    useEffect(() => {
        setSubmitForm(() => form.handleSubmit(onProceedSubmit));
    }, [setSubmitForm]);


    const onProceedSubmit = async (data: OnboardProceedValues) => {
        setIsLoading(true);
        loader.start();
        try {
            const payload = {
                ...data,
                roles: [data.roles]
            }
            const result = await OnboardProceed(payload);

            if (!result.onboarded) return toast("Failed", {
                description: result.message,
            });
            router.push('/dashboard');
            setIsFullyComplete(true);

        } catch (err) {
            toast("Something went wrong", {
                description: err instanceof Error ? err.message : undefined,
            });
            setIsFullyComplete(false);
        } finally {
            setIsLoading(false);
            loader.done();
        }
    };
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onProceedSubmit)}
                className={cn("flex flex-col gap-6 py-6")}
            >
                <section className="flex flex-wrap gap-4">
                    <CustomFormField
                        fieldType={FormFieldType.SELECT}
                        control={form.control}
                        name="storeType"
                        label="Business Type"
                        placeholder="Select business type"
                    >
                        {businessTypes.map((business, i) => (
                            <SelectItem key={business.name + i} value={business.key}>
                                <div className="flex cursor-pointer items-center gap-2">
                                    <p>{business.name}</p>
                                </div>
                            </SelectItem>
                        ))}
                    </CustomFormField>
                    <CustomFormField
                        fieldType={FormFieldType.SKELETON}
                        control={form.control}
                        name="country"
                        label="Country"
                        renderSkeleton={(field) => (
                            <div className="flex h-11 items-center rounded-md border bg-muted px-3 text-sm text-muted-foreground">
                                {STORE_COUNTRIES.find((c) => c.code === field.value)?.name ?? "Detecting…"}
                            </div>
                        )}
                    />
                </section>

                <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="storeName"
                    label="Business Name"
                    placeholder="Enter your business name"
                />
                {storeUrlPreview && (
                    <p className="text-sm text-muted-foreground -mt-2">
                        Your store URL:{" "}
                        <span className="font-medium text-foreground">{storeUrlPreview}</span>
                    </p>
                )}
                <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="storeAddress"
                    label="Business Address"
                    placeholder="Enter your business address"
                />
                <p className="text-sm text-muted-foreground -mt-2">
                    Country is set from your current location and decides your plan&apos;s currency.
                </p>
            </form>
        </Form>
    )
}

export default OnboardProceedForm