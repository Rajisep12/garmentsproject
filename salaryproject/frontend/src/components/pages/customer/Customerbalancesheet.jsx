import React, { useState, useEffect, useRef } from "react";
import { BASE_URL } from "../../../../config";
import axios from "axios";
import {
  FaSearch,
  FaUserCircle,
  FaChevronDown,
  FaFileInvoiceDollar,
  FaArrowUp,
  FaArrowDown,
  FaWallet,
} from "react-icons/fa";
import { toast } from "react-toastify";

/**
 * ASSUMPTIONS — adjust these to match your real API:
 *
 * 1. Customer list:
 *    GET `${BASE_URL}/admin/customer/`
 *    → { results: [ { id, name }, ... ] }  (or a plain array — handled below)
 *
 * 2. Balance sheet for one customer:
 *    GET `${BASE_URL}/admin/customer/${id}/balance-sheet/`
 *    → {
 *        opening_balance: number,
 *        total_debit: number,
 *        total_credit: number,
 *        closing_balance: number,
 *        transactions: [
 *          { id, date, description, debit, credit, balance }
 *        ]
 *      }
 *
 * If your endpoints or field names differ, update fetchCustomers() and
 * fetchBalanceSheet() below — the rest of the UI just consumes this shape.
 */

const CustomerBalanceSheet = () => {
  const [customers, setCustomers] = useState([]);
  const [isLoadingCustomers, setIsLoadingCustomers] = useState(false);

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [balanceSheet, setBalanceSheet] = useState(null);
  const [isLoadingSheet, setIsLoadingSheet] = useState(false);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [customerSearch, setCustomerSearch] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchCustomers = async () => {
    setIsLoadingCustomers(true);
    try {
      const response = await axios.get(`${BASE_URL}/admin/customer/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminAccessToken")}`,
        },
      });
      const list = Array.isArray(response.data)
        ? response.data
        : response.data.results || [];
      setCustomers(list);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load customers.");
    } finally {
      setIsLoadingCustomers(false);
    }
  };

  const fetchBalanceSheet = async (customer) => {
    setSelectedCustomer(customer);
    setDropdownOpen(false);
    setCustomerSearch("");
    setIsLoadingSheet(true);
    setBalanceSheet(null);
    try {
      const response = await axios.get(
        `${BASE_URL}/admin/customer/${customer.id}/balance-sheet/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminAccessToken")}`,
          },
        }
      );
      setBalanceSheet(response.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load balance sheet for this customer.");
    } finally {
      setIsLoadingSheet(false);
    }
  };

  const filteredCustomers = customers.filter((c) =>
    (c.name || "").toLowerCase().includes(customerSearch.toLowerCase())
  );

  const fmt = (n) =>
    (Number(n) || 0).toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    });

  return (
    <div className="space-y-6 p-3 md:p-4 lg:p-6 bg-[#F1E9DC] min-h-screen">
      {/* Fonts + motifs, consistent with the rest of the admin panel */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Work+Sans:wght@400;500;600&family=Space+Mono:wght@400;700&display=swap');
          .cb-font-display { font-family: 'Fraunces', serif; font-optical-sizing: auto; }
          .cb-font-body { font-family: 'Work Sans', sans-serif; }
          .cb-font-tag { font-family: 'Space Mono', monospace; letter-spacing: 0.06em; }
          @keyframes cb-stitch { 0% { stroke-dashoffset: 0; } 100% { stroke-dashoffset: -20; } }
          .cb-stitch-line { stroke-dasharray: 5 5; animation: cb-stitch 3s linear infinite; }
        `}
      </style>

      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 md:p-3 bg-gradient-to-br from-[#A61B29] to-[#8a1620] rounded-sm shadow-sm">
            <FaFileInvoiceDollar className="text-xl md:text-2xl text-[#F1E9DC]" />
          </div>
          <div>
            <p className="cb-font-tag text-[10px] text-[#A61B29] uppercase tracking-wider mb-0.5">
              Customer Ledger
            </p>
            <h1 className="cb-font-display text-xl md:text-2xl lg:text-3xl text-[#221D1B] leading-tight">
              Balance Sheet
            </h1>
          </div>
        </div>
      </div>

      {/* Customer selector */}
      <div className="bg-[#FBF6EC] rounded-sm shadow-[0_10px_30px_-15px_rgba(34,29,27,0.3)] border border-[#221D1B]/10 p-5 md:p-6">
        <label className="cb-font-tag text-[10px] text-[#221D1B]/50 uppercase tracking-wider block mb-2">
          Select Customer
        </label>
        <div className="relative max-w-md" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setDropdownOpen((o) => !o)}
            className="w-full flex items-center justify-between gap-3 px-4 py-3 bg-white border border-[#221D1B]/15 rounded-sm hover:border-[#A61B29] transition-colors"
          >
            <span className="flex items-center gap-2 min-w-0">
              <FaUserCircle className="text-[#A61B29] shrink-0" />
              <span
                className={`cb-font-body text-sm truncate ${
                  selectedCustomer ? "text-[#221D1B] font-semibold" : "text-[#221D1B]/40"
                }`}
              >
                {selectedCustomer ? selectedCustomer.name : "Choose a customer…"}
              </span>
            </span>
            <FaChevronDown
              className={`text-[#221D1B]/40 text-xs shrink-0 transition-transform ${
                dropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {dropdownOpen && (
            <div className="absolute z-20 mt-2 w-full bg-white border border-[#221D1B]/15 rounded-sm shadow-xl overflow-hidden">
              <div className="p-2 border-b border-[#221D1B]/10 relative">
                <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-[#221D1B]/30 text-xs" />
                <input
                  autoFocus
                  type="text"
                  value={customerSearch}
                  onChange={(e) => setCustomerSearch(e.target.value)}
                  placeholder="Search customer…"
                  className="w-full pl-7 pr-2 py-2 text-sm cb-font-body outline-none bg-transparent"
                />
              </div>
              <div className="max-h-64 overflow-y-auto">
                {isLoadingCustomers ? (
                  <p className="px-4 py-3 cb-font-tag text-xs text-[#221D1B]/40 uppercase">
                    Loading…
                  </p>
                ) : filteredCustomers.length > 0 ? (
                  filteredCustomers.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => fetchBalanceSheet(c)}
                      className={`w-full text-left px-4 py-2.5 text-sm cb-font-body hover:bg-[#A61B29]/5 transition-colors flex items-center justify-between ${
                        selectedCustomer?.id === c.id
                          ? "bg-[#A61B29]/10 text-[#A61B29] font-semibold"
                          : "text-[#221D1B]"
                      }`}
                    >
                      {c.name}
                    </button>
                  ))
                ) : (
                  <p className="px-4 py-3 cb-font-tag text-xs text-[#221D1B]/40 uppercase">
                    No customers found
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Balance sheet */}
      {!selectedCustomer ? (
        <div className="bg-[#FBF6EC] rounded-sm border border-dashed border-[#221D1B]/15 p-12 text-center">
          <FaWallet className="text-4xl text-[#221D1B]/15 mx-auto mb-3" />
          <p className="cb-font-tag text-xs text-[#221D1B]/40 uppercase">
            Select a customer to view their balance sheet
          </p>
        </div>
      ) : isLoadingSheet ? (
        <div className="bg-[#FBF6EC] rounded-sm border border-[#221D1B]/10 p-12 text-center">
          <svg
            className="animate-spin h-8 w-8 text-[#A61B29] mx-auto"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <p className="mt-3 cb-font-tag text-xs text-[#221D1B]/40 uppercase">
            Loading balance sheet…
          </p>
        </div>
      ) : balanceSheet ? (
        <div className="space-y-4">
          {/* Summary swatch cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            <div className="bg-[#FBF6EC] border border-[#221D1B]/10 rounded-sm p-4">
              <p className="cb-font-tag text-[9px] text-[#221D1B]/50 uppercase mb-1">
                Opening Balance
              </p>
              <p className="cb-font-display text-lg text-[#221D1B]">
                {fmt(balanceSheet.opening_balance)}
              </p>
            </div>
            <div className="bg-[#FBF6EC] border border-[#221D1B]/10 rounded-sm p-4">
              <p className="cb-font-tag text-[9px] text-[#221D1B]/50 uppercase mb-1 flex items-center gap-1">
                <FaArrowDown className="text-green-700" /> Total Credit
              </p>
              <p className="cb-font-display text-lg text-green-700">
                {fmt(balanceSheet.total_credit)}
              </p>
            </div>
            <div className="bg-[#FBF6EC] border border-[#221D1B]/10 rounded-sm p-4">
              <p className="cb-font-tag text-[9px] text-[#221D1B]/50 uppercase mb-1 flex items-center gap-1">
                <FaArrowUp className="text-[#A61B29]" /> Total Debit
              </p>
              <p className="cb-font-display text-lg text-[#A61B29]">
                {fmt(balanceSheet.total_debit)}
              </p>
            </div>
            <div className="bg-gradient-to-br from-[#A61B29] to-[#8a1620] rounded-sm p-4">
              <p className="cb-font-tag text-[9px] text-[#F1E9DC]/80 uppercase mb-1">
                Closing Balance
              </p>
              <p className="cb-font-display text-lg text-[#F1E9DC]">
                {fmt(balanceSheet.closing_balance)}
              </p>
            </div>
          </div>

          {/* Ledger table */}
          <div className="bg-[#FBF6EC] rounded-sm shadow-[0_10px_30px_-15px_rgba(34,29,27,0.3)] border border-[#221D1B]/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead className="bg-gradient-to-r from-[#A61B29] to-[#8a1620]">
                  <tr>
                    <th className="px-4 md:px-6 py-3 text-left cb-font-tag text-[10px] text-[#F1E9DC]/90 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-4 md:px-6 py-3 text-left cb-font-tag text-[10px] text-[#F1E9DC]/90 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-4 md:px-6 py-3 text-right cb-font-tag text-[10px] text-[#F1E9DC]/90 uppercase tracking-wider">
                      Debit
                    </th>
                    <th className="px-4 md:px-6 py-3 text-right cb-font-tag text-[10px] text-[#F1E9DC]/90 uppercase tracking-wider">
                      Credit
                    </th>
                    <th className="px-4 md:px-6 py-3 text-right cb-font-tag text-[10px] text-[#F1E9DC]/90 uppercase tracking-wider">
                      Balance
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dashed divide-[#221D1B]/10">
                  {balanceSheet.transactions && balanceSheet.transactions.length > 0 ? (
                    balanceSheet.transactions.map((t) => (
                      <tr key={t.id} className="hover:bg-[#A61B29]/5 transition-colors">
                        <td className="px-4 md:px-6 py-3 cb-font-tag text-xs text-[#221D1B]/70">
                          {t.date}
                        </td>
                        <td className="px-4 md:px-6 py-3 cb-font-body text-sm text-[#221D1B]">
                          {t.description}
                        </td>
                        <td className="px-4 md:px-6 py-3 cb-font-tag text-xs text-right text-[#A61B29]">
                          {t.debit ? fmt(t.debit) : "—"}
                        </td>
                        <td className="px-4 md:px-6 py-3 cb-font-tag text-xs text-right text-green-700">
                          {t.credit ? fmt(t.credit) : "—"}
                        </td>
                        <td className="px-4 md:px-6 py-3 cb-font-tag text-xs text-right font-bold text-[#221D1B]">
                          {fmt(t.balance)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-4 md:px-6 py-10 text-center cb-font-tag text-xs text-[#221D1B]/40 uppercase">
                        No transactions found for this customer
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CustomerBalanceSheet;