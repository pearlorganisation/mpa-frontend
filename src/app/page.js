import About from "@/components/About";
import Articles from "@/components/Articles";
import Hero from "@/components/Hero";
import Submit from "@/components/Submit";
import React from "react";

const page = () => {
  return (
    <div>
      <Hero />
      <About />
      <Articles />
      <Submit />
    </div>
  );
};

export default page;
