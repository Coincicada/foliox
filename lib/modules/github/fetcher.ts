import { graphql } from '@octokit/graphql';
import { Settings } from '@/lib/config/settings';
import { NormalizedProfile, GitHubGraphQLUser } from '@/types/github';

const graphqlWithAuth = Settings.GITHUB_TOKEN
  ? graphql.defaults({
      headers: {
        authorization: `Bearer ${Settings.GITHUB_TOKEN}`,
      },
    })
  : graphql;

const USER_QUERY = `
  query($username: String!) {
    user(login: $username) {
      login
      name
      bio
      avatarUrl
      location
      email
      websiteUrl
      twitterUsername
      company
      followers {
        totalCount
      }
      following {
        totalCount
      }
      repositories(first: 100, privacy: PUBLIC, orderBy: {field: UPDATED_AT, direction: DESC}) {
        totalCount
        nodes {
          name
          description
          url
          stargazerCount
          forkCount
          primaryLanguage {
            name
            color
          }
          languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
            edges {
              size
              node {
                name
                color
              }
            }
          }
          repositoryTopics(first: 10) {
            nodes {
              topic {
                name
              }
            }
          }
          isPrivate
          isFork
          updatedAt
          createdAt
        }
      }
      createdAt
      updatedAt
    }
  }
`;

export class GitHubProfileFetcher {
  static async fetchUserProfile(username: string): Promise<NormalizedProfile> {
    if (!Settings.GITHUB_TOKEN) {
      throw new Error('GITHUB_TOKEN is required. Please set it in your environment variables.');
    }

    try {
      const result = await graphqlWithAuth<{ user: GitHubGraphQLUser }>(USER_QUERY, {
        username,
      });

      if (!result.user) {
        throw new Error(`User ${username} not found`);
      }

      const user = result.user;

      const normalizedProfile: NormalizedProfile = {
        username: user.login,
        name: user.name,
        bio: user.bio,
        avatar_url: user.avatarUrl,
        location: user.location,
        email: user.email,
        website: user.websiteUrl,
        twitter_username: user.twitterUsername,
        company: user.company,
        followers: user.followers.totalCount,
        following: user.following.totalCount,
        public_repos: user.repositories.totalCount,
        created_at: user.createdAt || new Date().toISOString(),
        cached: false,
      };

      return normalizedProfile;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      const errorStatus = (error as { status?: number })?.status;

      if (errorMessage.includes('Could not resolve to a User') || errorMessage.includes('NOT_FOUND')) {
        throw new Error(`GitHub user ${username} not found`);
      }
      if (errorMessage.includes('Bad credentials') || errorStatus === 401) {
        throw new Error('Invalid GitHub token. Please check your GITHUB_TOKEN environment variable.');
      }
      if (errorStatus === 403) {
        throw new Error('GitHub API rate limit exceeded or token lacks required permissions.');
      }
      throw new Error(`Failed to fetch GitHub profile: ${errorMessage}`);
    }
  }

  static async fetchUserRepositories(username: string) {
    if (!Settings.GITHUB_TOKEN) {
      throw new Error('GITHUB_TOKEN is required. Please set it in your environment variables.');
    }

    try {
      const result = await graphqlWithAuth<{ user: GitHubGraphQLUser }>(USER_QUERY, {
        username,
      });

      if (!result.user) {
        throw new Error(`User ${username} not found`);
      }

      return result.user.repositories.nodes;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      const errorStatus = (error as { status?: number })?.status;

      if (errorMessage.includes('Could not resolve to a User') || errorMessage.includes('NOT_FOUND')) {
        throw new Error(`GitHub user ${username} not found`);
      }
      if (errorMessage.includes('Bad credentials') || errorStatus === 401) {
        throw new Error('Invalid GitHub token. Please check your GITHUB_TOKEN environment variable.');
      }
      if (errorStatus === 403) {
        throw new Error('GitHub API rate limit exceeded or token lacks required permissions.');
      }
      throw new Error(`Failed to fetch repositories: ${errorMessage}`);
    }
  }
}

