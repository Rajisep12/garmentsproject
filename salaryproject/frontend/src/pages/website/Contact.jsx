import React, { useState } from "react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaWhatsapp,
  FaInstagram,
  FaEnvelope,
  FaClock,
  FaBuilding,
  FaPaperPlane,
  FaQuestionCircle,
  FaDirections,
} from "react-icons/fa";
import { COMPANY_DETAILS } from "../../data/productsData";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    garmentOfInterest: "All Garments",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = `*GENERAL INQUIRY - HAYATI GARMENTS*\n------------------------------------\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n${formData.email ? `*Email:* ${formData.email}\n` : ""}*Garment of Interest:* ${formData.garmentOfInterest}\n*Message:* ${formData.message}\n------------------------------------\nSent from Website Contact Page`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=${encoded}`, "_blank");
  };

  const faqs = [
    {
      q: "What is your Minimum Order Quantity (MOQ)?",
      a: "Our standard MOQ starts from just 40 to 50 pcs per style/color for custom productions. For plain stock blanks or sample development, we can accommodate smaller trial quantities.",
    },
    {
      q: "Where is your factory located?",
      a: "Our factory is located at 11/4 SENGUNTHAPURAM, Karuvampalayam, Tirupur, Tamil Nadu 641604 — right at the center of the Tirupur knitwear manufacturing hub.",
    },
    {
      q: "Can you provide pre-production samples with our brand labels?",
      a: "Yes! Once you share your tech pack or garment specs, we develop a custom pre-production sample (PPS) with your chosen fabric GSM, cut pattern, and branding for your approval prior to mass cutting.",
    },
    {
      q: "What printing & decoration methods do you support?",
      a: "We support Screen Printing, High-Density 3D Puff Printing, Direct-To-Film (DTF), Sublimation, and Multi-Head Computerized Embroidery.",
    },
    {
      q: "How do we place an order or get a quotation?",
      a: "You can add garments to your cart on this website and click 'Place Order to WhatsApp', or message us directly at 9944356661 with your quantity and design files for an immediate quote.",
    },
  ];

  return (
    <div className="space-y-16 py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wider uppercase">
          <span>Factory Direct Contact</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-black text-white">
          Contact Hayati Garments
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Get in touch with our Tirupur manufacturing team for fabric sourcing, bulk apparel production, sample orders, or to visit our manufacturing floor.
        </p>
      </div>

      {/* Contact Cards & Form Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Contact Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <FaBuilding className="text-amber-400" />
              <span>Factory Headquarters</span>
            </h3>

            <div className="space-y-4 text-xs text-slate-300">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <span className="font-semibold text-white block mb-0.5">Physical Address:</span>
                  <p className="leading-relaxed text-slate-300">
                    <strong>HAYATI GARMENTS</strong><br />
                    11/4 SENGUNTHAPURAM,<br />
                    karuvampalayam, tirupur.641604<br />
                    Tamil Nadu, India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <FaWhatsapp />
                </div>
                <div>
                  <span className="font-semibold text-white block mb-0.5">WhatsApp / Phone:</span>
                  <a
                    href={`https://wa.me/${COMPANY_DETAILS.whatsappNumber}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-400 hover:text-emerald-300 font-bold block"
                  >
                    +91 {COMPANY_DETAILS.phone}
                  </a>
                  <span className="text-[11px] text-slate-400">Available 9:00 AM - 8:00 PM IST</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-pink-500/10 border border-pink-500/20 text-pink-400 flex items-center justify-center shrink-0">
                  <FaInstagram />
                </div>
                <div>
                  <span className="font-semibold text-white block mb-0.5">Official Instagram:</span>
                  <a
                    href="https://www.instagram.com/hayati_garments/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-pink-400 hover:text-pink-300 font-bold block"
                  >
                    @hayati_garments
                  </a>
                  <span className="text-[11px] text-slate-400">Follow us for production videos & new drops</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                  <FaClock />
                </div>
                <div>
                  <span className="font-semibold text-white block mb-0.5">Working Hours:</span>
                  <p className="text-slate-300">{COMPANY_DETAILS.workingHours}</p>
                  <span className="text-[11px] text-slate-400">Sunday Closed (Except urgent dispatches)</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800">
              <a
                href={`https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=Hello%20Hayati%20Garments,%20I%20would%20like%20to%20visit%20your%20factory%20in%20Tirupur.`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <FaWhatsapp className="text-base" />
                <span>Chat on WhatsApp ({COMPANY_DETAILS.phone})</span>
              </a>
            </div>
          </div>

          {/* Location Directions Callout */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 space-y-3">
            <h4 className="font-bold text-white text-sm flex items-center gap-2">
              <FaDirections className="text-amber-400" />
              <span>How to Reach Us in Tirupur</span>
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              We are conveniently located in Sengunthapuram, Karuvampalayam — approximately 3 km from Tirupur Railway Station and 45 minutes from Coimbatore International Airport (CJB).
            </p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Sengunthapuram+Karuvampalayam+Tirupur+641604"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300"
            >
              <span>Open in Google Maps</span>
              <FaMapMarkerAlt className="text-xs" />
            </a>
          </div>
        </div>

        {/* Right Column: Contact & Message Form */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-4"
          >
            <div>
              <h3 className="text-xl font-bold text-white font-serif">
                Send Us an Inquiry
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Fill in your details below and hit submit to send your inquiry straight to our WhatsApp helpline.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Rahul Verma"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-750 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Phone / WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="e.g. 9876543210"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-750 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. contact@yourbrand.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-750 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Garment of Interest
                </label>
                <select
                  value={formData.garmentOfInterest}
                  onChange={(e) => setFormData({ ...formData, garmentOfInterest: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-750 text-xs text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="All Garments">All Garments / Multiple Styles</option>
                  <option value="Round Neck T-Shirts (Half / Full)">Round Neck T-Shirts</option>
                  <option value="Polo T-Shirts (Half / Full)">Polo T-Shirts</option>
                  <option value="Oversize Drop Shoulder Tees">Oversize Drop Shoulder Tees</option>
                  <option value="Hoodies & Sweatshirts">Hoodies & Sweatshirts</option>
                  <option value="Track Pants & Joggers">Track Pants & Joggers</option>
                  <option value="Kids Pants">Kids Pants</option>
                  <option value="Trunks & Innerwear">Trunks & Innerwear</option>
                  <option value="French Terry Shorts">French Terry Shorts</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Your Requirements / Questions *
              </label>
              <textarea
                required
                rows="4"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell us about your brand, quantity required, target delivery date, or fabric specifications..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-750 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-900/40 transition-all hover:scale-[1.01]"
            >
              <FaWhatsapp className="text-xl" />
              <span>Send Message to WhatsApp ({COMPANY_DETAILS.phone})</span>
            </button>
          </form>
        </div>
      </div>

      {/* FAQ SECTION */}
      <div className="space-y-6 pt-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Common questions regarding orders, MOQ, sample lead times, and factory visits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2"
            >
              <h4 className="text-sm font-bold text-white flex items-start gap-2">
                <FaQuestionCircle className="text-amber-400 text-sm mt-0.5 shrink-0" />
                <span>{faq.q}</span>
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed pl-5">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
