"use client";

import { useState } from "react";
import { useSession, signOut } from "@/lib/auth-client";
import { Popover, PopoverContent } from "@/components/ui/popover";
import Image from "next/image";
import { FaChevronDown, FaSignOutAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";

export function UserMenu() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  if (!session?.user) {
    return null;
  }

  const handleLogout = async () => {
    await signOut();
    setIsOpen(false);
  };

  const handleViewProfile = async () => {
    try {
      const response = await fetch("/api/auth/get-github-username");
      if (response.ok) {
        const data = await response.json();
        if (data.username) {
          router.push(`/${data.username}`);
          setIsOpen(false);
        }
      }
    } catch {
    }
  };

  return (
    <Popover 
      open={isOpen} 
      onOpenChange={setIsOpen}
      align="right"
      trigger={
        <button className="flex items-center gap-2 outline-none transition-colors border border-border/60 text-foreground px-2.5 py-1.5 rounded-full bg-card hover:bg-card/90 active:bg-card/80 cursor-pointer shadow-sm">
          {session.user.image && (
            <Image
              src={session.user.image}
              alt={session.user.name || "User"}
              width={24}
              height={24}
              className="rounded-full"
            />
          )}
          <span className="text-xs md:text-sm font-medium hidden sm:inline max-w-[120px] truncate text-foreground">
            {session.user.name || "User"}
          </span>
          <FaChevronDown className={`h-3 w-3 transition-transform duration-200 text-muted-foreground ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      }
    >
      <PopoverContent className="w-64 p-0 bg-popover/95 backdrop-blur-lg border-border">
        <div className="p-4 border-b border-border/50">
          <div className="flex items-center gap-3">
            {session.user.image && (
              <Image
                src={session.user.image}
                alt={session.user.name || "User"}
                width={48}
                height={48}
                className="rounded-full"
              />
            )}
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-sm font-semibold text-foreground truncate">
                {session.user.name || "User"}
              </span>
              {session.user.email && (
                <span className="text-xs text-muted-foreground truncate">
                  {session.user.email}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="p-2">
          <button
            onClick={handleViewProfile}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-colors text-left"
          >
            <span>View Profile</span>
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-md transition-colors text-left"
          >
            <FaSignOutAlt className="h-4 w-4" />
            <span>Sign out</span>
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

