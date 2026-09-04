# Renders resume/resume.html to public/Chris_Janke_Resume.pdf with headless Edge.
$ErrorActionPreference = 'Stop'
$edge = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
if (-not (Test-Path $edge)) { $edge = 'C:\Program Files\Microsoft\Edge\Application\msedge.exe' }
if (-not (Test-Path $edge)) { throw 'Microsoft Edge not found.' }

$root = Split-Path -Parent $PSScriptRoot
$src = Join-Path $PSScriptRoot 'resume.html'
$out = Join-Path $root 'public\Chris_Janke_Resume.pdf'
$srcUrl = 'file:///' + ($src -replace '\\', '/')

& $edge --headless=new --disable-gpu --no-pdf-header-footer --virtual-time-budget=4000 "--print-to-pdf=$out" $srcUrl | Out-Null

if (-not (Test-Path $out)) { throw "PDF was not written to $out" }
Write-Host "Wrote $out ($((Get-Item $out).Length) bytes)"
