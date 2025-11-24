#!/bin/bash
echo "Testing migration..."
curl http://localhost:3000/api/layouts > /tmp/layouts.json
SIZE=$(stat -f%z /tmp/layouts.json 2>/dev/null || stat -c%s /tmp/layouts.json)
echo "Response size: $SIZE bytes"
if [ $SIZE -gt 1000 ]; then
  echo "SUCCESS: Data migrated"
else
  echo "FAIL: Not enough data"
fi
