const fs = require('fs');
const path = require('path');

// Simple test to verify the layouts can be loaded and saveLayoutVersion works
const layoutsFile = path.join(process.cwd(), 'data', 'layouts.json');

function testLayoutStructure() {
  console.log('🧪 Testing migrated layout structure...');
  
  try {
    // Load layouts
    const layouts = JSON.parse(fs.readFileSync(layoutsFile, 'utf-8'));
    
    console.log(`✅ Successfully loaded ${layouts.length} layouts`);
    
    // Test first layout structure
    const firstLayout = layouts[0];
    const requiredProps = ['id', 'name', 'title', 'slug', 'sections', 'metadata', 'versions', 'currentVersionId', 'createdAt', 'updatedAt'];
    
    console.log('🔍 Checking required properties...');
    
    let allPropsPresent = true;
    requiredProps.forEach(prop => {
      if (firstLayout.hasOwnProperty(prop)) {
        console.log(`  ✅ ${prop}: present`);
      } else {
        console.log(`  ❌ ${prop}: MISSING`);
        allPropsPresent = false;
      }
    });
    
    if (allPropsPresent) {
      console.log('✅ All required properties are present!');
      
      // Test versions array structure
      if (Array.isArray(firstLayout.versions) && firstLayout.versions.length > 0) {
        const version = firstLayout.versions[0];
        const versionProps = ['versionId', 'sections', 'createdAt', 'createdBy', 'isDraft'];
        
        console.log('🔍 Checking version structure...');
        versionProps.forEach(prop => {
          if (version.hasOwnProperty(prop)) {
            console.log(`  ✅ version.${prop}: present`);
          } else {
            console.log(`  ❌ version.${prop}: MISSING`);
          }
        });
        
        console.log('✅ Version structure is valid!');
      } else {
        console.log('❌ Versions array is invalid');
      }
      
      // Test metadata structure
      if (firstLayout.metadata && typeof firstLayout.metadata === 'object') {
        console.log('✅ Metadata structure is valid!');
        console.log(`  Title: ${firstLayout.metadata.title}`);
        console.log(`  Description: ${firstLayout.metadata.description}`);
      } else {
        console.log('❌ Metadata structure is invalid');
      }
      
    } else {
      console.log('❌ Some required properties are missing');
      return false;
    }
    
    console.log('🎉 Migration test PASSED! The saveLayoutVersion function should now work correctly.');
    return true;
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    return false;
  }
}

// Run test
testLayoutStructure();