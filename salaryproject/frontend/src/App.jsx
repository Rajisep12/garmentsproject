import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Layout from "./components/layout/Layout";
import Dashboard from "./components/pages/Dashboard";
import EmployeeManagement from "./components/pages/employee/EmployeeManagement";
import CustomerManagement from "./components/pages/customer/CustomerManagement";
import OrderManagement from "./components/pages/order/OrderManagement";
import SalaryManagement from "./components/pages/salary/SalaryManagement";
import BillGeneration from "./components/pages/bill/BillGenerationSimple";
import TaxManagement from "./components/pages/tax/TaxManagement";
import InvoiceManagement from "./components/pages/invoice/InvoiceManagement";

import "./App.css";
import Login from "./components/pages/Login";

// Token validation function
const isTokenValid = () => {
  const token = localStorage.getItem("adminAccessToken");
  return !!token; // Returns true if token exists, false if not
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication status when app loads
    setIsAuthenticated(isTokenValid());
  }, []);

  return (
    <Router>
      <div className="App">
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
        />

        <Routes>
          <Route
            path="/login"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />
          
            <Route
              path="/"
              element={isTokenValid() ? <Layout /> : <Navigate to="/login" />}
            >
            <Route index path="/admin/dashboard/" element={<Dashboard />} />
            <Route path="/admin/employees" element={<EmployeeManagement />} />
            <Route path="/admin/customer" element={<CustomerManagement />} />
            <Route path="/admin/order" element={<OrderManagement />} />
            <Route path="/admin/salary" element={<SalaryManagement />} />
            <Route path="/admin/bill" element={<BillGeneration />} />
            <Route path="/admin/tax" element={<TaxManagement />} />
            <Route path="/admin/invoice" element={<InvoiceManagement/>} />

          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
