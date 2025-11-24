const fs = require('fs');
const path = require('path');

const layoutsFile = path.join(process.cwd(), 'data', 'layouts.json');
const backupFile = path.join(process.cwd(), 'data', 'layouts-backup.json');

function migrateLayouts() {
  console.log('🔄 Starting layout migration...');
  
  // Read current layouts
  const currentLayouts = JSON.parse(fs.readFileSync(layoutsFile, 'utf-8'));
  
  // Create backup
  fs.writeFileSync(backupFile, JSON.stringify(currentLayouts, null, 2));
  console.log('✅ Backup created at layouts-backup.json');
  
  // Migrate each layout
  const migratedLayouts = currentLayouts.map((layout, index) => {
    console.log(`🔄 Migrating layout: ${layout.name} (ID: ${layout.id})`);
    
    // Create initial version from current sections
    const versionId = Date.now().toString() + index; // Ensure unique IDs
    const currentTime = new Date().toISOString();
    
    const initialVersion = {
      versionId,
      sections: layout.sections || [],
      createdAt: currentTime,
      createdBy: 'migration-script',
      isDraft: false,
      notes: 'Initial version created during migration'
    };
    
    // Create migrated layout with all required properties
    const migratedLayout = {
      id: layout.id,
      name: layout.name,
      title: layout.name, // Use name as title
      slug: layout.slug,
      sections: layout.sections || [],
      metadata: {
        title: layout.name,
        description: layout.tagLine || `${layout.name} page`,
        keywords: layout.tagLine || '',
        ogImage: Array.isArray(layout.imageUrl) ? layout.imageUrl[0] : layout.imageUrl || ''
      },
      versions: [initialVersion],
      currentVersionId: versionId,
      createdAt: currentTime,
      updatedAt: currentTime,
      
      // Preserve additional properties as custom fields (optional)
      ...(layout.imageUrl && { customImageUrl: layout.imageUrl }),
      ...(layout.submenu && { customSubmenu: layout.submenu }),
      ...(layout.tagLine && { customTagLine: layout.tagLine })
    };
    
    return migratedLayout;
  });
  
  // Write migrated layouts
  fs.writeFileSync(layoutsFile, JSON.stringify(migratedLayouts, null, 2));
  
  console.log('✅ Migration completed successfully!');
  console.log(`📊 Migrated ${migratedLayouts.length} layouts`);
  console.log('🔍 Each layout now has:');
  console.log('  - Required metadata object');
  console.log('  - Versions array with initial version');
  console.log('  - currentVersionId property');
  console.log('  - createdAt/updatedAt timestamps');
  console.log('  - Preserved custom properties for compatibility');
  
  return migratedLayouts;
}

// Run migration
try {
  migrateLayouts();
} catch (error) {
  console.error('❌ Migration failed:', error);
  process.exit(1);
}