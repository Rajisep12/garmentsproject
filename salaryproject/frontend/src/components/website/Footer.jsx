import React from "react";
import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaWhatsapp,
  FaInstagram,
  FaEnvelope,
  FaClock,
  FaIndustry,
  FaShieldAlt,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";
import { COMPANY_DETAILS, PRODUCTS } from "../../data/productsData";
import logoImg from "../../assets/hayati-logo.png";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      {/* Top Banner / Trust Badges */}
      <div className="border-b border-slate-800/80 bg-slate-900/60 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <FaIndustry className="text-lg" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Direct Factory Production</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                We purchase yarn/fabric & manufacture 100% in-house in Tirupur.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <FaCheckCircle className="text-lg" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Export Quality Standards</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                100% Combed bio-washed cotton, precision stitching & color fastness.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
              <FaShieldAlt className="text-lg" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Custom Branding & OEM</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Screen printing, DTF, puff print, embroidery, and private labeling.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <FaWhatsapp className="text-lg" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Instant WhatsApp Orders</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Direct factory support & instant quotes at 9944356661.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-slate-900 border border-amber-500/30 p-1 flex items-center justify-center">
                <img src={logoImg} alt="Hayati Garments" className="w-full h-full object-contain brightness-110" />
              </div>
              <div>
                <h3 className="font-serif font-black text-xl text-white tracking-wider">
                  HAYATI GARMENTS
                </h3>
                <p className="text-xs text-amber-400 font-semibold tracking-widest uppercase">
                  Fashion Impex • Tirupur
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed">
              We are a premier knitwear and woven garment manufacturer based in the textile capital of Tirupur. 
              From fabric sourcing, dyeing, cutting, stitching to custom printing and export packing, we deliver high-performance apparel for leading brands, corporate merchandising, and retail distributors worldwide.
            </p>

            <div className="pt-2 flex flex-wrap gap-2.5">
              <a
                href={`https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=Hello%20Hayati%20Garments,%20I%20would%20like%20to%20place%20an%20order.`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all shadow-lg shadow-emerald-900/40"
              >
                <FaWhatsapp className="text-base" />
                <span>WhatsApp (+91 99443 56661)</span>
              </a>

              <a
                href="https://www.instagram.com/hayati_garments/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 hover:opacity-90 text-white font-semibold text-xs transition-all shadow-lg shadow-rose-950/40"
                title="Follow @hayati_garments on Instagram"
              >
                <FaInstagram className="text-base" />
                <span>@hayati_garments</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wider uppercase border-l-2 border-amber-400 pl-2">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link to="/website" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <FaArrowRight className="text-[10px] text-amber-400/70" /> Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <FaArrowRight className="text-[10px] text-amber-400/70" /> Products Catalog
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <FaArrowRight className="text-[10px] text-amber-400/70" /> Manufacturing Services
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <FaArrowRight className="text-[10px] text-amber-400/70" /> About Hayati Garments
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <FaArrowRight className="text-[10px] text-amber-400/70" /> Contact & Factory Visit
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <FaArrowRight className="text-[10px] text-amber-400/70" /> Admin / Staff Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Garments Produced */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wider uppercase border-l-2 border-amber-400 pl-2">
              Our Products
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>• Round Neck Half Sleeve</li>
              <li>• Round Neck Full Sleeve</li>
              <li>• Polo T-Shirt Half Sleeve</li>
              <li>• Polo T-Shirt Full Sleeve</li>
              <li>• Crewneck Sweatshirt</li>
              <li>• Oversize Drop Shoulder</li>
              <li>• Hoodie with Zipper</li>
              <li>• Hoodie without Zipper</li>
              <li>• Active Track Pant / Joggers</li>
              <li>• Kids Comfort Pants</li>
              <li>• Combed Cotton Trunks</li>
              <li>• French Terry Shorts</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wider uppercase border-l-2 border-amber-400 pl-2">
              Factory Location
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <FaMapMarkerAlt className="text-amber-400 text-sm mt-0.5 shrink-0" />
                <span className="leading-relaxed text-slate-300">
                  {COMPANY_DETAILS.address}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <FaPhoneAlt className="text-emerald-400 text-xs shrink-0" />
                <a href={`tel:${COMPANY_DETAILS.phone}`} className="hover:text-white transition-colors">
                  {COMPANY_DETAILS.formattedPhone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <FaWhatsapp className="text-emerald-400 text-sm shrink-0" />
                <a
                  href={`https://wa.me/${COMPANY_DETAILS.whatsappNumber}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-300 font-semibold transition-colors"
                >
                  WhatsApp: {COMPANY_DETAILS.phone}
                </a>
              </div>

              <div className="flex items-start gap-2.5">
                <FaClock className="text-blue-400 text-xs mt-0.5 shrink-0" />
                <span>{COMPANY_DETAILS.workingHours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 text-center sm:flex sm:justify-between sm:items-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} HAYATI GARMENTS (Fashion Impex). All rights reserved.</p>
          <p className="mt-2 sm:mt-0">
            Tirupur, Tamil Nadu, India • Pin: 641604 • Knitwear Manufacturing Hub
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
