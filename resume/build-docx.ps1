# Converts a resume/*.html document to an editable .docx using Word automation.
#   .\build-docx.ps1 -Source cover-letter.html -Out "resume\Chris_Janke_Cover_Letter.docx"
# -Source is relative to this folder; -Out is relative to the repo root.
param(
  [string]$Source = 'cover-letter.html',
  [string]$Out = 'resume\Chris_Janke_Cover_Letter.docx'
)
$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
$src = Join-Path $PSScriptRoot $Source
if (-not (Test-Path $src)) { throw "Source not found: $src" }
$out = Join-Path $root $Out
if (Test-Path $out) { Remove-Item $out -Force }

$word = New-Object -ComObject Word.Application
$word.Visible = $false
$word.DisplayAlerts = 0
try {
  $doc = $word.Documents.Open($src, [ref]$false, [ref]$false)
  # Match the print layout of the HTML: Letter, 0.7in top/bottom, 0.75in sides.
  $doc.PageSetup.TopMargin = 50.4
  $doc.PageSetup.BottomMargin = 50.4
  $doc.PageSetup.LeftMargin = 54
  $doc.PageSetup.RightMargin = 54
  $doc.SaveAs([ref]$out, [ref]16)  # 16 = wdFormatXMLDocument (.docx)
  $pages = $doc.ComputeStatistics(2)  # 2 = wdStatisticPages
  $words = $doc.ComputeStatistics(0)  # 0 = wdStatisticWords
  $doc.Close([ref]$false)
  Write-Host "Wrote $out ($pages page(s), $words words)"
} finally {
  $word.Quit()
  [System.Runtime.InteropServices.Marshal]::ReleaseComObject($word) | Out-Null
}
