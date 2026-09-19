param([string]$MoonPath)
$ErrorActionPreference='Stop'
if (-not $MoonPath) {
  $available=Get-Command moon -ErrorAction SilentlyContinue
  if ($available) { $MoonPath=$available.Source }
  else { throw 'Install MoonBit or pass -MoonPath with the absolute moon.exe path.' }
}
$env:MOON_HOME=Split-Path (Split-Path $MoonPath -Parent) -Parent
$env:PATH="$(Split-Path $MoonPath -Parent);$env:PATH"
Push-Location $PSScriptRoot
try {
  & $MoonPath fmt
  if ($LASTEXITCODE -ne 0) {throw 'format failed'}
  & $MoonPath info
  if ($LASTEXITCODE -ne 0) {throw 'API generation failed'}
  & $MoonPath check --deny-warn
  if ($LASTEXITCODE -ne 0) {throw 'check failed'}
  & $MoonPath test --target wasm-gc --deny-warn
  if ($LASTEXITCODE -ne 0) {throw 'tests failed'}
  & $MoonPath test --target js --deny-warn
  if ($LASTEXITCODE -ne 0) {throw 'JS tests failed'}
  & $MoonPath build --target js --deny-warn
  if ($LASTEXITCODE -ne 0) {throw 'build failed'}
  & $MoonPath run cmd/main
  if ($LASTEXITCODE -ne 0) {throw 'example failed'}
  $engine=Get-ChildItem '_build/js' -Recurse -File | Where-Object { $_.Name -in @('main.js','web.js') -and $_.FullName -match '[\\/]cmd[\\/]web[\\/]' } | Sort-Object LastWriteTime -Descending | Select-Object -First 1
  if (-not $engine) {throw 'Missing browser engine'}
  Copy-Item -LiteralPath $engine.FullName -Destination 'web/engine.mjs' -Force
  node tools/test-demo.mjs
  if ($LASTEXITCODE -ne 0) {throw 'browser engine test failed'}
  node tools/test-inspect.mjs
  if ($LASTEXITCODE -ne 0) {throw 'inspection CLI test failed'}
  node tools/test-cli.mjs
  if ($LASTEXITCODE -ne 0) {throw 'CLI test failed'}
  node tools/test-client.mjs
  if ($LASTEXITCODE -ne 0) {throw 'client transport fixtures failed'}
  node tools/test-stream.mjs
  if ($LASTEXITCODE -ne 0) {throw 'streaming publication fixtures failed'}
  node tools/test-receive-stream.mjs
  if ($LASTEXITCODE -ne 0) {throw 'incoming streaming fixtures failed'}
  node tools/test-broker-files.mjs
  if ($LASTEXITCODE -ne 0) {throw 'broker file CLI fixtures failed'}
  node tools/test-nowait.mjs
  if ($LASTEXITCODE -ne 0) {throw 'no-wait fixtures failed'}
  node tools/test-recovery.mjs
  if ($LASTEXITCODE -ne 0) {throw 'client recovery fixtures failed'}
  node tools/test-authentication.mjs
  if ($LASTEXITCODE -ne 0) {throw 'authentication fixtures failed'}
  node tools/test-secret-update.mjs
  if ($LASTEXITCODE -ne 0) {throw 'credential update fixtures failed'}
  node tools/test-autodelete.mjs
  if ($LASTEXITCODE -ne 0) {throw 'auto-delete recovery fixtures failed'}
  node tools/test-channel-deps.mjs
  if ($LASTEXITCODE -ne 0) {throw 'channel dependency recovery fixtures failed'}
  python tools/generate-auth-vectors.py --check
  if ($LASTEXITCODE -ne 0) {throw 'stored authentication vectors failed'}
  node tools/robustness.mjs
  if ($LASTEXITCODE -ne 0) {throw 'robustness failed'}
  node tools/benchmark.mjs
  if ($LASTEXITCODE -ne 0) {throw 'benchmark failed'}
} finally {Pop-Location}
