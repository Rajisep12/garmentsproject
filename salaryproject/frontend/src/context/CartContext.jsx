import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { COMPANY_DETAILS } from "../data/productsData";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem("hayati_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem("hayati_cart", JSON.stringify(cartItems));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }, [cartItems]);

  const addToCart = (product, options = {}) => {
    const size = options.size || (product.sizes ? product.sizes[0] : "L");
    const color = options.color || (product.colors ? product.colors[0].name : "Black");
    const gsm = options.gsm || product.defaultGsm || 180;
    const quantity = parseInt(options.quantity, 10) || product.moq || 50;
    const customNotes = options.customNotes || "";

    const cartItemId = `${product.id}-${size}-${color.replace(/\s+/g, "")}-${gsm}`;

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
          notes: customNotes || updated[existingIndex].notes,
        };
        return updated;
      } else {
        return [
          ...prevItems,
          {
            cartItemId,
            productId: product.id,
            name: product.name,
            subtitle: product.subtitle,
            category: product.category,
            fabric: product.fabric,
            image: product.image,
            size,
            color,
            gsm,
            quantity,
            estimatedPrice: product.estimatedPrice,
            notes: customNotes,
          },
        ];
      }
    });

    toast.success(`Added ${quantity} pcs of ${product.name} (${size}, ${color}) to cart!`, {
      autoClose: 2500,
    });
  };

  const updateQuantity = (cartItemId, newQuantity) => {
    const qty = parseInt(newQuantity, 10);
    if (isNaN(qty) || qty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.cartItemId === cartItemId ? { ...item, quantity: qty } : item))
    );
  };

  const removeFromCart = (cartItemId) => {
    setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
    toast.info("Item removed from inquiry cart", { autoClose: 1500 });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalPieces = cartItems.reduce((acc, item) => acc + (item.quantity || 0), 0);
  const totalEstimatedAmount = cartItems.reduce(
    (acc, item) => acc + (item.quantity || 0) * (item.estimatedPrice || 0),
    0
  );

  const sendOrderToWhatsApp = (customerData = {}) => {
    if (cartItems.length === 0) {
      toast.warning("Your cart is empty. Please add products first!");
      return;
    }

    const {
      name = "Buyer / Retailer",
      company = "Retailer / Brand",
      phone = "",
      city = "India",
      notes = "",
    } = customerData;

    let message = `*NEW MANUFACTURING ORDER / INQUIRY*\n`;
    message += `*HAYATI GARMENTS (Fashion Impex)*\n`;
    message += `------------------------------------\n`;
    message += `*Buyer Name:* ${name}\n`;
    if (company) message += `*Brand/Company:* ${company}\n`;
    if (phone) message += `*Phone:* ${phone}\n`;
    if (city) message += `*City/State:* ${city}\n`;
    message += `\n*ORDERED GARMENTS BREAKDOWN:*\n`;

    cartItems.forEach((item, index) => {
      message += `\n${index + 1}. *${item.name}* (${item.category})\n`;
      message += `   - *Size:* ${item.size} | *Color:* ${item.color} | *GSM:* ${item.gsm} GSM\n`;
      message += `   - *Quantity:* ${item.quantity} pcs\n`;
      message += `   - *Est. Rate:* ₹${item.estimatedPrice}/pc (Est. ₹${(
        item.quantity * item.estimatedPrice
      ).toLocaleString("en-IN")})\n`;
      if (item.notes) {
        message += `   - *Customization/Print:* ${item.notes}\n`;
      }
    });

    message += `\n------------------------------------\n`;
    message += `*Total Order Volume:* ${totalPieces} pcs across ${cartItems.length} styles\n`;
    message += `*Total Est. Value:* ₹${totalEstimatedAmount.toLocaleString("en-IN")} (excl. GST/Freight)\n`;
    if (notes) {
      message += `*Additional Requirements:* ${notes}\n`;
    }
    message += `------------------------------------\n`;
    message += `*Factory Address:* 11/4 SENGUNTHAPURAM, karuvampalayam, tirupur.641604\n`;
    message += `_Sent via Hayati Garments Portal_`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=${encoded}`;

    window.open(whatsappUrl, "_blank");
    toast.success("Opening WhatsApp with your order details...", { autoClose: 3000 });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalPieces,
        totalEstimatedAmount,
        sendOrderToWhatsApp,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
