"use client"

import { Button } from "@/components/ui/button"
import { FaRegEnvelope } from "react-icons/fa"
import type { NormalizedProfile } from "@/types/github"

interface PortfolioFooterProps {
  profile: NormalizedProfile
}

export function PortfolioFooter({ profile }: PortfolioFooterProps) {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 max-w-6xl">
        <div className="flex flex-col items-center gap-6 sm:gap-8 text-center">
          <div className="space-y-3 sm:space-y-4 max-w-lg">
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">Interested in working together?</h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              I&apos;m always open to discussing product design work or partnership opportunities.
            </p>
          </div>

          {profile.email && (
            <Button
              size="lg"
              className="rounded-full px-6 sm:px-8 text-sm sm:text-base"
              asChild
            >
              <a href={`mailto:${profile.email}`}>
                <FaRegEnvelope className="mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                Get in touch
              </a>
            </Button>
          )}
          
          <div className="flex flex-col items-center gap-4 mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-border w-full max-w-sm">
            <p className="text-xs sm:text-sm text-muted-foreground">
              © {new Date().getFullYear()} {profile.name || profile.username}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

