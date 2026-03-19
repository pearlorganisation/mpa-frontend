"use client";

import ResearcherSidebar from "@/components/ResearcherPannel/Layout/ResearcherSidebar";
import React from "react";

export default function ResearcherLayout({ children }) {
  return (
    // 1. Set the height to h-screen and hide the main page scrollbar with overflow-hidden
    <div className="flex flex-col lg:flex-row h-screen overflow-hidden bg-[#FDFBF7]">
      
      {/* 
          Sidebar stays here. 
          On desktop, it takes its 64px width and 100% height.
          On mobile, it shows the header.
      */}
      <ResearcherSidebar />

      {/* 
          2. Main Content Area gets 'overflow-y-auto'.
          This makes ONLY the content scroll, while the sidebar stays locked.
      */}
      <main className="flex-1 w-full min-w-0 overflow-y-auto overflow-x-hidden transition-all duration-300">
        <div className="min-h-full">
          {children}
        </div>
      </main>
    </div>
  );
}