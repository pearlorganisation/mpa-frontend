"use client";



import MyProfile from "@/components/ResearcherPannel/MyProfile";
import React from "react";


export default function myProfilePage({children}){
    return(
       <div className="flex">
  <MyProfile/>
</div>
    )
}