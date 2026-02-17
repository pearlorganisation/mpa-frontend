"use client";
import React, { useState } from "react";
import { useRegisterMutation } from "../store/apiSlice";
import { Loader2 } from "lucide-react";
import Link from "next/link";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", affiliation: "" });
  const [registerUser, { isLoading }] = useRegisterMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData).unwrap();
      alert("Registration Successful! Please check your email to verify account.");
    } catch (err) {
      alert(err.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFBEB]/30 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-emerald-50 w-full max-w-md">
        <h2 className="text-3xl font-bold text-[#713F12] mb-6 text-center">Create Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Full Name" className="w-full p-4 rounded-xl border border-[#6EE7B7] outline-none" 
            onChange={(e) => setFormData({...formData, name: e.target.value})} required />
          
          <input type="email" placeholder="Email Address" className="w-full p-4 rounded-xl border border-[#6EE7B7] outline-none" 
            onChange={(e) => setFormData({...formData, email: e.target.value})} required />
          
          <input type="password" placeholder="Password" className="w-full p-4 rounded-xl border border-[#6EE7B7] outline-none" 
            onChange={(e) => setFormData({...formData, password: e.target.value})} required />
          
          <input type="text" placeholder="Affiliation (University/Org)" className="w-full p-4 rounded-xl border border-[#6EE7B7] outline-none" 
            onChange={(e) => setFormData({...formData, affiliation: e.target.value})} required />

          <button disabled={isLoading} className="w-full bg-[#10B981] text-white py-4 rounded-xl font-bold hover:bg-[#059669] flex items-center justify-center gap-2">
            {isLoading ? <Loader2 className="animate-spin" /> : "Register"}
          </button>
        </form>
        <p className="mt-6 text-center text-[#854D0E]">
          Already have an account? <Link href="/login" className="text-[#10B981] font-bold">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;