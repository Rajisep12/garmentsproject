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
import { Plus } from "lucide-react";
import { MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { toast } from "react-toastify";

const SalaryManagement = () => {
    const [employees, setEmployee] = useState([]);
    const [orders, setOrders] = useState([]);
    const [salaries, setSalary] = useState([]);

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
    const [salaryToDelete, setSalaryToDelete] = useState(null);
    const [editingSalary, setEditingSalary] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [newSalary, setNewSalary] = useState({
        dc_number: "",
        employee_name: "",
        order_date: ""
    });
    const categoryData = {
        Flatlock: [
            { name: "Sleeve Dower (Open/Round)", amount: 0.50 },
            { name: "Body Dower (Open/Round)", amount: 0.70 },
            { name: "Neck Single Needle", amount: 0.50 },
            { name: "Neck Folding", amount: 0 },
            { name: "Sleeve F/L (Single/Double)", amount: 0.65 },
            { name: "Cuff F/L (Single/Double)", amount: 0.50 },
            { name: "Shoulder F/L (Single/Double)", amount: 0.50 },
            { name: "Dower F/L", amount: 0.70 },
            { name: "Pocket Dower", amount: 0.30 },
            { name: "Hoodie Dower", amount: 0.50 },
            { name: "Hoodie Single Needle", amount: 0.50 },
            { name: "Drimmer", amount: 0 },
            { name: "Raise F/L", amount: 0.60 },
            { name: "Cross Pocket F/L", amount: 0.50 },
            { name: "Side FlatLock - Shorts", amount: 1 },
            { name: "Side FlatLock - Pant", amount: 1.50 },
        ],
        Overlock: [
            { name: "Shoulder Attachment", amount: 0.50 },
            { name: "Neck Rib", amount: 1 },
            { name: "Sleeve", amount: 0.90 },
            { name: "Side", amount: 1.25 },
            { name: "Body Panel", amount: 0.50 },
            { name: "Sleeve Panel", amount: 0.50 },
            { name: "Reglan Sleeve Join", amount: 1 },
            { name: "Collar Attach", amount: 1 },
            { name: "Cuff", amount: 0.50 },
            { name: "Hoodie Attach", amount: 0.50 },
            { name: "Dower Rib", amount: 1 },
            { name: "Pocket O/L", amount: 0.50 },  
            { name: "Hoodie O/L", amount: 0.50 },           
        ],
        Singer: [
            { name: "Placket", amount: 5 },  
            { name: "Collar", amount: 5.5 },
            { name: "Hoodie Pocket", amount: 0.50 }, 
            { name: "Belt", amount: 1.50 },  
            { name: "Belt Ready", amount: 1 }, 
            { name: "Label", amount: 0.35 },
            { name: "Seeri", amount: 0.90 },
            { name: "Peak", amount: 0.60 },
            { name: "Pocket Stand", amount: 1.20 },  
            { name: "Tape Seeri", amount: 1.20 }, 
            { name: "Badge Label", amount: 1 },  
            { name: "Badge", amount: 1 },   
            { name: "Rope", amount: 0.70 },            
        ],
        Cutting: [
            { name: "Round Neck - H/S", amount: 2.75 },
            { name: "Round Neck - F/S", amount: 3 },
            { name: "Polo TShirt - H/S", amount: 2.75 },
            { name: "Sweat Shirt", amount: 3 },
            { name: "Hoodie", amount: 3.75 },
            { name: "Shorts", amount: 2.50 },
            { name: "Joogger Pant", amount: 3.75 },
            { name: "Reglan - H/S", amount: 3 },
            { name: "Reglan - F/S", amount: 3.25 },            
        ],
        Checking: [
            { name: "Round Neck - H/S", amount: 1.50 },
            { name: "Round Neck - F/S", amount: 1.50 },
            { name: "Polo TShirt - H/S", amount: 2 },
            { name: "Sweat Shirt", amount: 2 },
            { name: "Hoodie", amount: 3 },
            { name: "Shorts", amount: 3 },
            { name: "Joogger Pant", amount: 3 },
            { name: "Reglan - H/S", amount: 1.50 },
            { name: "Reglan - F/S", amount: 1.50 },
        ],
    };

    useEffect(() => {
        fetchEmployees();
        fetchOrders();
    }, [currentPage, searchQuery]);

    const [rows, setRows] = useState([
        { category: "", subcategory: "", amount: "", quantity: "" },
    ]);

    // Handle category change
    const handleCategoryChange = (index, value) => {
        const updated = [...rows];
        updated[index].category = value;
        updated[index].subcategory = ""; // reset subcategory
        setRows(updated);
    };

    // Add new row
    const addRow = () => {
        setRows([...rows, { category: "", subcategory: "" }]);
    };


    // Fetch orders
    const fetchOrders = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(
                `${BASE_URL}/admin/order/?all=true`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("adminAccessToken")}`,
                    },
                }
            );
            setOrders(response.data.results || []);

        } catch (err) {
            console.log(err);
            setError("Error fetching orders.");
            toast.error("Failed to load orders. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch aisles
    const fetchEmployees = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(
                `${BASE_URL}/admin/employee/?all=true`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("adminAccessToken")}`,
                    },
                }
            );
            setEmployee(response.data.results || []);
        } catch (err) {
            console.log(err);
            setError("Error fetching employees.");
            toast.error("Failed to load employees. Please try again.");
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
    const handleAddSalary = async () => {
        if (!newSalary.name.trim()) {
            toast.error("Please enter Salary name");
            return;
        }

        setIsAdding(true);
        try {

            const response = await axios.post(
                `${BASE_URL}/admin/salary/`,
                {
                    name: newSalary.name.trim(),
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("adminAccessToken")}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.data) {
                toast.success("Salary added successfully!");
                setShowAddPopup(false);
                resetForm();
                // Refresh the aisle list - go to first page to show new employee
                fetchSalarys(1, searchQuery);
            }
        } catch (error) {
            console.error("Error adding Salary:", error);
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
                    toast.error("You don't have permission to add Salary.");
                } else {
                    toast.error("Failed to add Salary. Please try again.");
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

    // Update employee (PUT request)
    const handleEditSalary = async () => {
        if (!editingSalary.name.trim()) {
            toast.error("Please enter Salary name");
            return;
        }

        try {
            const response = await axios.put(
                `${BASE_URL}/admin/salary/${editingSalary.id}/`,
                {
                    name: editingSalary.name.trim(),
                    mobile: editingSalary.mobile.trim(),
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("adminAccessToken")}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.data) {
                setSalary(
                    salaries.map((salary) =>
                        salary.id === editingSalary.id ? response.data : salary
                    )
                );

                toast.success("Salary updated successfully!");
                setShowEditPopup(false);
                setEditingSalary(null);
            }
        } catch (error) {
            console.error("Error updating Salary:", error);
            toast.error("Failed to update Salary. Please try again.");
        }
    };

    // Delete aisle (DELETE request)
    const handleDeleteSalary = async () => {
        if (!salaryToDelete) return;

        try {
            await axios.delete(`${BASE_URL}/admin//${salaryToDelete.id}/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("adminAccessToken")}`,
                },
            });

            setSalary(salaries.filter((salary) => salary.id !== salaryToDelete.id));
            toast.success("Salary deleted successfully!");
            // Refresh to update pagination if needed
            fetchSalarys(currentPage, searchQuery);
        } catch (error) {
            console.error("Error deleting Salary:", error);
            toast.error("Failed to delete Salary. Please try again.");
        } finally {
            setShowDeletePopup(false);
            setSalaryToDelete(null);
        }
    };

    const handleEditClick = (salary) => {
        setEditingSalary({ ...salary });
        setShowEditPopup(true);
    };

    const handleDeleteClick = (salary) => {
        setSalaryToDelete(salary);
        setShowDeletePopup(true);
    };

    const resetForm = () => {
        setNewSalary({
            name: "",
            mobile: "",
        });
    };

    const filteredSalarys = salaries.filter((salary) => {
        const matchesSearch =
            salary.name.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesSearch;
    });

    const handleSubcategoryChange = (index, value) => {
        const updated = [...rows];

        updated[index].subcategory = value;

        // find selected subcategory object
        const selected = categoryData[updated[index].category]?.find(
            (item) => item.name === value
        );

        // set amount automatically
        updated[index].amount = selected ? selected.amount : "";

        setRows(updated);
    };
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
                                Salary Management
                            </h1>
                            <p className="text-gray-600 text-xs md:text-sm">
                                Manage Salary details
                            </p>
                        </div>
                    </div>
                    <div className=" flex gap-3">
                        <div className="relative">
                            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search Employee name"
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
                            <span className="text-sm md:text-base">Add New Salary</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Salary Table */}
            <div className="bg-white rounded-lg md:rounded-xl shadow-sm border border-red-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[600px]">
                        <thead className="bg-red-50">
                            <tr>
                                <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b border-red-100">
                                    Salary ID
                                </th>
                                <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b border-red-100">
                                    Order DC
                                </th>
                                <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b border-red-100">
                                    Employee Name
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
                                        <p className="mt-2 text-gray-600">Loading Employee Name...</p>
                                    </td>
                                </tr>
                            ) : salaries.length > 0 ? (
                                salaries.map((salary) => (
                                    <tr
                                        key={salary.id}
                                        className="hover:bg-red-50/50 transition-colors"
                                    >
                                        <td className="px-4 md:px-6 py-3 md:py-4">
                                            <div className="flex items-center">
                                                <div className="w-8 h-8 md:w-10 md:h-10 bg-red-100 rounded-lg flex items-center justify-center mr-2 md:mr-3 border border-red-200">
                                                    <span className="font-bold text-red-700 text-xs md:text-sm">
                                                        #{salary.id}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 md:px-6 py-3 md:py-4">
                                            <div>
                                                <p className="text-sm font-bold text-gray-900 truncate max-w-[150px] md:max-w-none">
                                                    {salary.name}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="px-4 md:px-6 py-3 md:py-4">
                                            <div className="flex items-center">
                                                <p className="text-xs md:text-sm font-mono font-bold text-gray-900 truncate max-w-[100px] md:max-w-[150px] lg:max-w-none">
                                                    {salary.mobile || "No Mobile Assigned"}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="px-4 md:px-6 py-3 md:py-4">
                                            <div className="flex space-x-2 md:space-x-3">
                                                <button
                                                    onClick={() => handleEditClick(salary)}
                                                    className="flex items-center justify-center text-green-600 hover:text-green-800 transition-colors hover:bg-green-50 p-2 rounded-lg"
                                                    title="Edit"
                                                >
                                                    <FaEdit className="text-sm md:text-lg" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteClick(salary)}
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
                                            No Salary found
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
                            salary
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

            {/* Add Salary Popup */}
            {showAddPopup && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-3 md:p-4 z-50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl md:rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden border border-red-100 mx-2">

                        <div className="flex flex-col h-full">

                            {/* Header */}
                            <div className="p-4 md:p-6 border-b border-red-100 flex justify-between items-center">
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-red-50 rounded-lg border border-red-100">
                                        <FaStore className="text-lg md:text-xl text-red-600" />
                                    </div>
                                    <h2 className="text-lg md:text-xl font-bold text-gray-900">
                                        Add New Salary
                                    </h2>
                                </div>

                                <button
                                    onClick={() => setShowAddPopup(false)}
                                    className="text-gray-400 hover:text-red-600 text-xl"
                                    disabled={isAdding}
                                >
                                    &times;
                                </button>
                            </div>

                            {/* Body */}
                            <div className="p-4 md:p-6 overflow-y-auto space-y-5">

                                {/* Top Section */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                                    {/* Order DC */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Order DC*
                                        </label>
                                        <select
                                            value={newSalary.dc_number}
                                            onChange={(e) => {
                                                const selectedId = e.target.value;

                                                // find selected order
                                                const selectedOrder = orders.find(
                                                    (order) => order.id.toString() === selectedId
                                                );

                                                setNewSalary({
                                                    ...newSalary,
                                                    dc_number: selectedId,
                                                    order_date: selectedOrder ? selectedOrder.order_date : "",
                                                });
                                            }}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                                            disabled={isAdding}
                                        >
                                            <option value="">Select Order DC</option>
                                            {orders.map((order) => (
                                                <option key={order.id} value={order.id}>
                                                    {order.dc_number}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Employee */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Employee Name *
                                        </label>
                                        <select
                                            value={newSalary.employee_name}
                                            onChange={(e) =>
                                                setNewSalary({ ...newSalary, employee_name: e.target.value })
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                                            disabled={isAdding}
                                        >
                                            <option value="">Select Employee</option>
                                            {employees.map((employee) => (
                                                <option key={employee.id} value={employee.id}>
                                                    {employee.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Order Date */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Order Date
                                        </label>
                                        <input
                                            type="date"
                                            value={newSalary.order_date || ""}
                                            readOnly   // optional (recommended)
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 focus:ring-2 focus:ring-red-500"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mb-1">

                                    {/* Column Labels */}
                                    <div className="grid grid-cols-2 gap-3 w-full pr-2">
                                        <div className="text-sm font-medium text-gray-600">Category</div>
                                        <div className="text-sm font-medium text-gray-600">Subcategory</div>
                                    </div>

                                    {/* Add Button */}
                                    <button
                                        type="button"
                                        onClick={addRow}
                                        className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm whitespace-nowrap"
                                    >
                                        + Add
                                    </button>

                                </div>

                                {/* Rows (Scrollable) */}
                                <div className="space-y-2 max-h-[250px] overflow-y-auto pr-1">
                                    {rows.map((row, index) => (
                                        <div className="grid grid-cols-12 gap-2 items-center bg-gray-50 p-2 rounded-lg">

                                            {/* Category */}
                                            <select
                                                value={row.category}
                                                onChange={(e) =>
                                                    handleCategoryChange(index, e.target.value)
                                                }
                                                className="col-span-2 px-2 py-2 border border-gray-300 rounded-lg text-sm"
                                            >
                                                <option value="">Cat</option>
                                                {Object.keys(categoryData).map((cat) => (
                                                    <option key={cat} value={cat}>
                                                        {cat}
                                                    </option>
                                                ))}
                                            </select>

                                            {/* Subcategory */}
                                            <select
                                                value={row.subcategory}
                                                onChange={(e) =>
                                                    handleSubcategoryChange(index, e.target.value)
                                                }
                                                className="col-span-4 px-2 py-2 border border-gray-300 rounded-lg text-sm"
                                                disabled={!row.category}
                                            >
                                                <option value="">Subcategory</option>
                                                {categoryData[row.category]?.map((sub, i) => (
                                                    <option key={i} value={sub.name}>
                                                        {sub.name}
                                                    </option>
                                                ))}
                                            </select>

                                            {/* Amount */}
                                            <input
                                                type="number"
                                                value={row.amount || ""}
                                                onChange={(e) => {
                                                    const updated = [...rows];
                                                    updated[index].amount = e.target.value;
                                                    setRows(updated);
                                                }}
                                                className="col-span-2 px-2 py-2 border border-gray-300 rounded-lg text-sm"
                                            />

                                            {/* Qty */}
                                            <input
                                                type="number"
                                                value={row.quantity || ""}
                                                onChange={(e) => {
                                                    const updated = [...rows];
                                                    updated[index].quantity = e.target.value;
                                                    setRows(updated);
                                                }}
                                                className="col-span-2 px-2 py-2 border border-gray-300 rounded-lg text-sm"
                                            />

                                            {/* Total */}
                                            <div className="col-span-1 text-sm font-semibold text-center">
                                                ₹ {row.amount && row.quantity ? row.amount * row.quantity : 0}
                                            </div>

                                            {/* Delete */}
                                            <button
                                                onClick={() => {
                                                    const updated = rows.filter((_, i) => i !== index);
                                                    setRows(updated);
                                                }}
                                                className="col-span-1 text-red-500 hover:text-red-700 text-lg"
                                            >
                                                ×
                                            </button>

                                        </div>
                                    ))}
                                </div>

                            </div>

                            {/* Footer */}
                            <div className="p-4 md:p-6 border-t border-red-100 flex justify-end gap-3">
                                <button
                                    onClick={() => setShowAddPopup(false)}
                                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                                    disabled={isAdding}
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={handleAddSalary}
                                    disabled={isAdding}
                                    className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                                >
                                    {isAdding ? "Adding..." : "Add Salary"}
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            )}

            {/* Edit Salary Popup */}
            {showEditPopup && editingEmployee && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-3 md:p-4 z-50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl md:rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto border border-green-100 mx-2">
                        <div className="p-4 md:p-6">
                            <div className="flex justify-between items-center mb-4 md:mb-6">
                                <div className="flex items-center space-x-2 md:space-x-3">
                                    <div className="p-2 bg-green-50 rounded-lg border border-green-100">
                                        <FaEdit className="text-lg md:text-xl text-green-600" />
                                    </div>
                                    <h2 className="text-lg md:text-xl font-bold text-gray-900">
                                        Edit Employee #{editingEmployee.id}
                                    </h2>
                                </div>
                                <button
                                    onClick={() => {
                                        setShowEditPopup(false);
                                        setEditingEmployee(null);
                                    }}
                                    className="text-gray-400 hover:text-green-600 text-xl md:text-2xl transition-colors"
                                >
                                    &times;
                                </button>
                            </div>

                            <div className="space-y-3 md:space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Employee Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={editingEmployee.name}
                                        onChange={(e) =>
                                            setEditingEmployee({ ...editingEmployee, name: e.target.value })
                                        }
                                        className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg md:rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all hover:border-green-300 text-sm md:text-base"
                                        placeholder="Enter employee name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Mobile
                                    </label>
                                    <div className="flex items-center">
                                        <input
                                            type="text"
                                            value={editingEmployee.mobile || ""}
                                            onChange={(e) =>
                                                setEditingEmployee({
                                                    ...editingEmployee,
                                                    mobile: e.target.value,
                                                })
                                            }
                                            className="flex-1 px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg md:rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all hover:border-green-300 text-sm md:text-base"
                                            placeholder="Enter Mobile Number"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row justify-end gap-2 md:space-x-3 mt-6 md:mt-8 pt-4 md:pt-6 border-t border-green-100">
                                <button
                                    onClick={() => {
                                        setShowEditPopup(false);
                                        setEditingEmployee(null);
                                    }}
                                    className="px-4 md:px-6 py-2 md:py-3 border border-gray-300 text-gray-700 rounded-lg md:rounded-xl hover:bg-gray-50 transition-colors font-medium hover:border-green-300 text-sm md:text-base order-2 sm:order-1"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleEditEmployee}
                                    className="flex items-center justify-center px-4 md:px-6 py-2 md:py-3 bg-green-600 text-white rounded-lg md:rounded-xl hover:bg-green-700 transition-colors font-medium shadow-md hover:shadow-lg border border-green-700 text-sm md:text-base order-1 sm:order-2"
                                >
                                    <FaSave className="mr-2 text-sm md:text-base" />
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Popup */}
            {showDeletePopup && employeeToDelete && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-3 md:p-4 z-50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl md:rounded-2xl shadow-2xl w-full max-w-md border border-red-100 mx-2">
                        <div className="p-4 md:p-6">
                            <div className="flex justify-between items-center mb-4 md:mb-6">
                                <div className="flex items-center space-x-2 md:space-x-3">
                                    <div className="p-2 bg-red-50 rounded-lg border border-red-100">
                                        <FaExclamationTriangle className="text-lg md:text-xl text-red-600" />
                                    </div>
                                    <h2 className="text-lg md:text-xl font-bold text-gray-900">
                                        Delete Employee
                                    </h2>
                                </div>
                                <button
                                    onClick={() => {
                                        setShowDeletePopup(false);
                                        setEmployeeToDelete(null);
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
                                        Are you sure you want to delete this employee?
                                    </p>
                                    <p className="text-gray-600 text-sm md:text-base">
                                        This action cannot be undone. All products in this employee
                                        will need to be reassigned.
                                    </p>
                                </div>

                                <div className="bg-red-50 p-3 md:p-4 rounded-lg md:rounded-xl border border-red-200">
                                    <p className="text-sm font-medium text-red-800 mb-2">
                                        Employee to be deleted:
                                    </p>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-700">Employee ID:</span>
                                            <span className="font-semibold">#{employeeToDelete.id}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-700">Name:</span>
                                            <span className="font-semibold">
                                                {employeeToDelete.name}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-700">Mobile:</span>
                                            <span className="font-semibold">
                                                {employeeToDelete.mobile || "N/A"}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row justify-end gap-2 md:space-x-3 pt-4 border-t border-red-100">
                                    <button
                                        onClick={() => {
                                            setShowDeletePopup(false);
                                            setEmployeeToDelete(null);
                                        }}
                                        className="px-4 md:px-6 py-2 md:py-3 border border-gray-300 text-gray-700 rounded-lg md:rounded-xl hover:bg-gray-50 transition-colors font-medium hover:border-gray-400 text-sm md:text-base order-2 sm:order-1"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleDeleteEmployee}
                                        className="flex items-center justify-center px-4 md:px-6 py-2 md:py-3 bg-red-600 text-white rounded-lg md:rounded-xl hover:bg-red-700 transition-colors font-medium shadow-md hover:shadow-lg border border-red-700 text-sm md:text-base order-1 sm:order-2"
                                    >
                                        <FaTrash className="mr-2 text-sm md:text-base" />
                                        Delete Employee
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

export default SalaryManagement;
