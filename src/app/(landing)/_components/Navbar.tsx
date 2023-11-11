"use client";
import { useScrollTop } from "@/hooks/use-scroll-top";
import { useConvexAuth } from "convex/react";
import { cn } from "@/lib/utils";
import React from "react";
import Logo from "./Logo";
import { ModeToggle } from "@/components/ModeSwitch";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/Spinner";
import Link from "next/link";

const Navbar = () => {
  const scrolled = useScrollTop();
  const { isLoading, isAuthenticated } = useConvexAuth();
  return (
    <div
      className={cn(
        "fixed top-0 z-50 bg-background flex items-center w-full p-6 dark:bg-[#1F1F1F]",
        scrolled && "border-b shadow-sm"
      )}
    >
      <Logo />
      <div className="md:ml-auto md:justify-end gap-x-2 justify-between w-full flex items-center">
        {isLoading && <Spinner />}
        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton mode="modal">
              <Button variant={"ghost"} size={"sm"}>
                Login
              </Button>
            </SignInButton>
            <SignInButton mode="modal">
              <Button size={"sm"}>GET FREE NOTEHUB</Button>
            </SignInButton>
          </>
        )}
        {isAuthenticated && !isLoading && (
          <>
            <Button variant={"ghost"} size={"sm"}>
              <Link href="documents">Enter NoteHub</Link>
            </Button>
            <UserButton afterSignOutUrl="/" />
          </>
        )}
        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
