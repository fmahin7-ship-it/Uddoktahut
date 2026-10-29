"use client";

import type React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/shared/ui/button";

function BackButton({ title }: { title: React.ReactNode }) {
  const router = useRouter();
  return (
    <Button onClick={() => router.back()} className="cursor-pointer">
      {title}
    </Button>
  );
}

export default BackButton;
