import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa"
import Image from "next/image"
import type { ProjectsData } from "@/types/github"

interface WorkGalleryProps {
  projects?: ProjectsData
}

export function WorkGallery({ projects }: WorkGalleryProps) {
  if (!projects || projects.featured.length === 0) return null

  return (
    <section className="w-full py-8 sm:py-12 md:py-16 border-b border-border">
      <div className="space-y-6 sm:space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 sm:gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">Featured Work</h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              {projects.total_stars.toLocaleString()} stars across {projects.total_repos} repositories
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {projects.featured.slice(0, 6).map((project) => {
            const urlParts = project.url.split('/')
            const owner = urlParts[urlParts.length - 2]
            const repo = urlParts[urlParts.length - 1]
            const imageUrl = `https://opengraph.githubassets.com/1/${owner}/${repo}`

            return (
              <Card key={project.name} className="flex flex-col overflow-hidden border-border hover:border-primary/20 transition-colors group h-full">
                <div className="aspect-video w-full overflow-hidden bg-muted border-b border-border relative">
                  <Image 
                    src={imageUrl} 
                    alt={project.name} 
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    unoptimized
                  />
                </div>
                <CardContent className="flex-1 p-4 sm:p-5 flex flex-col gap-3 sm:gap-4">
                  <div className="space-y-2 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-base sm:text-lg leading-none tracking-tight truncate flex-1">
                        {project.name}
                      </h3>
                    </div>
                    {project.description && (
                      <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem] sm:min-h-[2.75rem]">
                        {project.description}
                      </p>
                    )}
                  </div>

                  {project.languages && Object.keys(project.languages).length > 0 && (
                    <div className="flex flex-wrap gap-1 sm:gap-1.5">
                      {Object.entries(project.languages)
                        .sort(([, a], [, b]) => b - a)
                        .slice(0, 5)
                        .map(([lang]) => (
                          <Badge key={lang} variant="outline" className="text-[10px] sm:text-xs font-normal px-1.5 sm:px-2 py-0.5">
                            {lang}
                          </Badge>
                        ))}
                    </div>
                  )}

                  <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-muted-foreground">
                    <span>{project.stars.toLocaleString()} stars</span>
                    <span>{project.forks.toLocaleString()} forks</span>
                  </div>

                  {project.topics && project.topics.length > 0 && (
                    <div className="flex flex-wrap gap-1 sm:gap-1.5">
                      {project.topics.slice(0, 3).map((topic) => (
                        <Badge key={topic} variant="outline" className="text-[10px] sm:text-xs font-normal px-1.5 sm:px-2 py-0.5">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <div className="mt-auto pt-3 sm:pt-4 flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="flex-1 gap-1.5 sm:gap-2 text-xs sm:text-sm"
                    >
                      <a href={project.url} target="_blank" rel="noopener noreferrer">
                        <FaGithub className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        Code
                      </a>
                    </Button>
                    {project.homepage && (
                      <Button
                        variant="default"
                        size="sm"
                        asChild
                        className="flex-1 gap-1.5 sm:gap-2 text-xs sm:text-sm"
                      >
                        <a href={project.homepage} target="_blank" rel="noopener noreferrer">
                          <FaExternalLinkAlt className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                          Demo
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {projects.languages && Object.keys(projects.languages).length > 0 && (
          <Card className="border-border">
            <CardContent className="p-4 sm:p-6">
              <h3 className="text-xs sm:text-sm font-medium text-muted-foreground mb-3 sm:mb-4">Top Languages</h3>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {Object.entries(projects.languages)
                  .sort(([, a], [, b]) => b - a)
                  .slice(0, 12)
                  .map(([lang]) => (
                    <Badge key={lang} variant="secondary" className="font-normal text-xs sm:text-sm px-2 sm:px-2.5 py-1">
                      {lang}
                    </Badge>
                  ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  )
}

