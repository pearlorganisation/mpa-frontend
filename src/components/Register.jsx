"use client";
import React, { useState } from "react";
import { useRegisterMutation } from "../store/apiSlice";
import {  User, Mail, Lock, Building, UserPlus, Loader2} from "lucide-react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", affiliation: "" });
  const [registerUser, { isLoading }] = useRegisterMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData).unwrap();
      toast.success("Account created! Please verify your email.", {
        duration: 6000,
        icon: '🚀',
      });
    } catch (err) {
      toast.error(err.data?.message || "Registration failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFFBEB] via-white to-[#ECFDF5] flex items-center justify-center p-4">
      <Toaster position="top-center" />
      
      <div className="bg-white/80 backdrop-blur-lg p-8 rounded-[2.5rem] shadow-2xl border border-white w-full max-w-lg">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#713F12] tracking-tight">Join Us</h2>
          <p className="text-gray-500 mt-2 font-medium">Start your research journey today</p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5">
          {/* Full Name */}
          <div className="relative group">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#10B981]" size={20} />
            <input 
              type="text" 
              placeholder="Full Name" 
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 outline-none focus:border-[#10B981] focus:ring-4 focus:ring-emerald-500/10 transition-all bg-gray-50/50" 
              onChange={(e) => setFormData({...formData, name: e.target.value})} 
              required 
            />
          </div>
          
          {/* Email */}
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#10B981]" size={20} />
            <input 
              type="email" 
              placeholder="Email Address" 
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 outline-none focus:border-[#10B981] focus:ring-4 focus:ring-emerald-500/10 transition-all bg-gray-50/50" 
              onChange={(e) => setFormData({...formData, email: e.target.value})} 
              required 
            />
          </div>
          
          {/* Password */}
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#10B981]" size={20} />
            <input 
              type="password" 
              placeholder="Create Password" 
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 outline-none focus:border-[#10B981] focus:ring-4 focus:ring-emerald-500/10 transition-all bg-gray-50/50" 
              onChange={(e) => setFormData({...formData, password: e.target.value})} 
              required 
            />
          </div>
          
          {/* Affiliation */}
          <div className="relative group">
            <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#10B981]" size={20} />
            <input 
              type="text" 
              placeholder="University / Organization" 
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 outline-none focus:border-[#10B981] focus:ring-4 focus:ring-emerald-500/10 transition-all bg-gray-50/50" 
              onChange={(e) => setFormData({...formData, affiliation: e.target.value})} 
              required 
            />
          </div>

          {/* Submit Button */}
          <button 
            disabled={isLoading} 
            className="w-full bg-[#10B981] text-white py-4 mt-2 rounded-2xl font-bold text-lg hover:bg-[#059669] transform transition-all active:scale-95 flex items-center justify-center gap-3 shadow-lg shadow-emerald-200 disabled:opacity-70"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : (
              <>
                Create Account <UserPlus size={20} />
              </>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <p className="mt-8 text-center text-gray-600 font-medium">
          Already have an account? 
          <Link href="/login" className="text-[#10B981] font-bold ml-2 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;