"use client"

import { cn } from "@/lib/utils"
import { CustomFormField, FormFieldType } from "../CustomFormField"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form"
import { useState } from "react"
import { passwordRules } from "@/constants/rootConstant"
import { RegistrationFormValidation } from "@/lib/RegistrationValidation"
import { registerUser } from "@/lib/actions/register.action"
import { toast } from "sonner"
import SubmitButton from "../common/SubmitButton"
import Link from "next/link"


export function RegistrationForm({ className, ...props }) {
    const [isLoading, setLoading] = useState(false);
    const [password, setPassword] = useState("");

    const form = useForm({
        resolver: zodResolver(RegistrationFormValidation),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    });

    async function onSubmit({
        name,
        email,
        password,
    }) {
        setLoading(true);
        try {
            const result = await registerUser({ email, name, password });
            result ? toast("Email sended", {
                description: result.message,
            }) : toast("Failed", {
                description: "Something went wrong",
            });
        } catch (error) {
            toast("Something went wrong", {
                description: err.message,
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
                className={cn("flex flex-col gap-6", className)}
                {...props}
            >
                <div className="flex flex-col items-baseline gap-3">
                    <h1 className="text-2xl font-bold">Sign up an account</h1>
                    <p className="text-balance text-sm text-muted-foreground">
                        Enter your email below to sign up
                    </p>
                </div>
                <div className="grid gap-6">
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="name"
                        label="Name"
                        placeholder="Farhan Masud"
                        iconSrc="/assets/icons/user.svg"
                        iconAlt="name"
                    />
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="email"
                        label="Email"
                        placeholder="farhan@gmail.com"
                        iconSrc="/assets/icons/email.svg"
                        iconAlt="email"
                    />

                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="password"
                        label="Password"
                        placeholder="********"
                        iconSrc="/assets/icons/password.svg"
                        iconAlt="password"
                        inputProps={{
                            value: password,
                            onChange: (e) => {
                                setPassword(e.target.value);
                                form.setValue("password", e.target.value);
                            },
                        }}

                    />
                    <ul className="mt-2 space-y-1 text-sm">
                        {password && passwordRules.map((rule, i) => {
                            const passed = rule.test(password);
                            return <li key={i} className={(passed ? "text-green-500 font-medium" : "text-red-500 font-medium")}>
                                {passed ? "✅" : "❌"} {" "} {rule.label}
                            </li>
                        })}
                    </ul>
                    <SubmitButton
                        isLoading={isLoading}
                        className="w-full bg-green-400 hover:bg-[#05f27c] cursor-pointer"
                        loadingMessage="Enrolling.."
                    >
                        <span className="font-semibold text-green-600">Sign Up</span>
                    </SubmitButton>
                </div>
                <div className="text-center text-sm">
                    Have an account?{" "}
                    <Link href="/login" className="underline underline-offset-4">
                        Login
                    </Link>
                </div>
            </form>
        </Form>
    )
}
