import Image from "next/image"
import { Card, CardContent } from "../ui/card"

function ShopFeatureProduct({ deliverySystem }) {
    return (
        <section className="bg-white px-6 py-12 max-w-6xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6">Featured Products</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {[
                    { name: "Basic Tee", price: "$32.00" },
                    { name: "Denim Jacket", price: "$69.00" },
                    { name: "Classic Sneaker", price: "$69.00" },
                    { name: "Green Dress", price: "$74.00" },
                ].map((item, index) => (
                    <Card key={index} className="overflow-hidden text-center pt-0">
                        <div className="relative w-full aspect-square bg-neutral-100">
                            <Image
                                src={deliverySystem}
                                alt={item.name}
                                fill
                                className="object-cover"
                            />
                        </div>

                        <CardContent className="pt-4">
                            <h3 className="text-sm font-medium mb-1">{item.name}</h3>
                            <p className="text-sm text-neutral-600">{item.price}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    )
}

export default ShopFeatureProduct