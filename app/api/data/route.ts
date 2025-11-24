import { NextRequest, NextResponse } from 'next/server';
import { put, del } from '@vercel/blob';
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
    if (!user || !user.isAdmin) {
      return NextResponse.json(
        { error: 'Forbidden: Admin access required' },
        { status: 403 }
      );
    }

    const { dataType, data, filename } = await request.json();

    if (!dataType || !data) {
      return NextResponse.json(
        { error: 'Missing dataType or data' },
        { status: 400 }
      );
    }

    const allowedTypes = ['layout', 'config', 'settings', 'metadata'];
    if (!allowedTypes.includes(dataType)) {
      return NextResponse.json(
        { error: `Invalid dataType. Allowed: ${allowedTypes.join(', ')}` },
        { status: 400 }
      );
    }

    const timestamp = Date.now();
    const filenameWithPath = filename || `${dataType}/${timestamp}-${Math.random().toString(36).substring(7)}.json`;

    const jsonContent = JSON.stringify(data);
    const blob = await put(filenameWithPath, jsonContent, {
      access: 'public',
      contentType: 'application/json',
    });

    console.log(`Data stored successfully: ${filenameWithPath} -> ${blob.url}`);

    return NextResponse.json({
      url: blob.url,
      filename: blob.pathname,
      dataType,
    });

  } catch (error) {
    console.error('Data storage error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Data storage failed' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
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

    const { url } = await request.json();

    if (!url || !url.includes('vercel-storage.com')) {
      return NextResponse.json(
        { error: 'Invalid Vercel Blob URL' },
        { status: 400 }
      );
    }

    await del(url);
    console.log(`Data deleted successfully: ${url}`);

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Delete failed' },
      { status: 500 }
    );
  }
}
