import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import React from "react";

const Header = () => {
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
      <Button>
        Enter to NoteHub
        <ArrowRight className="ml-3" />
      </Button>
    </div>
  );
};

export default Header;
