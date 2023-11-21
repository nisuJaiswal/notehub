"use client";
import { cn } from "@/lib/utils";
import { ChevronsLeft, MenuIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { ElementRef, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import UserItem from "./UserItem";

const Navigation = () => {
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const isResizing = useRef(false);
  const isSidebar = useRef<ElementRef<"aside">>(null);
  const navBar = useRef<ElementRef<"div">>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  const handleMouseDown = (
    e: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();

    isResizing.current = true;

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: globalThis.MouseEvent) => {
    // console.log("Moved");

    if (!isResizing.current) return;
    let newWidth = e.clientX;

    if (newWidth < 240) newWidth = 240;
    if (newWidth > 480) newWidth = 480;

    if (isSidebar.current && navBar.current) {
      isSidebar.current.style.width = `${newWidth}px`;
      navBar.current.style.setProperty("left", `${newWidth}px`);
      navBar.current.style.setProperty("width", `calc(100% - ${newWidth}px)`);
    }
  };

  const handleMouseUp = () => {
    // console.log("Up");

    isResizing.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const resetWidth = () => {
    if (isSidebar.current && navBar.current) {
      setIsCollapsed(true);
      setIsResetting(true);

      isSidebar.current.style.width = isMobile ? "100%" : "240px";
      navBar.current.style.setProperty(
        "width",
        isMobile ? "0" : "calc(100% - 240px)"
      );
      navBar.current.style.setProperty("left", isMobile ? "100%" : "240px");
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  const collapse = () => {
    if (isSidebar.current && navBar.current) {
      setIsCollapsed(true);
      setIsResetting(true);

      isSidebar.current.style.width = "0";
      navBar.current.style.setProperty("width", "100%");
      navBar.current.style.setProperty("left", "0");

      setTimeout(() => setIsResetting(false), 300);
    }
  };

  useEffect(() => {
    if (isMobile) collapse();
    else resetWidth();
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) collapse();
  }, [pathname, isMobile]);

  return (
    <>
      <aside
        ref={isSidebar}
        className={cn(
          "group/sidebar h-full bg-secondary relative flex w-60 overflow-y-auto flex-col z-[99999]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "w-0"
        )}
      >
        <div
          onClick={collapse}
          role="button"
          className={cn(
            "h-6 w-6 text-muted-foreground rounded-sm absolute right-2 top-2 transition opacity-0 group-hover/sidebar:opacity-100 hover:bg-neutral-300 dark:hover:bg-neutral-600",
            isMobile && "opacity-100"
          )}
        >
          <ChevronsLeft className="h-6 w-6" />
        </div>

        <div>
          <UserItem />
        </div>
        <div className="mt-4">
          <p>Documents</p>
        </div>
        <div
          onClick={resetWidth}
          onMouseDown={handleMouseDown}
          className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"
        />
      </aside>
      <div
        ref={navBar}
        className={cn(
          "absolute top-0 left-60 z-[99999] w-[calc(100%-240px)]",
          isMobile && "left-0 w-full",
          isResetting && "transition-all duration-300 ease-in-out"
        )}
      >
        <nav className="w-full bg-transparent px-3 py-2">
          {isCollapsed && (
            <MenuIcon
              onClick={resetWidth}
              className="h-6 w-6 text-muted-foreground"
              role="button"
            />
          )}
        </nav>
      </div>
    </>
  );
};

export default Navigation;
