"use client";
import { Spinner } from "@/components/Spinner";
import ConfirmModal from "@/components/modals/ConfirmModal";
import { Input } from "@/components/ui/input";
import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { Search, Trash, Undo } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const TrashBox = () => {
  const params = useParams();
  const router = useRouter();
  const documents = useQuery(api.documents.getArchived);
  const restore = useMutation(api.documents.restore);
  const remove = useMutation(api.documents.deleteNote);

  const [search, setSearch] = useState("");
  const filteredDocuments = documents?.filter((doc) =>
    doc.title.toLowerCase().includes(search.toLowerCase())
  );

  const onClick = (docId: string) => {
    router.push(`/documents/${docId}`);
  };

  const onRestore = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    docId: Id<"document">
  ) => {
    e.stopPropagation();
    const promise = restore({ id: docId });

    toast.promise(promise, {
      loading: "Restoring a Note...",
      success: "Note Restored Successfully",
      error: "Error for restoring a Note!",
    });
  };

  const onDelete = (docId: Id<"document">) => {
    const promise = remove({ documentId: docId });
    toast.promise(promise, {
      loading: "Deleting a Note...",
      success: "Note Deleted Successfully",
      error: "Error for deleting a Note!",
    });

    if (params.documentId === docId) router.push("/documents");
  };

  if (documents === undefined) {
    return (
      <div className="flex h-full items-center justify-center p-4">
        <Spinner size={"lg"} />
      </div>
    );
  }
  return (
    <div className="text-sm">
      <div className="flex items-center gap-2 p-2">
        <Search className="h-4 w-4" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
          placeholder="Search by Page Title..."
        />
      </div>
      <div className="mt-2 px-1 pb-1">
        <p className="hidden last:block text-xs text-center pb-2 text-muted-foreground">
          No Notes Found!
        </p>
        {filteredDocuments?.map((doc) => (
          <div
            key={doc._id}
            onClick={() => onClick(doc._id)}
            role="button"
            className="text-sm rounded-sm w-full hover:bg-primary/5 dark:hover:bg-neutral-800 flex items-center justify-between text-primary"
          >
            <span className="pl-2 truncate">{doc.title}</span>
            <div className="flex items-center">
              <div
                role={"button"}
                onClick={(e) => onRestore(e, doc._id)}
                className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
              >
                <Undo className="text-muted-foreground h-4 w-4" />
              </div>
              <ConfirmModal onConfirm={() => onDelete(doc._id)}>
                <div
                  role="button"
                  className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                >
                  <Trash className="text-muted-foreground h-4 w-4 " />
                </div>
              </ConfirmModal>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrashBox;
