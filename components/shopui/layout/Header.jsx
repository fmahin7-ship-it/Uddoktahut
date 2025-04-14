"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { capitalizeWords } from "@/lib/utils";
import { useShop } from "@/app/context/ShopContext";



export default function Header({ sheet = false }) {
    const { shop } = useShop();
    const { store_name } = shop;
    return (
        <header className="w-full py-6 text-sm  bg-gradient-to-r from-[#fdfcfb] to-[#f6f4f1] sticky top-0 z-50 ">
            <div className="px-6  mx-auto  flex justify-between items-center max-w-6xl">
                <div className="flex items-center ">
                    {sheet && <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon" className="lg:hidden">
                                <Menu className="w-5 h-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left">
                            <div className="mt-4 space-y-2">
                                <p className="text-lg font-semibold">Menu</p>
                                {/* Add nav links here */}
                            </div>
                        </SheetContent>
                    </Sheet>}

                    <h1 className="text-2xl font-bold text-green-600">{capitalizeWords(store_name)}</h1>
                </div>

                <nav className="hidden md:flex items-center gap-6">
                    <Link href="/" className="hover:underline">Home</Link>
                    <Link href="/shop" className="hover:underline">Shop</Link>
                </nav>

                <div className="flex gap-4 items-center">
                    <Button variant="outline" size="icon">
                        <ShoppingCart className="w-5 h-5" />
                    </Button>
                </div>
            </div>
        </header>
    );
}
