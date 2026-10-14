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
  it("uses a signed-in seller's store country wherever they are", () => {
    expect(detectMarket({ storeCountry: "BD", country: "AU", locale: "en" })).toBe("BD");
    expect(detectMarket({ storeCountry: "AU", country: "BD", locale: "bn" })).toBe("AU");
  });

  it("ignores an invalid store country", () => {
    expect(detectMarket({ storeCountry: "US", country: "BD", locale: "en" })).toBe("BD");
  });

  it("uses the visitor's IP country, not the page language", () => {
    expect(detectMarket({ country: "AU", locale: "bn" })).toBe("AU");
    expect(detectMarket({ country: "BD", locale: "en" })).toBe("BD");
    expect(detectMarket({ country: "US", locale: "bn" })).toBe("AU");
  });

  it("falls back to the page language when location is unknown", () => {
    expect(detectMarket({ locale: "bn" })).toBe("BD");
    expect(detectMarket({ locale: "en" })).toBe("AU");
    expect(detectMarket({})).toBe("AU");
  });
});
