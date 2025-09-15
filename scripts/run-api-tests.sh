#!/bin/bash

# Script para ejecutar tests automatizados del sistema de permisos
# Requiere Newman (npm install -g newman)

echo "🚀 Iniciando Tests Automatizados del Sistema de Permisos Unificado"
echo "================================================================="

# Verificar que Newman esté instalado
if ! command -v newman &> /dev/null; then
    echo "❌ Newman no está instalado. Instalar con: npm install -g newman"
    exit 1
fi

# Verificar que el servidor esté corriendo
echo "🔍 Verificando que el servidor esté corriendo..."
if ! curl -s http://localhost:3000/health &> /dev/null; then
    echo "❌ El servidor no está corriendo en localhost:3000"
    echo "   Iniciar con: npm run start:dev"
    exit 1
fi

echo "✅ Servidor detectado en localhost:3000"

# Directorio de la colección
COLLECTION_DIR="./postman"
COLLECTION_FILE="$COLLECTION_DIR/RESTP-Sistema-Permisos-Completo.postman_collection.json"
ENVIRONMENT_FILE="$COLLECTION_DIR/RESTP-Desarrollo.postman_environment.json"

# Verificar archivos
if [[ ! -f "$COLLECTION_FILE" ]]; then
    echo "❌ Archivo de colección no encontrado: $COLLECTION_FILE"
    exit 1
fi

if [[ ! -f "$ENVIRONMENT_FILE" ]]; then
    echo "❌ Archivo de entorno no encontrado: $ENVIRONMENT_FILE"
    exit 1
fi

echo "📁 Archivos de Postman encontrados"

# Crear directorio de reportes
REPORT_DIR="./test-reports"
mkdir -p "$REPORT_DIR"

# Timestamp para el reporte
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
REPORT_FILE="$REPORT_DIR/test-report-$TIMESTAMP.html"
JSON_REPORT="$REPORT_DIR/test-report-$TIMESTAMP.json"

echo "📊 Ejecutando tests con Newman..."
echo "   Reporte HTML: $REPORT_FILE"
echo "   Reporte JSON: $JSON_REPORT"

# Ejecutar Newman con reportes detallados
newman run "$COLLECTION_FILE" \
    --environment "$ENVIRONMENT_FILE" \
    --reporters html,json,cli \
    --reporter-html-export "$REPORT_FILE" \
    --reporter-json-export "$JSON_REPORT" \
    --timeout-request 10000 \
    --delay-request 500 \
    --verbose

# Verificar resultado
if [[ $? -eq 0 ]]; then
    echo ""
    echo "🎉 ¡Tests completados exitosamente!"
    echo "   📄 Reporte detallado: $REPORT_FILE"
    echo "   📊 Datos JSON: $JSON_REPORT"
    
    # Mostrar resumen rápido si jq está disponible
    if command -v jq &> /dev/null; then
        echo ""
        echo "📈 Resumen de Tests:"
        echo "   Total ejecutados: $(jq '.run.stats.tests.total' "$JSON_REPORT")"
        echo "   Tests exitosos: $(jq '.run.stats.tests.passed' "$JSON_REPORT")"
        echo "   Tests fallidos: $(jq '.run.stats.tests.failed' "$JSON_REPORT")"
        echo "   Assertions: $(jq '.run.stats.assertions.total' "$JSON_REPORT")"
    fi
else
    echo ""
    echo "❌ Tests fallaron. Revisar el reporte para detalles."
    echo "   📄 Reporte: $REPORT_FILE"
    exit 1
fi

echo ""
echo "🔗 Para ver el reporte HTML:"
echo "   Abrir: $REPORT_FILE en el navegador"
echo ""
echo "✨ Testing del Sistema de Permisos Unificado completado"