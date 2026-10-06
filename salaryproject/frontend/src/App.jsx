import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Admin Imports (moved into pages/admin)
import Layout from "./components/layout/Layout";
import Dashboard from "./components/pages/Dashboard";
import EmployeeManagement from "./components/pages/admin/employee/EmployeeManagement";
import CustomerManagement from "./components/pages/admin/customer/CustomerManagement";
import OrderManagement from "./components/pages/admin/order/OrderManagement";
import SalaryManagement from "./components/pages/admin/salary/SalaryManagement";
import BillGeneration from "./components/pages/admin/bill/BillGenerationSimple";
import TaxManagement from "./components/pages/admin/tax/TaxManagement";
import InvoiceManagement from "./components/pages/admin/invoice/InvoiceManagement";
import BalanceSheet from "./components/pages/admin/customer/Customerbalancesheet";
import PaymentManagement from "./components/pages/admin/payment/PaymentManagement";
import Login from "./components/pages/Login";

// Website Imports
import { CartProvider } from "./context/CartContext";
import WebsiteLayout from "./components/website/WebsiteLayout";
import Home from "./pages/website/Home";
import Products from "./pages/website/Products";
import Services from "./pages/website/Services";
import About from "./pages/website/About";
import Contact from "./pages/website/Contact";
import CartPage from "./pages/website/CartPage";

import "./App.css";

// Token validation function
const isTokenValid = () => {
  const token = localStorage.getItem("adminAccessToken");
  return !!token;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(isTokenValid());
  }, []);

  return (
    <CartProvider>
      <Router>
        <div className="App">
          <ToastContainer
            position="top-right"
            autoClose={2500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnHover
            theme="dark"
          />

          <Routes>
            {/* Root: Default to Admin Panel (or Login if not authenticated) */}
            <Route
              path="/"
              element={
                <Navigate to={isTokenValid() ? "/admin/dashboard/" : "/login"} replace />
              }
            />

            {/* Admin Login */}
            <Route
              path="/login"
              element={<Login setIsAuthenticated={setIsAuthenticated} />}
            />

            {/* Admin Management Protected Routes */}
            <Route
              path="/admin"
              element={isTokenValid() ? <Layout /> : <Navigate to="/login" replace />}
            >
              <Route index element={<Navigate to="/admin/dashboard/" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="dashboard/" element={<Dashboard />} />
              <Route path="employees" element={<EmployeeManagement />} />
              <Route path="customer" element={<CustomerManagement />} />
              <Route path="order" element={<OrderManagement />} />
              <Route path="salary" element={<SalaryManagement />} />
              <Route path="bill" element={<BillGeneration />} />
              <Route path="payment" element={<PaymentManagement />} />
              <Route path="tax" element={<TaxManagement />} />
              <Route path="invoice" element={<InvoiceManagement />} />
              <Route path="balancesheet" element={<BalanceSheet />} />
            </Route>

            {/* Public Website Pages (available at /website, /home, /products, etc.) */}
            <Route element={<WebsiteLayout />}>
              <Route path="/website" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/services" element={<Services />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<CartPage />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
