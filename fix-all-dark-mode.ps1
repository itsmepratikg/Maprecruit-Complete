# Comprehensive Dark Mode Fix Script
$files = Get-ChildItem -Path "c:\Users\pratik\MRv5\Maprecruit-Complete" -Include "*.jsx" -Recurse | Where-Object { $_.FullName -notmatch "node_modules" }

$replacements = @{
    'bg-white '             = 'bg-white dark:bg-slate-800 '
    'bg-gray-50 '           = 'bg-gray-50 dark:bg-slate-700 '
    'bg-gray-100 '          = 'bg-gray-100 dark:bg-slate-700 '
    'bg-slate-50 '          = 'bg-slate-50 dark:bg-slate-700 '
    'bg-slate-100 '         = 'bg-slate-100 dark:bg-slate-700 '
    'text-gray-800 '        = 'text-gray-800 dark:text-white '
    'text-gray-700 '        = 'text-gray-700 dark:text-slate-200 '
    'text-gray-600 '        = 'text-gray-600 dark:text-slate-300 '
    'text-gray-500 '        = 'text-gray-500 dark:text-slate-400 '
    'text-slate-800 '       = 'text-slate-800 dark:text-white '
    'text-slate-700 '       = 'text-slate-700 dark:text-slate-200 '
    'text-slate-600 '       = 'text-slate-600 dark:text-slate-300 '
    'border-gray-100 '      = 'border-gray-100 dark:border-slate-700 '
    'border-gray-200 '      = 'border-gray-200 dark:border-slate-600 '
    'border-slate-100 '     = 'border-slate-100 dark:border-slate-700 '
    'border-slate-200 '     = 'border-slate-200 dark:border-slate-700 '
    'hover:bg-white '       = 'hover:bg-white dark:hover:bg-slate-700 '
    'hover:bg-gray-50 '     = 'hover:bg-gray-50 dark:hover:bg-slate-700 '
    'hover:bg-slate-50 '    = 'hover:bg-slate-50 dark:hover:bg-slate-700 '
    'hover:text-gray-900 '  = 'hover:text-gray-900 dark:hover:text-white '
    'hover:text-slate-900 ' = 'hover:text-slate-900 dark:hover:text-white '
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

Write-Host "Complete! Updated $totalChanges files"
