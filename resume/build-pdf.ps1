# Renders a resume/*.html document to PDF with headless Edge.
# Defaults render resume.html to public/Chris_Janke_Resume.pdf.
#   .\build-pdf.ps1
#   .\build-pdf.ps1 -Source cover-letter.html -Out Chris_Janke_Cover_Letter.pdf
# -Source is relative to this folder; -Out is relative to the repo root.
param(
  [string]$Source = 'resume.html',
  [string]$Out = 'public\Chris_Janke_Resume.pdf'
)
$ErrorActionPreference = 'Stop'
$edge = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
if (-not (Test-Path $edge)) { $edge = 'C:\Program Files\Microsoft\Edge\Application\msedge.exe' }
if (-not (Test-Path $edge)) { throw 'Microsoft Edge not found.' }

$root = Split-Path -Parent $PSScriptRoot
$src = Join-Path $PSScriptRoot $Source
if (-not (Test-Path $src)) { throw "Source not found: $src" }
$out = Join-Path $root $Out
$srcUrl = 'file:///' + ($src -replace '\\', '/')

if (Test-Path $out) { Remove-Item $out -Force }

& $edge --headless=new --disable-gpu --no-pdf-header-footer --virtual-time-budget=4000 "--print-to-pdf=$out" $srcUrl | Out-Null

if (-not (Test-Path $out)) { throw "PDF was not written to $out" }
Write-Host "Wrote $out ($((Get-Item $out).Length) bytes)"
