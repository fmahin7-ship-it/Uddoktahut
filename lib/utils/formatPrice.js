const formatPrice = (amount, currency = "৳") => {
  const value = Number(amount);
  if (Number.isNaN(value)) return `${currency}0`;
  return `${currency}${value.toLocaleString("en-BD", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
};

export { formatPrice };
