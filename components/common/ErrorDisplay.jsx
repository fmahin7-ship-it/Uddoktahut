import React from "react";

export default function ErrorDisplay({ errors = [], className = "" }) {
  // Helper function to extract error message
  const getErrorMessage = (error) => {
    if (!error) return null;
    if (typeof error === "string") return error;
    if (error?.message) return error.message;
    return String(error);
  };

  // Get the first valid error message
  const errorMessage = errors.map(getErrorMessage).find(Boolean);

  if (!errorMessage) return null;

  return (
    <div className={`text-red-500 text-sm ${className}`}>{errorMessage}</div>
  );
}
