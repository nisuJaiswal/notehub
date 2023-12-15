import React from "react";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import Footer from "./_components/Footer";

const Page = () => {
  return (
    <div className="flex flex-col min-h-full dark:bg-[#1F1F1F]">
      <div className="flex flex-1 flex-col items-center justify-center md:justify-start text-center gap-y-7 px-6 pb-10">
        <Header />
        <Hero />
      </div>
      <Footer />
    </div>
  );
};

export default Page;
