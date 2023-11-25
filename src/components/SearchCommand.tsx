"use client";
import { useUser } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";

import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { useSearch } from "@/hooks/use-search";
import { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { File } from "lucide-react";
import { useSettings } from "@/hooks/use-settings";

const SearchCommand = () => {
  const router = useRouter();
  const { user } = useUser();
  const documents = useQuery(api.documents.getSearch);

  const toggle = useSearch((store) => store.toggle);
  const settingsToggle = useSettings((store) => {
    const settingsToggle = store.toggle;
    return settingsToggle;
  });
  const isOpen = useSearch((store) => store.isOpen);
  const onClose = useSearch((store) => store.onClose);

  const [isMouted, setIsMouted] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    };
    const settingsDown = (e: KeyboardEvent) => {
      if (e.key === "," && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        settingsToggle();
      }
    };

    document.addEventListener("keydown", down);
    document.addEventListener("keydown", settingsDown);

    return () => {
      document.removeEventListener("keydown", down);
      document.removeEventListener("keydown", settingsDown);
    };
  }, [toggle]);

  const onSelect = (id: string) => {
    router.push(`/documents/${id}`);
    onClose();
  };

  useEffect(() => {
    setIsMouted(true);
  }, []);

  if (!isMouted) return null;
  return (
    <CommandDialog open={isOpen} onOpenChange={onClose}>
      <CommandInput placeholder={`Search ${user?.firstName}'s NoteHub`} />
      <CommandList>
        <CommandGroup heading={"Documents"}>
          {documents?.map((doc) => (
            <CommandItem
              key={doc._id}
              value={`${doc._id}-${doc.title}`}
              title={doc.title}
              onSelect={onSelect}
            >
              {doc.icon ? (
                <p className="mr-2 text-[18px]">{doc.icon}</p>
              ) : (
                <File className="mr-2 h-4 w-4" />
              )}
              <span>{doc.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default SearchCommand;
