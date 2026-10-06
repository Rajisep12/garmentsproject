import React, { useState } from "react";
import {
  FaTimes,
  FaTrash,
  FaPlus,
  FaMinus,
  FaWhatsapp,
  FaShoppingBag,
  FaBuilding,
  FaUser,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaStickyNote,
} from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import { COMPANY_DETAILS } from "../../data/productsData";

const CartDrawer = () => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalPieces,
    totalEstimatedAmount,
    sendOrderToWhatsApp,
  } = useCart();

  const [customer, setCustomer] = useState({
    name: "",
    company: "",
    phone: "",
    city: "",
    notes: "",
  });

  if (!isCartOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    sendOrderToWhatsApp(customer);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md md:max-w-lg bg-slate-900 border-l border-slate-800 text-slate-100 flex flex-col shadow-2xl">
          {/* Drawer Header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
                <FaShoppingBag className="text-lg" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">Your Order Inquiry</h3>
                <p className="text-xs text-slate-400">
                  {totalPieces} pcs • {cartItems.length} selected garments
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <FaTimes className="text-lg" />
            </button>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-20 h-20 mx-auto rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-500">
                  <FaShoppingBag className="text-3xl" />
                </div>
                <h4 className="text-base font-semibold text-slate-300">Your cart is currently empty</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Browse our range of 12 garments manufactured in Tirupur and select sizes, colors, and quantities.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow-md"
                >
                  Explore Garment Catalog
                </button>
              </div>
            ) : (
              <>
                {/* List of items */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs text-slate-400 pb-1">
                    <span>Products ({cartItems.length})</span>
                    <button
                      onClick={clearCart}
                      className="text-red-400 hover:text-red-300 transition-colors flex items-center gap-1"
                    >
                      <FaTrash className="text-[10px]" /> Clear All
                    </button>
                  </div>

                  {cartItems.map((item) => (
                    <div
                      key={item.cartItemId}
                      className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-750 flex gap-3.5 items-start relative group"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover bg-slate-900 border border-slate-700 shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="text-sm font-bold text-white truncate">{item.name}</h4>
                          <button
                            onClick={() => removeFromCart(item.cartItemId)}
                            className="text-slate-500 hover:text-red-400 transition-colors p-1"
                            title="Remove item"
                          >
                            <FaTrash className="text-xs" />
                          </button>
                        </div>

                        <div className="flex flex-wrap gap-2 text-[11px] text-slate-400 mt-1">
                          <span className="px-1.5 py-0.5 rounded bg-slate-700 text-slate-200">
                            Size: <strong className="text-amber-400">{item.size}</strong>
                          </span>
                          <span className="px-1.5 py-0.5 rounded bg-slate-700 text-slate-200">
                            Color: <strong className="text-emerald-400">{item.color}</strong>
                          </span>
                          <span className="px-1.5 py-0.5 rounded bg-slate-700 text-slate-200">
                            GSM: <strong className="text-blue-400">{item.gsm}</strong>
                          </span>
                        </div>

                        {item.notes && (
                          <p className="text-[11px] text-slate-400 mt-1 italic line-clamp-1">
                            Note: {item.notes}
                          </p>
                        )}

                        <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-700/60">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] text-slate-400">Qty:</span>
                            <div className="flex items-center border border-slate-700 rounded-lg bg-slate-900 overflow-hidden">
                              <button
                                onClick={() => updateQuantity(item.cartItemId, item.quantity - 10)}
                                className="px-2 py-1 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors text-xs"
                              >
                                <FaMinus className="text-[9px]" />
                              </button>
                              <span className="px-2.5 py-0.5 text-xs font-bold text-white">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.cartItemId, item.quantity + 10)}
                                className="px-2 py-1 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors text-xs"
                              >
                                <FaPlus className="text-[9px]" />
                              </button>
                            </div>
                          </div>

                          <div className="text-right">
                            <span className="text-xs font-bold text-amber-400">
                              ₹{(item.quantity * item.estimatedPrice).toLocaleString("en-IN")}
                            </span>
                            <span className="text-[10px] text-slate-500 block">
                              (₹{item.estimatedPrice}/pc est.)
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Customer Details Form */}
                <form id="orderForm" onSubmit={handleSubmit} className="space-y-3.5 pt-3 border-t border-slate-800">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Buyer / Brand Details (For WhatsApp Order)
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Your Name *</label>
                      <div className="relative">
                        <FaUser className="absolute left-3 top-3 text-slate-500 text-xs" />
                        <input
                          type="text"
                          required
                          value={customer.name}
                          onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                          placeholder="e.g. Ramesh Kumar"
                          className="w-full pl-8 pr-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Brand / Company</label>
                      <div className="relative">
                        <FaBuilding className="absolute left-3 top-3 text-slate-500 text-xs" />
                        <input
                          type="text"
                          value={customer.company}
                          onChange={(e) => setCustomer({ ...customer, company: e.target.value })}
                          placeholder="e.g. Urban Style Apparel"
                          className="w-full pl-8 pr-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Contact Phone</label>
                      <div className="relative">
                        <FaPhoneAlt className="absolute left-3 top-3 text-slate-500 text-xs" />
                        <input
                          type="tel"
                          value={customer.phone}
                          onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                          placeholder="e.g. 9876543210"
                          className="w-full pl-8 pr-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Delivery City / State</label>
                      <div className="relative">
                        <FaMapMarkerAlt className="absolute left-3 top-3 text-slate-500 text-xs" />
                        <input
                          type="text"
                          value={customer.city}
                          onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                          placeholder="e.g. Mumbai, Maharashtra"
                          className="w-full pl-8 pr-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">
                      Customization Notes (Print, Embroidery, Tags, Target Timeline)
                    </label>
                    <div className="relative">
                      <FaStickyNote className="absolute left-3 top-3 text-slate-500 text-xs" />
                      <textarea
                        rows="2"
                        value={customer.notes}
                        onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                        placeholder="e.g., We need DTF printing on chest & custom woven neck tags."
                        className="w-full pl-8 pr-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>
                </form>
              </>
            )}
          </div>

          {/* Drawer Footer / WhatsApp CTA */}
          {cartItems.length > 0 && (
            <div className="p-5 border-t border-slate-800 bg-slate-950 space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Total Garments:</span>
                  <span className="font-semibold text-white">{totalPieces} pieces</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Estimated Total (excl. GST/Freight):</span>
                  <span className="font-bold text-amber-400 text-base">
                    ₹{totalEstimatedAmount.toLocaleString("en-IN")}
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 italic">
                  * Final pricing depends on order quantity, fabric GSM, print technique & trims.
                </p>
              </div>

              <button
                type="submit"
                form="orderForm"
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-900/50 hover:shadow-emerald-900/80 transition-all hover:scale-[1.02]"
              >
                <FaWhatsapp className="text-xl" />
                <span>Place Order to WhatsApp ({COMPANY_DETAILS.phone})</span>
              </button>

              <div className="text-center">
                <span className="text-[11px] text-slate-400">
                  Instant response from Hayati Garments Tirupur Factory
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
