import React, { useState } from "react";
import {
  FaIndustry,
  FaCut,
  FaPrint,
  FaCheckCircle,
  FaTags,
  FaBoxes,
  FaWhatsapp,
  FaLayerGroup,
  FaAward,
  FaTools,
} from "react-icons/fa";
import { COMPANY_DETAILS } from "../../data/productsData";
import factoryHero from "../../assets/website/factory_hero.jpg";

const Services = () => {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    phone: "",
    garmentType: "Round Neck T-Shirt",
    quantity: "100",
    fabricRequirements: "",
  });

  const handleInquiry = (e) => {
    e.preventDefault();
    const msg = `*CUSTOM MANUFACTURING SERVICE INQUIRY*\n------------------------------------\n*Name:* ${formData.name}\n*Brand:* ${formData.brand}\n*Phone:* ${formData.phone}\n*Garment Style:* ${formData.garmentType}\n*Estimated Quantity:* ${formData.quantity} pcs\n*Fabric Requirements:* ${formData.fabricRequirements || "Standard Bio-Washed Cotton"}\n------------------------------------\nPlease advise sample process, timeline and pricing.`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=${encoded}`, "_blank");
  };

  const servicesList = [
    {
      step: "01",
      icon: <FaLayerGroup className="text-amber-400 text-xl" />,
      title: "Fabric Sourcing & Procurement",
      subtitle: "Yarn & Raw Knit Fabric Purchase",
      description:
        "We source combed cotton yarns, organic cotton, CVC blends, and heavy fleece directly from premier mills in Tamil Nadu. All fabrics undergo rigorous inspection for GSM uniformity, shrinkage control, and color fastness.",
      capabilities: [
        "Single Jersey (160 - 240 GSM)",
        "Pique Matty & Honeycomb Knit (200 - 260 GSM)",
        "French Terry & Loopknit (240 - 320 GSM)",
        "Brushed Fleece (300 - 400 GSM)",
        "Cotton Spandex (95:5) 4-Way Stretch",
        "Rib Collar & Cuffs (1x1 & 2x2 Spandex Rib)",
      ],
    },
    {
      step: "02",
      icon: <FaAward className="text-amber-400 text-xl" />,
      title: "Dyeing, Bio-Washing & Finishing",
      subtitle: "Eco-Friendly Softness & Color Retention",
      description:
        "Our fabrics receive specialized treatments to eliminate surface fuzz and guarantee supreme handfeel. We employ eco-friendly, zero-discharge azo-free reactive dyes that keep colors vibrant for 50+ washes.",
      capabilities: [
        "Enzyme Bio-Polishing for Peach Touch",
        "Silicon Softener Wash for Luxury Drape",
        "Reactive Dyeing (Grade 4+ Color Fastness)",
        "Zero-Shrinkage Heat Stentering & Compacting",
        "Custom Pantone Shade Matching",
      ],
    },
    {
      step: "03",
      icon: <FaCut className="text-amber-400 text-xl" />,
      title: "Pattern Engineering & Precision Cutting",
      subtitle: "CAD Grading & Lay Planning",
      description:
        "Modern apparel patterns demand immaculate proportions. We produce tailored fits, boxy streetwear drop-shoulders, and relaxed silhouettes using automated CAD grading and high-precision cutting tables.",
      capabilities: [
        "Streetwear Drop Shoulder Patterns",
        "Classic Slim & Regular Fit Gradings",
        "Athleisure Crotch Gusset & Tapered Pants",
        "Minimised Fabric Wastage Lay Planning",
        "Pre-Production Fit Sample Approval",
      ],
    },
    {
      step: "04",
      icon: <FaIndustry className="text-amber-400 text-xl" />,
      title: "Industrial Stitching & Garment Assembly",
      subtitle: "Juki Multi-Needle Production Lines",
      description:
        "Our skilled operators utilize specialized industrial machines to execute clean seam lines, reinforced bartacks, neck taping, and flatlock durability on every individual garment.",
      capabilities: [
        "4-Thread & 5-Thread Overlock Seaming",
        "Flatlock Anti-Chafing Activewear Stitching",
        "Kansai Multi-Needle Waistband Insertion",
        "Reinforced Shoulder-to-Shoulder Neck Taping",
        "Double-Needle Sleeve & Bottom Hems",
      ],
    },
    {
      step: "05",
      icon: <FaPrint className="text-amber-400 text-xl" />,
      title: "Printing & Computerized Embroidery",
      subtitle: "High-Definition Graphics & Branding",
      description:
        "Bring your creative visions to life with our comprehensive printing unit. We support both high-volume screen printing and intricate multi-color DTF prints, as well as 3D puff and embroidery.",
      capabilities: [
        "Direct-to-Film (DTF) Multi-Color Precision",
        "High-Density 3D Puff Screen Printing",
        "Water-Based Non-Toxic & Plastisol Printing",
        "Computerized Tajima Multi-Head Embroidery",
        "Reflective & Sublimation Prints",
      ],
    },
    {
      step: "06",
      icon: <FaTags className="text-amber-400 text-xl" />,
      title: "Private Labeling & Export Packaging",
      subtitle: "Ready for Retail Shelves & E-Commerce",
      description:
        "Deliver a complete luxury unboxing experience. We attach custom brand woven neck labels, size tags, care instructions, barcoded hangtags, individual moisture-proof polybags, and master export cartons.",
      capabilities: [
        "Custom Woven Damask & Satin Labels",
        "Heat-Transfer Tagless Inside Neck Labels",
        "Barcoded SKU Hangtags & String Fasteners",
        "Individual Self-Sealing Polybags",
        "Heavy Duty Corrugated Master Cartons",
      ],
    },
  ];

  return (
    <div className="space-y-16 py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wider uppercase">
          <span>Complete Textile Solutions</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-black text-white">
          Our Garment Manufacturing Services
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          From fabric procurement and custom bio-washing to high-speed sewing, printing, and private labeling, Hayati Garments delivers turnkey manufacturing for clothing brands across India and abroad.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {servicesList.map((service) => (
          <div
            key={service.step}
            className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between space-y-4 hover:shadow-xl hover:shadow-amber-500/5 group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center group-hover:border-amber-500/40 transition-colors">
                  {service.icon}
                </div>
                <span className="text-2xl font-black text-slate-700 group-hover:text-amber-500/40 transition-colors font-serif">
                  {service.step}
                </span>
              </div>

              <div>
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                  {service.subtitle}
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">{service.title}</h3>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                {service.description}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800/80">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                Core Capabilities:
              </span>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {service.capabilities.map((cap, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <FaCheckCircle className="text-amber-400 text-[10px] shrink-0" />
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Sample & Production Quote Request Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-10 lg:p-12">
        <div className="lg:col-span-6 space-y-4">
          <span className="text-xs font-bold text-amber-400 tracking-widest uppercase">
            Start Your Production
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-black text-white">
            Request a Custom Sample or Manufacturing Quotation
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Fill out your basic garment requirements below. We will immediately analyze your fabric specs and connect with you on WhatsApp with transparent factory costing, lead times, and pre-production sample timelines.
          </p>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs text-slate-400">
            <div className="flex items-center gap-2 text-white font-semibold">
              <FaTools className="text-amber-400" />
              <span>Direct Factory Support:</span>
            </div>
            <p>
              Factory location: <strong>11/4 Sengunthapuram, Karuvampalayam, Tirupur - 641604</strong>.
              You can also schedule an in-person factory visit to inspect fabric swatches and live sewing lines.
            </p>
          </div>
        </div>

        <div className="lg:col-span-6">
          <form
            onSubmit={handleInquiry}
            className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4"
          >
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">
              Quick Production Inquiry
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Anand Sharma"
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Brand / Company Name</label>
                <input
                  type="text"
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  placeholder="e.g. Apex Clothing Co."
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">WhatsApp Phone *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="e.g. 9876543210"
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Garment Style</label>
                <select
                  value={formData.garmentType}
                  onChange={(e) => setFormData({ ...formData, garmentType: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="Round Neck Half Sleeve">Round Neck Half Sleeve</option>
                  <option value="Round Neck Full Sleeve">Round Neck Full Sleeve</option>
                  <option value="Polo T-Shirt Half Sleeve">Polo T-Shirt Half Sleeve</option>
                  <option value="Polo T-Shirt Full Sleeve">Polo T-Shirt Full Sleeve</option>
                  <option value="Oversize Half Sleeve">Oversize Half Sleeve (Streetwear)</option>
                  <option value="Hoodie with Zipper">Hoodie with Zipper</option>
                  <option value="Hoodie without Zipper">Hoodie without Zipper</option>
                  <option value="Sweatshirt">Crewneck Sweatshirt</option>
                  <option value="Track Pant">Track Pant / Joggers</option>
                  <option value="Kids Pants">Kids Pants</option>
                  <option value="Trunks">Men's Trunks (Innerwear)</option>
                  <option value="Shorts">Casual & French Terry Shorts</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] text-slate-400 mb-1">
                Target Quantity (pcs) & Fabric Requirements
              </label>
              <textarea
                rows="2"
                value={formData.fabricRequirements}
                onChange={(e) => setFormData({ ...formData, fabricRequirements: e.target.value })}
                placeholder="e.g. Need 200 pcs of 240 GSM Oversized Tees in Black and Off-White with chest DTF print."
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <FaWhatsapp className="text-lg" />
              <span>Send Manufacturing Inquiry to WhatsApp (9944356661)</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Services;
