import { ShoppingBagIcon } from "lucide-react";
import { ModeToggle } from "@/components/common/ModeToggle";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

// Lazy load RegistrationForm since this page is only visited when user specifically navigates to /signup
const RegistrationForm = dynamic(
  () => import("@/components/form/RegistrationForm"),
  {
    loading: () => (
      <div className="animate-pulse space-y-4 max-w-sm">
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    ),
  }
);

export default function SignUpPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <section className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-between gap-2">
          <Link
            href="/"
            className="flex items-center gap-2 font-medium cursor-pointer"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-green-400">
              <ShoppingBagIcon className="size-4 text-green-900" />
            </div>
            UddoktaHut.
          </Link>
          <ModeToggle />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <RegistrationForm />
          </div>
        </div>
      </section>
      <section className="relative hidden bg-muted lg:block">
        <Image
          src="/enterprenur.jpg"
          alt="Image"
          fill
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.8] dark:grayscale"
        />
      </section>
    </div>
  );
}
