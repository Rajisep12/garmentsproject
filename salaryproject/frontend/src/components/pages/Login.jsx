import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../../config";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash, FaLock, FaUser } from "react-icons/fa";
import bannerImg from "../../assets/hayati-banner.jpeg";

const Login = ({ setIsAuthenticated }) => {
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

      if (access_token && refresh_token) {
        localStorage.setItem("adminAccessToken", access_token);
        localStorage.setItem("adminRefreshToken", refresh_token);
        localStorage.setItem("userRole", "admin");
        localStorage.setItem("username", response.data.username || username);

        setIsAuthenticated(true);

        toast.success("Admin logged in successfully.");

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

  const hasUsernameValue = username.trim() !== "";
  const hasPasswordValue = password !== "";

  return (
    <div className="min-h-screen bg-[#161211] flex items-stretch font-[Work Sans]">
      {/* Fonts */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Work+Sans:wght@400;500;600&family=Space+Mono:wght@400;700&display=swap');

          .font-display { font-family: 'Fraunces', serif; font-optical-sizing: auto; }
          .font-body { font-family: 'Work Sans', sans-serif; }
          .font-tag { font-family: 'Space Mono', monospace; letter-spacing: 0.08em; }

          @keyframes stitch-move {
            0% { stroke-dashoffset: 0; }
            100% { stroke-dashoffset: -24; }
          }
          .stitch-line {
            stroke-dasharray: 6 6;
            animation: stitch-move 2.5s linear infinite;
          }
          @keyframes tag-swing {
            0%, 100% { transform: rotate(-2deg); }
            50% { transform: rotate(2deg); }
          }
          .tag-swing {
            transform-origin: top center;
            animation: tag-swing 6s ease-in-out infinite;
          }
          .weave-bg {
            background-image:
              repeating-linear-gradient(45deg, rgba(184,145,47,0.06) 0px, rgba(184,145,47,0.06) 1px, transparent 1px, transparent 14px),
              repeating-linear-gradient(-45deg, rgba(184,145,47,0.06) 0px, rgba(184,145,47,0.06) 1px, transparent 1px, transparent 14px);
          }
        `}
      </style>

      {/* LEFT — brand panel */}
      <div className="hidden lg:flex lg:w-[46%] relative overflow-hidden border-r border-[#3a322f]">
        <img
          src={bannerImg}
          alt="Hayati Garments — Customized T-Shirts"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* RIGHT — the "swing tag" login card */}
      <div className="flex-1 flex items-center justify-center bg-[#F1E9DC] relative p-6">
        <div className="w-full max-w-sm tag-swing">
          {/* punch hole + loop */}
          <div className="flex justify-center -mb-1 relative z-10">
            <svg width="64" height="40" viewBox="0 0 64 40">
              <path
                d="M12 30 Q12 4 32 4 Q52 4 52 30"
                fill="none"
                stroke="#8a1620"
                strokeWidth="3"
              />
              <circle
                cx="32"
                cy="10"
                r="6"
                fill="#F1E9DC"
                stroke="#221D1B"
                strokeWidth="2"
              />
            </svg>
          </div>

          <div className="relative bg-[#FBF6EC] border border-[#221D1B]/15 shadow-[0_18px_40px_-12px_rgba(34,29,27,0.35)] rounded-sm rounded-tl-[3rem]">
            {/* dashed stitch border, inset */}
            <div className="absolute inset-[8px] border border-dashed border-[#B8912F]/50 rounded-sm rounded-tl-[2.6rem] pointer-events-none" />

            <div className="relative p-10 pt-9">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="font-tag text-[10px] text-[#A61B29] uppercase mb-1">
                    Admin Access Only
                  </p>
                  <h2 className="font-display text-3xl text-[#221D1B]">
                    Sign in
                  </h2>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#A61B29] flex items-center justify-center shrink-0">
                  <FaLock className="text-[#F1E9DC] text-sm" />
                </div>
              </div>

              <form onSubmit={handleLogin} className="space-y-7">
                {/* Username */}
                <div className="relative">
                  <div className="flex items-center gap-3 border-b border-[#221D1B]/25 focus-within:border-[#A61B29] transition-colors duration-300 pb-1">
                    <FaUser className="text-[#8a1620]/60 text-sm shrink-0" />
                    <div className="relative flex-1">
                      <label
                        className={`absolute left-0 font-tag uppercase transition-all duration-200 pointer-events-none ${
                          isUsernameFocused || hasUsernameValue
                            ? "-top-4 text-[9px] text-[#A61B29]"
                            : "top-1 text-[11px] text-[#221D1B]/50"
                        }`}
                      >
                        Username
                      </label>
                      <input
                        type="text"
                        className="w-full pt-4 pb-1 bg-transparent outline-none font-body text-[#221D1B] text-sm"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onFocus={() => setIsUsernameFocused(true)}
                        onBlur={() => setIsUsernameFocused(false)}
                        autoComplete="username"
                      />
                    </div>
                  </div>
                </div>

                {/* Password */}
                <div className="relative">
                  <div className="flex items-center gap-3 border-b border-[#221D1B]/25 focus-within:border-[#A61B29] transition-colors duration-300 pb-1">
                    <FaLock className="text-[#8a1620]/60 text-sm shrink-0" />
                    <div className="relative flex-1">
                      <label
                        className={`absolute left-0 font-tag uppercase transition-all duration-200 pointer-events-none ${
                          isPasswordFocused || hasPasswordValue
                            ? "-top-4 text-[9px] text-[#A61B29]"
                            : "top-1 text-[11px] text-[#221D1B]/50"
                        }`}
                      >
                        Password
                      </label>
                      <input
                        type={showPassword ? "text" : "password"}
                        className="w-full pt-4 pb-1 bg-transparent outline-none font-body text-[#221D1B] text-sm"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setIsPasswordFocused(true)}
                        onBlur={() => setIsPasswordFocused(false)}
                        autoComplete="current-password"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-[#221D1B]/40 hover:text-[#A61B29] transition-colors focus:outline-none shrink-0"
                      tabIndex="-1"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <FaEyeSlash size={13} /> : <FaEye size={13} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-3.5 font-tag text-xs uppercase tracking-[0.15em] transition-all duration-300 rounded-sm relative overflow-hidden ${
                    isLoading
                      ? "bg-[#221D1B]/30 text-[#F1E9DC]/70 cursor-not-allowed"
                      : "bg-[#A61B29] text-[#F1E9DC] hover:bg-[#8a1620] active:scale-[0.98]"
                  }`}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin h-4 w-4"
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
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Signing in
                    </span>
                  ) : (
                    "Sign in"
                  )}
                </button>
              </form>
            </div>
          </div>

          <p className="font-tag text-center text-[9px] text-[#221D1B]/40 uppercase mt-5">
            Handle with care · GarmentsProject © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;