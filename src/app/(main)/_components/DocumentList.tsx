"use client";

import { api } from "@convex/_generated/api";
import { Doc, Id } from "@convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import Item from "./Item";
import { cn } from "@/lib/utils";
import { FileIcon } from "lucide-react";

interface DocListProps {
  parentDocumentId?: Id<"document">;
  level?: number;
  data?: Doc<"document">[];
}

const DocumentList = ({ parentDocumentId, level = 0 }: DocListProps) => {
  const params = useParams();
  const router = useRouter();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const onExpanded = (documentId: string) => {
    setExpanded((prev) => ({ ...prev, [documentId]: !prev[documentId] }));
  };

  const documents = useQuery(api.documents.getSidebar, {
    parentDocument: parentDocumentId,
  });

  const onRedirect = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  if (documents == undefined) {
    return (
      <>
        <Item.Skeleton level={level} />
        {level === 0 && (
          <>
            <Item.Skeleton level={level} />
            <Item.Skeleton level={level} />
          </>
        )}
      </>
    );
  }

  return (
    <>
      <p
        style={{ paddingLeft: level ? `${level * 12 + 25}px` : undefined }}
        className={cn(
          "hidden text-sm font-medium text-muted-foreground/80",
          expanded && "last:block",
          level === 0 && "hidden"
        )}
      >
        No Pages Inside
      </p>

      {documents.map((doc) => (
        <div key={doc._id}>
          <Item
            id={doc._id}
            onClick={() => onRedirect(doc._id)}
            label={doc.title}
            icon={FileIcon}
            documentIcon={doc.icon}
            active={params.documentId === doc._id}
            level={level}
            onExpand={() => onExpanded(doc._id)}
            expanded={expanded[doc._id]}
          />
          {expanded[doc._id] && (
            <DocumentList level={level + 1} parentDocumentId={doc._id} />
          )}
        </div>
      ))}
    </>
  );
};

export default DocumentList;
