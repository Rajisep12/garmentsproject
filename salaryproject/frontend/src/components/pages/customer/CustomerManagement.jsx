import React, { useState, useEffect } from "react";
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

const CustomerManagement = () => {
    const [customer, setCustomer] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 10;
    const [isLoading, setIsLoading] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [paginationInfo, setPaginationInfo] = useState({
        count: 0,
        next: null,
        previous: null,
    });

    const [showAddPopup, setShowAddPopup] = useState(false);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [customerToDelete, setCustomerToDelete] = useState(null);
    const [editingCustomer, setEditingCustomer] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [newCustomer, setNewCustomer] = useState({
        name: "",
        street_address: "",
        city: "",
        state: "",
        zip_code: "",
        gst: "",
        cgst: "",
        sgst: "",
        igst: ""
    });

    useEffect(() => {
        fetchCustomer(currentPage, searchQuery);
    }, [currentPage, searchQuery]);



    // Fetch aisles
    const fetchCustomer = async (page = 1, search = "") => {
        setIsLoading(true);
        try {
            const response = await axios.get(
                `${BASE_URL}/admin/customer/?page=${page}&search=${search}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("adminAccessToken")}`,
                    },
                }
            );
            setCustomer(response.data.results || []);
            setPaginationInfo({
                count: response.data.count || 0,
                next: response.data.next,
                previous: response.data.previous,
            });
            setTotalPages(Math.ceil(response.data.count / itemsPerPage));
            setCurrentPage(page);
        } catch (err) {
            console.log(err);
            setError("Error fetching Customer.");
            toast.error("Failed to load Customer. Please try again.");
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

    // Add new aisle (POST request)
    const handleAddCustomer = async () => {
        if (!newCustomer.name.trim()) {
            toast.error("Please enter Customer name");
            return;
        }

        setIsAdding(true);
        try {

            const response = await axios.post(
                `${BASE_URL}/admin/customer/`,
                {
                    name: newCustomer.name.trim(),
                    street_address: newCustomer.street_address.trim(),
                    city: newCustomer.city.trim(),
                    state: newCustomer.state.trim(),
                    zip_code: newCustomer.zip_code.trim(),
                    gst: newCustomer.gst.trim(),
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("adminAccessToken")}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.data) {
                toast.success("Customer added successfully!");
                setShowAddPopup(false);
                resetForm();
                // Refresh the aisle list - go to first page to show new employee
                fetchCustomer(1, searchQuery);
            }
        } catch (error) {
            console.error("Error adding Customer:", error);
            if (error.response) {
                if (error.response.status === 400) {
                    const errorData = error.response.data;
                    if (errorData.name) {
                        toast.error(errorData.name[0]);
                    } else if (errorData.detail) {
                        toast.error(errorData.detail);
                    } else {
                        toast.error("Validation error. Please check your input.");
                    }
                } else if (error.response.status === 401) {
                    toast.error("Unauthorized. Please login again.");
                } else if (error.response.status === 403) {
                    toast.error("You don't have permission to add employees.");
                } else {
                    toast.error("Failed to add Customer. Please try again.");
                }
            } else if (error.request) {
                toast.error("Network error. Please check your connection.");
            } else {
                toast.error("An error occurred. Please try again.");
            }
        } finally {
            setIsAdding(false);
        }
    };

    // Update Customer (PUT request)
    const handleEditCustomer = async () => {
        if (!editingCustomer.name.trim()) {
            toast.error("Please enter Customer name");
            return;
        }

        try {
            const response = await axios.put(
                `${BASE_URL}/admin/customer/${editingCustomer.id}/`,
                {
                    name: editingCustomer.name.trim(),
                    street_address: editingCustomer.street_address.trim(),
                    city: editingCustomer.city.trim(),
                    state: editingCustomer.state.trim(),
                    zip_code: editingCustomer.zip_code.trim(),
                    gst: editingCustomer.gst.trim(),

                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("adminAccessToken")}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.data) {
                setCustomer(
                    customer.map((customer) =>
                        customer.id === editingCustomer.id ? response.data : customer
                    )
                );

                toast.success("Customer updated successfully!");
                setShowEditPopup(false);
                setEditingCustomer(null);
            }
        } catch (error) {
            console.error("Error updating Customer:", error);
            toast.error("Failed to update Customer. Please try again.");
        }
    };

    // Delete aisle (DELETE request)
    const handleDeleteCustomer = async () => {
        if (!customerToDelete) return;

        try {
            await axios.delete(`${BASE_URL}/admin/${customerToDelete.id}/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("adminAccessToken")}`,
                },
            });

            setCustomer(customer.filter((customer) => customer.id !== customerToDelete.id));
            toast.success("Customer deleted successfully!");
            // Refresh to update pagination if needed
            fetchCustomer(currentPage, searchQuery);
        } catch (error) {
            console.error("Error deleting Customer:", error);
            toast.error("Failed to delete Customer. Please try again.");
        } finally {
            setShowDeletePopup(false);
            setCustomerToDelete(null);
        }
    };

    const handleEditClick = (customer) => {
        setEditingCustomer({ ...customer });
        setShowEditPopup(true);
    };

    const handleDeleteClick = (customer) => {
        setCustomerToDelete(customer);
        setShowDeletePopup(true);
    };

    const resetForm = () => {
        setNewCustomer({
            name: "",
            street_address: "",
            city: "",
            state: "",
            zip_code: "",
            gst: "",
            cgst:"",
            sgts:"",
            igst:""
        });
    };

    const filteredCustomer = customer.filter((customer) => {
        const matchesSearch =
            customer.name.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesSearch;
    });

    const Input = ({ label, ...props }) => (
        <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">{label}</label>
            <input
                {...props}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
            />
        </div>
    );

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
                                Customer Management
                            </h1>
                            <p className="text-gray-600 text-xs md:text-sm">
                                Manage Customer details
                            </p>
                        </div>
                    </div>
                    <div className=" flex gap-3">
                        <div className="relative">
                            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search Customer by name"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all hover:border-red-300 text-sm md:text-base"
                            />
                        </div>
                        <button
                            onClick={() => setShowAddPopup(true)}
                            className="flex items-center justify-center bg-red-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl hover:bg-red-700 transition-all duration-300 font-medium shadow-md hover:shadow-lg border border-red-700 w-full md:w-auto"
                        >
                            <FaPlus className="mr-2 text-sm md:text-base" />
                            <span className="text-sm md:text-base">Add New Customer</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Aisles Table */}
            <div className="bg-white rounded-lg md:rounded-xl shadow-sm border border-red-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[600px]">
                        <thead className="bg-red-50">
                            <tr>
                                <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b border-red-100">
                                    Customer ID
                                </th>
                                <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b border-red-100">
                                    Customer Name
                                </th>
                                <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b border-red-100">
                                    Address
                                </th>
                                <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b border-red-100">
                                    GST
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
                                        <p className="mt-2 text-gray-600">Loading Customer...</p>
                                    </td>
                                </tr>
                            ) : customer.length > 0 ? (
                                customer.map((customer) => (
                                    <tr
                                        key={customer.id}
                                        className="hover:bg-red-50/50 transition-colors"
                                    >
                                        <td className="px-4 md:px-6 py-3 md:py-4">
                                            <div className="flex items-center">
                                                <div className="w-8 h-8 md:w-10 md:h-10 bg-red-100 rounded-lg flex items-center justify-center mr-2 md:mr-3 border border-red-200">
                                                    <span className="font-bold text-red-700 text-xs md:text-sm">
                                                        #{customer.id}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 md:px-6 py-3 md:py-4">
                                            <div>
                                                <p className="text-sm font-bold text-gray-900 truncate max-w-[150px] md:max-w-none">
                                                    {customer.name}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="px-4 md:px-6 py-3 md:py-4">
                                            <div className="flex items-center">

                                                <p className="text-xs md:text-sm font-mono font-bold text-gray-900 truncate max-w-[100px] md:max-w-[150px] lg:max-w-none">
                                                    {customer.street_address} {customer.city}
                                                    {customer.state} {customer.zip_code}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="px-4 md:px-6 py-3 md:py-4">
                                            <div className="flex items-center">

                                                <p className="text-xs md:text-sm font-mono font-bold text-gray-900 truncate max-w-[100px] md:max-w-[150px] lg:max-w-none">
                                                    {customer.gst}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="px-4 md:px-6 py-3 md:py-4">
                                            <div className="flex space-x-2 md:space-x-3">
                                                <button
                                                    onClick={() => handleEditClick(customer)}
                                                    className="flex items-center justify-center text-green-600 hover:text-green-800 transition-colors hover:bg-green-50 p-2 rounded-lg"
                                                    title="Edit"
                                                >
                                                    <FaEdit className="text-sm md:text-lg" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteClick(customer)}
                                                    className="flex items-center justify-center text-red-600 hover:text-red-800 transition-colors hover:bg-red-50 p-2 rounded-lg"
                                                    title="Delete"
                                                >
                                                    <FaTrash className="text-sm md:text-lg" />
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
                                            No Customer found
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
                            Customers
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

            {/* Add Customer Popup */}
            {showAddPopup && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm p-4">
                    <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-gray-200 flex flex-col max-h-[90vh]">

                        {/* HEADER */}
                        <div className="flex justify-between items-center px-6 py-4 border-b">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-red-100 rounded-lg">
                                    <FaStore className="text-red-600 text-lg" />
                                </div>
                                <h2 className="text-xl font-semibold text-gray-800">
                                    Add New Customer
                                </h2>
                            </div>

                            <button
                                onClick={() => setShowAddPopup(false)}
                                className="text-gray-400 hover:text-red-600 text-2xl"
                            >
                                &times;
                            </button>
                        </div>

                        {/* BODY */}
                        <div className="p-6 overflow-y-auto space-y-6">

                            {/* BASIC INFO */}
                            <div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                                    {/* Customer Name */}
                                    <Input
                                        label="Customer Name *"
                                        value={newCustomer.name}
                                        onChange={(e) =>
                                            setNewCustomer({ ...newCustomer, name: e.target.value })
                                        }
                                    />

                                    {/* Phone */}
                                    <Input
                                        label="Phone Number *"
                                        type="tel"
                                        maxLength={10}
                                        value={newCustomer.phone || ""}
                                        onChange={(e) =>
                                            setNewCustomer({ ...newCustomer, phone: e.target.value })
                                        }
                                    />

                                    {/* GST */}
                                    <Input
                                        label="GST Number"
                                        value={newCustomer.gst || ""}
                                        onChange={(e) =>
                                            setNewCustomer({ ...newCustomer, gst: e.target.value })
                                        }
                                    />

                                </div>
                            </div>

                            {/* ADDRESS */}
                            <div>


                                <div className="space-y-4">
                                    <Input label="Street Address *"
                                        value={newCustomer.street_address}
                                        onChange={(e) => setNewCustomer({ ...newCustomer, street_address: e.target.value })} />

                                    <div className="grid md:grid-cols-3 gap-4">
                                        <Input label="City"
                                            value={newCustomer.city}
                                            onChange={(e) => setNewCustomer({ ...newCustomer, city: e.target.value })} />

                                        <Input label="State"
                                            value={newCustomer.state}
                                            onChange={(e) => setNewCustomer({ ...newCustomer, state: e.target.value })} />

                                        <Input label="Pincode"
                                            value={newCustomer.zip_code}
                                            onChange={(e) => setNewCustomer({ ...newCustomer, zip_code: e.target.value })} />
                                    </div>
                                </div>
                            </div>

                            {/* TAX */}
                            <div>


                                <div className="grid md:grid-cols-3 gap-4">
                                    <Input label="CGST %" type="number"
                                        step="0.01"
                                        value={newCustomer.cgst}
                                        onChange={(e) => setNewCustomer({ ...newCustomer, cgst: e.target.value })} />

                                    <Input label="SGST %" type="number"
                                        step="0.01"
                                        value={newCustomer.sgst}
                                        onChange={(e) => setNewCustomer({ ...newCustomer, sgst: e.target.value })} />

                                    <Input label="IGST %" type="number"
                                        step="0.01"
                                        value={newCustomer.igst}
                                        onChange={(e) => setNewCustomer({ ...newCustomer, igst: e.target.value })} />
                                </div>
                            </div>
                        </div>

                        {/* FOOTER */}
                        <div className="flex justify-end gap-3 px-6 py-4 border-t bg-gray-50">
                            <button
                                onClick={() => setShowAddPopup(false)}
                                className="px-5 py-2 border rounded-lg text-gray-600 hover:bg-gray-100"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleAddCustomer}
                                disabled={isAdding}
                                className="flex items-center gap-2 px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 shadow"
                            >
                                {isAdding ? (
                                    <span className="animate-pulse">Saving...</span>
                                ) : (
                                    <>
                                        <FaPlus />
                                        Add Customer
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Customer Popup */}
            {showEditPopup && editingCustomer && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm p-4">
                    <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-gray-200 flex flex-col max-h-[90vh]">

                        {/* HEADER */}
                        <div className="flex justify-between items-center px-6 py-4 border-b">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-green-100 rounded-lg">
                                    <FaEdit className="text-green-600 text-lg" />
                                </div>
                                <h2 className="text-xl font-semibold text-gray-800">
                                    Edit Customer #{editingCustomer.id}
                                </h2>
                            </div>

                            <button
                                onClick={() => {
                                    setShowEditPopup(false);
                                    setEditingCustomer(null);
                                }}
                                className="text-gray-400 hover:text-green-600 text-2xl"
                            >
                                &times;
                            </button>
                        </div>

                        {/* BODY */}
                        <div className="p-6 overflow-y-auto space-y-6">

                            {/* BASIC DETAILS */}
                            <div>


                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                                    <Input
                                        label="Customer Name *"
                                        value={editingCustomer.name}
                                        onChange={(e) =>
                                            setEditingCustomer({ ...editingCustomer, name: e.target.value })
                                        }
                                    />

                                    <Input
                                        label="Phone Number *"
                                        value={editingCustomer.phone || ""}
                                        onChange={(e) =>
                                            setEditingCustomer({ ...editingCustomer, phone: e.target.value })
                                        }
                                    />

                                    <Input
                                        label="GST Number"
                                        value={editingCustomer.gst || ""}
                                        onChange={(e) =>
                                            setEditingCustomer({ ...editingCustomer, gst: e.target.value })
                                        }
                                    />

                                </div>
                            </div>

                            {/* ADDRESS */}
                            <div>

                                <div className="space-y-4">

                                    <Input
                                        label="Street Address *"
                                        value={editingCustomer.street_address}
                                        onChange={(e) =>
                                            setEditingCustomer({
                                                ...editingCustomer,
                                                street_address: e.target.value,
                                            })
                                        }
                                    />

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <Input
                                            label="City"
                                            value={editingCustomer.city}
                                            onChange={(e) =>
                                                setEditingCustomer({ ...editingCustomer, city: e.target.value })
                                            }
                                        />

                                        <Input
                                            label="State"
                                            value={editingCustomer.state}
                                            onChange={(e) =>
                                                setEditingCustomer({ ...editingCustomer, state: e.target.value })
                                            }
                                        />

                                        <Input
                                            label="Pincode"
                                            value={editingCustomer.zip_code}
                                            onChange={(e) =>
                                                setEditingCustomer({
                                                    ...editingCustomer,
                                                    zip_code: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* TAX */}
                            <div>


                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <Input
                                        label="CGST %" type="number"
                                        step="0.01"
                                        value={editingCustomer.cgst || ""}
                                        onChange={(e) =>
                                            setEditingCustomer({
                                                ...editingCustomer,
                                                cgst: e.target.value,
                                            })
                                        }
                                    />

                                    <Input
                                        label="SGST %" type="number"
                                        step="0.01"
                                        value={editingCustomer.sgst || ""}
                                        onChange={(e) =>
                                            setEditingCustomer({
                                                ...editingCustomer,
                                                sgst: e.target.value,
                                            })
                                        }
                                    />

                                    <Input
                                        label="IGST %" type="number"
                                        step="0.01"
                                        value={editingCustomer.igst || ""}
                                        onChange={(e) =>
                                            setEditingCustomer({
                                                ...editingCustomer,
                                                igst: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>
                        </div>

                        {/* FOOTER */}
                        <div className="flex justify-end gap-3 px-6 py-4 border-t bg-gray-50">
                            <button
                                onClick={() => {
                                    setShowEditPopup(false);
                                    setEditingCustomer(null);
                                }}
                                className="px-5 py-2 border rounded-lg text-gray-600 hover:bg-gray-100"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleEditCustomer}
                                className="flex items-center gap-2 px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow"
                            >
                                <FaSave />
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Popup */}
            {showDeletePopup && customerToDelete && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-3 md:p-4 z-50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl md:rounded-2xl shadow-2xl w-full max-w-md border border-red-100 mx-2">
                        <div className="p-4 md:p-6">
                            <div className="flex justify-between items-center mb-4 md:mb-6">
                                <div className="flex items-center space-x-2 md:space-x-3">
                                    <div className="p-2 bg-red-50 rounded-lg border border-red-100">
                                        <FaExclamationTriangle className="text-lg md:text-xl text-red-600" />
                                    </div>
                                    <h2 className="text-lg md:text-xl font-bold text-gray-900">
                                        Delete Customer
                                    </h2>
                                </div>
                                <button
                                    onClick={() => {
                                        setShowDeletePopup(false);
                                        setCustomerToDelete(null);
                                    }}
                                    className="text-gray-400 hover:text-red-600 text-xl md:text-2xl transition-colors"
                                >
                                    &times;
                                </button>
                            </div>

                            <div className="space-y-4 md:space-y-6">
                                <div className="text-center">
                                    <FaExclamationTriangle className="text-4xl md:text-5xl text-red-500 mx-auto mb-3 md:mb-4" />
                                    <p className="text-gray-700 text-base md:text-lg font-medium mb-2">
                                        Are you sure you want to delete this Customer?
                                    </p>
                                    <p className="text-gray-600 text-sm md:text-base">
                                        This action cannot be undone. All products in this Customer
                                        will need to be reassigned.
                                    </p>
                                </div>

                                <div className="bg-red-50 p-3 md:p-4 rounded-lg md:rounded-xl border border-red-200">
                                    <p className="text-sm font-medium text-red-800 mb-2">
                                        Customer to be deleted:
                                    </p>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-700">Customer ID:</span>
                                            <span className="font-semibold">#{employeeToDelete.id}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-700">Name:</span>
                                            <span className="font-semibold">
                                                {customerToDelete.name}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-700">Mobile:</span>
                                            <span className="font-semibold">
                                                {customerToDelete.mobile || "N/A"}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row justify-end gap-2 md:space-x-3 pt-4 border-t border-red-100">
                                    <button
                                        onClick={() => {
                                            setShowDeletePopup(false);
                                            setCustomerToDelete(null);
                                        }}
                                        className="px-4 md:px-6 py-2 md:py-3 border border-gray-300 text-gray-700 rounded-lg md:rounded-xl hover:bg-gray-50 transition-colors font-medium hover:border-gray-400 text-sm md:text-base order-2 sm:order-1"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleDeleteCustomer}
                                        className="flex items-center justify-center px-4 md:px-6 py-2 md:py-3 bg-red-600 text-white rounded-lg md:rounded-xl hover:bg-red-700 transition-colors font-medium shadow-md hover:shadow-lg border border-red-700 text-sm md:text-base order-1 sm:order-2"
                                    >
                                        <FaTrash className="mr-2 text-sm md:text-base" />
                                        Delete Customer
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomerManagement;
