import { detectLocale, topAcceptLanguage } from "@/lib/i18n/detectLocale";

describe("topAcceptLanguage", () => {
  it("returns the primary subtag of the highest-q language", () => {
    expect(topAcceptLanguage("en-AU,en;q=0.9,bn;q=0.8")).toBe("en");
    expect(topAcceptLanguage("bn-BD,bn;q=0.9,en-US;q=0.8")).toBe("bn");
    expect(topAcceptLanguage("en;q=0.5,bn;q=0.9")).toBe("bn");
  });

  it("handles empty, wildcard and malformed headers", () => {
    expect(topAcceptLanguage(null)).toBeNull();
    expect(topAcceptLanguage("")).toBeNull();
    expect(topAcceptLanguage("*")).toBeNull();
    expect(topAcceptLanguage("bn;q=abc,en")).toBe("en");
  });
});

describe("detectLocale", () => {
  it("prefers an explicit cookie over everything else", () => {
    expect(detectLocale({ cookieLocale: "en", acceptLanguage: "bn-BD", country: "BD" })).toBe("en");
    expect(detectLocale({ cookieLocale: "bn", acceptLanguage: "en-AU", country: "AU" })).toBe("bn");
  });

  it("ignores an unknown cookie value", () => {
    expect(detectLocale({ cookieLocale: "fr", acceptLanguage: "en-AU", country: "AU" })).toBe("en");
  });

  it("uses a Bangla browser language", () => {
    expect(detectLocale({ acceptLanguage: "bn-BD,en;q=0.8", country: "AU" })).toBe("bn");
  });

  it("falls back to country for Bangladeshi visitors with an English browser", () => {
    expect(detectLocale({ acceptLanguage: "en-US", country: "BD" })).toBe("bn");
    expect(detectLocale({ acceptLanguage: "en-US", country: "bd" })).toBe("bn");
  });

  it("defaults to English everywhere else", () => {
    expect(detectLocale({ acceptLanguage: "en-AU", country: "AU" })).toBe("en");
    expect(detectLocale({})).toBe("en");
  });
});
