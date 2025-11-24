try {
    $web = Invoke-WebRequest -Uri 'http://localhost:3000/api/layouts'
    $json = $web.Content | ConvertFrom-Json
    Write-Host "Found $($json.Count) layouts"
    Write-Host "First layout: $($json[0].name)"
    Write-Host "ImageUrl count: $($json[0].imageUrl.Count)"
    Write-Host "Submenu count: $($json[0].submenu.Count)"
    if ($json[0].imageUrl -and $json[0].imageUrl.Count -gt 0) {
        Write-Host "✓ imageUrl present with $($json[0].imageUrl.Count) items"
    } else {
        Write-Host "✗ imageUrl missing or empty"
    }
    if ($json[0].submenu -and $json[0].submenu.Count -gt 0) {
        Write-Host "✓ submenu present with $($json[0].submenu.Count) items"
    } else {
        Write-Host "✗ submenu missing or empty"
    }
} catch {
    Write-Host "Error: $_"
}
