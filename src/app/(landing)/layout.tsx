import React from "react";
import Navbar from "./_components/Navbar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <Navbar />
      <div className="p-40 h-full"> {children}</div>
    </div>
  );
};

export default layout;
