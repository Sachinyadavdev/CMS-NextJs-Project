import { NextRequest, NextResponse } from 'next/server';
import { revertToVersion } from '@/lib/mysql-db';
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
    const { versionId } = body;

    if (!versionId) {
      return NextResponse.json(
        { error: 'Version ID is required' },
        { status: 400 }
      );
    }

    const layout = await revertToVersion(params.id, versionId, user.email);

    if (!layout) {
      return NextResponse.json(
        { error: 'Layout or version not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(layout, { status: 200 });
  } catch (error) {
    console.error('Revert version error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
