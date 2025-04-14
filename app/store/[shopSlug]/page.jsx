
import Header from "@/components/shopui/layout/Header";
import deliverySystem from "@/public/assets/images/onboarding-img.png";
import ShopHero from "@/components/shopui/ShopHero";
import ShopFeatureProduct from "@/components/shopui/ShopFeatureProduct";
import ShopPromotions from "@/components/shopui/ShopPromotions";
import Footer from "@/components/shopui/layout/Footer";


async function UserShopPage() {

  return (
    <div className="min-h-screen bg-[#fdfcfb] text-neutral-900 font-sans">
      <Header />

      <ShopHero deliverySystem={deliverySystem} />

      <ShopFeatureProduct deliverySystem={deliverySystem} />

      <ShopPromotions />

      <Footer isShopList={false} />
    </div>
  );
}

export default UserShopPage;
