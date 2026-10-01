import {
  ShieldCheck,
  Shield,
  Car,
  House,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Check,
} from "lucide-react";

import { useState } from "react";
import { useNavigate } from "react-router";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [emailOrMobile, setEmailOrMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    setError("");

    // Check login credentials
    if (
      emailOrMobile === "joyal@gmail.com" &&
      password === "joyal@123"
    ) {
      // Login success
      localStorage.setItem("isLoggedIn", "true");

      // Go to dashboard
      navigate("/dashboard");
    } else {
      // Login failed
      setError("Invalid email or password");
    }
  };

  return (
    <div className="w-full min-h-screen flex bg-white">

      {/* ================= LEFT SIDE ================= */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-[#5650e6] to-[#7c78f2] text-white relative overflow-hidden">

        {/* Decorative circles */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/10 rounded-full" />
        <div className="absolute bottom-[-100px] right-[-100px] w-96 h-96 bg-white/10 rounded-full" />

        <div className="relative z-10 flex flex-col justify-between w-full p-12">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
              <ShieldCheck className="text-[#5650e6]" size={28} />
            </div>

            <div>
              <h1 className="text-2xl font-bold">
                SecureLife
              </h1>

              <p className="text-sm text-white/70">
                Insurance Management
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-lg">

            <div className="mb-8">
              <Shield size={70} className="text-white/90" />
            </div>

            <h2 className="text-5xl font-bold leading-tight mb-6">
              Protecting What
              <br />
              Matters Most
            </h2>

            <p className="text-lg text-white/80 leading-relaxed">
              Manage your insurance policies, customers,
              claims and everything you need from one
              secure platform.
            </p>

            {/* Features */}
            <div className="mt-10 space-y-5">

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <Check size={20} />
                </div>

                <span>
                  Secure Insurance Management
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <Car size={20} />
                </div>

                <span>
                  Manage Vehicle Insurance
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <House size={20} />
                </div>

                <span>
                  Manage Property Insurance
                </span>
              </div>

            </div>
          </div>

          {/* Bottom */}
          <p className="text-sm text-white/60">
            © 2026 SecureLife. All rights reserved.
          </p>

        </div>
      </div>

      {/* ================= RIGHT SIDE ================= */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 sm:px-12">

        <div className="w-full max-w-md">

          {/* Welcome */}
          <div className="mb-8">

            <h2 className="text-3xl font-bold text-gray-900">
              Welcome Back
            </h2>

            <p className="mt-2 text-gray-500">
              Sign in to continue to your dashboard
            </p>

          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">

            {/* Email */}
            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>

              <div className="relative">

                <Mail
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="email"
                  value={emailOrMobile}
                  onChange={(e) => setEmailOrMobile(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#5650e6]/20 focus:border-[#5650e6]"
                />

              </div>

            </div>

            {/* Password */}
            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>

              <div className="relative">

                <Lock
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-12 py-3.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#5650e6]/20 focus:border-[#5650e6]"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>

              </div>

            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            {/* Remember / Forgot */}
            <div className="flex items-center justify-between">

              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">

                <input
                  type="checkbox"
                  className="w-4 h-4 accent-[#5650e6]"
                />

                Remember me

              </label>

              <button
                type="button"
                className="text-sm font-medium text-[#5650e6] hover:underline"
              >
                Forgot password?
              </button>

            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-[#5650e6] hover:bg-[#4d47d1] text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-200"
            >
              Login
              <ArrowRight size={20} />
            </button>

          </form>

          {/* Google Login */}
          <div className="mt-8">

            <div className="relative flex items-center">
              <div className="flex-grow border-t border-gray-200" />

              <span className="mx-4 text-sm text-gray-400">
                OR
              </span>

              <div className="flex-grow border-t border-gray-200" />
            </div>

            <button
              type="button"
              className="mt-6 w-full border border-gray-200 py-3.5 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition"
            >
              Continue with Google
            </button>

          </div>

          {/* Contact */}
          <p className="text-center text-sm text-gray-500 mt-8">
            Need help?{" "}
            <span className="text-[#5650e6] font-medium">
              Contact Support
            </span>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;