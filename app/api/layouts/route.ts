import { NextRequest, NextResponse } from 'next/server';
import { getLayouts, createLayout } from '@/lib/mysql-db';
import { verifyToken } from '@/lib/auth';

const getTokenFromRequest = (request: NextRequest): string | null => {
  const token = request.cookies.get('token')?.value;
  if (token) return token;

  const authHeader = request.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.slice(7);
  }
  return null;
};

export async function GET(request: NextRequest) {
  try {
    const layouts = await getLayouts();
    return NextResponse.json(layouts, {
      status: 200,
      // headers: {
      //   'Cache-Control': 'public, max-age=600, s-maxage=1200, stale-while-revalidate=86400',
      //   'CDN-Cache-Control': 'max-age=1200',
      // },
    });
  } catch (error) {
    console.error('Get layouts error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = getTokenFromRequest(request);
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = verifyToken(token);
    if (!user) {
      const response = NextResponse.json(
        { error: 'Session expired' },
        { status: 401 }
      );
      response.cookies.set('token', '', { httpOnly: true, maxAge: 0 });
      return response;
    }
    if (!user.isAdmin) {
      return NextResponse.json(
        { error: 'Forbidden: Admin access required' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { name, title, slug, sections, metadata } = body;

    if (!name || !title || !slug) {
      return NextResponse.json(
        { error: 'Name, title and slug are required' },
        { status: 400 }
      );
    }

    const layout = await createLayout({
      name,
      title,
      slug,
      sections: sections || [],
      metadata: metadata || { title, description: '' },
    });

    return NextResponse.json(layout, { status: 201 });
  } catch (error) {
    console.error('Create layout error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
