import { NextResponse } from 'next/server';
import { getNavigationData } from '@/lib/mysql-db';

export async function GET() {
  try {
    const navigationData = await getNavigationData();
    return NextResponse.json(navigationData, {
      status: 200,
      // headers: {
      //   'Cache-Control': 'public, max-age=600, s-maxage=1200, stale-while-revalidate=86400',
      //   'CDN-Cache-Control': 'max-age=1200',
      // },
    });
  } catch (error) {
    console.error('Get navigation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
