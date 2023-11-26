"use client";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@convex/_generated/api";
import { Doc } from "@convex/_generated/dataModel";
import { useMutation } from "convex/react";
import React, { useRef, useState } from "react";

interface Props {
  initialData: Doc<"document">;
}
const Title = ({ initialData }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const update = useMutation(api.documents.update);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialData.title || "Untitled");

  const enableInput = () => {
    setTitle(initialData.title);
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
    }, 0);
  };

  const disableInput = () => {
    setIsEditing(false);
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    update({
      id: initialData._id,
      title: e.target.value || "Untitled",
    });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") disableInput();
  };
  return (
    <div className="flex items-center gap-x-1">
      {!!initialData && <p>{initialData.icon}</p>}
      {isEditing ? (
        <Input
          className="h-7 px-2 focus-visible:ring-transparent"
          ref={inputRef}
          onBlur={disableInput}
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={title}
          onClick={enableInput}
        />
      ) : (
        <Button
          onClick={enableInput}
          variant={"ghost"}
          size={"sm"}
          className="font-normal h-auto p-2"
        >
          <span className="truncate">{initialData.title}</span>
        </Button>
      )}
    </div>
  );
};

export default Title;

Title.Skeleton = function TitleSkeleton() {
  return <Skeleton className="h-9 w-16"></Skeleton>;
};
