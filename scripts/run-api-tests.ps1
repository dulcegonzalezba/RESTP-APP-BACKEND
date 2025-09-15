# Script para ejecutar tests automatizados del sistema de permisos
# Requiere Newman (npm install -g newman)

Write-Host "🚀 Iniciando Tests Automatizados del Sistema de Permisos Unificado" -ForegroundColor Green
Write-Host "=================================================================" -ForegroundColor Green

# Verificar que Newman esté instalado
$newmanExists = Get-Command newman -ErrorAction SilentlyContinue
if (-not $newmanExists) {
    Write-Host "❌ Newman no está instalado. Instalar con: npm install -g newman" -ForegroundColor Red
    exit 1
}

# Verificar que el servidor esté corriendo
Write-Host "🔍 Verificando que el servidor esté corriendo..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:3000/health" -TimeoutSec 5 -ErrorAction Stop
    Write-Host "✅ Servidor detectado en localhost:3000" -ForegroundColor Green
} catch {
    Write-Host "❌ El servidor no está corriendo en localhost:3000" -ForegroundColor Red
    Write-Host "   Iniciar con: npm run start:dev" -ForegroundColor Yellow
    exit 1
}

# Directorio de la colección
$CollectionDir = "./postman"
$CollectionFile = "$CollectionDir/RESTP-Sistema-Permisos-Completo.postman_collection.json"
$EnvironmentFile = "$CollectionDir/RESTP-Desarrollo.postman_environment.json"

# Verificar archivos
if (-not (Test-Path $CollectionFile)) {
    Write-Host "❌ Archivo de colección no encontrado: $CollectionFile" -ForegroundColor Red
    exit 1
}

if (-not (Test-Path $EnvironmentFile)) {
    Write-Host "❌ Archivo de entorno no encontrado: $EnvironmentFile" -ForegroundColor Red
    exit 1
}

Write-Host "📁 Archivos de Postman encontrados" -ForegroundColor Green

# Crear directorio de reportes
$ReportDir = "./test-reports"
if (-not (Test-Path $ReportDir)) {
    New-Item -ItemType Directory -Path $ReportDir -Force | Out-Null
}

# Timestamp para el reporte
$Timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$ReportFile = "$ReportDir/test-report-$Timestamp.html"
$JsonReport = "$ReportDir/test-report-$Timestamp.json"

Write-Host "📊 Ejecutando tests con Newman..." -ForegroundColor Cyan
Write-Host "   Reporte HTML: $ReportFile" -ForegroundColor Gray
Write-Host "   Reporte JSON: $JsonReport" -ForegroundColor Gray

# Ejecutar Newman con reportes detallados
$newmanArgs = @(
    "run", $CollectionFile,
    "--environment", $EnvironmentFile,
    "--reporters", "html,json,cli",
    "--reporter-html-export", $ReportFile,
    "--reporter-json-export", $JsonReport,
    "--timeout-request", "10000",
    "--delay-request", "500",
    "--verbose"
)

$result = Start-Process newman -ArgumentList $newmanArgs -Wait -PassThru -NoNewWindow

# Verificar resultado
if ($result.ExitCode -eq 0) {
    Write-Host ""
    Write-Host "🎉 ¡Tests completados exitosamente!" -ForegroundColor Green
    Write-Host "   📄 Reporte detallado: $ReportFile" -ForegroundColor Cyan
    Write-Host "   📊 Datos JSON: $JsonReport" -ForegroundColor Cyan
    
    # Mostrar resumen rápido si el JSON existe
    if (Test-Path $JsonReport) {
        try {
            $testData = Get-Content $JsonReport | ConvertFrom-Json
            Write-Host ""
            Write-Host "📈 Resumen de Tests:" -ForegroundColor Yellow
            Write-Host "   Total ejecutados: $($testData.run.stats.tests.total)" -ForegroundColor White
            Write-Host "   Tests exitosos: $($testData.run.stats.tests.passed)" -ForegroundColor Green
            Write-Host "   Tests fallidos: $($testData.run.stats.tests.failed)" -ForegroundColor Red
            Write-Host "   Assertions: $($testData.run.stats.assertions.total)" -ForegroundColor White
        } catch {
            Write-Host "   (No se pudo parsear el resumen JSON)" -ForegroundColor Gray
        }
    }
} else {
    Write-Host ""
    Write-Host "❌ Tests fallaron. Revisar el reporte para detalles." -ForegroundColor Red
    Write-Host "   📄 Reporte: $ReportFile" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "🔗 Para ver el reporte HTML:" -ForegroundColor Cyan
Write-Host "   Abrir: $ReportFile en el navegador" -ForegroundColor White
Write-Host ""
Write-Host "✨ Testing del Sistema de Permisos Unificado completado" -ForegroundColor Green