import { GitHubProfileFetcher } from '@/lib/modules/github/fetcher';
import { AIDescriptionGenerator } from '@/lib/modules/ai/generator';
import type { NormalizedProfile } from '@/types/github';

export async function generatePortfolioProfile(username: string): Promise<NormalizedProfile> {
  const basicProfile = await GitHubProfileFetcher.fetchUserProfile(username);
  basicProfile.cached = false;

  try {
    const aiGenerator = new AIDescriptionGenerator();
    const [aboutData, seoData] = await Promise.all([
      aiGenerator.generateProfileSummary(basicProfile),
      aiGenerator.generateSEOContents(basicProfile),
    ]);

    basicProfile.about = aboutData;
    basicProfile.seo = seoData;
  } catch (error) {
    console.error('Failed to generate AI description:', error);
    basicProfile.about = null;
    basicProfile.seo = null;
  }

  return basicProfile;
}


