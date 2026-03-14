"use client";
import React, { useState } from "react";
import { useLoginMutation } from "../store/apiSlice";
import { useRouter } from "next/navigation";
import { Loader2, Mail, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser, { isLoading }] = useLoginMutation();
  const router = useRouter();
  const message = "Registration Limit Reached Your registration limit has been fully utilized. As a result, your data can no longer be added to the encryption layer under the current configuration. The active encryption capacity supports only 2 registrations. To continue accepting new registrations securely, please purchase and configure an additional MongoDB encryption key.";

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser({ email, password }).unwrap();
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
      // Professional Success Toast
      toast.success("Welcome back! Login successful.", {
        duration: 4000,
        style: { borderRadius: '10px', background: '#333', color: '#fff' },
      });

      window.location.href = "/submit";

    } catch (err) {
      // Professional Error Toast
      toast.error(err.data?.message || "Invalid credentials. Please try again.");
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFFBEB] via-white to-[#ECFDF5] flex items-center justify-center p-4">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="bg-white/80 backdrop-blur-lg p-8 rounded-[2.5rem] shadow-2xl border border-white w-full max-w-md">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold text-[#713F12] tracking-tight">Welcome Back</h2>
          <p className="text-gray-500 mt-2 font-medium">Please enter your details to login</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email Field */}
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#10B981] transition-colors" size={20} />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 outline-none focus:border-[#10B981] focus:ring-4 focus:ring-emerald-500/10 transition-all bg-gray-50/50"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Field */}
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#10B981] transition-colors" size={20} />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 outline-none focus:border-[#10B981] focus:ring-4 focus:ring-emerald-500/10 transition-all bg-gray-50/50"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-end">
            <button type="button" className="text-sm font-semibold text-[#10B981] hover:underline">Forgot Password?</button>
          </div>

          {/* Login Button */}
          <button
            disabled={isLoading}
            className="w-full bg-[#10B981] text-white py-4 rounded-2xl font-bold text-lg hover:bg-[#059669] transform transition-all active:scale-95 flex items-center justify-center gap-3 shadow-lg shadow-emerald-200 disabled:opacity-70"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : (
              <>
                Login <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>

        <button
          onClick={() =>
            // window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/users/google`
            // window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/users/google`
            toast.error(message, {
              duration: 6000,
              icon: "⚠️",
              style: {
                borderRadius: "12px",
                background: "#7f1d1d",
                color: "#fff",
              },
            })
          }
          className="flex items-center justify-center gap-3
        mt-6 w-full
        bg-white text-gray-700 font-medium
        px-5 py-2.5 rounded-lg
        border border-gray-300
        shadow-sm hover:shadow-md
        hover:bg-gray-50
        transition duration-200"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        {/* Footer Link */}
        <p className="mt-8 text-center text-gray-600 font-medium">
          Don't have an account?
          <Link href="/register" className="text-[#10B981] font-bold ml-2 hover:underline tracking-wide">
            Create Account
          </Link>
        </p>
      </div>
    </div >
  );
};

export default Login;