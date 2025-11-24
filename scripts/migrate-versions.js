const fs = require('fs');
const path = require('path');

const layoutsFile = path.join(process.cwd(), 'data', 'layouts.json');
const layoutVersionsFile = path.join(process.cwd(), 'data', 'layout-versions.json');

function migrateVersions() {
  console.log('🔄 Starting version migration...');

  // Read current layouts
  const layouts = JSON.parse(fs.readFileSync(layoutsFile, 'utf-8'));

  // Read current versions
  let versions = [];
  if (fs.existsSync(layoutVersionsFile)) {
    versions = JSON.parse(fs.readFileSync(layoutVersionsFile, 'utf-8'));
  }

  console.log(`📊 Found ${layouts.length} layouts and ${versions.length} existing versions`);

  // Collect all versions from layouts
  const migratedVersions = [];
  const updatedLayouts = [];

  layouts.forEach((layout, index) => {
    console.log(`🔄 Processing layout: ${layout.name} (ID: ${layout.id})`);

    const layoutVersions = layout.versions || [];

    // Add layoutId to each version and collect them
    layoutVersions.forEach(version => {
      migratedVersions.push({
        ...version,
        layoutId: layout.id
      });
    });

    // Remove versions from layout
    const { versions: _, ...layoutWithoutVersions } = layout;
    updatedLayouts.push(layoutWithoutVersions);
  });

  // Combine with existing versions
  const allVersions = [...versions, ...migratedVersions];

  console.log(`📊 Total versions after migration: ${allVersions.length}`);

  // Write updated layouts (without versions)
  fs.writeFileSync(layoutsFile, JSON.stringify(updatedLayouts, null, 2));

  // Write all versions to separate file
  fs.writeFileSync(layoutVersionsFile, JSON.stringify(allVersions, null, 2));

  console.log('✅ Migration completed successfully!');
  console.log(`📊 Migrated ${migratedVersions.length} versions from layouts to separate file`);
  console.log('🔍 Layouts now store only current state, versions are in separate file');
}

try {
  migrateVersions();
} catch (error) {
  console.error('❌ Migration failed:', error);
  process.exit(1);
}