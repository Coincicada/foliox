import { Settings } from '@/lib/config/settings';
import { ContributionData, ContributionDay } from '@/types/portfolio';

export class GitHubContributionsFetcher {
  static async fetchContributions(username: string): Promise<ContributionData> {
    if (!Settings.GITHUB_TOKEN) {
      throw new Error('GITHUB_TOKEN is required. Please set it in your environment variables.');
    }

    try {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setFullYear(startDate.getFullYear() - 1);

      const contributions = new Map<string, number>();

      const events = await this.fetchUserEvents(username);
      
      events.forEach((event) => {
        const date = new Date(event.created_at);
        if (date >= startDate && date <= endDate) {
          const dateKey = date.toISOString().split('T')[0];
          const currentCount = contributions.get(dateKey) || 0;
          
          if (this.isContributionEvent(event.type)) {
            contributions.set(dateKey, currentCount + 1);
          }
        }
      });

      const weeks: { days: ContributionDay[] }[] = [];
      const currentDate = new Date(startDate);
      currentDate.setDate(currentDate.getDate() - currentDate.getDay());

      const lastWeekDate = new Date(endDate);
      lastWeekDate.setDate(lastWeekDate.getDate() + (6 - lastWeekDate.getDay()));

      while (currentDate <= lastWeekDate) {
        const week: ContributionDay[] = [];
        for (let i = 0; i < 7; i++) {
          const dateStr = currentDate.toISOString().split('T')[0];
          const count = contributions.get(dateStr) || 0;
          const level = this.getContributionLevel(count);
          
          week.push({
            date: dateStr,
            count,
            level,
          });
          
          currentDate.setDate(currentDate.getDate() + 1);
        }
        weeks.push({ days: week });
      }

      let totalContributions = 0;
      contributions.forEach((count) => {
        totalContributions += count;
      });

      return {
        totalContributions,
        weeks,
      };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      throw new Error(`Failed to fetch contributions: ${errorMessage}`);
    }
  }

  private static async fetchUserEvents(username: string): Promise<Array<{ created_at: string; type: string }>> {
    const events: Array<{ created_at: string; type: string }> = [];
    let page = 1;
    const perPage = 100;
    const maxPages = 10;

    while (page <= maxPages) {
      try {
        const response = await fetch(
          `https://api.github.com/users/${username}/events/public?page=${page}&per_page=${perPage}`,
          {
            headers: {
              Authorization: `Bearer ${Settings.GITHUB_TOKEN}`,
              Accept: 'application/vnd.github.v3+json',
            },
            next: { revalidate: 3600 },
          }
        );

        if (!response.ok) {
          if (response.status === 404) {
            break;
          }
          throw new Error(`GitHub API error: ${response.status}`);
        }

        const pageEvents = await response.json();
        
        if (pageEvents.length === 0) {
          break;
        }

        events.push(...pageEvents);
        
        if (pageEvents.length < perPage) {
          break;
        }

        page++;
      } catch (error) {
        if (page === 1) {
          throw error;
        }
        break;
      }
    }

    return events;
  }

  private static isContributionEvent(eventType: string): boolean {
    const contributionTypes = [
      'PushEvent',
      'PullRequestEvent',
      'IssuesEvent',
      'CreateEvent',
      'DeleteEvent',
      'ForkEvent',
      'WatchEvent',
      'PublicEvent',
      'PullRequestReviewEvent',
      'CommitCommentEvent',
      'IssueCommentEvent',
      'PullRequestReviewCommentEvent',
    ];
    return contributionTypes.includes(eventType);
  }

  private static getContributionLevel(count: number): 0 | 1 | 2 | 3 | 4 {
    if (count === 0) return 0;
    if (count <= 2) return 1;
    if (count <= 5) return 2;
    if (count <= 10) return 3;
    return 4;
  }
}

