"use client"

import { LayoutGrid, Rows, Moon, Sun, Coffee } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

export function PortfolioControls() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [layout, setLayout] = useState<"classic" | "bento">("classic")
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const currentLayout = searchParams.get("layout") as "classic" | "bento"
    if (currentLayout) {
      setLayout(currentLayout)
    }
  }, [searchParams])

  const toggleLayout = (newLayout: "classic" | "bento") => {
    setLayout(newLayout)
    const params = new URLSearchParams(searchParams)
    params.set("layout", newLayout)
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="flex items-center gap-2">
      {/* Theme Controls */}
      <div className="flex items-center gap-1 bg-background/50 backdrop-blur-sm p-1 rounded-full border border-border">
        <Button
          variant={theme === "light" ? "default" : "ghost"}
          size="icon"
          onClick={() => setTheme("light")}
          title="Light Mode"
          className="rounded-full h-7 w-7"
        >
          <Sun className="h-3.5 w-3.5" />
        </Button>
        <Button
          variant={theme === "dark" ? "default" : "ghost"}
          size="icon"
          onClick={() => setTheme("dark")}
          title="Dark Mode"
          className="rounded-full h-7 w-7"
        >
          <Moon className="h-3.5 w-3.5" />
        </Button>
        <Button
          variant={theme === "vintage" ? "default" : "ghost"}
          size="icon"
          onClick={() => setTheme("vintage")}
          title="Vintage Mode"
          className="rounded-full h-7 w-7"
        >
          <Coffee className="h-3.5 w-3.5" />
        </Button>
      </div>

      {/* Layout Controls */}
      {/* <div className="flex items-center gap-1 bg-background/50 backdrop-blur-sm p-1 rounded-full border border-border"> */}
        {/* <Button
          variant={layout === "classic" ? "default" : "ghost"}
          size="icon"
          onClick={() => toggleLayout("classic")}
          title="Classic Layout"
          className="rounded-full h-7 w-7"
        >
          <Rows className="h-3.5 w-3.5" />
        </Button> */}
        {/* <Button
          variant={layout === "bento" ? "default" : "ghost"}
          size="icon"
          onClick={() => toggleLayout("bento")}
          title="Bento Layout"
          className="rounded-full h-7 w-7"
        >
          <LayoutGrid className="h-3.5 w-3.5" />
        </Button> */}
      {/* </div> */}
    </div>
  )
}
