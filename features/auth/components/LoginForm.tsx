"use client";

import type React from "react";
import { cn } from "@/shared/lib/utils";
import { CustomFormField, FormFieldType } from "@/shared/components/CustomFormField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/shared/ui/form";
import { useState } from "react";
import { ComonRegistrationForm } from "@/features/auth/components/ComonRegistrationForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { loginUser } from "@/features/auth/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import SubmitButton from "@/shared/components/SubmitButton";
import Link from "next/link";
import { useTopLoader } from "nextjs-toploader";
import {
  LoginFormValidation,
  type AuthMethod,
  type LoginValues,
} from "@/features/auth/schemas/LoginFormValidation";
import { CTA_HOVER_COLOR } from "@/shared/constants/colors";

const tabStyle = `
    cursor-pointer
    data-[state=active]:bg-green-400
    data-[state=active]:text-green-900
    data-[state=active]:font-semibold 
    data-[state=active]:ring-2
    data-[state=active]:ring-green-400
    dark:data-[state=active]:ring-offset-0
    data-[state=active]:ring-offset-2
`;

export default function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const loader = useTopLoader();

  const form = useForm<LoginValues>({
    resolver: zodResolver(LoginFormValidation),
    defaultValues: {
      method: "email",
      email: "",
      password: "",
    },
  });

  function handleTabChange(value: string) {
    form.setValue("method", value as AuthMethod);
    form.setValue("password", "");
    setPassword("");

    if (value && value === "phone") {
      form.setValue("phoneNumber", "");
      form.unregister("email");
    } else {
      form.setValue("email", "");
      form.unregister("phoneNumber");
    }
  }

  async function onSubmit(data: LoginValues) {
    setLoading(true);
    loader.start();
    const selectedMethod = form.watch("method");
    try {
      const result = await loginUser(selectedMethod, data);

      if (!result.tokens)
        return toast(result.message || "Invalid email or password");

      if (result.onboarded) return router.push("/dashboard");

      return router.push("/onboarding");
    } catch (err) {
      toast("Something went wrong", {
        description: err instanceof Error ? err.message : undefined,
      });
    } finally {
      setLoading(false);
      loader.done();
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex flex-col gap-6", className)}
        {...props}
      >
        <div className="flex flex-col items-baseline gap-3">
          <h1 className="text-2xl font-bold">Log in </h1>
          <p className="text-balance text-sm text-muted-foreground font-medium">
            Let’s get started with your{" "}
            <b className="font-bold">7 days free trial</b>
          </p>
        </div>

        <div className="grid gap-6">
          <Tabs
            defaultValue="email"
            className="w-full"
            onValueChange={handleTabChange}
          >
            <TabsList className="w-full">
              <TabsTrigger value="email" className={tabStyle}>
                Email
              </TabsTrigger>
              <TabsTrigger value="phone" className={tabStyle}>
                Phone
              </TabsTrigger>
            </TabsList>

            <TabsContent value="email" className="grid gap-6 mt-4">
              <ComonRegistrationForm
                password={password}
                setPassword={setPassword}
                form={form}
                isSignup={false}
              >
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name="email"
                  label="Email"
                  placeholder="Enter your email address"
                  iconSrc="/assets/icons/email.svg"
                  iconAlt="email"
                />
              </ComonRegistrationForm>
            </TabsContent>

            <TabsContent value="phone" className="grid gap-6 mt-4">
              <ComonRegistrationForm
                password={password}
                setPassword={setPassword}
                form={form}
                isSignup={false}
              >
                <CustomFormField
                  fieldType={FormFieldType.PHONE_INPUT}
                  control={form.control}
                  name="phoneNumber"
                  label="Phone number"
                  placeholder="(+880) 162-771889"
                />
              </ComonRegistrationForm>
            </TabsContent>
          </Tabs>

          <SubmitButton
            isLoading={isLoading}
            className={`w-full bg-green-400 hover:bg-[${CTA_HOVER_COLOR}] cursor-pointer`}
            loadingMessage="Logging.."
          >
            <span className="font-semibold text-green-900">login</span>
          </SubmitButton>
        </div>

        <div className="text-center text-sm">
          Have an account?{" "}
          <Link href="/signup" className="underline underline-offset-4">
            Sign up
          </Link>
        </div>
      </form>
    </Form>
  );
}
