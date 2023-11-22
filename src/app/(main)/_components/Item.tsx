import { cn } from "@/lib/utils";
import { Id } from "@convex/_generated/dataModel";
import { ChevronDown, ChevronRight, LucideIcon } from "lucide-react";
import React from "react";

interface ItemProps {
  id?: Id<"document">;
  documentIcon?: string;
  active?: boolean;
  isSearch?: boolean;
  expanded?: boolean;
  level?: number;
  onExpand?: () => void;
  label: string;
  onClick: () => void;
  icon: LucideIcon;
}
const Item = ({
  id,
  active,
  documentIcon,
  isSearch,
  level = 0,
  onExpand,
  expanded,
  label,
  onClick,
  icon: Icon,
}: ItemProps) => {
  const CheveronIcon = expanded ? ChevronDown : ChevronRight;
  return (
    <div
      onClick={onClick}
      role="button"
      style={{ paddingLeft: level ? `${level * 12 + 12}px` : "12px" }}
      className={cn(
        "group min-h-[27px] pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium text-sm py-1",
        active && "bg-primary/5 text-primary"
      )}
    >
      {!!id && (
        <div
          role="button"
          className="h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 mr-1"
          onClick={() => {}}
        >
          <CheveronIcon className="h-full w-full shrink-0 text-muted-foreground/50" />
        </div>
      )}

      {documentIcon ? (
        <div className="shrink-0 mr-2 text-[18px]">{documentIcon}</div>
      ) : (
        <Icon className="shrink-0 h-[18px] mr-2 text-muted-foreground" />
      )}

      <span className="truncate">{label}</span>

      {isSearch && (
        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono font-medium text-muted-foreground opacity-100 text-[10px]">
          <span className="text-xs">CTRL</span> K
        </kbd>
      )}
    </div>
  );
};

export default Item;
