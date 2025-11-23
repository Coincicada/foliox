"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { FaGithub } from "react-icons/fa"
import { FaWandMagicSparkles } from "react-icons/fa6"
import { FaMapMarkerAlt, FaBuilding, FaUsers } from "react-icons/fa"
import Link from "next/link"
import { trackEvent } from "@/lib/utils/analytics"
import type { NormalizedProfile } from "@/types/github"

export default function LandingPage() {
  const [username, setUsername] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [previewUser, setPreviewUser] = useState<NormalizedProfile | null>(null)
  const [isFetchingPreview, setIsFetchingPreview] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const trimmedUsername = username.trim()
    
    if (!trimmedUsername || trimmedUsername.length < 1) {
      setPreviewUser(null)
      return
    }

    const timeoutId = setTimeout(async () => {
      setIsFetchingPreview(true)
      try {
        const response = await fetch(`https://api.github.com/users/${trimmedUsername}`, {
          headers: {
            Accept: "application/vnd.github+json",
          },
        })

        if (response.ok) {
          const data = await response.json()
          setPreviewUser({
            username: data.login,
            name: data.name,
            bio: data.bio,
            avatar_url: data.avatar_url,
            location: data.location,
            email: data.email,
            website: data.blog || null,
            twitter_username: data.twitter_username,
            company: data.company,
            followers: data.followers,
            following: data.following,
            public_repos: data.public_repos,
            created_at: data.created_at,
          })
        } else {
          setPreviewUser(null)
        }
      } catch {
        setPreviewUser(null)
      } finally {
        setIsFetchingPreview(false)
      }
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [username])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!username.trim()) return

    trackEvent('portfolio-generation-started', {
      username: username.trim(),
    })

    setIsLoading(true)
    router.push(`/${username.trim()}`)
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Image
              src="/logo.png"
              alt="Foliox"
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
              priority
            />
            <span className="font-bold text-xl text-foreground">Foliox</span>
          </Link>
          <Link 
            href="https://github.com/kartiklabhshetwar/foliox" 
            target="_blank" 
            rel="noreferrer"
          >
            <Button variant="ghost" size="sm" className="gap-2">
              <FaGithub className="h-4 w-4" />
              <span className="hidden sm:inline">GitHub</span>
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="py-20 md:py-32 px-4 text-center relative overflow-hidden">
          {/* Background effects */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-6xl -z-10 opacity-50 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>

          <div className="container mx-auto max-w-4xl space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1 text-sm text-muted-foreground">
              <span> AI-Powered • Free Forever</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter">
              From GitHub to Portfolio
              <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
                in Seconds
              </span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Transform your GitHub profile into a stunning portfolio with AI-powered insights. 
              No coding required—just enter your username and watch the magic happen.
            </p>

            {/* Form */}
            <div className="max-w-md mx-auto relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
              <form onSubmit={handleSubmit} className="relative flex gap-2 p-2 bg-card border border-border rounded-lg shadow-lg">
                <div className="relative flex-1">
                  <FaGithub className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="github-username"
                    className="pl-9 border-0 shadow-none focus-visible:ring-0 bg-transparent h-10"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
                <Button type="submit" disabled={!username || isLoading}>
                  {isLoading ? "Generating..." : "Generate"}
                  {!isLoading && <FaWandMagicSparkles className="ml-2 h-4 w-4" />}
                </Button>
              </form>
            </div>

            <div className="pt-4 text-sm text-muted-foreground">
              <span className="mr-2">Try example:</span>
              <button onClick={() => setUsername("KartikLabhshetwar")} className="underline hover:text-primary transition-colors">
                KartikLabhshetwar
              </button>
            </div>

            {previewUser && (
              <div className="max-w-md mx-auto pt-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <Card className="border-border/50 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Image
                        src={previewUser.avatar_url}
                        alt={previewUser.username}
                        width={64}
                        height={64}
                        className="rounded-full border-2 border-border"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg truncate">
                            {previewUser.name || previewUser.username}
                          </h3>
                          {previewUser.name && (
                            <span className="text-sm text-muted-foreground truncate">
                              @{previewUser.username}
                            </span>
                          )}
                        </div>
                        {previewUser.bio && (
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                            {previewUser.bio}
                          </p>
                        )}
                        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                          {previewUser.location && (
                            <div className="flex items-center gap-1">
                              <FaMapMarkerAlt className="h-3 w-3" />
                              <span>{previewUser.location}</span>
                            </div>
                          )}
                          {previewUser.company && (
                            <div className="flex items-center gap-1">
                              <FaBuilding className="h-3 w-3" />
                              <span>{previewUser.company}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <FaUsers className="h-3 w-3" />
                            <span>{previewUser.followers} followers</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FaGithub className="h-3 w-3" />
                            <span>{previewUser.public_repos} repos</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {isFetchingPreview && username.trim() && (
              <div className="max-w-md mx-auto pt-6 text-center text-sm text-muted-foreground">
                Checking GitHub profile...
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-[#F8F7F3]">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Foliox"
                width={28}
                height={28}
                className="h-7 w-7 object-contain"
              />
              <span className="text-sm font-medium text-foreground">Foliox</span>
            </div>
            <p className="text-sm text-foreground">
              Built by{" "}
              <a 
                href="https://github.com/kartiklabhshetwar" 
                target="_blank" 
                rel="noreferrer" 
                className="underline hover:text-primary transition-colors"
              >
                Kartik
              </a>
              {" "}• Open source on{" "}
              <a 
                href="https://github.com/kartiklabhshetwar/foliox" 
                target="_blank" 
                rel="noreferrer" 
                className="underline hover:text-primary transition-colors"
              >
                GitHub
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
