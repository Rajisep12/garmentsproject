import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CartDrawer from "./CartDrawer";
import { FaWhatsapp, FaShoppingBag, FaInstagram } from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import { COMPANY_DETAILS } from "../../data/productsData";

const WebsiteLayout = () => {
  const { totalPieces, setIsCartOpen } = useCart();

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 antialiased selection:bg-amber-500 selection:text-slate-950">
      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />

      {/* Cart Drawer */}
      <CartDrawer />

      {/* Floating Action Buttons (Instagram, WhatsApp & Cart) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 items-end">
        {/* Floating Cart Pill if items exist */}
        {totalPieces > 0 && (
          <button
            onClick={() => setIsCartOpen(true)}
            className="group flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-xl shadow-amber-500/25 transition-all hover:scale-105 animate-bounce"
          >
            <FaShoppingBag className="text-sm" />
            <span>Order Cart ({totalPieces} pcs)</span>
          </button>
        )}

        {/* Floating Instagram Button */}
        <a
          href="https://www.instagram.com/hayati_garments/"
          target="_blank"
          rel="noreferrer"
          className="group w-14 h-14 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] hover:from-[#fbad50] hover:via-[#e6405c] hover:to-[#cd486b] text-white flex items-center justify-center shadow-xl shadow-rose-950/60 hover:shadow-rose-600/40 hover:scale-110 transition-all duration-300 relative"
          aria-label="Instagram Profile"
          title="Follow @hayati_garments on Instagram"
        >
          <FaInstagram className="text-2xl drop-shadow" />
        </a>

        {/* Floating WhatsApp Button */}
        <a
          href={`https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=Hello%20Hayati%20Garments,%20I%20have%20an%20inquiry%20regarding%20garment%20production.`}
          target="_blank"
          rel="noreferrer"
          className="group w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white flex items-center justify-center shadow-xl shadow-emerald-900/60 hover:scale-110 transition-all duration-300 relative"
          aria-label="Direct WhatsApp Contact"
          title="Chat with Tirupur Factory on WhatsApp"
        >
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 rounded-full border-2 border-slate-900 animate-ping" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 rounded-full border-2 border-slate-900" />
          <FaWhatsapp className="text-2xl" />
        </a>
      </div>
    </div>
  );
};

export default WebsiteLayout;
