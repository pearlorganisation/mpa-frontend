import React from "react";
import About from "@/components/About";
import Articles from "@/components/Articles";
import Hero from "@/components/Hero";
import Submit from "@/components/Submit";
import EditorialBoard from "@/components/EditorialBoard";
import Guidelines from "@/components/Guidelines";
import Contact from "@/components/Contact";
import AiPolicySection from "@/components/AiPolicySection";
import PublishedArticles from "@/components/PublishedArticle";
import {Issue} from "@/components/Issue";
const Page = () => {
  return (
    <div>
      <Hero />
      <About />
      {/* <PublishedArticles /> */}
      <Articles />
      <Submit />
      <Issue/>
      <EditorialBoard />
      <Guidelines />
      <AiPolicySection/>
      <Contact />
    </div>
  );
};

export default Page;

