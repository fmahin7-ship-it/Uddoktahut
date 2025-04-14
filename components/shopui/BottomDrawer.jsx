import {
    Drawer,
    DrawerTrigger,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { FilterContent } from "./FilterContent";
import { Filter } from "lucide-react";

export default function BottomDrawer({ categories, ctaColor, ctaHoverColor }) {
    return (
        <div className="lg:hidden">
            <Drawer>
                <DrawerTrigger asChild>
                    <Filter className="text-green-900" />
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Filters</DrawerTitle>
                        <DrawerClose asChild>
                            <Button variant="ghost" className="absolute top-4 right-4">
                                ✕
                            </Button>
                        </DrawerClose>
                    </DrawerHeader>
                    <FilterContent categories={categories} ctaColor={ctaColor} />
                </DrawerContent>
            </Drawer>
        </div>
    )
}