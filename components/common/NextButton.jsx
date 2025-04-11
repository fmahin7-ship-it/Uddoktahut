"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function NextButton({ title, destination }) {
  const pathname = usePathname();
  const fullPath = `${pathname}/${destination}`;

  return (
    <Link href={fullPath} className="cursor-pointer">
      {title}
    </Link>
  );
}

export default NextButton;
