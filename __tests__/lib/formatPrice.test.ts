import { formatPrice } from "@/shared/pricing/formatPrice";

describe("formatPrice", () => {
  it("formats AUD with the symbol first", () => {
    expect(formatPrice(3900, "AUD", "en")).toBe("A$39");
    expect(formatPrice(0, "AUD", "en")).toBe("A$0");
    expect(formatPrice(3950, "AUD", "en")).toBe("A$39.50");
  });

  it("formats BDT with grouping in English", () => {
    expect(formatPrice(150000, "BDT", "en")).toBe("৳1,500");
  });

  it("uses Bangla digits on the Bangla page, whatever the currency", () => {
    expect(formatPrice(150000, "BDT", "bn")).toBe("৳১,৫০০");
    expect(formatPrice(3900, "AUD", "bn")).toBe("A$৩৯");
  });
});
