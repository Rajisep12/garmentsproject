import React, { useState } from "react";
import {
  FaTimes,
  FaCheck,
  FaWhatsapp,
  FaShoppingBag,
  FaShieldAlt,
  FaIndustry,
  FaLayerGroup,
} from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import { COMPANY_DETAILS } from "../../data/productsData";

const ProductModal = ({ product, onClose }) => {
  const { addToCart, setIsCartOpen } = useCart();

  const [selectedSize, setSelectedSize] = useState(
    product ? product.sizes[0] : "L"
  );
  const [selectedColor, setSelectedColor] = useState(
    product ? product.colors[0].name : "Black"
  );
  const [selectedGsm, setSelectedGsm] = useState(
    product ? product.defaultGsm : 180
  );
  const [quantity, setQuantity] = useState(product ? product.moq : 50);
  const [customNotes, setCustomNotes] = useState("");

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product, {
      size: selectedSize,
      color: selectedColor,
      gsm: selectedGsm,
      quantity: parseInt(quantity, 10) || product.moq,
      customNotes,
    });
    onClose();
    setIsCartOpen(true);
  };

  const handleDirectWhatsApp = () => {
    const qty = parseInt(quantity, 10) || product.moq;
    const msg = `*PRODUCT INQUIRY - HAYATI GARMENTS*\n------------------------------------\n*Product:* ${product.name} (${product.category})\n*Size:* ${selectedSize}\n*Color:* ${selectedColor}\n*Fabric GSM:* ${selectedGsm} GSM\n*Quantity:* ${qty} pcs\n*Fabric Specs:* ${product.fabric}\n${customNotes ? `*Custom Notes:* ${customNotes}\n` : ""}------------------------------------\nPlease send pricing, fabric samples & delivery lead time for Tirupur manufacturing.`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=${encoded}`, "_blank");
  };

  const currentTotal = (parseInt(quantity, 10) || product.moq) * product.estimatedPrice;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-slate-900 border border-slate-700/80 rounded-2xl max-w-2xl w-full p-6 sm:p-8 text-slate-100 shadow-2xl z-10 my-8 overflow-hidden animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <FaTimes className="text-lg" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Left Column: Image & Badges */}
          <div>
            <div className="relative rounded-xl overflow-hidden border border-slate-750 bg-slate-950 aspect-[4/3]">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-amber-500 text-slate-950 shadow-md">
                  {product.badge}
                </span>
              )}
            </div>

            <div className="mt-4 p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2">
              <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold">
                <FaIndustry />
                <span>Manufactured In-House in Tirupur</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>

          {/* Right Column: Customization Controls */}
          <div className="space-y-4">
            <div>
              <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider">
                {product.category}
              </span>
              <h3 className="text-xl font-bold text-white mt-0.5">{product.name}</h3>
              <p className="text-xs text-slate-400">{product.subtitle}</p>
            </div>

            {/* Fabric Details */}
            <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 text-xs">
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Fabric Type:</span>
              <span className="text-slate-200 font-medium">{product.fabric}</span>
            </div>

            {/* GSM Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                <span>Select Fabric GSM</span>
                <span className="text-amber-400 text-[11px] font-bold">{selectedGsm} GSM</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.gsmOptions.map((gsm) => (
                  <button
                    key={gsm}
                    type="button"
                    onClick={() => setSelectedGsm(gsm)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                      selectedGsm === gsm
                        ? "bg-amber-500 text-slate-950 border-amber-400 shadow-md"
                        : "bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-600"
                    }`}
                  >
                    {gsm} GSM
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                <span>Select Size</span>
                <span className="text-emerald-400 text-[11px] font-bold">{selectedSize}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-10 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                      selectedSize === size
                        ? "bg-emerald-600 text-white border-emerald-500 shadow-md"
                        : "bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-600"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Swatches */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                <span>Select Color</span>
                <span className="text-slate-300 text-[11px]">{selectedColor}</span>
              </label>
              <div className="flex flex-wrap gap-2.5 items-center">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setSelectedColor(c.name)}
                    className={`relative w-7 h-7 rounded-full border-2 transition-all flex items-center justify-center ${
                      selectedColor === c.name
                        ? "border-amber-400 scale-110 shadow-lg shadow-amber-400/30 ring-2 ring-amber-400/40"
                        : "border-slate-600 hover:scale-105"
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  >
                    {selectedColor === c.name && (
                      <FaCheck
                        className={`text-[10px] ${
                          c.hex.toLowerCase() === "#f9fafb" || c.hex.toLowerCase() === "#f3f4f6"
                            ? "text-slate-900"
                            : "text-white"
                        }`}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                <span>Order Quantity (Pcs)</span>
                <span className="text-slate-400 text-[10px]">MOQ: {product.moq} pcs</span>
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={product.moq}
                  step="10"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 0))}
                  className="w-28 px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm font-bold focus:outline-none focus:border-amber-400"
                />
                <div className="flex gap-1.5">
                  {[50, 100, 250, 500].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setQuantity(preset)}
                      className={`px-2 py-1 rounded text-[11px] font-semibold transition-colors border ${
                        quantity === preset
                          ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                          : "bg-slate-800 text-slate-400 border-slate-700 hover:text-white"
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Custom Notes */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Custom Print / Embroidery Requirements (Optional)
              </label>
              <input
                type="text"
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                placeholder="e.g. Chest print 10x10cm + neck brand label"
                className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Price Preview */}
            <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs">
              <span className="text-slate-400">Estimated Total:</span>
              <div className="text-right">
                <span className="text-base font-extrabold text-amber-400">
                  ₹{currentTotal.toLocaleString("en-IN")}
                </span>
                <span className="text-[10px] text-slate-500 block">
                  (₹{product.estimatedPrice}/pc bulk est.)
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02]"
              >
                <FaShoppingBag />
                <span>Add to Cart</span>
              </button>

              <button
                type="button"
                onClick={handleDirectWhatsApp}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30 transition-all hover:scale-[1.02]"
              >
                <FaWhatsapp className="text-base" />
                <span>Inquire on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
