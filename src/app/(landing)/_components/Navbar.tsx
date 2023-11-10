"use client";
import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import React from "react";
import Logo from "./Logo";
import { ModeToggle } from "@/components/ModeSwitch";

const Navbar = () => {
  const scrolled = useScrollTop();
  return (
    <div
      className={cn(
        "fixed top-0 z-50 bg-background flex items-center w-full p-6 ",
        scrolled && "border-b shadow-sm"
      )}
    >
      <Logo />
      <div className="md:ml-auto md:justify-end gap-x-2 justify-between w-full flex items-center">
        Login
        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
