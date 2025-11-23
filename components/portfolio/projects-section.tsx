import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BsStar, BsGit, BsBoxArrowUpRight } from "react-icons/bs"
import { FaGithub } from "react-icons/fa"
import type { ProjectsData } from "@/types/github"
import { ProjectImage } from "./project-image"

interface ProjectsSectionProps {
  projects?: ProjectsData
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  if (!projects || projects.featured.length === 0) return null

  return (
    <section className="w-full py-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold">Featured Projects</h2>
        <div className="text-sm text-muted-foreground">
          {projects.total_stars} stars · {projects.total_repos} repositories
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.featured.slice(0, 6).map((project) => {
          const urlParts = project.url.split('/')
          const owner = urlParts[urlParts.length - 2]
          const repo = urlParts[urlParts.length - 1]
          const fallbackImageUrl = `https://opengraph.githubassets.com/1/${owner}/${repo}`
          
          const imageUrl = project.homepage
            ? `/api/screenshot?url=${encodeURIComponent(project.homepage)}&width=1280&height=800&format=png`
            : fallbackImageUrl

          return (
            <Card key={project.name} className="hover:shadow-md transition-shadow overflow-hidden">
              {project.homepage && (
                <div className="aspect-video w-full overflow-hidden bg-muted border-b border-border relative">
                  <ProjectImage 
                    src={imageUrl} 
                    fallbackSrc={fallbackImageUrl}
                    alt={project.name} 
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    unoptimized
                  />
                </div>
              )}
              <CardHeader>
                <div className="flex justify-between items-start gap-2">
                  <CardTitle className="text-lg">
                    {project.name}
                  </CardTitle>
                </div>
                {project.description && (
                  <CardDescription className="line-clamp-2">
                    {project.description}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent className="space-y-3">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                {project.language && (
                  <div className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-full bg-primary" />
                    <span>{project.language}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <BsStar className="h-4 w-4" />
                  <span>{project.stars}</span>
                </div>
                <div className="flex items-center gap-1">
                  <BsGit className="h-4 w-4" />
                  <span>{project.forks}</span>
                </div>
              </div>

              {project.topics && project.topics.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {project.topics.slice(0, 5).map((topic) => (
                    <Badge key={topic} variant="outline" className="text-xs">
                      {topic}
                    </Badge>
                  ))}
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-primary/10 hover:bg-primary/20 rounded-md transition-colors"
                >
                  <FaGithub className="h-4 w-4" />
                  <span>GitHub</span>
                </a>
                {project.homepage && (
                  <a
                    href={project.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-primary/10 hover:bg-primary/20 rounded-md transition-colors"
                  >
                    <BsBoxArrowUpRight className="h-4 w-4" />
                    <span>Live Site</span>
                  </a>
                )}
              </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {projects.languages && Object.keys(projects.languages).length > 0 && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Top Languages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {Object.entries(projects.languages)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 10)
                .map(([lang]) => (
                  <Badge key={lang} variant="secondary">
                    {lang}
                  </Badge>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </section>
  )
}

