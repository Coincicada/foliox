import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { AboutData } from "@/types/github"

interface AboutSectionProps {
  about?: AboutData | null
}

export function AboutSection({ about }: AboutSectionProps) {
  if (!about) return null

  return (
    <section className="w-full py-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">About</h2>
      
      <div className="space-y-6">
        {about.summary && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{about.summary}</p>
            </CardContent>
          </Card>
        )}

        {about.highlights && about.highlights.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Highlights</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {about.highlights.map((highlight, index) => (
                  <li key={index} className="flex gap-2 text-muted-foreground">
                    <span className="text-primary mt-1">•</span>
                    <span className="flex-1">{highlight}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  )
}

