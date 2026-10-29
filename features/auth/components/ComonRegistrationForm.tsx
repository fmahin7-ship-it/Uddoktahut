import type { ReactNode } from "react";
import type { FieldPath, PathValue, UseFormReturn } from "react-hook-form";
import { CustomFormField, FormFieldType } from "@/shared/components/CustomFormField";

/** Fields shared by the login and signup forms. */
type AuthFields = { password: string; name?: string };

interface PasswordRule {
    label: string;
    test: (value: string) => boolean;
}

export const ComonRegistrationForm = <T extends AuthFields>({
    form,
    password,
    passwordRules,
    setPassword,
    isSignup,
    children
}: {
    form: UseFormReturn<T>;
    password: string;
    passwordRules?: PasswordRule[];
    setPassword: (value: string) => void;
    isSignup: boolean;
    children?: ReactNode;
}) => {
    return (
        <>
            {isSignup && <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name={"name" as FieldPath<T>}
                label="Name"
                placeholder="Enter your full name"
                iconSrc="/assets/icons/user.svg"
                iconAlt="name"
            />}

            {children}

            <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name={"password" as FieldPath<T>}
                label="Password"
                placeholder="********"
                iconSrc="/assets/icons/password.svg"
                iconAlt="password"
                inputProps={isSignup ? {
                    value: password,
                    onChange: (e) => {
                        setPassword(e.target.value);
                        form.setValue(
                            "password" as FieldPath<T>,
                            e.target.value as PathValue<T, FieldPath<T>>
                        );
                    },
                } : undefined}

            />
            {password && passwordRules && passwordRules.length && isSignup && (
                <ul className="space-y-1 text-sm">
                    {passwordRules.map((rule: PasswordRule, i: number) => {
                        const passed = rule.test(password);
                        return <li key={i} className={(passed
                            ? "text-green-500 font-medium"
                            : "text-red-500 font-medium")}>
                            {passed ? "✅" : "❌"} {" "} {rule.label}
                        </li>
                    })}
                </ul>
            )}
        </>
    )
}