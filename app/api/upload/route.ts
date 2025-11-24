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
    // Verify authentication
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

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const type = formData.get('type') as string || 'image';

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type and size
    const maxSize = type === 'image' ? 10 * 1024 * 1024 : 100 * 1024 * 1024; // 10MB for images, 100MB for videos
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: `File too large. Maximum size: ${type === 'image' ? '10MB' : '100MB'}` },
        { status: 400 }
      );
    }

    const allowedTypes = type === 'image'
      ? ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
      : ['video/mp4', 'video/webm', 'video/ogg'];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: `Invalid file type. Allowed: ${allowedTypes.join(', ')}` },
        { status: 400 }
      );
    }

    // Generate unique filename
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 1000000);
    const extension = file.name.split('.').pop() || '';
    const filename = `${type}/${timestamp}-${randomNum}.${extension}`;

    // Upload to Vercel Blob
    const buffer = await file.arrayBuffer();
    const blob = await put(filename, buffer, {
      access: 'public',
      contentType: file.type,
    });

    console.log(`File uploaded successfully: ${filename} -> ${blob.url}`);

    return NextResponse.json({
      url: blob.url,
      filename: blob.pathname,
      size: file.size
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Upload failed' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Verify authentication
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

    // Delete from Vercel Blob
    await del(url);

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { error: 'Delete failed' },
      { status: 500 }
    );
  }
}