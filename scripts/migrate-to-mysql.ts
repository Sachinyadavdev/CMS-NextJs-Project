import fs from 'fs';
import path from 'path';

const envPath = path.join(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
envContent.split('\n').forEach(line => {
  const [key, value] = line.split('=');
  if (key && value) {
    process.env[key.trim()] = value.trim();
  }
});

import { createUser, createLayout, saveLayoutVersion, getLayoutById } from '../lib/mysql-db';

async function migrate() {
  try {
    console.log('Starting data migration to MySQL...');
    console.log('Waiting for database initialization...');
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Read JSON files
    const usersPath = path.join(process.cwd(), 'data', 'users.json');
    const layoutsPath = path.join(process.cwd(), 'data', 'layouts.json');
    const versionsPath = path.join(process.cwd(), 'data', 'layout-versions.json');

    const users = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));
    const layouts = JSON.parse(fs.readFileSync(layoutsPath, 'utf-8'));
    const versions = JSON.parse(fs.readFileSync(versionsPath, 'utf-8'));

    // Migrate users
    console.log(`\nMigrating ${users.length} users...`);
    for (const user of users) {
      try {
        await createUser({
          email: user.email,
          password: user.password,
          name: user.name,
          isAdmin: user.isAdmin,
        });
        console.log(`✓ Migrated user: ${user.email}`);
      } catch (error: any) {
        if (error.code === 'ER_DUP_ENTRY') {
          console.log(`⊘ User already exists: ${user.email}`);
        } else {
          throw error;
        }
      }
    }

    // Migrate layouts
    console.log(`\nMigrating ${layouts.length} layouts...`);
    for (const layout of layouts) {
      try {
        await createLayout({
          name: layout.name,
          title: layout.title,
          slug: layout.slug,
          sections: layout.sections,
          metadata: { title: layout.title, description: '' },
        });
        console.log(`✓ Migrated layout: ${layout.name} (ID: ${layout.id})`);
      } catch (error: any) {
        if (error.code === 'ER_DUP_ENTRY') {
          console.log(`⊘ Layout already exists: ${layout.slug}`);
        } else {
          throw error;
        }
      }
    }

    // Migrate layout versions
    console.log(`\nMigrating ${versions.length} layout versions...`);
    for (const version of versions) {
      try {
        const layout = await getLayoutById(version.layoutId);
        if (layout) {
          await saveLayoutVersion(
            version.layoutId,
            version.sections,
            'Migration from JSON',
            false,
            'Migrated from JSON'
          );
          console.log(`✓ Migrated version for layout ${version.layoutId}`);
        }
      } catch (error: any) {
        if (error.code === 'ER_DUP_ENTRY') {
          console.log(`⊘ Version already exists for layout ${version.layoutId}`);
        } else {
          throw error;
        }
      }
    }

    console.log('\n✅ Migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

migrate();
