# Comprehensive Dark Mode Fix Script
# This script adds dark mode variants to ALL light mode classes

$files = Get-ChildItem -Path "c:\Users\pratik\MRv5\Maprecruit-Complete" -Include "*.jsx" -Recurse | Where-Object { $_.FullName -notmatch "node_modules" }

$replacements = @{
    # Backgrounds - EVERY white background
    'bg-white '             = 'bg-white dark:bg-slate-800 '
    'bg-white"'             = 'bg-white dark:bg-slate-800"'
    "bg-white'"             = "bg-white dark:bg-slate-800'"
    'bg-white>'             = 'bg-white dark:bg-slate-800>'
    'bg-white/'             = 'bg-white dark:bg-slate-800/'
    
    # Gray backgrounds
    'bg-gray-50 '           = 'bg-gray-50 dark:bg-slate-700 '
    'bg-gray-100 '          = 'bg-gray-100 dark:bg-slate-700 '
    'bg-slate-50 '          = 'bg-slate-50 dark:bg-slate-700 '
    'bg-slate-100 '         = 'bg-slate-100 dark:bg-slate-700 '
    'bg-slate-200 '         = 'bg-slate-200 dark:bg-slate-700 '
    
    # Text colors
    'text-gray-800 '        = 'text-gray-800 dark:text-white '
    'text-gray-700 '        = 'text-gray-700 dark:text-slate-200 '
    'text-gray-600 '        = 'text-gray-600 dark:text-slate-300 '
    'text-gray-500 '        = 'text-gray-500 dark:text-slate-400 '
    'text-gray-400 '        = 'text-gray-400 dark:text-slate-500 '
    'text-slate-800 '       = 'text-slate-800 dark:text-white '
    'text-slate-700 '       = 'text-slate-700 dark:text-slate-200 '
    'text-slate-600 '       = 'text-slate-600 dark:text-slate-300 '
    'text-slate-500 '       = 'text-slate-500 dark:text-slate-400 '
    
    # Borders
    'border-gray-100 '      = 'border-gray-100 dark:border-slate-700 '
    'border-gray-200 '      = 'border-gray-200 dark:border-slate-600 '
    'border-gray-300 '      = 'border-gray-300 dark:border-slate-600 '
    'border-slate-100 '     = 'border-slate-100 dark:border-slate-700 '
    'border-slate-200 '     = 'border-slate-200 dark:border-slate-700 '
    'border-slate-300 '     = 'border-slate-300 dark:border-slate-600 '
    
    # Hover states
    'hover:bg-white '       = 'hover:bg-white dark:hover:bg-slate-700 '
    'hover:bg-gray-50 '     = 'hover:bg-gray-50 dark:hover:bg-slate-700 '
    'hover:bg-gray-100 '    = 'hover:bg-gray-100 dark:hover:bg-slate-600 '
    'hover:bg-slate-50 '    = 'hover:bg-slate-50 dark:hover:bg-slate-700 '
    'hover:bg-slate-100 '   = 'hover:bg-slate-100 dark:hover:bg-slate-600 '
    'hover:text-gray-700 '  = 'hover:text-gray-700 dark:hover:text-slate-200 '
    'hover:text-gray-800 '  = 'hover:text-gray-800 dark:hover:text-white '
    'hover:text-gray-900 '  = 'hover:text-gray-900 dark:hover:text-white '
    'hover:text-slate-700 ' = 'hover:text-slate-700 dark:hover:text-slate-200 '
    'hover:text-slate-800 ' = 'hover:text-slate-800 dark:hover:text-white '
    'hover:text-slate-900 ' = 'hover:text-slate-900 dark:hover:text-white '
}

$totalChanges = 0

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $originalContent = $content
    $fileChanges = 0
    
    foreach ($find in $replacements.Keys) {
        $replace = $replacements[$find]
        # Only replace if dark: variant doesn't already exist nearby
        if ($content -match [regex]::Escape($find)) {
            $beforeReplace = $content
            $content = $content -replace [regex]::Escape($find), $replace
            if ($content -ne $beforeReplace) {
                $fileChanges++
            }
        }
    }
    
    if ($content -ne $originalContent) {
        Set-Content $file.FullName -Value $content -NoNewline
        $totalChanges += $fileChanges
        Write-Host "✓ Updated: $($file.Name) ($fileChanges changes)" -ForegroundColor Green
    }
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "COMPLETE! Total changes: $totalChanges" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
