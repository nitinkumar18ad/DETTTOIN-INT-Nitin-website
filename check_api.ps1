$r = Invoke-WebRequest -Uri 'http://127.0.0.1:5000/api/home' -UseBasicParsing
$d = $r.Content | ConvertFrom-Json
Write-Host "navItems: $($d.navItems.Count)"
Write-Host "heroSlides: $($d.heroSlides.Count)"
Write-Host "announcements: $($d.announcements.Count)"
Write-Host "newsEvents: $($d.newsEvents.Count)"
Write-Host "values: $($d.values.Count)"
Write-Host "First announcement title: $($d.announcements[0].title)"
Write-Host "First value label: $($d.values[0].label)"
