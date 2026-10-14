import { detectMarket } from "@/lib/market/detectMarket";
import { marketFromCountry } from "@/lib/market/config";

describe("marketFromCountry", () => {
  it("maps Bangladesh and Australia to their own markets", () => {
    expect(marketFromCountry("BD")).toBe("BD");
    expect(marketFromCountry("bd")).toBe("BD");
    expect(marketFromCountry("AU")).toBe("AU");
  });

  it("puts every other country in the AU market", () => {
    expect(marketFromCountry("US")).toBe("AU");
    expect(marketFromCountry("GB")).toBe("AU");
  });
});

describe("detectMarket", () => {
  it("prefers an explicit cookie over country and language", () => {
    expect(detectMarket({ cookieMarket: "BD", country: "AU", locale: "en" })).toBe("BD");
    expect(detectMarket({ cookieMarket: "AU", country: "BD", locale: "bn" })).toBe("AU");
  });

  it("ignores an unknown cookie value", () => {
    expect(detectMarket({ cookieMarket: "US", country: "BD", locale: "en" })).toBe("BD");
  });

  it("uses the visitor's country, not the page language", () => {
    expect(detectMarket({ country: "AU", locale: "bn" })).toBe("AU");
    expect(detectMarket({ country: "BD", locale: "en" })).toBe("BD");
  });

  it("falls back to the page language when the country is unknown", () => {
    expect(detectMarket({ locale: "bn" })).toBe("BD");
    expect(detectMarket({ locale: "en" })).toBe("AU");
    expect(detectMarket({})).toBe("AU");
  });
});
