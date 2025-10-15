export default function ClassicFooter({ isShopList = true }) {
  return (
    <>
      {isShopList && (
        <footer className="w-full bg-gradient-to-r from-[#fdfcfb] to-[#f6f4f1] border-t py-6 mt-auto">
          <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Powered by{" "}
            <span className="font-semibold text-green-600">UddoktaHut</span>
          </div>
        </footer>
      )}
      {!isShopList && (
        <footer className="bg-white border-t px-6 py-10 text-sm text-neutral-700 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <div>
            <h4 className="font-semibold mb-2">About Us</h4>
            <p>
              Consectetur autemnt m ut due, dolores veul faut, Aliquain nit
              cuid.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Customer Service</h4>
            <ul className="space-y-1">
              <li>Shipping Policy</li>
              <li>Return Policy</li>
              <li>FAQ</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Follow Us</h4>
            <ul className="space-y-1">
              <li>About Us</li>
              <li>Customer Service</li>
              <li>Follow Us</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Follow Us</h4>
            <div className="flex gap-3">
              <span>📘</span>
              <span>📷</span>
              <span>🎥</span>
              <span>🐦</span>
            </div>
          </div>
        </footer>
      )}
    </>
  );
}
