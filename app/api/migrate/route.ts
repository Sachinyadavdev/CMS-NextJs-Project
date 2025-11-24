import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { createUser, createLayout, saveLayoutVersion, getLayoutById } from '@/lib/mysql-db';

export async function POST(request: NextRequest) {
  try {
    console.log('Starting data migration to MySQL...');

    const usersPath = path.join(process.cwd(), 'data', 'users.json');
    const layoutsPath = path.join(process.cwd(), 'data', 'layouts.json');
    const versionsPath = path.join(process.cwd(), 'data', 'layout-versions.json');

    const users = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));
    const layouts = JSON.parse(fs.readFileSync(layoutsPath, 'utf-8'));
    const versions = JSON.parse(fs.readFileSync(versionsPath, 'utf-8'));

    const results = {
      usersCount: 0,
      layoutsCount: 0,
      versionsCount: 0,
      errors: [] as string[],
    };

    // Migrate users
    console.log(`Migrating ${users.length} users...`);
    for (const user of users) {
      try {
        await createUser({
          email: user.email,
          password: user.password,
          name: user.name,
          isAdmin: user.isAdmin,
        });
        results.usersCount++;
      } catch (error: any) {
        if (error.code === 'ER_DUP_ENTRY') {
          console.log(`User already exists: ${user.email}`);
        } else {
          results.errors.push(`User ${user.email}: ${error.message}`);
        }
      }
    }

    // Migrate layouts and track ID mapping
    console.log(`Migrating ${layouts.length} layouts...`);
    const layoutIdMap = new Map<string, string>();
    
    for (const layout of layouts) {
      try {
        const createdLayout = await createLayout({
          name: layout.name,
          title: layout.title,
          slug: layout.slug,
          sections: layout.sections,
          metadata: { title: layout.title, description: '' },
          imageUrl: layout.imageUrl || [],
          submenu: layout.submenu || [],
        } as any);
        layoutIdMap.set(layout.id, createdLayout.id);
        results.layoutsCount++;
      } catch (error: any) {
        if (error.code === 'ER_DUP_ENTRY') {
          console.log(`Layout already exists: ${layout.slug}`);
        } else {
          results.errors.push(`Layout ${layout.slug}: ${error.message}`);
        }
      }
    }

    // Migrate layout versions using mapped IDs
    console.log(`Migrating ${versions.length} layout versions...`);
    for (const version of versions) {
      try {
        const newLayoutId = layoutIdMap.get(version.layoutId);
        if (newLayoutId) {
          await saveLayoutVersion(
            newLayoutId,
            version.sections,
            'Migration from JSON',
            false,
            'Migrated from JSON'
          );
          results.versionsCount++;
        }
      } catch (error: any) {
        if (error.code !== 'ER_DUP_ENTRY') {
          results.errors.push(`Version for layout ${version.layoutId}: ${error.message}`);
        }
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Migration completed',
        ...results,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: 'Migration failed',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
