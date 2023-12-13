"use client";
import ConfirmModal from "@/components/modals/ConfirmModal";
import { Button } from "@/components/ui/Button";
import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

interface BannerProps {
  documentId: Id<"document">;
}
const Banner = ({ documentId }: BannerProps) => {
  const router = useRouter();
  const remove = useMutation(api.documents.archive);
  const restore = useMutation(api.documents.restore);

  const onRemove = () => {
    const promise = remove({ id: documentId }).then(() => {
      router.push("/documents");
    });

    toast.promise(promise, {
      loading: "Deleting a Note...",
      success: "Note Deleted Successfully",
      error: "Error in deleting a Note",
    });
  };

  const onRestore = () => {
    const promise = restore({ id: documentId });

    toast.promise(promise, {
      loading: "Restoring a Note...",
      success: "Note Restored Successfully",
      error: "Error in Restoring a Note",
    });
  };
  return (
    <div className="w-full bg-rose-500 text-center text-sm p-2 text-white flex items-center gap-x-2 justify-center">
      <p>This page is in Recycle Bin</p>
      <Button
        size="sm"
        onClick={onRestore}
        variant="outline"
        className="border-white bg-transparent hover:bg-primary/5 hover:text-white p-1 px-2 h-auto font-normal "
      >
        Restore Note
      </Button>
      <ConfirmModal onConfirm={onRemove}>
        <Button
          size="sm"
          variant="outline"
          className="border-white bg-transparent hover:bg-primary/5 hover:text-white p-1 px-2 h-auto font-normal "
        >
          Delete Forever
        </Button>
      </ConfirmModal>
    </div>
  );
};

export default Banner;
