import { useTemplateConfig } from "@/hooks/useTemplateConfig";
import { Instagram, Twitter, Facebook, Youtube } from "lucide-react";

export default function ModernDarkFooter({ isShopList = true }) {
  const { colors, typography } = useTemplateConfig();

  if (isShopList) {
    return (
      <footer
        className="w-full border-t py-8 mt-auto"
        style={{
          backgroundColor: colors.background,
          borderTopColor: colors.border,
        }}
      >
        <div className="container mx-auto px-6 text-center">
          <p style={{ color: colors.textSecondary }}>
            &copy; {new Date().getFullYear()} Powered by{" "}
            <span
              className="font-bold tracking-wider"
              style={{ color: colors.accent }}
            >
              UDDOKTAHUT
            </span>
          </p>
        </div>
      </footer>
    );
  }

  return (
    <footer
      className="border-t px-6 py-16"
      style={{
        backgroundColor: colors.cardBg,
        borderTopColor: colors.border,
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <h4
              className="text-3xl font-black mb-6 tracking-wider uppercase"
              style={{
                color: colors.accent,
                fontWeight: typography.headingWeight,
              }}
            >
              STORE NAME
            </h4>

            <p
              className="text-lg leading-relaxed mb-8 max-w-md"
              style={{ color: colors.textSecondary }}
            >
              Crafting exceptional experiences through premium products and
              innovative design.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              {[Instagram, Twitter, Facebook, Youtube].map((Icon, index) => (
                <div
                  key={index}
                  className="w-12 h-12 border-2 flex items-center justify-center hover:scale-110 transition-all duration-300 cursor-pointer"
                  style={{ borderColor: colors.border }}
                >
                  <Icon className="w-6 h-6" style={{ color: colors.text }} />
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5
              className="text-xl font-bold mb-6 uppercase tracking-wide"
              style={{
                color: colors.text,
                fontWeight: typography.headingWeight,
              }}
            >
              QUICK LINKS
            </h5>

            <ul className="space-y-3">
              {["Home", "Collection", "About", "Contact"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="hover:underline underline-offset-4 transition-all uppercase tracking-wide font-medium"
                    style={{ color: colors.textSecondary }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h5
              className="text-xl font-bold mb-6 uppercase tracking-wide"
              style={{
                color: colors.text,
                fontWeight: typography.headingWeight,
              }}
            >
              SUPPORT
            </h5>

            <ul className="space-y-3">
              {["Shipping Policy", "Returns", "Size Guide", "FAQ"].map(
                (link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="hover:underline underline-offset-4 transition-all uppercase tracking-wide font-medium"
                      style={{ color: colors.textSecondary }}
                    >
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderTopColor: colors.border }}
        >
          <p style={{ color: colors.textSecondary }}>
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>

          <div className="flex gap-8">
            <a
              href="#"
              className="hover:underline underline-offset-4 transition-all uppercase tracking-wide text-sm font-medium"
              style={{ color: colors.textSecondary }}
            >
              PRIVACY POLICY
            </a>
            <a
              href="#"
              className="hover:underline underline-offset-4 transition-all uppercase tracking-wide text-sm font-medium"
              style={{ color: colors.textSecondary }}
            >
              TERMS OF SERVICE
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
