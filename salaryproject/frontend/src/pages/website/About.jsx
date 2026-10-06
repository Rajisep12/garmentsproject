import React from "react";
import { Link } from "react-router-dom";
import {
  FaIndustry,
  FaAward,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaCheckCircle,
  FaUsers,
  FaShieldAlt,
  FaLeaf,
  FaTshirt,
} from "react-icons/fa";
import { COMPANY_DETAILS } from "../../data/productsData";
import factoryHero from "../../assets/website/factory_hero.jpg";
import logoImg from "../../assets/hayati-logo.png";

const About = () => {
  return (
    <div className="space-y-16 py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wider uppercase">
          <span>Our Tirupur Heritage</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-black text-white">
          About Hayati Garments
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Founded in the world-renowned knitwear capital of Tirupur, Hayati Garments (Fashion Impex) is a premier textile manufacturing partner producing high-grade casual wear, activewear, and streetwear for brands across the globe.
        </p>
      </div>

      {/* Story & Factory Visual */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6 space-y-5">
          <span className="text-xs font-bold text-amber-400 tracking-widest uppercase">
            Direct-From-Factory Advantage
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-tight">
            We Don't Just Stitch — We Build Garments from Yarn to Finish.
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Unlike trading intermediaries, <strong>HAYATI GARMENTS</strong> is a true manufacturer. We directly procure spun yarns and knitted fabrics, ensuring that every batch meets exact specifications for yarn count, GSM weight, loop density, and colorfastness.
          </p>
          <p className="text-sm text-slate-300 leading-relaxed">
            Our manufacturing facility at <strong>11/4 Sengunthapuram, Karuvampalayam, Tirupur</strong> is outfitted with state-of-the-art sewing machinery, precision lay-cutting units, and finishing equipment. Whether you are ordering 50 units for a brand test drop or 10,000 units for nationwide retail distribution, we treat every stitch with export-grade precision.
          </p>

          <div className="pt-2 grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-amber-400 font-black text-2xl">50,000+</span>
              <p className="text-xs text-slate-400 mt-1">Monthly Production Units</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-emerald-400 font-black text-2xl">100%</span>
              <p className="text-xs text-slate-400 mt-1">In-House Quality Control</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="relative rounded-2xl overflow-hidden border border-slate-700 shadow-2xl bg-slate-900">
            <img
              src={factoryHero}
              alt="Hayati Garments Tirupur Workshop"
              className="w-full h-[380px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-750 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-white text-sm">HAYATI GARMENTS (FASHION IMPEX)</h4>
                <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                  <FaMapMarkerAlt className="text-amber-400" />
                  11/4 Sengunthapuram, Karuvampalayam, Tirupur - 641604
                </p>
              </div>
              <a
                href={`https://wa.me/${COMPANY_DETAILS.whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white"
                title="Chat on WhatsApp"
              >
                <FaWhatsapp className="text-lg" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values & Quality Commitments */}
      <div className="space-y-6 pt-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            Our Quality Commitments
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Every garment leaving our factory floor adheres to strict textile standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
              <FaAward className="text-lg" />
            </div>
            <h3 className="font-bold text-white text-base">Pure Combed Yarns</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We exclusively use long-staple combed cotton that eliminates short fibers, preventing pilling and ensuring longevity.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <FaLeaf className="text-lg" />
            </div>
            <h3 className="font-bold text-white text-base">Azo-Free Bio Dyeing</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Certified reactive dyes safe for skin and baby wear, with Grade 4+ washing and light fastness guarantees.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
              <FaShieldAlt className="text-lg" />
            </div>
            <h3 className="font-bold text-white text-base">Pre-Shrunk & Compacting</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Dimensional stability tests ensure zero shrinkage or twisting after customer home washing.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
              <FaUsers className="text-lg" />
            </div>
            <h3 className="font-bold text-white text-base">Ethical Manufacturing</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Fair wages, comfortable ergonomic workstations, and zero child labor in full compliance with Indian factory laws.
            </p>
          </div>
        </div>
      </div>

      {/* Why Tirupur? */}
      <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
            Textile Valley of India
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif font-black text-white">
            The Strategic Power of Tirupur Manufacturing
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Tirupur accounts for over 90% of India's total cotton knitwear exports. Being centrally located in Tirupur provides Hayati Garments with immediate access to Asia's most sophisticated spinning mills, automated knitting units, certified dye houses, and button/accessory specialists. This ecosystem enables us to produce premium garments at unbeatable factory prices and rapid lead times.
          </p>
        </div>

        <div className="pt-4 flex flex-wrap gap-4 items-center">
          <Link
            to="/products"
            className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow-md"
          >
            Explore Garments We Produce
          </Link>
          <a
            href={`https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=Hello%20Hayati%20Garments,%20I%20would%20like%20to%20learn%20more%20about%20your%20factory.`}
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 font-bold text-xs flex items-center gap-2"
          >
            <FaWhatsapp className="text-base" />
            <span>Chat on WhatsApp: {COMPANY_DETAILS.phone}</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
