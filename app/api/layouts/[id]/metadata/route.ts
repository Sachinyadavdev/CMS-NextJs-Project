import { NextRequest, NextResponse } from 'next/server';
import { updateLayoutMetadata } from '@/lib/mysql-db';
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

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = getTokenFromRequest(request);
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = verifyToken(token);
    if (!user) {
      const response = NextResponse.json({ error: 'Session expired' }, { status: 401 });
      response.cookies.set('token', '', { httpOnly: true, maxAge: 0 });
      return response;
    }
    if (!user.isAdmin) {
      return NextResponse.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    const body = await request.json();
    const { title, description, slug } = body;

    if (!title || !slug) {
      return NextResponse.json({ error: 'Title and slug are required' }, { status: 400 });
    }

    const layout = await updateLayoutMetadata(params.id, { title, description, slug });
    if (!layout) {
      return NextResponse.json({ error: 'Layout not found' }, { status: 404 });
    }

    return NextResponse.json(layout, { status: 200 });
  } catch (error) {
    console.error('Update metadata error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
