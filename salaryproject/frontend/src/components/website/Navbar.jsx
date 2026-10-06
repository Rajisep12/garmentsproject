import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  FaShoppingBag,
  FaWhatsapp,
  FaInstagram,
  FaBars,
  FaTimes,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaUserShield,
} from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import { COMPANY_DETAILS } from "../../data/productsData";
import logoImg from "../../assets/hayati-logo.png";

const Navbar = () => {
  const { totalPieces, setIsCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/website" },
    { name: "Products", path: "/products" },
    { name: "Services", path: "/services" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-slate-950 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Direct Garment Manufacturer & Exporter • Tirupur, India
            </span>
            <span className="hidden md:inline text-slate-500">•</span>
            <span className="hidden md:flex items-center gap-1 text-slate-400">
              <FaMapMarkerAlt className="text-amber-400 text-xs" /> 11/4 Sengunthapuram, Karuvampalayam
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href="https://www.instagram.com/hayati_garments/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-pink-400 hover:text-pink-300 font-semibold transition-colors"
              title="Follow @hayati_garments on Instagram"
            >
              <FaInstagram className="text-sm" />
              <span className="hidden sm:inline">Instagram</span>
            </a>
            <span className="text-slate-700">|</span>
            <a
              href={`https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=Hello%20Hayati%20Garments,%20I%20have%20an%20inquiry%20regarding%20bulk%20manufacturing.`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
            >
              <FaWhatsapp className="text-sm" />
              <span>WhatsApp: {COMPANY_DETAILS.phone}</span>
            </a>
            <span className="text-slate-600">|</span>
            <Link
              to="/admin"
              className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
              title="Admin Portal"
            >
              <FaUserShield className="text-xs" />
              <span className="text-[11px]">Staff / Admin</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-slate-900/95 backdrop-blur-md shadow-lg shadow-black/20 border-b border-slate-800/80 py-3"
            : "bg-slate-900 border-b border-slate-800 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Brand */}
          <Link to="/website" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr from-amber-500/20 via-slate-800 to-amber-500/10 border border-amber-500/30 flex items-center justify-center p-1.5 shadow-md shadow-amber-500/5 group-hover:border-amber-400 transition-all">
              <img
                src={logoImg}
                alt="Hayati Garments Logo"
                className="w-full h-full object-contain filter drop-shadow brightness-110"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl tracking-wider text-white font-serif group-hover:text-amber-400 transition-colors">
                  HAYATI
                </span>
                <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 tracking-widest uppercase">
                  Garments
                </span>
              </div>
              <p className="text-[10px] text-slate-400 tracking-widest uppercase font-medium">
                Fashion Impex • Tirupur
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-amber-400 bg-amber-500/10 font-semibold"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Actions: Cart Button & WhatsApp CTA */}
          <div className="flex items-center gap-3">
            {/* WhatsApp Direct Order Button */}
            <a
              href={`https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=Hello%20Hayati%20Garments,%20I%20want%20to%20place%20an%20inquiry.`}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md shadow-emerald-900/40 hover:scale-105"
            >
              <FaWhatsapp className="text-base" />
              <span>Order on WhatsApp</span>
            </a>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-amber-400 border border-slate-700 transition-all flex items-center gap-2"
              aria-label="View Cart"
            >
              <FaShoppingBag className="text-lg" />
              <span className="hidden sm:inline text-xs font-semibold">Cart</span>
              {totalPieces > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/50 animate-bounce">
                  {totalPieces > 99 ? "99+" : totalPieces}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `block px-4 py-2.5 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? "text-amber-400 bg-amber-500/10 font-bold border-l-4 border-amber-400"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            <div className="pt-4 border-t border-slate-800 space-y-2">
              <a
                href={`https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=Hello%20Hayati%20Garments,%20I%20have%20an%20order%20inquiry.`}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 text-white font-bold text-sm"
              >
                <FaWhatsapp className="text-lg" />
                <span>Chat on WhatsApp (9944356661)</span>
              </a>

              <Link
                to="/login"
                className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
              >
                <FaUserShield /> Admin / Staff Portal
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
