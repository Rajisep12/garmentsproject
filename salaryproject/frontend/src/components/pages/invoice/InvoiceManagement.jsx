import React, { useState, useEffect, useRef } from "react";
import { BASE_URL } from "../../../../config";
import axios from "axios";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaSearch,
  FaStore,
  FaCheckCircle,
  FaTools,
  FaTimes,
  FaSave,
  FaBarcode,
  FaDownload,
  FaExclamationTriangle,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { toast } from "react-toastify";
import html2pdf from "html2pdf.js";
import { generateInvoiceHTML } from "../../../utils/invoiceTemplate";
// import "./Invoice.css";


const InvoiceManagement = ({ data }) => {
  const [bills, setBill] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;
  const [isLoading, setIsLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [loadingId, setLoadingId] = useState(null);
  const [paginationInfo, setPaginationInfo] = useState({
    count: 0,
    next: null,
    previous: null,
  });

  const invoiceRef = useRef();
  const [loading, setLoading] = useState(false);

  const handleGeneratePDF = async (billId) => {
    setLoadingId(billId);
    try {
      const response = await axios.get(
        `${BASE_URL}/admin/generate-invoice/${billId}/`,
        {
          responseType: 'blob',  // ← this was missing
        }
      );
      console.log("data");
      //console.log(response.data);
      //alert(response.data); // "PDF Generated and Saved!" from Django
      // Read response as binary blob — NOT as text
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement('a');
      a.href = url;
      a.download = `invoice_${billId}_copies.zip`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      alert("Zip File Downloaded")
    } catch (error) {
      console.error(error);
      alert("Failed to generate PDF");
    } finally {
      setLoadingId(null);
    }
  };


  // Helper to get CSRF token from cookie
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  useEffect(() => {
    fetchBills(currentPage);
  }, [currentPage]);



  // Fetch tax
  const fetchBills = async (page = 1) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${BASE_URL}/admin/bill/?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminAccessToken")}`,
          },
        }
      );
      setBill(response.data.results || []);
      setPaginationInfo({
        count: response.data.count || 0,
        next: response.data.next,
        previous: response.data.previous,
      });
      setTotalPages(Math.ceil(response.data.count / itemsPerPage));
      setCurrentPage(page);
    } catch (err) {
      console.log(err);
      setError("Error fetching Bill.");
      toast.error("Failed to load Bill. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle page change
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Handle first page
  const handleFirstPage = () => {
    handlePageChange(1);
  };

  // Handle last page
  const handleLastPage = () => {
    handlePageChange(totalPages);
  };

  // Handle previous page
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  // Handle next page
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, currentPage + 2);

      if (currentPage <= 3) {
        endPage = maxVisiblePages;
      } else if (currentPage >= totalPages - 2) {
        startPage = totalPages - maxVisiblePages + 1;
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
    }

    return pageNumbers;
  };


  const filteredTaxs = bills.filter((bill) => {
    const matchesSearch =
      bill.invoice_no.toLowerCase()
    return matchesSearch;
  });

  return (
    <div className="space-y-4 md:space-y-6 p-3 md:p-4 lg:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 md:p-3 bg-red-50 rounded-lg md:rounded-xl border border-red-100">
              <FaStore className="text-xl md:text-2xl text-red-600" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">
                Invoice Management
              </h1>
              <p className="text-gray-600 text-xs md:text-sm">
                Manage Tax details
              </p>
            </div>
          </div>
          {/* <div className=" flex gap-3">
                        <div className="relative">
                            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search Invoice"
                                
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all hover:border-red-300 text-sm md:text-base"
                            />
                        </div>
                    </div> */}
        </div>
      </div>

      {/* Tax Table */}
      <div className="bg-white rounded-lg md:rounded-xl shadow-sm border border-red-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead className="bg-red-50">
              <tr>
                <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b border-red-100">
                  Invoice ID
                </th>
                <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b border-red-100">
                  Invoice No
                </th>
                <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b border-red-100">
                  Company
                </th>
                <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b border-red-100">
                  Total
                </th>
                <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b border-red-100">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-red-50">
              {isLoading ? (
                <tr>
                  <td colSpan="4" className="px-4 md:px-6 py-8 text-center">
                    <div className="flex justify-center">
                      <svg
                        className="animate-spin h-8 w-8 text-red-600"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    </div>
                    <p className="mt-2 text-gray-600">Loading bill...</p>
                  </td>
                </tr>
              ) : bills.length > 0 ? (
                bills.map((bill) => (
                  <tr
                    key={bill.id}
                    className="hover:bg-red-50/50 transition-colors"
                  >
                    <td className="px-4 md:px-6 py-3 md:py-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-red-100 rounded-lg flex items-center justify-center mr-2 md:mr-3 border border-red-200">
                          <span className="font-bold text-red-700 text-xs md:text-sm">
                            #{bill.id}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 md:px-6 py-3 md:py-4">
                      <div>
                        <p className="text-sm font-bold text-gray-900 truncate max-w-[150px] md:max-w-none">
                          {bill.invoice_no}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 md:px-6 py-3 md:py-4">
                      <div className="flex items-center">
                        <p className="text-xs md:text-sm font-mono font-bold text-gray-900 truncate max-w-[100px] md:max-w-[150px] lg:max-w-none">
                          {bill.customer || "No CGST Assigned"}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 md:px-6 py-3 md:py-4">
                      <div className="flex items-center">
                        <p className="text-xs md:text-sm font-mono font-bold text-gray-900 truncate max-w-[100px] md:max-w-[150px] lg:max-w-none">
                          {bill.total_gst || "No SGST Assigned"}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 md:px-6 py-3 md:py-4">
                      <div className="flex space-x-2 md:space-x-3">
                        <button
                          className="flex items-center gap-2"
                          onClick={() => handleGeneratePDF(bill.id)}
                          disabled={loadingId === bill.id}
                        >
                          {loadingId === bill.id ? (
                            <>
                              <span className="animate-spin border-2 border-gray-300 border-t-black rounded-full w-4 h-4"></span>
                              Generating...
                            </>
                          ) : (
                            <>
                              <FaDownload className="text-sm md:text-lg" />
                              Download
                            </>
                          )}
                        </button>
                      </div>

                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-4 md:px-6 py-8 text-center">
                    <FaStore className="text-3xl md:text-4xl text-red-200 mx-auto mb-3 md:mb-4" />
                    <p className="text-gray-500 text-sm md:text-base">
                      No Bill found
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {paginationInfo.count > 0 && (
          <div className="flex flex-col md:flex-row items-center justify-between px-4 md:px-6 py-3 md:py-4 border-t border-red-100 bg-red-50/50">
            <div className="text-sm text-gray-700 mb-3 md:mb-0">
              Showing{" "}
              <span className="font-semibold">
                {(currentPage - 1) * itemsPerPage + 1}-
                {Math.min(currentPage * itemsPerPage, paginationInfo.count)}
              </span>{" "}
              of <span className="font-semibold">{paginationInfo.count}</span>{" "}
              taxs
            </div>

            <div className="flex items-center space-x-1">
              {/* First Page Button */}
              <button
                onClick={handleFirstPage}
                disabled={currentPage === 1 || isLoading}
                className="p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-white hover:border-red-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="First Page"
              >
                <MdOutlineKeyboardDoubleArrowLeft className="text-xs" />
              </button>

              {/* Previous Button */}
              <button
                onClick={handlePreviousPage}
                disabled={!paginationInfo.previous || isLoading}
                className="p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-white hover:border-red-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Previous Page"
              >
                <FaChevronLeft className="text-xs" />
              </button>

              {/* Page Numbers */}
              {getPageNumbers().map((pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  disabled={isLoading}
                  className={`min-w-[2rem] px-2 py-1 md:min-w-[2.5rem] md:px-3 md:py-2 rounded-lg border text-sm font-medium transition-colors ${currentPage === pageNumber
                    ? "bg-red-600 text-white border-red-700"
                    : "border-gray-300 text-gray-700 hover:bg-red-50 hover:border-red-300"
                    } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {pageNumber}
                </button>
              ))}

              {/* Next Button */}
              <button
                onClick={handleNextPage}
                disabled={!paginationInfo.next || isLoading}
                className="p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-white hover:border-red-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Next Page"
              >
                <FaChevronRight className="text-xs" />
              </button>

              {/* Last Page Button */}
              <button
                onClick={handleLastPage}
                disabled={currentPage === totalPages || isLoading}
                className="p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-white hover:border-red-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Last Page"
              >
                <MdOutlineKeyboardDoubleArrowRight className="text-xs" />
              </button>
            </div>

            {/* Page Info */}
            <div className="text-sm text-gray-600 mt-3 md:mt-0">
              Page <span className="font-semibold">{currentPage}</span> of{" "}
              <span className="font-semibold">{totalPages}</span>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default InvoiceManagement;
