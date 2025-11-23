import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { FaGithub, FaLinkedin, FaGlobe, FaEnvelope, FaMapMarkerAlt, FaInstagram } from "react-icons/fa"
import { FaXTwitter, FaCodeBranch, FaCodePullRequest } from "react-icons/fa6"
import type { NormalizedProfile, AboutData, GitHubMetrics } from "@/types/github"

interface HeroSectionProps {
  profile: NormalizedProfile
  about?: AboutData | null
  metrics?: GitHubMetrics | null
}

export function HeroSection({ profile, metrics }: HeroSectionProps) {
  const initials = profile.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase() || profile.username.slice(0, 2).toUpperCase()

  return (
    <section className="w-full py-8 sm:py-12 md:py-16 border-b border-border">
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
        <Avatar className="h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 border border-border flex-shrink-0 mx-auto sm:mx-0">
          <AvatarImage src={profile.avatar_url} alt={profile.name || profile.username} />
          <AvatarFallback className="text-lg sm:text-xl font-medium">{initials}</AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-4 sm:space-y-6 w-full">
          <div className="space-y-1.5 sm:space-y-2 text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">
              {profile.name || profile.username}
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">@{profile.username}</p>
          </div>

          {profile.bio && (
            <p className="text-sm sm:text-base text-foreground/80 leading-relaxed max-w-2xl text-center sm:text-left">
              {profile.bio}
            </p>
          )}

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
            {profile.location && (
              <div className="flex items-center gap-1.5">
                <FaMapMarkerAlt className="h-3 w-3 sm:h-3.5 sm:w-3.5 flex-shrink-0" />
                <span className="truncate max-w-[200px] sm:max-w-none">{profile.location}</span>
              </div>
            )}
            {profile.company && (
              <span className="truncate max-w-[150px] sm:max-w-none">{profile.company.replace("@", "")}</span>
            )}
            {profile.public_repos > 0 && (
              <span>{profile.public_repos} repos</span>
            )}
            {profile.followers > 0 && (
              <span>{profile.followers} followers</span>
            )}
            {profile.following > 0 && (
              <span>{profile.following} following</span>
            )}
          </div>

          {metrics && (
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center sm:justify-start">
              <div className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-md bg-chart-1/10 border border-border min-w-0 flex-1 sm:flex-initial">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-chart-1/20 flex items-center justify-center flex-shrink-0">
                  <FaCodeBranch className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-chart-1" />
                </div>
                <div className="min-w-0">
                  <p className="text-base sm:text-lg font-bold text-foreground truncate">{metrics.prs_merged.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">PRs Merged</p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-md bg-chart-2/10 border border-border min-w-0 flex-1 sm:flex-initial">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-chart-2/20 flex items-center justify-center flex-shrink-0">
                  <FaCodePullRequest className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-chart-2" />
                </div>
                <div className="min-w-0">
                  <p className="text-base sm:text-lg font-bold text-foreground truncate">{metrics.prs_open.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Open PRs</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" asChild className="text-xs sm:text-sm">
                  <a href={`https://github.com/${profile.username}`} target="_blank" rel="noopener noreferrer">
                    <FaGithub className="h-3 w-3 sm:h-3.5 sm:w-3.5 sm:mr-2" />
                    <span className="hidden sm:inline">GitHub</span>
                  </a>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>GitHub</p>
              </TooltipContent>
            </Tooltip>
            {profile.linkedin_url && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm" asChild className="text-xs sm:text-sm">
                    <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer">
                      <FaLinkedin className="h-3 w-3 sm:h-3.5 sm:w-3.5 sm:mr-2" />
                      <span className="hidden sm:inline">LinkedIn</span>
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>LinkedIn</p>
                </TooltipContent>
              </Tooltip>
            )}
            {profile.instagram_url && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm" asChild className="text-xs sm:text-sm">
                    <a href={profile.instagram_url} target="_blank" rel="noopener noreferrer">
                      <FaInstagram className="h-3 w-3 sm:h-3.5 sm:w-3.5 sm:mr-2" />
                      <span className="hidden sm:inline">Instagram</span>
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Instagram</p>
                </TooltipContent>
              </Tooltip>
            )}
            {profile.twitter_username && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm" asChild className="text-xs sm:text-sm">
                    <a href={`https://twitter.com/${profile.twitter_username}`} target="_blank" rel="noopener noreferrer">
                      <FaXTwitter className="h-3 w-3 sm:h-3.5 sm:w-3.5 sm:mr-2" />
                      <span className="hidden sm:inline">X</span>
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>X (Twitter)</p>
                </TooltipContent>
              </Tooltip>
            )}
            {profile.website && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm" asChild className="text-xs sm:text-sm">
                    <a href={profile.website} target="_blank" rel="noopener noreferrer">
                      <FaGlobe className="h-3 w-3 sm:h-3.5 sm:w-3.5 sm:mr-2" />
                      <span className="hidden sm:inline">Website</span>
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Website</p>
                </TooltipContent>
              </Tooltip>
            )}
            {profile.email && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm" asChild className="text-xs sm:text-sm">
                    <a href={`mailto:${profile.email}`}>
                      <FaEnvelope className="h-3 w-3 sm:h-3.5 sm:w-3.5 sm:mr-2" />
                      <span className="hidden sm:inline">Email</span>
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Email</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

