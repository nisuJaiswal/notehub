"use client";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Image from "next/image";
import React from "react";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});
const Logo = () => {
  return (
    <div className="hidden md:flex items-center justify-center">
      <Image src={"/logo.svg"} alt="logo" width={"40"} height={"40"} />
      <p className={cn("font-semibold", font.className)}>NoteHub</p>
    </div>
  );
};

export default Logo;
