import React, { useState } from "react";
import {
  FaShoppingBag,
  FaWhatsapp,
  FaEye,
  FaCheck,
  FaArrowRight,
} from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import { COMPANY_DETAILS } from "../../data/productsData";
import ProductModal from "./ProductModal";

const ProductCard = ({ product }) => {
  const { addToCart, setIsCartOpen } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    addToCart(product, {
      size: product.sizes[1] || product.sizes[0],
      color: product.colors[0].name,
      gsm: product.defaultGsm,
      quantity: product.moq,
    });
    setIsCartOpen(true);
  };

  const handleQuickWhatsApp = (e) => {
    e.stopPropagation();
    const msg = `*PRODUCT INQUIRY - HAYATI GARMENTS*\n------------------------------------\n*Product:* ${product.name} (${product.category})\n*Fabric:* ${product.fabric}\n*Default GSM:* ${product.defaultGsm} GSM\n*MOQ:* ${product.moq} pcs\n------------------------------------\nPlease send pricing, fabric swatches and delivery lead time.`;
    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=${encoded}`, "_blank");
  };

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="group relative bg-slate-900/90 rounded-2xl border border-slate-800 hover:border-amber-500/50 p-4 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/5 hover:-translate-y-1 flex flex-col justify-between cursor-pointer"
      >
        <div>
          {/* Image Container */}
          <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-slate-950 border border-slate-800 group-hover:border-slate-700 transition-colors">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />

            {/* Badges */}
            <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start">
              {product.badge && (
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-slate-950 shadow-md">
                  {product.badge}
                </span>
              )}
              <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-900/90 text-slate-300 border border-slate-700 backdrop-blur-sm">
                MOQ: {product.moq} pcs
              </span>
            </div>

            {/* Quick Action Overlay */}
            <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsModalOpen(true);
                }}
                className="p-2.5 rounded-xl bg-slate-800/90 hover:bg-amber-500 text-white hover:text-slate-950 text-xs font-semibold backdrop-blur-sm transition-all shadow-md flex items-center gap-1.5"
                title="View & Customize"
              >
                <FaEye /> Customize
              </button>
              <button
                type="button"
                onClick={handleQuickWhatsApp}
                className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-all shadow-md flex items-center gap-1.5"
                title="WhatsApp Inquiry"
              >
                <FaWhatsapp className="text-sm" /> Inquire
              </button>
            </div>
          </div>

          {/* Garment Details */}
          <div className="mt-3.5 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                {product.category}
              </span>
              <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                {product.defaultGsm} GSM
              </span>
            </div>

            <h3 className="font-bold text-base text-white group-hover:text-amber-300 transition-colors line-clamp-1">
              {product.name}
            </h3>

            <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
              {product.subtitle} • {product.fabric}
            </p>

            {/* Available Colors preview */}
            <div className="pt-1 flex items-center gap-1.5">
              <span className="text-[10px] text-slate-500">Colors:</span>
              <div className="flex items-center gap-1">
                {product.colors.slice(0, 5).map((c, i) => (
                  <span
                    key={i}
                    className="w-3 h-3 rounded-full border border-slate-700 shadow-sm inline-block"
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  />
                ))}
                {product.colors.length > 5 && (
                  <span className="text-[9px] text-slate-400">+{product.colors.length - 5}</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Card Footer: Price & Add to Cart */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 block">Factory Est.</span>
            <span className="text-sm font-black text-amber-400">
              ₹{product.estimatedPrice}
              <span className="text-[11px] font-normal text-slate-400">/pc</span>
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleQuickAdd}
              className="px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500 text-amber-400 hover:text-slate-950 border border-amber-500/30 text-xs font-bold transition-all flex items-center gap-1"
              title={`Add ${product.moq} pcs to cart`}
            >
              <FaShoppingBag className="text-xs" />
              <span>Add</span>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(true);
              }}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700 hover:border-slate-600 transition-colors"
              title="Customize Options"
            >
              <FaArrowRight className="text-xs" />
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <ProductModal product={product} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
};

export default ProductCard;
