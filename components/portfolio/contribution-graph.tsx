"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ContributionData } from "@/types/portfolio"

interface ContributionGraphProps {
  username: string
  data?: ContributionData
}

export function ContributionGraph({ username }: ContributionGraphProps) {
  return (
    <section className="w-full py-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">GitHub Activity</h2>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Contribution Graph</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full overflow-x-auto">
            <img
              src={`https://ghchart.rshah.org/${username}`}
              alt={`${username}'s GitHub contribution graph`}
              className="w-full max-w-4xl mx-auto"
            />
          </div>
          <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
            <span>Less</span>
            <div className="flex gap-1">
              <div className="w-3 h-3 rounded-sm bg-muted" />
              <div className="w-3 h-3 rounded-sm bg-green-200 dark:bg-green-900" />
              <div className="w-3 h-3 rounded-sm bg-green-400 dark:bg-green-700" />
              <div className="w-3 h-3 rounded-sm bg-green-600 dark:bg-green-500" />
              <div className="w-3 h-3 rounded-sm bg-green-800 dark:bg-green-300" />
            </div>
            <span>More</span>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

