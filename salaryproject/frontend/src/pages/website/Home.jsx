import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaWhatsapp,
  FaArrowRight,
  FaIndustry,
  FaCheckCircle,
  FaShieldAlt,
  FaTshirt,
  FaBoxes,
  FaShippingFast,
  FaCut,
  FaPrint,
  FaAward,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { PRODUCTS, COMPANY_DETAILS } from "../../data/productsData";
import ProductCard from "../../components/website/ProductCard";
import factoryHero from "../../assets/website/factory_hero.jpg";
import tshirtsImg from "../../assets/website/tshirts.jpg";
import hoodiesImg from "../../assets/website/hoodies.jpg";
import bottomsImg from "../../assets/website/bottoms.jpg";

const Home = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "T-Shirts", "Polos", "Hoodies & Sweatshirts", "Bottoms & Pants", "Innerwear & Shorts"];

  const filteredProducts =
    activeCategory === "All"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <div className="space-y-20 pb-16">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-800">
        {/* Ambient Gradient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute top-10 right-10 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                <span>Tirupur Knitwear & Garments Manufacturer</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-white tracking-tight leading-[1.15]">
                Direct Factory Production from{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-yellow-500">
                  Fabric to Finished Garments.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed mx-auto lg:mx-0">
                Welcome to <strong>HAYATI GARMENTS</strong> (Fashion Impex), Tirupur. We purchase premium yarn & fabrics and manufacture top-grade round neck t-shirts, polos, hoodies, sweatshirts, joggers, and shorts with end-to-end in-house quality control.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-2">
                <Link
                  to="/products"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2.5 shadow-xl shadow-amber-500/20 transition-all hover:scale-105"
                >
                  <FaTshirt className="text-base" />
                  <span>Explore Garment Catalog</span>
                </Link>

                <a
                  href={`https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=Hello%20Hayati%20Garments,%20I%20am%20looking%20for%20bulk%20garment%20manufacturing%20in%20Tirupur.`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-emerald-500/40 hover:border-emerald-400 font-bold text-sm flex items-center justify-center gap-2.5 shadow-lg transition-all hover:scale-105"
                >
                  <FaWhatsapp className="text-lg text-emerald-400" />
                  <span>WhatsApp: {COMPANY_DETAILS.phone}</span>
                </a>
              </div>

              {/* Quick stats below hero */}
              <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-slate-800/80">
                <div className="text-left">
                  <div className="text-xl sm:text-2xl font-black text-white">50,000+</div>
                  <div className="text-[11px] text-slate-400">Monthly Pcs Output</div>
                </div>
                <div className="text-left">
                  <div className="text-xl sm:text-2xl font-black text-amber-400">12 Core</div>
                  <div className="text-[11px] text-slate-400">Garment Categories</div>
                </div>
                <div className="text-left">
                  <div className="text-xl sm:text-2xl font-black text-white">100%</div>
                  <div className="text-[11px] text-slate-400">In-House Production</div>
                </div>
                <div className="text-left">
                  <div className="text-xl sm:text-2xl font-black text-emerald-400">Tirupur</div>
                  <div className="text-[11px] text-slate-400">Textile Capital (TN)</div>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-slate-700 shadow-2xl bg-slate-900 group">
                <img
                  src={factoryHero}
                  alt="Hayati Garments Factory Floor in Tirupur"
                  className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                {/* Floating Factory Badge */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                      <FaIndustry className="text-lg" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">HAYATI GARMENTS FACTORY</h4>
                      <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <FaMapMarkerAlt className="text-amber-400" />
                        11/4 Sengunthapuram, Karuvampalayam, Tirupur
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-widest">
              <span>Factory Catalog</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-black text-white mt-1">
              Garments We Manufacture
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-xl">
              From lightweight 180 GSM bio-wash cotton tees to heavyweight 360 GSM fleece hoodies, choose your garment styles, customize GSM and colors, and place bulk orders directly.
            </p>
          </div>

          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
          >
            <span>View All 12 Products</span>
            <FaArrowRight />
          </Link>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                activeCategory === cat
                  ? "bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/10"
                  : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* END-TO-END MANUFACTURING PROCESS SECTION */}
      <section className="bg-slate-900/60 border-y border-slate-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-amber-400 tracking-widest uppercase">
              Production Workflow
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-black text-white">
              From Yarn Sourcing to Export Dispatch
            </h2>
            <p className="text-sm text-slate-400">
              We eliminate middlemen markups. We purchase raw fabric and execute cutting, printing, sewing, and quality testing inside our Karuvampalayam factory.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {/* Step 1 */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 relative group hover:border-amber-500/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-black text-base">
                01
              </div>
              <h3 className="font-bold text-white text-base">Fabric Sourcing</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Direct procurement of combed cotton, bio-wash single jersey, pique matty, French terry, and fleece fabrics.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 relative group hover:border-amber-500/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-black text-base">
                02
              </div>
              <h3 className="font-bold text-white text-base">Pattern & Cutting</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Precision pattern grading for modern streetwear drop-shoulder and classic fits with zero fabric distortion.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 relative group hover:border-amber-500/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-black text-base">
                03
              </div>
              <h3 className="font-bold text-white text-base">High-Tech Stitching</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Industrial multi-needle, flatlock, overlock, and Kansai sewing lines operated by Tirupur's master tailors.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 relative group hover:border-amber-500/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-black text-base">
                04
              </div>
              <h3 className="font-bold text-white text-base">Printing & Embroidery</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Screen printing, high-density puff print, DTF, sublimation, and multi-color computerized embroidery.
              </p>
            </div>

            {/* Step 5 */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 relative group hover:border-amber-500/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-black text-base">
                05
              </div>
              <h3 className="font-bold text-white text-base">QC & Dispatch</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                100% individual piece check, thread trimming, steam ironing, barcode tagging, polybagging, and dispatch.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE HAYATI GARMENTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold text-amber-400 tracking-widest uppercase">
              The Tirupur Advantage
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-black text-white leading-tight">
              Why Top Fashion Brands & Corporate Buyers Partner With Us
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Located in Sengunthapuram, Karuvampalayam, Hayati Garments stands at the epicenter of India's textile capital. Our direct factory infrastructure gives you the fastest turnaround, flexible low MOQs, and genuine factory prices.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <FaCheckCircle className="text-sm" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Flexible MOQs for Emerging & Established Brands</h4>
                  <p className="text-xs text-slate-400">
                    Order as low as 40-50 pcs per style for custom productions, or scale up to 10,000+ units.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <FaCheckCircle className="text-sm" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Custom Fabric Development (160 to 400 GSM)</h4>
                  <p className="text-xs text-slate-400">
                    Single jersey, loopknit terry, heavy fleece, pique matty, ribs, and 4-way stretch spandex.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <FaCheckCircle className="text-sm" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Complete Private Labeling Solutions</h4>
                  <p className="text-xs text-slate-400">
                    Custom woven neck labels, satin wash care tags, hangtags, stickers, and custom polybags.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-colors"
              >
                <span>Learn More About Our Services</span>
                <FaArrowRight />
              </Link>
            </div>
          </div>

          {/* Visual Showcase collage */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img
                src={tshirtsImg}
                alt="T-shirt production"
                className="w-full h-48 sm:h-64 object-cover rounded-2xl border border-slate-800 shadow-lg"
              />
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-amber-400 font-black text-xl">100%</span>
                <h4 className="font-bold text-white text-sm">Combed Bio-Washed</h4>
                <p className="text-[11px] text-slate-400">Ultra-soft skin touch and zero pilling.</p>
              </div>
            </div>

            <div className="space-y-4 pt-8">
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-emerald-400 font-black text-xl">Grade 4+</span>
                <h4 className="font-bold text-white text-sm">Color Fastness</h4>
                <p className="text-[11px] text-slate-400">Azo-free reactive dyeing that doesn't bleed.</p>
              </div>
              <img
                src={hoodiesImg}
                alt="Hoodies production"
                className="w-full h-48 sm:h-64 object-cover rounded-2xl border border-slate-800 shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* WHATSAPP CTA CALLOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 border border-emerald-500/30 p-8 sm:p-12 lg:p-16 text-center space-y-6 shadow-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
            <FaWhatsapp className="text-sm" /> Fast Quotation & Swatches
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-black text-white max-w-3xl mx-auto">
            Ready to Manufacture Your Brand's Next Apparel Collection?
          </h2>

          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Message us directly on WhatsApp with your design mockups or choose from our 12 ready production patterns. Our factory team will send instant fabric swatches and cost estimates.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href={`https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=Hello%20Hayati%20Garments,%20I%20want%20to%20place%20a%20manufacturing%20order.`}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm flex items-center justify-center gap-3 shadow-xl shadow-emerald-900/50 hover:scale-105 transition-all"
            >
              <FaWhatsapp className="text-2xl" />
              <span>Connect on WhatsApp: {COMPANY_DETAILS.phone}</span>
            </a>

            <Link
              to="/contact"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 transition-colors"
            >
              Visit Tirupur Factory
            </Link>
          </div>

          <div className="text-xs text-slate-400 pt-2">
            Address: {COMPANY_DETAILS.address}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
