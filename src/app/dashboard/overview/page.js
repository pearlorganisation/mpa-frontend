"use client";

import Overview from "@/components/ResearcherPannel/Overview";
import React from "react";


export default function myProfile({children}){
    return(
       <div className="flex">
  <Overview/>
</div>
    )
}