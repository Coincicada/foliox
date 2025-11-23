import { NextRequest, NextResponse } from 'next/server';
import { Settings } from '@/lib/config/settings';
import { getCache, setCache, getCacheKey } from '@/lib/utils/cache';

interface ScreenshotParams {
  url: string;
  width?: number;
  height?: number;
  fullPage?: boolean;
  format?: 'png' | 'jpeg' | 'pdf';
  quality?: number;
}

async function fetchScreenshot(params: ScreenshotParams): Promise<Buffer> {
  const screenshotApiUrl = Settings.SCREENSHOT_API_URL;
  
  if (!screenshotApiUrl) {
    throw new Error('SCREENSHOT_API_URL is not configured');
  }

  const { url, width = 1280, height = 800, fullPage = false, format = 'png', quality = 80 } = params;

  const searchParams = new URLSearchParams({
    url,
    width: width.toString(),
    height: height.toString(),
    fullPage: fullPage.toString(),
    format,
  });

  if (format === 'jpeg') {
    searchParams.set('quality', quality.toString());
  }

  const apiUrl = `${screenshotApiUrl}/take?${searchParams.toString()}`;

  const response = await fetch(apiUrl, {
    method: 'GET',
    headers: {
      'Accept': format === 'pdf' ? 'application/pdf' : `image/${format}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => 'Unknown error');
    throw new Error(`Screenshot API failed: ${response.status} ${errorText}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const url = searchParams.get('url');

    if (!url) {
      return NextResponse.json(
        { error: 'URL parameter is required' },
        { status: 400 }
      );
    }

    try {
      new URL(url);
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      );
    }

    const width = searchParams.get('width') 
      ? parseInt(searchParams.get('width')!, 10) 
      : 1280;
    const height = searchParams.get('height') 
      ? parseInt(searchParams.get('height')!, 10) 
      : 800;
    const fullPage = searchParams.get('fullPage') === 'true';
    const format = (searchParams.get('format') || 'png') as 'png' | 'jpeg' | 'pdf';
    const quality = searchParams.get('quality') 
      ? parseInt(searchParams.get('quality')!, 10) 
      : 80;

    if (width < 1 || width > 3840 || height < 1 || height > 2160) {
      return NextResponse.json(
        { error: 'Width and height must be between 1 and 3840/2160 respectively' },
        { status: 400 }
      );
    }

    if (quality < 1 || quality > 100) {
      return NextResponse.json(
        { error: 'Quality must be between 1 and 100' },
        { status: 400 }
      );
    }

    const cacheKey = getCacheKey('screenshot', url, width.toString(), height.toString(), fullPage.toString(), format, quality.toString());
    
    const cachedScreenshot = await getCache<{ data: string; contentType: string }>(cacheKey);
    
    if (cachedScreenshot) {
      const buffer = Buffer.from(cachedScreenshot.data, 'base64');
      return new NextResponse(new Uint8Array(buffer), {
        status: 200,
        headers: {
          'Content-Type': cachedScreenshot.contentType,
          'Cache-Control': 'public, max-age=86400, s-maxage=86400',
          'X-Cache': 'HIT',
        },
      });
    }

    const screenshotBuffer = await fetchScreenshot({ url, width, height, fullPage, format, quality });

    const contentType = format === 'pdf' 
      ? 'application/pdf' 
      : `image/${format}`;

    const base64Data = screenshotBuffer.toString('base64');
    await setCache(
      cacheKey,
      { data: base64Data, contentType },
      {
        ttl: 86400,
        tags: ['screenshot', `url:${url}`],
      }
    );

    return new NextResponse(new Uint8Array(screenshotBuffer), {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400, s-maxage=86400',
        'X-Cache': 'MISS',
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    if (errorMessage.includes('not configured')) {
      return NextResponse.json(
        { error: 'Screenshot service is not available' },
        { status: 503 }
      );
    }

    console.error('Screenshot API error:', error);
    return NextResponse.json(
      { error: `Failed to capture screenshot: ${errorMessage}` },
      { status: 500 }
    );
  }
}

