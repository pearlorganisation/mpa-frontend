"use client";



import ResearcherProfile from "@/components/ResearcherPannel/Profile";
import React from "react";


export default function myProfile({children}){
    return(
       <div className="flex">
  <ResearcherProfile/>
</div>
    )
}