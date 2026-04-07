import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../../config";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash, FaLock, FaUser } from "react-icons/fa";

const Login = ({ setIsAuthenticated }) => {
  // Add this prop
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validation
    if (!username.trim()) {
      toast.error("Please enter username");
      setIsLoading(false);
      return;
    }

    if (!password) {
      toast.error("Please enter password");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/admin/login/`, {
        username: username.trim(),
        password: password,
      });

      console.log("Login response:", response.data);

      const { access_token, refresh_token } = response.data;

      // Check if tokens exist
      if (access_token && refresh_token) {
        localStorage.setItem("adminAccessToken", access_token);
        localStorage.setItem("adminRefreshToken", refresh_token);
        localStorage.setItem("userRole", "admin");
        localStorage.setItem("username", response.data.username || username);

        // Update authentication state
        setIsAuthenticated(true);

        toast.success("Admin logged in successfully.");

        // Navigate to dashboard
        setTimeout(() => {
          navigate("/admin/dashboard/", { replace: true });
        }, 500);
      } else {
        console.error("Tokens missing in response:", response.data);
        toast.error("Login failed. No token received.");
      }
    } catch (err) {
      console.error("Login error details:", err);
      console.error("Error response:", err.response);

      if (err.response?.status === 401) {
        toast.error("Invalid username or password.");
      } else if (err.response?.status === 400) {
        toast.error("Invalid credentials.");
      } else if (err.response?.status === 500) {
        toast.error("Server error. Please try again later.");
      } else if (err.response?.data?.detail) {
        toast.error(err.response.data.detail);
      } else {
        toast.error("Failed to login. Please check your connection.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Check if input has value for label animation
  const hasUsernameValue = username.trim() !== "";
  const hasPasswordValue = password !== "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 via-red-600 to-red-700 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-red-900/10"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 w-full max-w-md border border-red-100 transform transition-all duration-300 hover:shadow-3xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
              <FaLock className="text-white text-xl" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Admin <span className="text-red-600">Portal</span>
          </h1>
          <p className="text-gray-600">Sign in to access the dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Username Field */}
          <div className="relative">
            <div className="flex items-center border-b-2 border-gray-300 focus-within:border-red-500 transition-all duration-300">
              <FaUser className="text-gray-400 ml-2 mr-3 transition-colors duration-300 group-focus-within:text-red-500" />
              <div className="relative flex-1">
                <label
                  className={`absolute left-0 transition-all duration-300 pointer-events-none ${
                    isUsernameFocused || hasUsernameValue
                      ? "top-0 text-xs text-red-500 font-medium"
                      : "top-3 text-gray-500"
                  }`}
                >
                  Username
                </label>
                <input
                  type="text"
                  className="w-full pt-5 pb-2 bg-transparent outline-none text-gray-800 placeholder-transparent"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onFocus={() => setIsUsernameFocused(true)}
                  onBlur={() => setIsUsernameFocused(false)}
                />
              </div>
            </div>
          </div>

          {/* Password Field */}
          <div className="relative">
            <div className="flex items-center border-b-2 border-gray-300 focus-within:border-red-500 transition-all duration-300">
              <FaLock className="text-gray-400 ml-2 mr-3 transition-colors duration-300 group-focus-within:text-red-500" />
              <div className="relative flex-1">
                <label
                  className={`absolute left-0 transition-all duration-300 pointer-events-none ${
                    isPasswordFocused || hasPasswordValue
                      ? "top-0 text-xs text-red-500 font-medium"
                      : "top-3 text-gray-500"
                  }`}
                >
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full pt-5 pb-2 bg-transparent outline-none text-gray-800 placeholder-transparent"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setIsPasswordFocused(true)}
                  onBlur={() => setIsPasswordFocused(false)}
                />
              </div>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors focus:outline-none"
                tabIndex="-1"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                Signing In...
              </div>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>

      {/* Add CSS animation styles */}
      <style>
        {`
          @keyframes blob {
            0% {
              transform: translate(0px, 0px) scale(1);
            }
            33% {
              transform: translate(30px, -50px) scale(1.1);
            }
            66% {
              transform: translate(-20px, 20px) scale(0.9);
            }
            100% {
              transform: translate(0px, 0px) scale(1);
            }
          }
          .animate-blob {
            animation: blob 7s infinite;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .animation-delay-4000 {
            animation-delay: 4s;
          }
        `}
      </style>
    </div>
  );
};

export default Login;
