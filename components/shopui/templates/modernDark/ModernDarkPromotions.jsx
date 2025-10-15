import { Button } from "@/components/ui/button";
import { useTemplateConfig } from "@/hooks/useTemplateConfig";
import { ArrowRight, Zap } from "lucide-react";

function ModernDarkPromotions() {
  const { colors, typography } = useTemplateConfig();

  return (
    <section
      className="px-6 py-20"
      style={{ backgroundColor: colors.background }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Main Promotion - Full Width */}
        <div
          className="relative overflow-hidden mb-12 rounded-none border-2 group"
          style={{
            backgroundColor: colors.cardBg,
            borderColor: colors.accent,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/20 to-transparent"></div>

          <div className="relative p-12 lg:p-16">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="flex-1 text-center lg:text-left">
                <div className="flex items-center gap-3 mb-4 justify-center lg:justify-start">
                  <Zap className="w-8 h-8" style={{ color: colors.accent }} />
                  <span
                    className="text-sm uppercase tracking-widest font-bold"
                    style={{ color: colors.accent }}
                  >
                    FLASH SALE
                  </span>
                </div>

                <h3
                  className="text-4xl lg:text-6xl font-black mb-4 tracking-tight"
                  style={{
                    color: colors.text,
                    fontWeight: typography.headingWeight,
                  }}
                >
                  50% OFF
                </h3>

                <p
                  className="text-xl mb-6 max-w-md"
                  style={{ color: colors.textSecondary }}
                >
                  Limited time exclusive offer on premium collection
                </p>

                <Button
                  className="px-8 py-4 text-lg font-bold rounded-none border-2 transition-all duration-300 hover:scale-105 group"
                  style={{
                    backgroundColor: "transparent",
                    borderColor: colors.accent,
                    color: colors.accent,
                  }}
                >
                  CLAIM OFFER
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

              <div className="flex-1 lg:flex-none">
                <div
                  className="text-8xl lg:text-9xl font-black opacity-10 text-center"
                  style={{ color: colors.accent }}
                >
                  50%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Promotions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Premium Membership */}
          <div
            className="p-8 text-center border-2 group hover:border-opacity-100 transition-all duration-300"
            style={{
              backgroundColor: colors.cardBg,
              borderColor: `${colors.border}80`,
            }}
          >
            <div
              className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${colors.accent}20` }}
            >
              <span
                className="text-2xl font-black"
                style={{ color: colors.accent }}
              >
                ★
              </span>
            </div>

            <h4
              className="text-2xl font-bold mb-3 uppercase tracking-wide"
              style={{
                color: colors.text,
                fontWeight: typography.headingWeight,
              }}
            >
              VIP ACCESS
            </h4>

            <p
              className="mb-6 leading-relaxed"
              style={{ color: colors.textSecondary }}
            >
              Get exclusive access to new collections and premium discounts
            </p>

            <Button
              variant="outline"
              className="px-6 py-3 font-semibold rounded-none border-2 transition-all duration-300"
              style={{
                borderColor: colors.textSecondary,
                color: colors.text,
                backgroundColor: "transparent",
              }}
            >
              JOIN NOW
            </Button>
          </div>

          {/* Newsletter */}
          <div
            className="p-8 text-center border-2 group hover:border-opacity-100 transition-all duration-300"
            style={{
              backgroundColor: colors.cardBg,
              borderColor: `${colors.border}80`,
            }}
          >
            <div
              className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${colors.cta}20` }}
            >
              <span
                className="text-2xl font-black"
                style={{ color: colors.cta }}
              >
                ✉
              </span>
            </div>

            <h4
              className="text-2xl font-bold mb-3 uppercase tracking-wide"
              style={{
                color: colors.text,
                fontWeight: typography.headingWeight,
              }}
            >
              NEWSLETTER
            </h4>

            <p
              className="mb-6 leading-relaxed"
              style={{ color: colors.textSecondary }}
            >
              Stay updated with latest drops and exclusive insider offers
            </p>

            <Button
              className="px-6 py-3 font-semibold rounded-none transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: colors.cta,
                color: colors.background,
              }}
            >
              SUBSCRIBE
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ModernDarkPromotions;
