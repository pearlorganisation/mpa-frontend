"use client";
import { useParams, useRouter } from "next/navigation";
import { useVerifyEmailQuery } from "@/store/apiSlice";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { useEffect } from "react";

export default function VerifyEmailPage() {
  const params = useParams();
  const router = useRouter();
  const token = params.token; 

  const { data, error, isLoading } = useVerifyEmailQuery(token);

  return (
    <div className="min-h-screen bg-[#FFFBEB]/30 flex items-center justify-center p-6">
      <div className="bg-white p-10 rounded-[2rem] shadow-xl border border-emerald-50 w-full max-w-md text-center">
        
        {/* 1. Loading State */}
        {isLoading && (
          <div className="space-y-4">
            <Loader2 className="mx-auto animate-spin text-[#10B981]" size={50} />
            <h2 className="text-2xl font-bold text-[#713F12]">Verifying...</h2>
            <p className="text-[#854D0E]">Please wait, we are verifying your account.</p>
          </div>
        )}

        {/* 2. Success State */}
        {data && (
          <div className="space-y-4">
            <CheckCircle className="mx-auto text-[#10B981]" size={60} />
            <h2 className="text-2xl font-bold text-[#713F12]">Email Verified!</h2>
            <p className="text-[#854D0E]">{data.message || "You can now login to your account."}</p>
            <button 
              onClick={() => router.push("/login")}
              className="mt-6 w-full bg-[#10B981] text-white py-4 rounded-xl font-bold hover:bg-[#059669] transition-all"
            >
              Go to Login
            </button>
          </div>
        )}

        {/* 3. Error State */}
        {error && (
          <div className="space-y-4">
            <XCircle className="mx-auto text-red-500" size={60} />
            <h2 className="text-2xl font-bold text-red-700">Verification Failed</h2>
            <p className="text-red-600">{error.data?.message || "Invalid or expired token."}</p>
            <button 
              onClick={() => router.push("/register")}
              className="mt-4 text-[#10B981] font-bold"
            >
              Try Registering Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
