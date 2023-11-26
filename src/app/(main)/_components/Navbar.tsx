"use client";
import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { MenuIcon } from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";
import Title from "./Title";

interface Props {
  isCollapsed: boolean;
  onResetWidth: () => void;
}

const Navbar = ({ isCollapsed, onResetWidth }: Props) => {
  const params = useParams();
  const document = useQuery(api.documents.getById, {
    documentId: params.documentId as Id<"document">,
  });

  if (document === undefined)
    return (
      <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center">
        <Title.Skeleton />
      </nav>
    );

  if (document === null) return null;
  return (
    <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center gap-x-4">
      {isCollapsed && (
        <MenuIcon
          className="w-6 h-6 text-muted-foreground"
          role="button"
          onClick={onResetWidth}
        />
      )}
      <div className="flex items-center w-full">
        <Title initialData={document} />
      </div>
    </nav>
  );
};

export default Navbar;
