import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  FaChartLine,
  FaBox,
  FaBarcode,
  FaClipboardList,
  FaUsers,
  FaCog,
  FaSignOutAlt,
  FaChevronLeft,
  FaChevronRight,
  FaUser,
  FaBars,
  FaTimes,
  FaMapSigns,
  FaLayerGroup,
  FaMapMarkerAlt,
  FaCube,
  FaWarehouse,
  FaFileAlt,
  FaHome,
  FaMap,
  FaTags,
} from "react-icons/fa";
import logoImg from "../../assets/hayati-logo.png";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Check for mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const menuItems = [
    {
      path: "/admin/dashboard/",
      name: "Dashboard",
      icon: <FaChartLine />,
      badge: null,
    },
    {
      path: "/admin/employees",
      name: "Employee",
      icon: <FaMapSigns />,
      badge: null,
    },
    {
      path: "/admin/customer",
      name: "Customers ",
      icon: <FaLayerGroup />,
      badge: null,
    },
    {
      path: "/admin/order",
      name: "Order ",
      icon: <FaMapMarkerAlt />,
      badge: null,
    },
    {
      path: "/admin/salary",
      name: "Salary ",
      icon: <FaWarehouse />,
      badge: null,
    },
    {
      path: "/admin/bill",
      name: "Bill",
      icon: <FaWarehouse />,
      badge: null,
    },
    {
      path: "/admin/invoice",
      name: "Invoice",
      icon: <FaFileAlt />,
      badge: null,
    },
    {
      path: "/admin/balancesheet",
      name: "Balancesheet",
      icon: <FaFileAlt />,
      badge: null,
    },
  ];

  const toggleSidebar = () => {
    if (isMobile) {
      setIsMobileOpen(!isMobileOpen);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  // Close sidebar on mobile when clicking a link
  const handleNavClick = () => {
    if (isMobile) {
      setIsMobileOpen(false);
    }
  };

  return (
    <>
      {/* Shared brand fonts + motifs (kept consistent with the login screen) */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Work+Sans:wght@400;500;600&family=Space+Mono:wght@400;700&display=swap');
          .sb-font-display { font-family: 'Fraunces', serif; font-optical-sizing: auto; }
          .sb-font-body { font-family: 'Work Sans', sans-serif; }
          .sb-font-tag { font-family: 'Space Mono', monospace; letter-spacing: 0.08em; }
          .sb-weave {
            background-image:
              repeating-linear-gradient(45deg, rgba(184,145,47,0.05) 0px, rgba(184,145,47,0.05) 1px, transparent 1px, transparent 14px),
              repeating-linear-gradient(-45deg, rgba(184,145,47,0.05) 0px, rgba(184,145,47,0.05) 1px, transparent 1px, transparent 14px);
          }
          @keyframes sb-stitch {
            0% { stroke-dashoffset: 0; }
            100% { stroke-dashoffset: -20; }
          }
          .sb-stitch-line { stroke-dasharray: 5 5; animation: sb-stitch 3s linear infinite; }
        `}
      </style>

      {/* Mobile Toggle Button */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2.5 bg-[#A61B29] text-[#F1E9DC] rounded-md shadow-lg md:hidden"
        >
          {isMobileOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
        </button>
      )}

      {/* Overlay for mobile */}
      {isMobile && isMobileOpen && (
        <div
          className="fixed inset-0 bg-[#161211]/60 z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`sb-weave bg-[#1F1B1A] shadow-2xl transition-all duration-300 h-screen fixed md:relative z-40 border-r border-[#3a322f] ${
          isMobile
            ? `fixed top-0 left-0 transform ${
                isMobileOpen ? "translate-x-0" : "-translate-x-full"
              } transition-transform duration-300 w-64`
            : isCollapsed
            ? "w-20"
            : "w-64"
        }`}
      >
        {/* Collapse Toggle Button - Desktop only, styled as a tag punch-hole */}
        {!isMobile && (
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="absolute -right-3 top-8 bg-[#A61B29] text-[#F1E9DC] w-6 h-6 rounded-full shadow-lg hover:bg-[#8a1620] transition-colors z-10 flex items-center justify-center border-2 border-[#1F1B1A]"
          >
            {isCollapsed ? (
              <FaChevronRight size={10} />
            ) : (
              <FaChevronLeft size={10} />
            )}
          </button>
        )}

        {/* Logo Section */}
        <div className="px-5 pt-16 md:pt-8 md:px-6 md:pb-6 border-b border-[#3a322f]/80 relative">
          <div className="flex items-center space-x-3">
            <div className="relative w-10 h-10 shrink-0 rounded-full bg-[#A61B29] flex items-center justify-center overflow-hidden">
              <img
                src={logoImg}
                alt="Hayati Garments logo"
                className="w-full h-full object-cover"
              />
            </div>
            {(!isCollapsed || isMobile) && (
              <div className="min-w-0">
                <h1 className="sb-font-display text-lg text-white leading-tight truncate">
                  Hayati Garments
                </h1>
                <p className="sb-font-tag text-[9px] text-[#B8912F] uppercase tracking-wider">
                  Admin Panel
                </p>
              </div>
            )}
          </div>
         
        </div>

        {/* Navigation Menu */}
        <nav className="my-3 px-3 h-[calc(100vh-220px)] overflow-y-auto space-y-1">
          {(!isCollapsed || isMobile) && (
            <p className="sb-font-tag text-[9px] text-[#6b5f58] uppercase tracking-wider px-3 pb-2">
              
            </p>
          )}
          {menuItems.map((item, index) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={handleNavClick}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-3 rounded-sm transition-all duration-200 group relative border-l-2 ${
                  isActive
                    ? "bg-[#2A2422] text-[#F1E9DC] border-[#A61B29] sb-font-body font-medium"
                    : "text-[#a89a91] border-transparent hover:bg-[#2A2422]/60 hover:text-[#F1E9DC] hover:border-[#B8912F]/50 sb-font-body"
                } ${isCollapsed && !isMobile ? "justify-center px-0" : ""}`
              }
            >
              <div className="flex items-center">
                <span
                  className={`text-lg ${
                    isCollapsed && !isMobile ? "" : "mr-3"
                  }`}
                >
                  {item.icon}
                </span>
                {(!isCollapsed || isMobile) && (
                  <span className="text-base font-semibold tracking-wide">{item.name}</span>
                )}
              </div>

              {/* Badge */}
              {item.badge && (!isCollapsed || isMobile) && (
                <span
                  className={`sb-font-tag text-[9px] text-[#F1E9DC] px-1.5 py-0.5 rounded-sm ${
                    item.badgeColor || "bg-[#A61B29]"
                  }`}
                >
                  {item.badge}
                </span>
              )}

              {/* Tooltip for collapsed state (desktop only) */}
              {isCollapsed && !isMobile && (
                <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-[#F1E9DC] text-[#221D1B] sb-font-tag text-[10px] uppercase rounded-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-20 shadow-lg">
                  {item.name}
                  {item.badge && (
                    <span className="ml-1 bg-[#A61B29] text-[#F1E9DC] px-1 py-0.5 rounded-sm text-[9px]">
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="absolute bottom-0 w-full p-4 border-t border-[#3a322f]/80">
          {!isCollapsed || isMobile ? (
            <div className="space-y-2">
              <NavLink
                to="/login"
                onClick={() => {
                  if (isMobile) setIsMobileOpen(false);
                }}
              >
                <button className="w-full sb-font-tag text-[11px] uppercase tracking-wider flex items-center px-4 py-2.5 text-[#a89a91] hover:bg-[#2A2422] hover:text-[#A61B29] rounded-sm transition-colors border border-[#3a322f]">
                  <FaSignOutAlt className="mr-3" size={12} />
                  <span>Logout</span>
                </button>
              </NavLink>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-2">
              <button className="p-2 text-[#a89a91] hover:bg-[#2A2422] hover:text-[#A61B29] rounded-sm transition-colors relative group">
                <FaSignOutAlt size={14} />
                <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-[#F1E9DC] text-[#221D1B] sb-font-tag text-[10px] uppercase rounded-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-20">
                  Logout
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;