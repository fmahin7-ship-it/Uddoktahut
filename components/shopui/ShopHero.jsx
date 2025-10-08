import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";

function ShopHero({ deliverySystem }) {
  return (
    <section className="bg-gradient-to-r from-[#fdfcfb] to-[#f6f4f1] grid grid-cols-1 md:grid-cols-2 items-center gap-8 px-6 py-12 max-w-6xl mx-auto">
      <div>
        <h1 className="text-4xl font-bold tracking-tight mb-4">New Arrivals</h1>
        <p className="text-neutral-700 mb-6">
          Check out our latest collection for the season.
        </p>
        <Button className="bg-black hover:bg-neutral-800 text-white px-6 py-2 rounded-md">
          Shop Now
        </Button>
      </div>
      <div className="relative w-full h-[400px]">
        <Image
          src={deliverySystem}
          alt="Hero Image"
          fill
          className="object-cover object-center rounded-md"
        />
      </div>
    </section>
  );
}

export default ShopHero;
