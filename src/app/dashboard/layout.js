"use client";

import ResearcherSidebar from "@/components/ResearcherPannel/Layout/ResearcherSidebar";
import React from "react";


export default function ResearcherLayout({children}){
    return(
       <div className="flex">
  <ResearcherSidebar />
  <main className="flex-1">
  {children}
  </main>
</div>
    )
}