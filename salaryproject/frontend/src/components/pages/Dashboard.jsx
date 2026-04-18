import React, { useState, useEffect } from "react";
import {
  FaBox,
  FaStore,
  FaExclamationTriangle,
  FaUsers,
  FaPlus,
  FaBarcode,
  FaClipboardCheck,
  FaUserCog,
  FaChartLine,
  FaShoppingCart,
  FaCalendarAlt,
  FaArrowUp,
  FaArrowDown,
  FaCube,
  FaMapMarkerAlt,
  FaWarehouse,
  FaUserTie,
  FaArrowRight,
  FaMapPin,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { BASE_URL } from "../../../config";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import html2pdf from "html2pdf.js";


const Dashboard = () => {
  const [timeRange, setTimeRange] = useState("today");
  const [inventories, setInventories] = useState([]);
  const [stats, setStats] = useState({
    totalStaff: 0,
    totalProducts: 0,
    totalLocations: 0,
    totalEmptyLocations: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [emptydata, setEmptydata] = useState([]);
  const [filteredEmptyData, setFilteredEmptyData] = useState([]);
  const [paginationInfo, setPaginationInfo] = useState({
    count: 0,
    next: null,
    previous: null,
  });
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [showAllEmptyLocations, setShowAllEmptyLocations] = useState(false);


  useEffect(() => {
    //fetchStats();
    //fetchInventory();
  }, []);



  return (
    <div className="space-y-6 p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl shadow-lg">
            <FaChartLine className="text-2xl text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Dashboard Overview
            </h1>
            <p className="text-gray-600 text-sm">
              Real-time insights into your store operations
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid - Improved Design */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <FaCube className="text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-600">
                  Colleges
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900 mt-3">
                {stats.totalProducts.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-green-50 rounded-lg">
                  <FaWarehouse className="text-green-600" />
                </div>
                <span className="text-sm font-medium text-gray-600">
                  Orders
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900 mt-3">
                {stats.totalLocations.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-amber-50 rounded-lg">
                  <FaMapMarkerAlt className="text-amber-600" />
                </div>
                <span className="text-sm font-medium text-gray-600">
                  Customers
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900 mt-3">
                {stats.totalEmptyLocations.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-purple-50 rounded-lg">
                  <FaUserTie className="text-purple-600" />
                </div>
                <span className="text-sm font-medium text-gray-600">Staff</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 mt-3">
                {stats.totalStaff.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
