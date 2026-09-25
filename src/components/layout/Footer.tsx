export default function Footer() {
  return (
    <footer className="bg-lavender-100 pt-8 pb-4 px-6 md:px-12 mt-8 text-plum-900">
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-12 lg:gap-8">
        
        {/* About */}
        <div id="about" className="flex flex-col gap-4 pt-4 scroll-mt-24">
          <h3 className="font-serif font-bold text-lg tracking-wide mb-2">ABOUT</h3>
          <p className="text-sm text-plum-900/80 font-medium">The Chocolate Bouquet X Hamper</p>
          <p className="text-sm text-plum-900/80 font-medium">Customized Bouquets 31</p>
          <p className="text-[15px] italic font-serif text-primary mt-4 font-medium">
            "Customize; Anything → Everything."
          </p>
        </div>

        {/* Contact */}
        <div id="contact" className="flex flex-col gap-4 pt-4 scroll-mt-24">
          <h3 className="font-serif font-bold text-lg tracking-wide mb-2">CONTACT</h3>
          <a href="https://wa.me/919315274580" target="_blank" rel="noreferrer" className="text-sm text-plum-900/80 hover:text-primary transition-colors font-medium flex items-center gap-2">
            WhatsApp: +91 93152 74580
          </a>
          <a href="https://www.instagram.com/customized_bouquets31?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==" target="_blank" rel="noreferrer" className="text-sm text-plum-900/80 hover:text-primary transition-colors font-medium flex items-center gap-2">
            Instagram: @customized_bouquets31
          </a>
          <a href="mailto:hello@placeholder.com" className="text-sm text-plum-900/80 hover:text-primary transition-colors font-medium flex items-center gap-2">
            Email: [hello@placeholder.com]
          </a>
        </div>

        {/* Shop */}
        <div className="flex flex-col gap-4">
          <h3 className="font-serif font-bold text-lg tracking-wide mb-2">SHOP</h3>
          <nav className="flex flex-col gap-3 text-sm text-plum-900/80 font-medium">
            <a href="/collection/flower-bouquets" className="hover:text-primary transition-colors">Flower Bouquets</a>
            <a href="/collection/chocolate-bouquets" className="hover:text-primary transition-colors">Chocolate Bouquets</a>
            <a href="/collection/mens-hampers" className="hover:text-primary transition-colors">Men's Hampers</a>
            <a href="/collection/womens-hampers" className="hover:text-primary transition-colors">Women's Hampers</a>
            <a href="/collection/festival-finds" className="hover:text-primary transition-colors">Festival Finds</a>
            <a href="/collection/theme-bouquets" className="hover:text-primary transition-colors">Theme Bouquets</a>
            <a href="/collection/polaroid-photo-bouquets" className="hover:text-primary transition-colors">Polaroid Photo Bouquets</a>
          </nav>
        </div>

        {/* Information & Shipping */}
        <div className="flex flex-col gap-4">
          <h3 className="font-serif font-bold text-lg tracking-wide mb-2">INFORMATION</h3>
          <nav className="flex flex-col gap-3 text-sm text-plum-900/80 font-medium">
            <a href="/about" className="hover:text-primary transition-colors">About Us</a>
            <a href="/contact" className="hover:text-primary transition-colors">Contact Us</a>
            <a href="#shipping" className="hover:text-primary transition-colors">Pan-India Shipping</a>
            <a href="#tracking" className="hover:text-primary transition-colors">Order Tracking</a>
            <a href="#policy" className="hover:text-primary transition-colors">Privacy Policy</a>
          </nav>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-8 pt-4 border-t border-lavender-200 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-plum-900/60 font-bold tracking-widest">
        <span className="bg-white/50 px-3 py-1.5 rounded-full border border-lavender-100">500+ ORDERS</span>
        <span className="bg-white/50 px-3 py-1.5 rounded-full border border-lavender-100">ALL STATES DELIVERY COVERED</span>
        <span className="bg-white/50 px-3 py-1.5 rounded-full border border-lavender-100">DELHI / NAGALAND</span>
      </div>
      
      <div className="text-center text-[11px] text-plum-900/40 mt-4 font-medium">
        © {new Date().getFullYear()} The Chocolate Bouquet X Hamper. All rights reserved.
      </div>
    </footer>
  );
}
