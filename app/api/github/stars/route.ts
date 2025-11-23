import { NextResponse } from "next/server"
import { Settings } from "@/lib/config/settings"

const REPO_OWNER = "kartiklabhshetwar"
const REPO_NAME = "foliox"

async function fetchGitHubStars(useToken: boolean = true): Promise<number> {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "Foliox/1.0",
  }

  if (useToken && Settings.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${Settings.GITHUB_TOKEN}`
  }

  const response = await fetch(
    `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}`,
    {
      headers,
      cache: "no-store",
    }
  )

  if (!response.ok) {
    if (response.status === 401 && useToken && Settings.GITHUB_TOKEN) {
      if (Settings.DEBUG) {
        console.warn("GitHub API returned 401 with token, retrying without token")
      }
      return fetchGitHubStars(false)
    }
    
    const errorText = await response.text().catch(() => "Unknown error")
    throw new Error(
      `GitHub API error: ${response.status} ${response.statusText} - ${errorText}`
    )
  }

  const data = await response.json()
  const stars = typeof data.stargazers_count === "number" ? data.stargazers_count : 0
  return stars
}

export async function GET() {
  try {
    const stars = await fetchGitHubStars()
    return NextResponse.json({ stars }, { 
      status: 200,
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        "Pragma": "no-cache",
        "Expires": "0",
      },
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    
    if (Settings.DEBUG) {
      console.error("Failed to fetch GitHub stars:", errorMessage)
      console.error("GITHUB_TOKEN present:", !!Settings.GITHUB_TOKEN)
    }

    return NextResponse.json({ 
      stars: 0,
      error: Settings.DEBUG ? errorMessage : undefined
    }, { 
      status: 200,
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        "Pragma": "no-cache",
        "Expires": "0",
      },
    })
  }
}

