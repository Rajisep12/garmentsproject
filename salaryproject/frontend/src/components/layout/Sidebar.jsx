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
      path: "/admin/tax",
      name: "Tax",
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
      path: "/admin/inventory/report",
      name: "Report",
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
      {/* Mobile Toggle Button */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2 bg-red-600 text-white rounded-lg shadow-lg md:hidden "
        >
          {isMobileOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      )}

      {/* Overlay for mobile */}
      {isMobile && isMobileOpen && (
        <div
          className="fixed inset-0 bg-white/70 z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`bg-gradient-to-b from-red-50 to-white shadow-lg transition-all duration-300 h-screen fixed md:relative z-40 ${
          isMobile
            ? `fixed top-0 left-0 transform ${
                isMobileOpen ? "translate-x-0" : "-translate-x-full"
              } transition-transform duration-300 w-64`
            : isCollapsed
            ? "w-20"
            : "w-64"
        }`}
      >
        {/* Collapse Toggle Button - Desktop only */}
        {!isMobile && (
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="absolute -right-3 top-6 bg-red-600 text-white p-1.5 rounded-full shadow-lg hover:bg-red-700 transition-colors z-10"
          >
            {isCollapsed ? (
              <FaChevronRight size={14} />
            ) : (
              <FaChevronLeft size={14} />
            )}
          </button>
        )}

        {/* Logo Section */}
        <div className="px-5 pt-16 md:pt-10 md:p-6 border-b border-red-100">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-600 rounded-lg">
              <FaHome className="text-white text-xl" />
            </div>
            {(!isCollapsed || isMobile) && (
              <div>
                <h1 className="text-xl font-bold text-gray-900">Hayati Garments</h1>
                <p className="text-xs text-gray-500">Admin Panel</p>
              </div>
            )}
          </div>
        </div>

        {/* User Profile */}
        {/* {(!isCollapsed || isMobile) && (
          <div className="px-4 py-3 border-b border-red-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center border border-red-200">
                <FaUser className="text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  prathyush Admin
                </p>
              </div>
            </div>
          </div>
        )} */}

        {/* Navigation Menu */}
        <nav className="my-2 p-2 h-[calc(100vh-220px)] overflow-y-auto">
          {menuItems.map((item, index) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={handleNavClick}
              className={({ isActive }) =>
                `flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 group relative ${
                  isActive
                    ? "bg-red-50 text-red-600 font-medium shadow-sm"
                    : "text-gray-600 hover:bg-red-50 hover:text-red-600"
                } ${isCollapsed && !isMobile ? "justify-center" : ""}`
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
                  <span className="text-sm font-medium">{item.name}</span>
                )}
              </div>

              {/* Badge */}
              {item.badge && (!isCollapsed || isMobile) && (
                <span
                  className={`text-xs text-white px-1.5 py-0.5 rounded-full ${
                    item.badgeColor || "bg-red-500"
                  }`}
                >
                  {item.badge}
                </span>
              )}

              {/* Tooltip for collapsed state (desktop only) */}
              {isCollapsed && !isMobile && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-20 shadow-lg">
                  {item.name}
                  {item.badge && (
                    <span className="ml-1 bg-red-500 px-1 py-0.5 rounded text-xs">
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="absolute bottom-0 w-full p-4 border-t border-red-100">
          {!isCollapsed || isMobile ? (
            <div className="space-y-2">
              <NavLink
                to="/login"
                onClick={() => {
                  if (isMobile) setIsMobileOpen(false);
                }}
              >
                <button className="w-full font-semibold flex items-center px-4 py-2 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors">
                  <FaSignOutAlt className="mr-3" />
                  <span className="text-sm">Logout</span>
                </button>
              </NavLink>
              {/* <NavLink
                to="/admin/settings"
                onClick={() => {
                  if (isMobile) setIsMobileOpen(false);
                }}
                className="flex items-center px-4 py-2 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
              >
                <FaCog className="mr-3" />
                <span className="text-sm">Settings</span>
              </NavLink> */}
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-2">
              {/* <button className="p-2 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors relative group">
                <FaCog />
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-20">
                  Settings
                </div>
              </button> */}
              <button className="p-2 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors relative group">
                <FaSignOutAlt />
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-20">
                  Logout
                </div>
              </button>
            </div>
          )}
        </div>

        {/* Active Indicator */}
        {!isCollapsed && !isMobile && (
          <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-500 to-red-600"></div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
