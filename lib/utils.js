import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function capitalizeFirstLetter(string) {
  return string ? string[0].toUpperCase() + string.slice(1) : "";
}
export function capitalizeWords(str) {
  return str
    .split(" ")
    .map((word) => capitalizeFirstLetter(word))
    .join(" ");
}
export function getShopSlug(url) {
  try {
    const { hostname } = new URL(url);
    // hostname will be like "shoporia.uddoktahut.com"
    return hostname.split(".")[0];
  } catch {
    return null;
  }
}
