import { detectMarket, requestCountry } from "@/shared/market/detectMarket";
import { marketFromCountry } from "@/shared/market/config";

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
    expect(detectMarket({ storeCountry: "BD", country: "AU" })).toBe("BD");
    expect(detectMarket({ storeCountry: "AU", country: "BD" })).toBe("AU");
  });

  it("ignores an invalid store country", () => {
    expect(detectMarket({ storeCountry: "US", country: "BD" })).toBe("BD");
  });

  it("uses the visitor's IP country", () => {
    expect(detectMarket({ country: "AU" })).toBe("AU");
    expect(detectMarket({ country: "BD" })).toBe("BD");
    expect(detectMarket({ country: "US" })).toBe("AU");
  });

  it("uses AU when location is unknown, whatever the page language", () => {
    expect(detectMarket({})).toBe("AU");
    expect(detectMarket({ country: null })).toBe("AU");
  });
});

describe("requestCountry", () => {
  const originalEnv = process.env;
  const headersWith = (entries: Record<string, string>) => new Headers(entries);

  afterEach(() => {
    process.env = originalEnv;
  });

  it("prefers the Vercel IP header", () => {
    process.env = { ...originalEnv, DEV_IP_COUNTRY: "AU" } as NodeJS.ProcessEnv;
    expect(requestCountry(headersWith({ "x-vercel-ip-country": "BD" }))).toBe("BD");
  });

  it("uses DEV_IP_COUNTRY outside production when the header is missing", () => {
    process.env = { ...originalEnv, NODE_ENV: "development", DEV_IP_COUNTRY: "BD" } as NodeJS.ProcessEnv;
    expect(requestCountry(headersWith({}))).toBe("BD");
  });

  it("ignores DEV_IP_COUNTRY in production", () => {
    process.env = { ...originalEnv, NODE_ENV: "production", DEV_IP_COUNTRY: "BD" } as NodeJS.ProcessEnv;
    expect(requestCountry(headersWith({}))).toBeNull();
  });
});
