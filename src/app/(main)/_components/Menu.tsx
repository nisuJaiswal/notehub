"use client";
import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@clerk/clerk-react";
import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

interface MenuProps {
  documentId: Id<"document">;
}
const Menu = ({ documentId }: MenuProps) => {
  const router = useRouter();
  const { user } = useUser();

  const archive = useMutation(api.documents.archive);

  const onArchive = () => {
    const promise = archive({ id: documentId }).then(() =>
      router.push("/documents")
    );
    toast.promise(promise, {
      loading: "Moving to Bin...",
      success: "Note Moved to Trash",
      error: "Failed to Move a Note to Bin...",
    });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button size="sm" variant={"ghost"}>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-60 "
        align="end"
        alignOffset={8}
        forceMount
      >
        <DropdownMenuItem onClick={onArchive} className="cursor-pointer">
          <Trash className="h-4 w-4 mr-2" />
          Move to Bin
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <div className="text-xs text-muted-foreground p-2">
          Last Edited By {user?.fullName}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

Menu.Skeleton = function MenuSkeleton() {
  return <Skeleton className="h-10 w-10" />;
};
export default Menu;
