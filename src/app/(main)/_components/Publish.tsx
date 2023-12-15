"use client ";
import { Button } from "@/components/ui/Button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useOrigin } from "@/hooks/use-origin";
import { api } from "@convex/_generated/api";
import { Doc } from "@convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { Check, Copy, Globe } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

interface Props {
  initialData: Doc<"document">;
}
const Publish = ({ initialData }: Props) => {
  const origin = useOrigin();

  const update = useMutation(api.documents.update);
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const url = `${origin}/preview/${initialData._id}`;

  const onPublish = () => {
    setIsSubmitting(true);
    const promise = update({ id: initialData._id, isPublished: true }).finally(
      () => setIsSubmitting(false)
    );

    toast.promise(promise, {
      loading: "Publishing...",
      success: "Note Published Successfully",
      error: "Error in Publishing a Note!!!",
    });
  };

  const onUnPublish = () => {
    setIsSubmitting(true);
    const promise = update({ id: initialData._id, isPublished: false }).finally(
      () => setIsSubmitting(false)
    );

    toast.promise(promise, {
      loading: "Unpublishing...",
      success: "Note Unpublished Successfully",
      error: "Error in Unpublishing a Note!!!",
    });
  };

  const onCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          className="flex items-center gap-x-2"
          variant="outline"
        >
          Publish
          {initialData.isPublished && (
            <Globe className="h-4 w-4 text-sky-500" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72" align="end" alignOffset={8} forceMount>
        {initialData.isPublished ? (
          <div className="space-y-4">
            <div className="flex items-center gap-x-2">
              <Globe className="text-sky-500 animate-pulse h-4 w-4" />
              <p className="text-sm font-medium text-sky-500">
                This Note is Live!!!
              </p>
            </div>
            <div className="flex items-center gap-x-2">
              <input
                value={url}
                className="flex-1 px-2 text-xs border rounded-l-md h-8 bg-muted truncate"
              />
              <Button
                onClick={onCopy}
                disabled={copied}
                className="h-8 rounded-l-none"
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <Button
              size={"sm"}
              className="text-xs w-full"
              onClick={onUnPublish}
              disabled={isSubmitting}
            >
              Unpublish
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Globe className="h-8 w-8 mb-2 text-muted-foreground" />
            <p className="text-sm font-md mb-2"> Publish This Note</p>
            <span className="text-xs text-muted-foreground mb-4">
              Share your work with others
            </span>
            <Button
              disabled={isSubmitting}
              onClick={onPublish}
              className="w-full text-xs"
              size="sm"
            >
              Publish
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default Publish;
