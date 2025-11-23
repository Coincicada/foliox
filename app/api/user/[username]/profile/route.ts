import { NextRequest, NextResponse } from 'next/server';
import { verifyUsername } from '@/lib/utils/user';
import { resolveProfile } from '@/lib/services/profile-cache';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ username: string }> }
) {
  try {
    const { username: rawUsername } = await context.params;
    const username = verifyUsername(rawUsername);

    const { profile } = await resolveProfile(username);

    return NextResponse.json(profile, { status: 200 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    if (errorMessage.includes('not found') || errorMessage.includes('Invalid')) {
      return NextResponse.json(
        { detail: errorMessage },
        { status: 404 }
      );
    }

    console.error('Profile fetch error:', error);
    return NextResponse.json(
      { detail: `Failed to fetch profile: ${errorMessage}` },
      { status: 500 }
    );
  }
}

