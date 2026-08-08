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
  const [searchQuery, setSearchQuery] = useState("");
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
    const matchesSearch = bill.invoice_no
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="space-y-4 md:space-y-6 p-3 md:p-4 lg:p-6 bg-[#F1E9DC] min-h-screen">
      {/* Fonts + motifs, consistent with the login / sidebar screens */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Work+Sans:wght@400;500;600&family=Space+Mono:wght@400;700&display=swap');
          .inv-font-display { font-family: 'Fraunces', serif; font-optical-sizing: auto; }
          .inv-font-body { font-family: 'Work Sans', sans-serif; }
          .inv-font-tag { font-family: 'Space Mono', monospace; letter-spacing: 0.06em; }
          @keyframes inv-stitch { 0% { stroke-dashoffset: 0; } 100% { stroke-dashoffset: -20; } }
          .inv-stitch-line { stroke-dasharray: 5 5; animation: inv-stitch 3s linear infinite; }
        `}
      </style>

      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 md:p-3 bg-[#A61B29] rounded-sm border border-[#221D1B]/10 shadow-sm">
              <FaStore className="text-xl md:text-2xl text-[#F1E9DC]" />
            </div>
            <div>
              <p className="inv-font-tag text-[10px] text-[#A61B29] uppercase tracking-wider mb-0.5">
                Billing Manifest
              </p>
              <h1 className="inv-font-display text-xl md:text-2xl lg:text-3xl text-[#221D1B] leading-tight">
                Invoice Management
              </h1>
            </div>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-72">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#221D1B]/40 text-sm" />
              <input
                type="text"
                placeholder="Search invoice no."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#FBF6EC] border-0 border-b-2 border-[#221D1B]/20 focus:border-[#A61B29] outline-none transition-all inv-font-body text-sm text-[#221D1B]"
              />
            </div>
          </div>
        </div>
        <svg width="100%" height="2" viewBox="0 0 400 2" className="opacity-70">
          <line x1="0" y1="1" x2="400" y2="1" stroke="#B8912F" strokeWidth="1" className="inv-stitch-line" />
        </svg>
      </div>

      {/* Invoice Ledger */}
      <div className="bg-[#FBF6EC] rounded-sm shadow-[0_10px_30px_-15px_rgba(34,29,27,0.3)] border border-[#221D1B]/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead className="bg-gradient-to-r from-[#A61B29] to-[#8a1620]">
              <tr>
                <th className="px-4 md:px-6 py-3 md:py-4 text-left inv-font-tag text-[10px] text-[#F1E9DC]/90 uppercase tracking-wider">
                  Invoice ID
                </th>
                <th className="px-4 md:px-6 py-3 md:py-4 text-left inv-font-tag text-[10px] text-[#F1E9DC]/90 uppercase tracking-wider">
                  Invoice No
                </th>
                <th className="px-4 md:px-6 py-3 md:py-4 text-left inv-font-tag text-[10px] text-[#F1E9DC]/90 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-4 md:px-6 py-3 md:py-4 text-left inv-font-tag text-[10px] text-[#F1E9DC]/90 uppercase tracking-wider">
                  Total GST
                </th>
                <th className="px-4 md:px-6 py-3 md:py-4 text-left inv-font-tag text-[10px] text-[#F1E9DC]/90 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dashed divide-[#221D1B]/10">
              {isLoading ? (
                <tr>
                  <td colSpan="5" className="px-4 md:px-6 py-10 text-center">
                    <div className="flex justify-center">
                      <svg
                        className="animate-spin h-8 w-8 text-[#A61B29]"
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
                    <p className="mt-3 inv-font-tag text-[11px] text-[#221D1B]/50 uppercase">
                      Loading invoices…
                    </p>
                  </td>
                </tr>
              ) : filteredTaxs.length > 0 ? (
                filteredTaxs.map((bill) => (
                  <tr
                    key={bill.id}
                    className="hover:bg-[#A61B29]/5 transition-colors"
                  >
                    <td className="px-4 md:px-6 py-3 md:py-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-[#FBF6EC] rounded-full flex items-center justify-center mr-2 md:mr-3 border-2 border-[#A61B29]">
                          <span className="inv-font-tag font-bold text-[#A61B29] text-[10px] md:text-xs">
                            {bill.id}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 md:px-6 py-3 md:py-4">
                      <p className="inv-font-body text-sm font-semibold text-[#221D1B] truncate max-w-[150px] md:max-w-none">
                        {bill.invoice_no}
                      </p>
                    </td>
                    <td className="px-4 md:px-6 py-3 md:py-4">
                      <p className="inv-font-tag text-xs md:text-sm text-[#221D1B]/80 truncate max-w-[100px] md:max-w-[150px] lg:max-w-none">
                        {bill.customer || "No CGST Assigned"}
                      </p>
                    </td>
                    <td className="px-4 md:px-6 py-3 md:py-4">
                      <p className="inv-font-tag text-xs md:text-sm text-[#221D1B]/80 truncate max-w-[100px] md:max-w-[150px] lg:max-w-none">
                        {bill.total_gst || "No SGST Assigned"}
                      </p>
                    </td>
                    <td className="px-4 md:px-6 py-3 md:py-4">
                      <button
                        className="flex items-center gap-2 inv-font-tag text-[11px] uppercase px-3 py-2 rounded-sm border border-[#A61B29]/30 text-[#A61B29] hover:bg-[#A61B29] hover:text-[#F1E9DC] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => handleGeneratePDF(bill.id)}
                        disabled={loadingId === bill.id}
                      >
                        {loadingId === bill.id ? (
                          <>
                            <span className="animate-spin border-2 border-current border-t-transparent rounded-full w-3.5 h-3.5"></span>
                            Generating
                          </>
                        ) : (
                          <>
                            <FaDownload className="text-xs md:text-sm" />
                            Download
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-4 md:px-6 py-10 text-center">
                    <FaStore className="text-3xl md:text-4xl text-[#221D1B]/15 mx-auto mb-3 md:mb-4" />
                    <p className="inv-font-tag text-xs md:text-sm text-[#221D1B]/50 uppercase">
                      No bill found
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {paginationInfo.count > 0 && (
          <div className="flex flex-col md:flex-row items-center justify-between px-4 md:px-6 py-3 md:py-4 border-t border-dashed border-[#221D1B]/15 bg-[#221D1B]/[0.03]">
            <div className="inv-font-tag text-[11px] text-[#221D1B]/60 mb-3 md:mb-0 uppercase">
              Showing{" "}
              <span className="font-bold text-[#221D1B]">
                {(currentPage - 1) * itemsPerPage + 1}-
                {Math.min(currentPage * itemsPerPage, paginationInfo.count)}
              </span>{" "}
              of <span className="font-bold text-[#221D1B]">{paginationInfo.count}</span>{" "}
              invoices
            </div>

            <div className="flex items-center space-x-1">
              {/* First Page Button */}
              <button
                onClick={handleFirstPage}
                disabled={currentPage === 1 || isLoading}
                className="p-2 rounded-sm border border-[#221D1B]/15 text-[#221D1B]/60 hover:border-[#A61B29] hover:text-[#A61B29] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                title="First Page"
              >
                <MdOutlineKeyboardDoubleArrowLeft className="text-xs" />
              </button>

              {/* Previous Button */}
              <button
                onClick={handlePreviousPage}
                disabled={!paginationInfo.previous || isLoading}
                className="p-2 rounded-sm border border-[#221D1B]/15 text-[#221D1B]/60 hover:border-[#A61B29] hover:text-[#A61B29] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
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
                  className={`min-w-[2rem] px-2 py-1 md:min-w-[2.5rem] md:px-3 md:py-2 rounded-sm border inv-font-tag text-xs transition-colors ${currentPage === pageNumber
                    ? "bg-[#A61B29] text-[#F1E9DC] border-[#A61B29]"
                    : "border-[#221D1B]/15 text-[#221D1B]/70 hover:border-[#A61B29] hover:text-[#A61B29]"
                    } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {pageNumber}
                </button>
              ))}

              {/* Next Button */}
              <button
                onClick={handleNextPage}
                disabled={!paginationInfo.next || isLoading}
                className="p-2 rounded-sm border border-[#221D1B]/15 text-[#221D1B]/60 hover:border-[#A61B29] hover:text-[#A61B29] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                title="Next Page"
              >
                <FaChevronRight className="text-xs" />
              </button>

              {/* Last Page Button */}
              <button
                onClick={handleLastPage}
                disabled={currentPage === totalPages || isLoading}
                className="p-2 rounded-sm border border-[#221D1B]/15 text-[#221D1B]/60 hover:border-[#A61B29] hover:text-[#A61B29] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                title="Last Page"
              >
                <MdOutlineKeyboardDoubleArrowRight className="text-xs" />
              </button>
            </div>

            {/* Page Info */}
            <div className="inv-font-tag text-[11px] text-[#221D1B]/60 mt-3 md:mt-0 uppercase">
              Page <span className="font-bold text-[#221D1B]">{currentPage}</span> of{" "}
              <span className="font-bold text-[#221D1B]">{totalPages}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvoiceManagement;