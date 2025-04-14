"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, ShoppingCart, User2 } from "lucide-react";

export default function Header({ sheet = false }) {
    return (
        <header className="w-full  bg-gradient-to-l from-gray-100 to-white sticky top-0 z-50">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-4">
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

                    <h1 className="text-2xl font-bold text-green-600">UddoktaHut</h1>
                </div>

                <div className="flex gap-4 items-center">
                    <Button variant="outline" size="icon">
                        <ShoppingCart className="w-5 h-5" />
                    </Button>
                    <Button variant="outline" size="icon">
                        <User2 className="w-5 h-5" />
                    </Button>
                </div>
            </div>
        </header>
    );
}
