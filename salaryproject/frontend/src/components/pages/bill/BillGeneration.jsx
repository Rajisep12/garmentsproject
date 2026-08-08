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
import { LoadScript, Autocomplete } from "@react-google-maps/api";
AIzaSyByeHSvRv5vR1r1Z9Xrr_q2guqzwnEA7zc
const BillGenerationSimple = () => {
    const [customer, setCustomer] = useState([]);
    const [place, setPlace] = useState([]);
    const [bill, setBill] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [customerToDelete, setCustomerToDelete] = useState(null);
    const [editingCustomer, setEditingCustomer] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [newBill, setNewBill] = useState({
        customer: "",
        invoice_no: "",
        invoice_date: "",
        reverse_charge: false,
        supply_date: "",
        tax: "",
        // state:"",
        // code:"",
        transport_mode: "Road",
        transport_vehicle: "TN 00 AB 1234",


    });
    const [items, setItems] = useState([
        {
            product: "",
            hsn: "",
            qty: 1,
            rate: 0,
            amount: 0,
            discount: 0,
            total: 0,
        },
    ]);
    const productOptions = [
        "Round Neck Half Sleeve",
        "Round Neck Full Sleeve",
        "Polo Tshirt Half Sleeve",
        "Polo Tshirt Full Sleeve",
        "SweatShirt",
        "Oversize Half Sleeve",
        "Hoodie",
        "Track Pant",
        "Shorts",
    ];
    const libraries = ["places"];
    const [autocomplete, setAutocomplete] = useState(null);
    const [formData, setFormData] = useState({
        place: "",
        state: "",
        district: "",
    });
    const onLoad = (autoC) => {
        setAutocomplete(autoC);
    };

    useEffect(() => {
        fetchCustomer();
        fetchPlace();
    }, []);

    useEffect(() => {
        const fetchInvoice = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/admin/bill/last_invoice/`);
                const lastInvoice = res.data.invoice_no;

                const newInvoice = generateInvoiceNumber(lastInvoice);

                setNewBill((prev) => ({
                    ...prev,
                    invoice_no: newInvoice,
                }));
            } catch (err) {
                console.error(err);
            }
        };

        fetchInvoice();
    }, []);

    // Fetch customer
    const fetchCustomer = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(
                `${BASE_URL}/admin/customer/`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("adminAccessToken")}`,
                    },
                }
            );
            setCustomer(response.data.results || []);

        } catch (err) {
            console.log(err);
            setError("Error fetching Customer.");
            toast.error("Failed to load Customer. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };


    // Fetch tax
    const fetchPlace = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(
                `${BASE_URL}/admin/tax/`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("adminAccessToken")}`,
                    },
                }
            );
            setPlace(response.data.results || []);

        } catch (err) {
            console.log(err);
            setError("Error fetching Place.");
            toast.error("Failed to load Place. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };


    // Add new bill (POST request)
    const handleAddBill = async () => {
        // if (!newEmployee.name.trim()) {
        //     toast.error("Please enter employee name");
        //     return;
        // }

        setIsAdding(true);
        try {
            const payload = {
                ...newBill,
                items: items.map(item => ({
                    ...item,
                    qty: Number(item.qty),
                    rate: Number(item.rate),
                    discount: Number(item.discount),
                })),
            };
            const response = await axios.post(
                `${BASE_URL}/admin/bill/`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("adminAccessToken")}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.data) {
                toast.success("Bill added successfully!");
                resetForm();

            }
        } catch (error) {
            console.error("Error adding BILL:", error);
            if (error.response) {
                if (error.response.status === 400) {
                    const errorData = error.response.data;
                    // if (errorData.name) {
                    //     toast.error(errorData.name[0]);
                    // } else if (errorData.detail) {
                    //     toast.error(errorData.detail);
                    // } else {
                    //     toast.error("Validation error. Please check your input.");
                    // }
                } else if (error.response.status === 401) {
                    toast.error("Unauthorized. Please login again.");
                } else if (error.response.status === 403) {
                    toast.error("You don't have permission to add employees.");
                } else {
                    toast.error("Failed to add employee. Please try again.");
                }
            } else if (error.request) {
                toast.error("Network error. Please check your connection.");
            } else {
                //toast.error("An error occurred. Please try again.");
            }
        } finally {
            setIsAdding(false);
        }
    };

    const handleAddRow = () => {
        setItems([
            ...items,
            {
                product: "",
                hsn: "",
                qty: 1,
                rate: 0,
                amount: 0,
                discount: 0,
                total: 0,
            },
        ]);
    };

    const handleDeleteRow = (index) => {
        const updatedItems = items.filter((_, i) => i !== index);
        setItems(updatedItems);
    };

    const [invoiceDate, setInvoiceDate] = useState(() => {
        const today = new Date();
        return today.toISOString().split("T")[0]; // required format for input
    });

    const generateInvoiceNumber = (lastInvoice) => {
        const now = new Date();

        const year = now.getFullYear();
        const nextYear = year + 1;

        const shortYear = year.toString().slice(-2);
        const shortNextYear = nextYear.toString().slice(-2);

        const financialYear = `${shortYear}-${shortNextYear}`;

        let nextNumber = 1;

        if (lastInvoice) {
            const prefix = lastInvoice.split("/")[0]; // HG-001
            const numberPart = prefix.split("-")[1];  // 001

            nextNumber = parseInt(numberPart, 10) + 1;
        }

        const paddedNumber = String(nextNumber).padStart(3, "0");

        return `HG-${paddedNumber}/${financialYear}`;
    };

    const handleChange = (index, field, value) => {
        setItems((prevItems) => {
            const updated = [...prevItems];
            updated[index][field] = value;

            const qty = Number(updated[index].qty) || 0;
            const rate = Number(updated[index].rate) || 0;
            const discount = Number(updated[index].discount) || 0;

            const amount = qty * rate;
            const total = amount - discount;

            updated[index].amount = amount.toFixed(2);;
            updated[index].total = total.toFixed(2);;

            return updated;
        });
    };
    useEffect(() => {
        const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format
        setNewBill(prev => ({
            ...prev,
            invoice_date: today, supply_date: today
        }));

    }, []);
    const inputStyle = {
        width: "100%",
        padding: "8px",
        margin: "8px 0",
        borderRadius: "5px",
        border: "1px solid #ccc"
    };

    const onPlaceChanged = () => {
        if (autocomplete) {
            const place = autocomplete.getPlace();

            let state = "";
            let district = "";

            place.address_components.forEach((component) => {
                if (component.types.includes("administrative_area_level_1")) {
                    state = component.long_name;
                }
                if (
                    component.types.includes("administrative_area_level_2") ||
                    component.types.includes("locality")
                ) {
                    district = component.long_name;
                }
            });

            setFormData({
                place: place.formatted_address,
                state,
                district,
            });
        }
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
                                Bill Generation
                            </h1>
                        </div>
                    </div>

                </div>
            </div>

            {/* Bill generate values */}

            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 space-y-6">

                {/* 🔹 Invoice Details */}
                <div className="flex flex-wrap gap-3">

                    <div className="w-[130px]">
                        <label className="text-xs">Customer</label>
                        <select
                            value={newBill.customer}
                            onChange={(e) =>
                                setNewBill(prev => ({
                                    ...prev,
                                    customer: e.target.value
                                }))
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                            disabled={isAdding}
                        >
                            <option value="">Customer</option>
                            {customer.map((customer) => (
                                <option key={customer.id} value={customer.id}>
                                    {customer.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="w-[140px]">
                        <label className="text-xs">Invoice No</label>
                        <input className="input" placeholder="Invoice No" value={newBill.invoice_no} readOnly />
                    </div>

                    <div className="w-[140px]">
                        <label className="text-xs">Invoice Date</label>
                        <input type="date" className="input" value={newBill.invoice_date}
                            onChange={(e) => setInvoiceDate(e.target.value)} />
                    </div>

                    <div className="w-[100px]">
                        <label className="text-xs">Reverse Charge</label>
                        <select
                            className="input"
                            value={newBill.reverse_charge}
                            onChange={(e) =>
                                setNewBill({
                                    ...newBill,
                                    reverse_charge: e.target.value === "true"
                                })
                            }
                        >
                            <option value="false">N</option>
                            <option value="true">Y</option>
                        </select>
                    </div>

                    <div className="w-[140px]">
                        <label className="text-xs">Transport</label>
                        <input className="input" placeholder="Road / Air" value={newBill.transport_mode} onChange={(e) =>
                            setNewBill({ ...newBill, transport_mode: e.target.value })
                        } />
                    </div>

                    <div className="w-[140px]">
                        <label className="text-xs">Vehicle</label>
                        <input className="input" placeholder="TN 00 AB 1234" value={newBill.transport_vehicle} onChange={(e) =>
                            setNewBill({ ...newBill, transport_vehicle: e.target.value })
                        } />
                    </div>

                    <div className="w-[140px]">
                        <label className="text-xs">Supply Date</label>
                        <input type="date" className="input" value={newBill.supply_date} onChange={(e) =>
                            setNewBill({ ...newBill, supply_date: e.target.value })
                        } />
                    </div>

                    <div className="w-[120px]">
                        <label className="text-xs">Place</label>
                        <select
                            value={newBill.tax}
                            onChange={(e) =>
                                setNewBill({ ...newBill, tax: e.target.value })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                            disabled={isAdding}
                        >
                            <option value="">Place</option>
                            {place.map((place) => (
                                <option key={place.id} value={place.id}>
                                    {place.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <LoadScript
                        googleMapsApiKey="YOUR_API_KEY"
                        libraries={libraries}
                    >
                        <div style={{ width: "300px", margin: "20px auto" }}>

                            <label>Search Location</label>
                            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                                <input
                                    type="text"
                                    placeholder="Type place (e.g. Chen...)"
                                    style={inputStyle}
                                />
                            </Autocomplete>

                            <label>State</label>
                            <input value={formData.state} readOnly style={inputStyle} />

                            <label>District</label>
                            <input value={formData.district} readOnly style={inputStyle} />

                        </div>
                    </LoadScript>


                </div>

                {/* 🔹 Items Section */}
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="text-md font-semibold">Items</h2>

                        <button
                            onClick={handleAddRow}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm flex items-center gap-1"
                        >
                            <FaPlus /> Add
                        </button>
                    </div>

                    {/* Header */}
                    <div className="grid grid-cols-[220px_100px_70px_100px_120px_100px_120px] gap-2 text-xs font-semibold text-gray-600 border-b pb-2">
                        <div>Description</div>
                        <div>HSN/SAC</div>
                        <div>Qty</div>
                        <div>Rate</div>
                        <div>Amount</div>
                        <div>Discount</div>
                        <div>Total</div>
                        <div></div> {/* Delete column */}
                    </div>

                    {/* Rows */}
                    <div className="space-y-2 mt-2 overflow-x-auto">
                        {items.map((item, index) => (
                            <div
                                key={index}
                                className="grid grid-cols-[220px_100px_70px_100px_120px_100px_120px_40px] gap-2 mt-2 items-center">

                                <select
                                    className="input"
                                    value={item.product || ""}
                                    onChange={(e) =>
                                        handleChange(index, "product", e.target.value)
                                    }
                                >
                                    <option value="">Select</option>
                                    {productOptions.map((p, i) => (
                                        <option key={i} value={p}>
                                            {p}
                                        </option>
                                    ))}
                                </select>

                                <input type="text" className="input" value={item.hsn} onChange={(e) =>
                                    handleChange(index, "hsn", e.target.value)
                                } />

                                <input type="number" className="input" value={item.qty} onChange={(e) =>
                                    handleChange(index, "qty", e.target.value)
                                } />

                                <input type="number" className="input" value={item.rate} onChange={(e) =>
                                    handleChange(index, "rate", e.target.value)
                                } />

                                <input className="input bg-gray-100" value={item.amount} readOnly />

                                <input type="number" className="input" value={item.discount} onChange={(e) =>
                                    handleChange(index, "discount", e.target.value)
                                } />

                                <input className="input bg-gray-100" value={item.total} readOnly />

                                {/* ❌ Delete Button */}
                                <button
                                    onClick={() => handleDeleteRow(index)}
                                    className="text-red-500 hover:text-red-700 flex justify-center"
                                >
                                    <FaTimes />
                                </button>

                            </div>
                        ))}
                    </div>
                </div>

                {/* 🔹 Footer Buttons */}
                <div className="flex justify-end gap-3 pt-4 border-t">
                    <button className="px-4 py-2 bg-gray-200 rounded-lg">
                        Cancel
                    </button>
                    <button onClick={handleAddBill} className="px-4 py-2 bg-red-600 text-white rounded-lg flex items-center gap-2">
                        <FaSave />
                        Save Invoice
                    </button>
                </div>

            </div>



        </div>
    );
};

export default BillGenerationSimple;
