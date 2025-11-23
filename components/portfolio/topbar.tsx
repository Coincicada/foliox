"use client"

import { Button } from "@/components/ui/button"
import { FaArrowLeft } from "react-icons/fa"
import Link from "next/link"
import type { NormalizedProfile } from "@/types/github"
import { ShareButton } from "./share-button"

interface TopbarProps {
  profile: NormalizedProfile
}

export function Topbar({ profile }: TopbarProps) {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-1.5 sm:gap-2 -ml-2 sm:ml-0">
              <FaArrowLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Home</span>
            </Button>
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="text-xs sm:text-sm text-muted-foreground hidden sm:block truncate max-w-[120px] md:max-w-none">
              {profile.name || profile.username}
            </div>
            <ShareButton username={profile.username} />
          </div>
        </div>
      </div>
    </nav>
  )
}

