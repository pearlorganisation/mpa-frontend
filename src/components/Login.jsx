"use client";
import React, { useState } from "react";
import { useLoginMutation  } from "../store/apiSlice";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser, { isLoading }] = useLoginMutation();
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser({ email, password }).unwrap();
      localStorage.setItem("token", res.token); // Token save karein
      alert("Login Success!");
      router.push("/submit"); // Submit page par redirect karein
    } catch (err) {
      alert(err.data?.message || "Invalid Credentials");
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFBEB]/30 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-emerald-50 w-full max-w-md">
        <h2 className="text-3xl font-bold text-[#713F12] mb-6 text-center">Researcher Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="email" placeholder="Email" className="w-full p-4 rounded-xl border border-[#6EE7B7] outline-none" 
            onChange={(e) => setEmail(e.target.value)} required />
          
          <input type="password" placeholder="Password" className="w-full p-4 rounded-xl border border-[#6EE7B7] outline-none" 
            onChange={(e) => setPassword(e.target.value)} required />

          <button disabled={isLoading} className="w-full bg-[#10B981] text-white py-4 rounded-xl font-bold hover:bg-[#059669] flex items-center justify-center gap-2">
            {isLoading ? <Loader2 className="animate-spin" /> : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;