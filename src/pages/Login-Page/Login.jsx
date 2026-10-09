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
  Loader2,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { useAuth } from "../../store/hooks/useAuth";

export default function Login() {
  const { login, loading, error, resetError, isAuthenticated } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [emailOrMobile, setEmailOrMobile] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  /* Clear error on typing */
  useEffect(() => {
    if (error) resetError();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emailOrMobile, password]);

  /* Redirect after successful login */
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!emailOrMobile || !password) return;

    try {
      // login() returns the raw `data` object: { user, rbac, accessToken, refreshToken }
      const data = await login(emailOrMobile, password);

      // ── Split storage: user / rbac / insurance type / tokens ──
      if (data?.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      if (data?.rbac) {
        localStorage.setItem("rbac", JSON.stringify(data.rbac));

        // Auto-select first insurance type so sidebar isn't empty
        const first = data.rbac.insuranceTypes?.[0];
        if (first) {
          localStorage.setItem(
            "selectedInsuranceType",
            JSON.stringify({
              id: first.id,
              name: first.insuranceTypeName,
              nameAlias: first.nameAlias,
              code: first.code,
            }),
          );
        }
      }

      if (data?.accessToken) localStorage.setItem("accessToken", data.accessToken);
      if (data?.refreshToken) localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("isLoggedIn", "true");

      // Let useRbac refresh its state immediately
      window.dispatchEvent(new Event("rbac-updated"));

      // Redirect handled by useEffect above (isAuthenticated flips)
    } catch (err) {
      // Error already captured in redux; nothing to do here
      console.error("[Login] failed:", err);
    }
  };

  return (
    <div className="w-full min-h-screen flex bg-white">
      {/* ================= LEFT SIDE ================= */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-[#5650e6] to-[#7c78f2] text-white relative overflow-hidden">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/10 rounded-full" />
        <div className="absolute bottom-[-100px] right-[-100px] w-96 h-96 bg-white/10 rounded-full" />

        <div className="relative z-10 flex flex-col justify-between w-full p-12">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
              <ShieldCheck className="text-[#5650e6]" size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold">SecureLife</h1>
              <p className="text-sm text-white/70">Insurance Management</p>
            </div>
          </div>

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
              Manage your insurance policies, customers, claims and everything
              you need from one secure platform.
            </p>

            <div className="mt-10 space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <Check size={20} />
                </div>
                <span>Secure Insurance Management</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <Car size={20} />
                </div>
                <span>Manage Vehicle Insurance</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <House size={20} />
                </div>
                <span>Manage Property Insurance</span>
              </div>
            </div>
          </div>

          <p className="text-sm text-white/60">
            © 2026 SecureLife. All rights reserved.
          </p>
        </div>
      </div>

      {/* ================= RIGHT SIDE ================= */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 sm:px-12">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
            <p className="mt-2 text-gray-500">
              Sign in to continue to your dashboard
            </p>
          </div>

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
                  required
                  autoComplete="email"
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
                  required
                  autoComplete="current-password"
                  className="w-full pl-12 pr-12 py-3.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#5650e6]/20 focus:border-[#5650e6]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
                {typeof error === "string" ? error : JSON.stringify(error)}
              </div>
            )}

            {/* Remember / Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 accent-[#5650e6]" />
                Remember me
              </label>
              <button
                type="button"
                className="text-sm font-medium text-[#5650e6] hover:underline"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#5650e6] hover:bg-[#4d47d1] disabled:opacity-70 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-200"
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Login
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          {/* Google */}
          <div className="mt-8">
            <div className="relative flex items-center">
              <div className="flex-grow border-t border-gray-200" />
              <span className="mx-4 text-sm text-gray-400">OR</span>
              <div className="flex-grow border-t border-gray-200" />
            </div>
            <button
              type="button"
              className="mt-6 w-full border border-gray-200 py-3.5 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition"
            >
              Continue with Google
            </button>
          </div>

          <p className="text-center text-sm text-gray-500 mt-8">
            Need help?{" "}
            <span className="text-[#5650e6] font-medium">Contact Support</span>
          </p>
        </div>
      </div>
    </div>
  );
}