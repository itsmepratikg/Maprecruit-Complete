$files = @(
    "c:\Users\pratik\MRv5\Maprecruit-Complete\pages\Campaigns.jsx",
    "c:\Users\pratik\MRv5\Maprecruit-Complete\pages\CampaignDashboard.jsx",
    "c:\Users\pratik\MRv5\Maprecruit-Complete\pages\Profiles.jsx",
    "c:\Users\pratik\MRv5\Maprecruit-Complete\components\ProfileCampaigns.jsx",
    "c:\Users\pratik\MRv5\Maprecruit-Complete\components\ProfileInterviews.jsx",
    "c:\Users\pratik\MRv5\Maprecruit-Complete\components\AdvancedSearchModal.jsx",
    "c:\Users\pratik\MRv5\Maprecruit-Complete\components\EngageWorkflow.jsx",
    "c:\Users\pratik\MRv5\Maprecruit-Complete\components\MatchWorkflow.jsx",
    "c:\Users\pratik\MRv5\Maprecruit-Complete\components\SourceAI.jsx",
    "c:\Users\pratik\MRv5\Maprecruit-Complete\components\CampaignSourceAI.jsx",
    "c:\Users\pratik\MRv5\Maprecruit-Complete\components\InterviewComponents.jsx",
    "c:\Users\pratik\MRv5\Maprecruit-Complete\components\TalentSearchEngine.jsx"
)

$replacements = @{
    # Hover states
    'hover:bg-white '       = 'hover:bg-white dark:hover:bg-slate-700 '
    'hover:bg-gray-50 '     = 'hover:bg-gray-50 dark:hover:bg-slate-700 '
    'hover:bg-gray-100 '    = 'hover:bg-gray-100 dark:hover:bg-slate-600 '
    'hover:bg-slate-50 '    = 'hover:bg-slate-50 dark:hover:bg-slate-700 '
    'hover:bg-slate-100 '   = 'hover:bg-slate-100 dark:hover:bg-slate-600 '
    'hover:text-gray-700 '  = 'hover:text-gray-700 dark:hover:text-slate-200 '
    'hover:text-gray-800 '  = 'hover:text-gray-800 dark:hover:text-white '
    'hover:text-slate-700 ' = 'hover:text-slate-700 dark:hover:text-slate-200 '
    'hover:text-slate-800 ' = 'hover:text-slate-800 dark:hover:text-white '
    
    # Input boxes
    'bg-white">'            = 'bg-white dark:bg-slate-800">'
    '<input'                = '<input className="dark:bg-slate-700 dark:text-slate-200 dark:border-slate-600"'
    '<textarea'             = '<textarea className="dark:bg-slate-700 dark:text-slate-200 dark:border-slate-600"'
    '<select'               = '<select className="dark:bg-slate-700 dark:text-slate-200 dark:border-slate-600"'
    
    # Focus states
    'focus:ring-'           = 'focus:ring- dark:focus:ring-'
    
    # Backgrounds that were missed
    'bg-slate-50/50 '       = 'bg-slate-50/50 dark:bg-slate-900/50 '
    'bg-gray-50/50 '        = 'bg-gray-50/50 dark:bg-slate-900/50 '
    
    # Additional text colors
    'text-gray-300 '        = 'text-gray-300 dark:text-slate-600 '
    'text-slate-300 '       = 'text-slate-300 dark:text-slate-600 '
    
    # Additional borders
    'border-gray-50 '       = 'border-gray-50 dark:border-slate-700 '
    'border-slate-50 '      = 'border-slate-50 dark:border-slate-700 '
}

foreach ($file in $files) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        $originalContent = $content
        
        foreach ($find in $replacements.Keys) {
            $replace = $replacements[$find]
            # Only replace if dark: variant doesn't already exist
            if ($content -match [regex]::Escape($find) -and $content -notmatch [regex]::Escape($replace)) {
                $content = $content -replace [regex]::Escape($find), $replace
            }
        }
        
        if ($content -ne $originalContent) {
            Set-Content $file -Value $content -NoNewline
            Write-Host "Updated: $file"
        }
        else {
            Write-Host "No changes needed: $file"
        }
    }
    else {
        Write-Host "Not found: $file"
    }
}
Write-Host "`nPhase 2 complete - Fixed hover states, inputs, and backgrounds!"
