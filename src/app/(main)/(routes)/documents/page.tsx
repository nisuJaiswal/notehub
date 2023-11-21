"use client";
import { Button } from "@/components/ui/Button";
import { useUser } from "@clerk/clerk-react";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import React from "react";

const Documents = () => {
  const { user } = useUser();
  return (
    <div className="h-full flex items-center justify-center flex-col space-y-4">
      <Image
        src="/empty.png"
        height="300"
        width="300"
        alt="Empty"
        className="dark:hidden"
      />
      <Image
        src="/empty-dark.png"
        height="300"
        width="300"
        alt="Empty"
        className="hidden dark:block"
      />
      <h2 className="text-lg font-semibold">
        Welcome to {user?.firstName}'s NoteHub
      </h2>
      <Button>
        <PlusCircle className="h-4 w-4 mr-2" />
        Create Note
      </Button>
    </div>
  );
};

export default Documents;
