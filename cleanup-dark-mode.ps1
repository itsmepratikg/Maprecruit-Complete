# Comprehensive Dark Mode Cleanup and Color Fix Script

$files = Get-ChildItem -Path "c:\Users\pratik\MRv5\Maprecruit-Complete" -Include "*.jsx" -Recurse | Where-Object { $_.FullName -notmatch "node_modules" }

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $originalContent = $content
    
    # Remove duplicate dark mode classes
    $content = $content -replace 'dark:bg-slate-700 dark:bg-slate-700', 'dark:bg-slate-700'
    $content = $content -replace 'dark:bg-slate-800 dark:bg-slate-800', 'dark:bg-slate-700'
    $content = $content -replace 'dark:text-slate-200 dark:text-slate-200', 'dark:text-slate-200'
    $content = $content -replace 'dark:text-slate-300 dark:text-slate-300', 'dark:text-slate-300'
    $content = $content -replace 'dark:text-white dark:text-white', 'dark:text-slate-200'
    $content = $content -replace 'dark:hover:bg-slate-700 dark:hover:bg-slate-700', 'dark:hover:bg-slate-700'
    $content = $content -replace 'dark:border-slate-600 dark:border-slate-600', 'dark:border-slate-600'
    
    # Fix any remaining dark:bg-slate-800 to dark:bg-slate-700
    $content = $content -replace 'dark:bg-slate-800', 'dark:bg-slate-700'
    
    # Fix any dark:text-white to dark:text-slate-200
    $content = $content -replace 'dark:text-white ', 'dark:text-slate-200 '
    
    if ($content -ne $originalContent) {
        Set-Content $file.FullName -Value $content -NoNewline
        Write-Host "Cleaned: $($file.Name)"
    }
}

Write-Host "`nCleanup complete!"
