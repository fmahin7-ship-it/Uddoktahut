"use client";
import { useEffect, useState } from "react";

export function useCurrentYear(fallback = "2025") {
  const [year, setYear] = useState(fallback);

  useEffect(() => {
    setYear(new Date().getFullYear().toString());
  }, []);

  return year;
}
