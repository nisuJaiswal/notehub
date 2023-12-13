"use client";
import { Doc } from "@convex/_generated/dataModel";
import React, { ElementRef, useRef, useState } from "react";
import IconPicker from "./IconPicker";
import { Button } from "./ui/Button";
import { ImageIcon, Smile, X } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import TextareaAutosize from "react-textarea-autosize";
interface Props {
  initialData: Doc<"document">;
  preview?: boolean;
}
const Toolbar = ({ initialData, preview }: Props) => {
  const inputRef = useRef<ElementRef<"textarea">>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialData.title);

  const update = useMutation(api.documents.update);

  const enableInput = () => {
    if (preview) return;

    setIsEditing(true);
    // For Hydration
    setTimeout(() => {
      setValue(initialData.title);
      inputRef.current?.focus();
    }, 0);
  };

  const disableInput = () => {
    setIsEditing(false);
  };

  const onInput = (value: string) => {
    setValue(value);
    update({ id: initialData._id, title: value || "Untitled" });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      disableInput();
    }
  };

  const onIconSelect = (icon: string) => {
    update({
      id: initialData._id,
      icon,
    });
  };

  const removeIcon = useMutation(api.documents.removeIcon);
  const onRemoveIcon = () => {
    removeIcon({ id: initialData._id });
  };
  return (
    <div className="relative group pl-[54px]">
      {!!initialData.icon && !preview && (
        <div className="flex items-center gap-x-2 pt-6 group/icon">
          <IconPicker onChange={onIconSelect}>
            <p className="text-6xl hover:opacity-75 transition">
              {initialData.icon}
            </p>
          </IconPicker>
          <Button
            onClick={onRemoveIcon}
            className="rounded-full opacity-100 group-hover/icon:opacity-100 transition text-muted-foreground text-xs"
            variant={"outline"}
            size="icon"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      {!!initialData.icon && preview && (
        <p className="text-6xl pt-6">{initialData.icon}</p>
      )}
      <div className="opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-4">
        {!initialData.icon && !preview && (
          <IconPicker asChild onChange={onIconSelect}>
            <Button
              className="text-muted-foregroung text-xs"
              variant={"outline"}
              size={"sm"}
            >
              <Smile className="h-4 w-4 mr-2" />
              Add Icon
            </Button>
          </IconPicker>
        )}
        {!initialData.coverImage && !preview && (
          <Button
            className="text-muted-foregroung text-xs"
            size="sm"
            variant="outline"
            onClick={() => {}}
          >
            <ImageIcon className="h-4  w-4 mr-2" />
            Add Cover
          </Button>
        )}
      </div>
      {isEditing && !preview ? (
        <TextareaAutosize
          ref={inputRef}
          onBlur={disableInput}
          onKeyDown={onKeyDown}
          value={value}
          onChange={(e) => onInput(e.target.value)}
          className="text-5xl bg-transparent font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF] resize-none"
        />
      ) : (
        <div
          className="pb-[11.5px] text-5xl font-bold outline-none break-words text-[#3F3F3F] dark:text-[#CFCFCF] "
          onClick={enableInput}
        >
          {initialData.title}
        </div>
      )}
    </div>
  );
};

export default Toolbar;
