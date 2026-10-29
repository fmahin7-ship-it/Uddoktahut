/** Product/order money (decimal, from the backend as string or number) for display. */
const formatPrice = (amount: number | string | null | undefined, currency = "৳"): string => {
  const value = Number(amount);
  if (Number.isNaN(value)) return `${currency}0`;
  return `${currency}${value.toLocaleString("en-BD", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
};

export { formatPrice };
