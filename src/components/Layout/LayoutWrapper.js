"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <>
     {!isDashboard && <Header />}
      {children}
      {!isDashboard && <Footer />}
    </>
  );
}