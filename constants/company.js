/** Business identity shown in the footer and legal pages. ABN/legal name come from env so they're not hardcoded. */
export const COMPANY = {
  name: "UddoktaHut",
  legalName: process.env.NEXT_PUBLIC_COMPANY_LEGAL_NAME || "UddoktaHut",
  abn: process.env.NEXT_PUBLIC_COMPANY_ABN || null,
  email: "info@uddoktahut.com",
  location: "Melbourne, Victoria, Australia",
  website: "https://uddoktahut.com",
};
