"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignOutButton, useUser } from "@clerk/clerk-react";
import { ChevronsLeftRightIcon } from "lucide-react";

const UserItem = () => {
  const { user } = useUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          role="button"
          className="flex items-center text-sm w-full p-3 hover:bg-primary/5"
        >
          <div className="flex max-w-[150] items-center space-x-3">
            <Avatar className="h-5 w-5">
              <AvatarImage src={user?.imageUrl} />
            </Avatar>
            <span className="text-start font-medium line-clamp-1">
              {user?.firstName}'s NoteHub
            </span>
          </div>
          <ChevronsLeftRightIcon className="rotate-90 text-muted-foreground ml-2 h-4 w-4" />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-80"
        align="start"
        forceMount
        alignOffset={11}
      >
        <div className="flex flex-col space-y-4">
          <p className="text-xs text-muted-foreground font-medium leading-none">
            {user?.emailAddresses[0].emailAddress}
          </p>
          <div className="flex items-center space-x-4">
            <div className="rounded-full bg-secondary line-clamp-1">
              <Avatar className="w-8 h-8">
                <AvatarImage src={user?.imageUrl} />
              </Avatar>
            </div>
            <div>
              <p className="text-sm line-clamp-1">{user?.fullName}'s NoteHub</p>
            </div>
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          asChild
          className="w-full text-muted-foreground cursor-pointer"
        >
          <SignOutButton>Log Out</SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserItem;
