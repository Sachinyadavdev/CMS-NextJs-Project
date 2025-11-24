import { NextRequest, NextResponse } from 'next/server';
import { saveLayoutVersion, revertToVersion, getLayoutById } from '@/lib/mysql-db';
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

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = getTokenFromRequest(request);
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = verifyToken(token);
    if (!user || !user.isAdmin) {
      return NextResponse.json(
        { error: 'Forbidden: Admin access required' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { sections, isDraft, notes } = body;

    if (!sections) {
      return NextResponse.json(
        { error: 'Sections are required' },
        { status: 400 }
      );
    }

    const layout = await saveLayoutVersion(params.id, sections, user.email, isDraft || false, notes);

    if (!layout) {
      return NextResponse.json(
        { error: 'Layout not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(layout, { status: 200 });
  } catch (error) {
    console.error('Save version error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json(
      { error: `Failed to save version: ${errorMessage}` },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const layout = await getLayoutById(params.id);
    if (!layout) {
      return NextResponse.json(
        { error: 'Layout not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ versions: layout.versions }, { status: 200 });
  } catch (error) {
    console.error('Get versions error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
