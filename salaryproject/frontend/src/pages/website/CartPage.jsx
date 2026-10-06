import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaShoppingBag,
  FaTrash,
  FaPlus,
  FaMinus,
  FaWhatsapp,
  FaArrowLeft,
  FaUser,
  FaBuilding,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaStickyNote,
} from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import { COMPANY_DETAILS } from "../../data/productsData";

const CartPage = () => {
  const {
    cartItems,
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

  const handleCheckout = (e) => {
    e.preventDefault();
    sendOrderToWhatsApp(customer);
  };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl sm:text-4xl font-serif font-black text-white">
            Manufacturing Order Cart
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Review your garment selections and send your bulk order inquiry directly to our factory on WhatsApp.
          </p>
        </div>

        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300"
        >
          <FaArrowLeft />
          <span>Continue Browsing Garments</span>
        </Link>
      </div>

      {cartItems.length === 0 ? (
        <div className="py-20 text-center rounded-3xl bg-slate-900 border border-slate-800 space-y-4 max-w-2xl mx-auto p-8">
          <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center text-slate-500 mx-auto">
            <FaShoppingBag className="text-3xl" />
          </div>
          <h2 className="text-xl font-bold text-white">Your Cart is Empty</h2>
          <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
            You haven't added any garments to your cart yet. Explore our 12 product lines manufactured directly in Tirupur.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg transition-all"
          >
            <span>View All Garments</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Items List */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex justify-between items-center text-xs text-slate-400 pb-1">
              <span>{cartItems.length} Products in Inquiry</span>
              <button
                onClick={clearCart}
                className="text-red-400 hover:text-red-300 flex items-center gap-1 font-semibold"
              >
                <FaTrash className="text-[10px]" /> Clear Cart
              </button>
            </div>

            {cartItems.map((item) => (
              <div
                key={item.cartItemId}
                className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
              >
                <div className="flex gap-4 items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-xl object-cover bg-slate-950 border border-slate-750 shrink-0"
                  />
                  <div>
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                      {item.category}
                    </span>
                    <h3 className="font-bold text-white text-base">{item.name}</h3>
                    <div className="flex flex-wrap gap-2 text-xs text-slate-300 mt-1">
                      <span className="bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                        Size: <strong className="text-amber-400">{item.size}</strong>
                      </span>
                      <span className="bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                        Color: <strong className="text-emerald-400">{item.color}</strong>
                      </span>
                      <span className="bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                        GSM: <strong className="text-blue-400">{item.gsm}</strong>
                      </span>
                    </div>
                    {item.notes && (
                      <p className="text-[11px] text-slate-400 mt-1 italic">
                        Customization: {item.notes}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                  <div className="flex items-center border border-slate-700 rounded-lg bg-slate-950 overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.cartItemId, item.quantity - 10)}
                      className="px-2.5 py-1 text-slate-400 hover:text-white hover:bg-slate-800 text-xs"
                    >
                      <FaMinus className="text-[9px]" />
                    </button>
                    <span className="px-3 py-1 text-xs font-bold text-white">
                      {item.quantity} pcs
                    </span>
                    <button
                      onClick={() => updateQuantity(item.cartItemId, item.quantity + 10)}
                      className="px-2.5 py-1 text-slate-400 hover:text-white hover:bg-slate-800 text-xs"
                    >
                      <FaPlus className="text-[9px]" />
                    </button>
                  </div>

                  <div className="text-right">
                    <span className="text-sm font-extrabold text-amber-400 block">
                      ₹{(item.quantity * item.estimatedPrice).toLocaleString("en-IN")}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.cartItemId)}
                      className="text-[11px] text-red-400 hover:text-red-300 mt-1"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout & Buyer Form */}
          <div className="lg:col-span-5">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
              <h3 className="text-lg font-bold text-white font-serif border-b border-slate-800 pb-3">
                Order Summary & WhatsApp Checkout
              </h3>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Total Order Volume:</span>
                  <span className="font-bold text-white">{totalPieces} pieces</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Product Lines:</span>
                  <span className="font-semibold text-white">{cartItems.length} styles</span>
                </div>
                <div className="flex justify-between text-slate-400 pt-2 border-t border-slate-800">
                  <span className="text-sm font-bold text-slate-200">Estimated Total:</span>
                  <span className="text-lg font-extrabold text-amber-400">
                    ₹{totalEstimatedAmount.toLocaleString("en-IN")}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 italic">
                  * Note: Excludes taxes & transport. Final invoice generated based on yarn rates and branding requirements.
                </p>
              </div>

              {/* Customer input fields */}
              <form onSubmit={handleCheckout} className="space-y-3 pt-2 border-t border-slate-800">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Buyer Information
                </h4>

                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Your Name *</label>
                  <div className="relative">
                    <FaUser className="absolute left-3 top-3 text-slate-500 text-xs" />
                    <input
                      type="text"
                      required
                      value={customer.name}
                      onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                      placeholder="e.g. Suresh Kumar"
                      className="w-full pl-8 pr-3 py-2 rounded-lg bg-slate-950 border border-slate-750 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Brand / Company</label>
                    <div className="relative">
                      <FaBuilding className="absolute left-3 top-3 text-slate-500 text-xs" />
                      <input
                        type="text"
                        value={customer.company}
                        onChange={(e) => setCustomer({ ...customer, company: e.target.value })}
                        placeholder="e.g. Trendz Retail"
                        className="w-full pl-8 pr-3 py-2 rounded-lg bg-slate-950 border border-slate-750 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Phone</label>
                    <div className="relative">
                      <FaPhoneAlt className="absolute left-3 top-3 text-slate-500 text-xs" />
                      <input
                        type="tel"
                        value={customer.phone}
                        onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                        placeholder="e.g. 9876543210"
                        className="w-full pl-8 pr-3 py-2 rounded-lg bg-slate-950 border border-slate-750 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Delivery City</label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-3 top-3 text-slate-500 text-xs" />
                    <input
                      type="text"
                      value={customer.city}
                      onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                      placeholder="e.g. Bengaluru, Karnataka"
                      className="w-full pl-8 pr-3 py-2 rounded-lg bg-slate-950 border border-slate-750 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">
                    Special Notes / Print Instructions
                  </label>
                  <div className="relative">
                    <FaStickyNote className="absolute left-3 top-3 text-slate-500 text-xs" />
                    <textarea
                      rows="2"
                      value={customer.notes}
                      onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                      placeholder="e.g. Need neck labels stitched + delivery within 2 weeks."
                      className="w-full pl-8 pr-3 py-2 rounded-lg bg-slate-950 border border-slate-750 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm flex items-center justify-center gap-2.5 shadow-xl shadow-emerald-900/50 hover:scale-[1.02] transition-all pt-3"
                >
                  <FaWhatsapp className="text-xl" />
                  <span>Send Order to WhatsApp ({COMPANY_DETAILS.phone})</span>
                </button>
              </form>

              <div className="text-[11px] text-slate-400 text-center border-t border-slate-800 pt-3">
                Factory Address: {COMPANY_DETAILS.address}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
