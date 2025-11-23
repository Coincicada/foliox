"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Share2, Download } from "lucide-react"
import Link from "next/link"

interface NavbarProps {
  username: string
  name?: string | null
}

export function PortfolioNavbar({ username, name }: NavbarProps) {
  const handleShare = async () => {
    const shareData = {
      title: `${name || username}'s Portfolio`,
      text: `Check out ${name || username}'s developer portfolio`,
      url: window.location.href,
    }

    if (navigator.share && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData)
      } catch (err) {
        console.error("Error sharing:", err)
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href)
        alert("Link copied to clipboard!")
      } catch (err) {
        console.error("Error copying:", err)
      }
    }
  }

  const handleDownload = () => {
    window.print()
  }

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="hidden sm:flex"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              className="hidden md:flex"
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleShare}
              className="sm:hidden"
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

