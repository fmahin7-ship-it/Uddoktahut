type ErrorLike = string | { message?: string } | null | undefined;

export default function ErrorDisplay({
  errors = [],
  className = "",
}: {
  errors?: ErrorLike[];
  className?: string;
}) {
  // Helper function to extract error message
  const getErrorMessage = (error: ErrorLike): string | null => {
    if (!error) return null;
    if (typeof error === "string") return error;
    return error.message || null;
  };

  // Get the first valid error message
  const errorMessage = errors.map(getErrorMessage).find(Boolean);

  if (!errorMessage) return null;

  return (
    <div className={`text-red-500 text-sm ${className}`}>{errorMessage}</div>
  );
}
