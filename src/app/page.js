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
import { Issue } from "@/components/Issue";
import { AnnouncementBanner } from "@/utils/AnnouncementSystem";
const Page = () => {
  return (
    <div>
      <AnnouncementBanner />
      <Hero />

      <About />
      <Articles />
      <Submit />
      <Issue />
      <EditorialBoard />
      <Guidelines />
      <AiPolicySection />
      <Contact />
    </div>
  );
};

export default Page;

