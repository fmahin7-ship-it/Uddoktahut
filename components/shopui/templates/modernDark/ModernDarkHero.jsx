import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useTemplateConfig } from "@/hooks/useTemplateConfig";

function ModernDarkHero({ deliverySystem }) {
  const { colors, typography } = useTemplateConfig();

  return (
    <section
      className="relative min-h-[80vh] flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: colors.background }}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src={deliverySystem}
          alt="Hero Background"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <h1
          className="text-6xl md:text-8xl font-extrabold mb-6 leading-tight"
          style={{
            color: colors.text,
            fontWeight: typography.headingWeight,
          }}
        >
          DISCOVER
          <br />
          <span style={{ color: colors.accent }}>EXCELLENCE</span>
        </h1>

        <p
          className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed"
          style={{ color: colors.textSecondary }}
        >
          Curated collection of premium products designed for the modern
          lifestyle
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            className="px-8 py-4 text-lg font-semibold rounded-none border-2 transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: colors.cta,
              borderColor: colors.cta,
              color: "#000",
            }}
          >
            EXPLORE COLLECTION
          </Button>

          <Button
            variant="outline"
            className="px-8 py-4 text-lg font-semibold rounded-none border-2 transition-all duration-300 hover:scale-105"
            style={{
              borderColor: colors.accent,
              color: colors.accent,
              backgroundColor: "transparent",
            }}
          >
            WATCH STORY
          </Button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
    </section>
  );
}

export default ModernDarkHero;
