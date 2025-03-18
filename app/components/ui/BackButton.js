"use client";

import { useRouter } from "next/navigation";

function BackButton({ title }) {
  const router = useRouter();
  return (
    <button onClick={() => router.back()} className="cursor-pointer">
      {title}
    </button>
  );
}

export default BackButton;
