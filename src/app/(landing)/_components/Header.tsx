"use client";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import { useConvexAuth } from "convex/react";
import React from "react";
import { Spinner } from "@/components/Spinner";
import Link from "next/link";
import { SignInButton } from "@clerk/clerk-react";

const Header = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-6xl md:5xl font-bold">
        Your Ideas, Documents & Plans. Unified. Welcome to{" "}
        <span className="underline">NoteHub</span>
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        Notion is the connected Workspace where <br />
        better, faster work happens
      </h3>
      {isLoading && (
        <div className="w-full flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      )}
      {isAuthenticated && !isLoading && (
        <Button>
          <Link href="/documents">Enter to NoteHub</Link>
          <ArrowRight className="ml-3" />
        </Button>
      )}
      {!isAuthenticated && !isLoading && (
        <>
          <SignInButton mode="modal">
            <Button>
              Get NoteHub Free <ArrowRight className="ml-2" />
            </Button>
          </SignInButton>
        </>
      )}
    </div>
  );
};

export default Header;
