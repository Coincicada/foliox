
import { Badge } from "@/components/ui/badge"
import type { AboutData } from "@/types/github"

interface CapabilitiesSectionProps {
  about?: AboutData | null
}

export function CapabilitiesSection({ about }: CapabilitiesSectionProps) {
  if (!about) return null

  return (
    <section className="w-full py-8 sm:py-12 md:py-16 border-b border-border">
      <div className="space-y-6 sm:space-y-8 md:space-y-10">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight mb-3 sm:mb-4">About</h2>
          {about.summary && (
            <p className="text-sm sm:text-base text-foreground/90 leading-relaxed max-w-4xl">
              {about.summary}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
          {about.highlights && about.highlights.length > 0 && (
            <div className="space-y-4 sm:space-y-5">
              <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-muted-foreground">Highlights</h3>
              <ul className="space-y-3 sm:space-y-3.5">
                {about.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-2.5 sm:gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-foreground/80 leading-relaxed">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {about.skills && about.skills.length > 0 && (
            <div className="space-y-4 sm:space-y-5">
              <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-muted-foreground">Skills</h3>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {about.skills.map((skill) => (
                  <Badge 
                    key={skill} 
                    variant="secondary" 
                    className="px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-normal bg-secondary/50 hover:bg-secondary transition-colors"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

