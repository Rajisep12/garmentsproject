import React, { useState, useMemo } from "react";
import {
  FaSearch,
  FaFilter,
  FaWhatsapp,
  FaShoppingBag,
  FaTshirt,
  FaLayerGroup,
  FaCheckCircle,
} from "react-icons/fa";
import { PRODUCTS, COMPANY_DETAILS } from "../../data/productsData";
import ProductCard from "../../components/website/ProductCard";

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGsm, setSelectedGsm] = useState("All");

  const categories = [
    "All",
    "T-Shirts",
    "Polos",
    "Hoodies & Sweatshirts",
    "Bottoms & Pants",
    "Innerwear & Shorts",
  ];

  const gsmFilters = ["All", "160-200 GSM", "220-260 GSM", "280-360+ GSM"];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;

      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.fabric.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());

      let matchesGsm = true;
      if (selectedGsm === "160-200 GSM") {
        matchesGsm = item.defaultGsm <= 200;
      } else if (selectedGsm === "220-260 GSM") {
        matchesGsm = item.defaultGsm >= 220 && item.defaultGsm <= 260;
      } else if (selectedGsm === "280-360+ GSM") {
        matchesGsm = item.defaultGsm >= 280;
      }

      return matchesCategory && matchesSearch && matchesGsm;
    });
  }, [selectedCategory, searchQuery, selectedGsm]);

  return (
    <div className="space-y-12 py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wider uppercase">
          <span>Factory Production Catalog</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-black text-white">
          Our Garment Manufacturing Collection
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          We manufacture 12 core garment styles from raw fabric in our Tirupur facility. Every product can be customized in your required GSM, pantone shades, private neck labels, and custom prints.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Search Box */}
          <div className="md:col-span-6 relative">
            <FaSearch className="absolute left-3.5 top-3.5 text-slate-400 text-sm" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search garments (e.g. oversize, hoodie, polo, track pant, GSM)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-750 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* GSM Filter */}
          <div className="md:col-span-6 flex items-center gap-2 justify-start md:justify-end flex-wrap">
            <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
              <FaLayerGroup className="text-amber-400" /> Fabric GSM:
            </span>
            {gsmFilters.map((gsm) => (
              <button
                key={gsm}
                onClick={() => setSelectedGsm(gsm)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                  selectedGsm === gsm
                    ? "bg-amber-500 text-slate-950 border-amber-400"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                }`}
              >
                {gsm}
              </button>
            ))}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-slate-800/80 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                selectedCategory === cat
                  ? "bg-amber-500 text-slate-950 border-amber-400 shadow-md"
                  : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-slate-900/50 rounded-2xl border border-slate-800 p-8 space-y-4">
          <FaTshirt className="text-4xl text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">No Garments Found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            We couldn't find any products matching your search criteria. Try selecting another category or clearing your search.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
              setSelectedGsm("All");
            }}
            className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Production & Customization Notes Guide */}
      <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 space-y-6">
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-white font-serif">
            Hayati Garments Bulk Manufacturing Policy
          </h3>
          <p className="text-xs text-slate-400">
            Transparent, factory-direct manufacturing terms for domestic apparel brands and exporters.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <span className="font-bold text-amber-400 block text-sm">Low MOQ Advantage</span>
            <p className="text-slate-400 leading-relaxed">
              Minimum order starting from 40 to 50 pcs per color/style, making it easy for direct-to-consumer (D2C) brands to test new drops.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <span className="font-bold text-amber-400 block text-sm">Sample Development</span>
            <p className="text-slate-400 leading-relaxed">
              We provide pre-production samples (PPS) with your custom measurements and branding before committing to bulk cutting.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <span className="font-bold text-amber-400 block text-sm">Fabric Customization</span>
            <p className="text-slate-400 leading-relaxed">
              Choose your exact GSM (160 to 400 GSM), knit type (single jersey, pique, terry, fleece), and custom pantone reactive dyeing.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <span className="font-bold text-amber-400 block text-sm">Nationwide Dispatch</span>
            <p className="text-slate-400 leading-relaxed">
              Fast logistics dispatch from Tirupur to Mumbai, Delhi, Bengaluru, Hyderabad, Chennai, Kolkata, and international sea/air ports.
            </p>
          </div>
        </div>

        <div className="pt-2 text-center sm:text-left sm:flex sm:items-center sm:justify-between border-t border-slate-800 gap-4">
          <p className="text-xs text-slate-400">
            Need custom patterns or specific tech pack development?
          </p>
          <a
            href={`https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=Hello%20Hayati%20Garments,%20I%20have%20a%20custom%20tech%20pack%20for%20manufacturing.`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors mt-2 sm:mt-0"
          >
            <FaWhatsapp className="text-sm" />
            <span>Send Tech Pack on WhatsApp: {COMPANY_DETAILS.phone}</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Products;
