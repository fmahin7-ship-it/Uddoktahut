import { Button } from "../ui/button"

function ShopPromotions() {
    return (
        <section className=" px-6 py-12 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#f6f4f1] p-6 rounded-md text-center shadow-sm">
                <h3 className="text-xl font-semibold mb-2">Limited Time Offer</h3>
                <p className="text-sm text-neutral-600 mb-4">Get a 30% discount on select items.</p>
                <Button className="bg-black hover:bg-neutral-800 text-white px-6 py-2 rounded-md text-sm">
                    Shop Sale
                </Button>
            </div>
            <div className="bg-[#f6f4f1] p-6 rounded-md text-center shadow-sm flex flex-col justify-center">
                <h3 className="text-3xl font-bold mb-2">30% Off</h3>
                <p className="text-sm text-neutral-600">Get a 30% discount on select items,</p>
            </div>
        </section>
    )
}

export default ShopPromotions