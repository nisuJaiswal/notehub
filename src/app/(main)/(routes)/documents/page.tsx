"use client";
import { Button } from "@/components/ui/Button";
import { useUser } from "@clerk/clerk-react";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useMutation } from "convex/react";
import { toast } from "sonner";
import { api } from "@convex/_generated/api";
import { useRouter } from "next/navigation";

const Documents = () => {
  const create = useMutation(api.documents.create);
  const router = useRouter();
  const onCreate = () => {
    const promise = create({ title: "Untitled" }).then((docuemntId) =>
      router.push(`/documents/${docuemntId}`)
    );

    toast.promise(promise, {
      loading: "Working on the Note...",
      success: "Note Created Successfully",
      error: "Error! No Note Created",
    });
  };

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
      <Button onClick={onCreate}>
        <PlusCircle className="h-4 w-4 mr-2" />
        Create Note
      </Button>
    </div>
  );
};

export default Documents;
