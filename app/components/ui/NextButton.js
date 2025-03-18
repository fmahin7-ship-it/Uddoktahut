"use client";

import { useRouter } from "next/navigation";

function NextButton({ title, destination }) {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push(`/${destination}`)}
      className="cursor-pointer"
    >
      {title}
    </button>
  );
}

export default NextButton;
