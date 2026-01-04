# Fix specific dark mode colors based on user feedback

$files = Get-ChildItem -Path "c:\Users\pratik\MRv5\Maprecruit-Complete" -Include "*.jsx" -Recurse | Where-Object { $_.FullName -notmatch "node_modules" }

$replacements = @{
    # Fix hover states to use slate-700 (rgb(51 65 85))
    'dark:hover:bg-slate-700/50' = 'dark:hover:bg-slate-700'
    'dark:hover:bg-slate-800'    = 'dark:hover:bg-slate-700'
    'dark:hover:bg-slate-600'    = 'dark:hover:bg-slate-700'
    
    # Fix dashboard background from slate-900/50 to slate-700
    'dark:bg-slate-900/50'       = 'dark:bg-slate-700'
    
    # Fix text colors from gray-800 to slate-200 (rgb(226 232 240))
    'dark:text-white'            = 'dark:text-slate-200'
    
    # Fix active menu items background
    'dark:bg-slate-800'          = 'dark:bg-slate-700'
    'dark:bg-slate-900'          = 'dark:bg-slate-700'
}

$totalChanges = 0
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $originalContent = $content
    
    foreach ($find in $replacements.Keys) {
        $replace = $replacements[$find]
        $content = $content -replace [regex]::Escape($find), $replace
    }
    
    if ($content -ne $originalContent) {
        Set-Content $file.FullName -Value $content -NoNewline
        $totalChanges++
        Write-Host "Updated: $($file.Name)"
    }
}

Write-Host "Complete! Updated $totalChanges files with specific color fixes"
