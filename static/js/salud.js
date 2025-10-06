// =============================
// SALUD - RECOMENDACIONES
// =============================

console.log('🏥 INICIANDO SALUD.JS');

// Base de datos de recomendaciones por nivel de AQI
const recomendacionesPorNivel = {
    'bueno': {
        general: [
            "✅ Condiciones ideales para actividades al aire libre",
            "✅ Puede realizar ejercicio exterior sin restricciones",
            "✅ Ventile su hogar para renovar el aire interior",
            "✅ Ideal para paseos y actividades recreativas"
        ],
        sensibles: [
            "✅ Condiciones favorables para todos los grupos",
            "✅ Los niños pueden jugar al aire libre con seguridad",
            "✅ Los adultos mayores pueden realizar actividades normales",
            "✅ Buen momento para caminatas al aire libre"
        ],
        respiratorias: [
            "✅ Condiciones óptimas para pacientes respiratorios",
            "✅ Puede realizar sus actividades habituales",
            "✅ Bajo riesgo de exacerbación de síntomas",
            "✅ Buen momento para terapia respiratoria al aire libre"
        ],
        largoPlazo: [
            "🌱 Mantener hábitos de vida saludables al aire libre",
            "🌱 Promover el uso de transporte sostenible",
            "🌱 Participar en programas de reforestación local",
            "🌱 Educar sobre la importancia de la calidad del aire"
        ]
    },
    'moderado': {
        general: [
            "⚠️ Condiciones aceptables para la mayoría",
            "⚠️ Personas extraordinariamente sensibles deben considerar reducir actividades prolongadas al aire libre",
            "⚠️ Mantenga una hidratación adecuada durante el ejercicio",
            "⚠️ Considere usar mascarilla en áreas con mucho tráfico"
        ],
        sensibles: [
            "⚠️ Los niños deben limitar actividades físicas intensas al aire libre",
            "⚠️ Adultos mayores deben evitar exposición prolongada",
            "⚠️ Embarazadas deben monitorear su bienestar durante actividades exteriores",
            "⚠️ Considere realizar actividades en interiores durante horas pico"
        ],
        respiratorias: [
            "⚠️ Tenga su medicación de rescate disponible",
            "⚠️ Evite ejercicio intenso al aire libre",
            "⚠️ Considere usar mascarilla en exteriores",
            "⚠️ Monitoree síntomas y consulte si empeoran"
        ],
        largoPlazo: [
            "📊 Prepararse para aumento en días con calidad moderada",
            "📊 Considerar purificadores de aire para el hogar",
            "📊 Planificar actividades en horarios de menor contaminación",
            "📊 Unirse a iniciativas comunitarias de monitoreo del aire"
        ]
    },
    'malo': {
        general: [
            "🚫 Reduzca las actividades prolongadas al aire libre",
            "🚫 Use mascarilla cuando esté en exteriores",
            "🚫 Cierre ventanas durante horas de mayor contaminación",
            "🚫 Limite el tiempo en áreas de alto tráfico vehicular"
        ],
        sensibles: [
            "🚫 EVITE actividades al aire libre",
            "🚫 Los niños NO deben jugar en exteriores",
            "🚫 Adultos mayores deben permanecer en interiores",
            "🚫 Embarazadas deben limitar toda exposición exterior"
        ],
        respiratorias: [
            "🚫 PERMANEZCA en interiores tanto como sea posible",
            "🚫 Use su medicación preventiva según prescripción",
            "🚫 Tenga un plan de acción para exacerbaciones",
            "🚫 Considere usar purificador de aire en casa"
        ],
        largoPlazo: [
            "🔴 Desarrollar plan de contingencia para días críticos",
            "🔴 Invertir en sistemas de filtración de aire para el hogar",
            "🔴 Identificar espacios interiores seguros (centros comerciales, bibliotecas)",
            "🔴 Participar en advocacy para políticas de calidad del aire"
        ]
    },
    'muy-malo': {
        general: [
            "🆘 EVITE TODAS las actividades al aire libre",
            "🆘 Use mascarilla N95 si debe salir",
            "🆘 Mantenga ventanas y puertas cerradas",
            "🆘 Active purificadores de aire en interiores"
        ],
        sensibles: [
            "🆘 PERMANEZCA en interiores estrictamente",
            "🆘 Cancelar todas las actividades exteriores programadas",
            "🆘 Monitorear síntomas constantemente",
            "🆘 Tener acceso inmediato a servicios médicos"
        ],
        respiratorias: [
            "🆘 CONSULTE con su médico sobre medidas adicionales",
            "🆘 Tenga su medicación de rescate siempre a mano",
            "🆘 Considere reubicación temporal si es posible",
            "🆘 Use oxímetro para monitorear saturación de oxígeno"
        ],
        largoPlazo: [
            "💀 Evaluar opciones de reubicación si la tendencia persiste",
            "💀 Invertir en sistemas avanzados de purificación de aire",
            "💀 Desarrollar red de apoyo para días críticos",
            "💀 Participar activamente en políticas públicas ambientales"
        ]
    }
};

// Función para determinar nivel de AQI
function determinarNivelAqi(aqi) {
    if (aqi <= 50) return 'bueno';
    if (aqi <= 100) return 'moderado';
    if (aqi <= 150) return 'malo';
    return 'muy-malo';
}

// Función para obtener color según AQI
function obtenerColorAqi(aqi) {
    if (aqi <= 50) return '#4caf50';
    if (aqi <= 100) return '#ffc107';
    if (aqi <= 150) return '#ff9800';
    return '#ff5252';
}

// Función principal
function cargarRecomendaciones() {
    console.log('🔄 Cargando recomendaciones de salud...');

    // Obtener datos del localStorage
    const datosGuardados = localStorage.getItem('datosPrediccion');
    const localidad = localStorage.getItem('localidadSeleccionada') || 'Kennedy';

    console.log('📊 Datos recuperados:', datosGuardados);

    // Actualizar localidad en el HTML
    const elementoLocalidad = document.getElementById('localidadNombre');
    if (elementoLocalidad) {
        elementoLocalidad.textContent = `Localidad: ${localidad}`;
    }

    if (!datosGuardados) {
        mostrarError('No se encontraron datos de calidad del aire. Por favor, regrese a la página de predicciones.');
        return;
    }

    try {
        const datos = JSON.parse(datosGuardados);
        console.log('🎯 Datos parseados:', datos);

        // Actualizar resumen de calidad del aire
        actualizarResumenCalidad(datos);

        // Cargar recomendaciones
        cargarRecomendacionesPorNivel(datos);

        // Cargar alertas
        cargarAlertas(datos);

    } catch (error) {
        console.error('Error al procesar datos:', error);
        mostrarError('Error al cargar las recomendaciones. Por favor, intente nuevamente.');
    }
}

// Actualizar resumen de calidad del aire
function actualizarResumenCalidad(datos) {
    const nivelActual = determinarNivelAqi(datos.aqi_actual);
    const nivelFuturo = determinarNivelAqi(datos.aqi_prediccion);

    // Actual AQI
    document.getElementById('valorAqiActual').textContent = datos.aqi_actual;
    document.getElementById('valorAqiActual').style.color = obtenerColorAqi(datos.aqi_actual);
    document.getElementById('nivelAqiActual').textContent = nivelActual.toUpperCase();
    document.getElementById('nivelAqiActual').className = `nivel-calidad ${nivelActual}`;

    // Futuro AQI
    document.getElementById('valorAqiFuturo').textContent = datos.aqi_prediccion;
    document.getElementById('valorAqiFuturo').style.color = obtenerColorAqi(datos.aqi_prediccion);
    document.getElementById('nivelAqiFuturo').textContent = nivelFuturo.toUpperCase();
    document.getElementById('nivelAqiFuturo').className = `nivel-calidad ${nivelFuturo}`;
}

// Cargar recomendaciones por nivel
function cargarRecomendacionesPorNivel(datos) {
    const nivelActual = determinarNivelAqi(datos.aqi_actual);
    const nivelFuturo = determinarNivelAqi(datos.aqi_prediccion);

    const recomendaciones = recomendacionesPorNivel[nivelActual] || recomendacionesPorNivel['moderado'];
    const recomendacionesFuturo = recomendacionesPorNivel[nivelFuturo] || recomendacionesPorNivel['moderado'];

    // Población General
    actualizarListaRecomendaciones('recomendacionesGeneral', recomendaciones.general);

    // Grupos Sensibles
    actualizarListaRecomendaciones('recomendacionesSensibles', recomendaciones.sensibles);

    // Enfermedades Respiratorias
    actualizarListaRecomendaciones('recomendacionesRespiratorias', recomendaciones.respiratorias);

    // Largo Plazo (usando proyección futura)
    actualizarListaRecomendaciones('recomendacionesLargoPlazo', recomendacionesFuturo.largoPlazo);
}

// Actualizar lista de recomendaciones
function actualizarListaRecomendaciones(elementId, recomendaciones) {
    const elemento = document.getElementById(elementId);
    if (elemento && recomendaciones) {
        elemento.innerHTML = recomendaciones.map(rec =>
            `<div class="recomendacion-item">${rec}</div>`
        ).join('');
    }
}

// Cargar alertas
function cargarAlertas(datos) {
    const alertas = [];

    // Alertas basadas en niveles de contaminantes
    if (datos.no2_actual > 40) {
        alertas.push("⚠️ Niveles elevados de NO₂: Puede irritar las vías respiratorias y afectar la función pulmonar");
    }

    if (datos.o3_actual > 50) {
        alertas.push("⚠️ Niveles elevados de O₃: Puede causar tos, irritación de garganta y empeorar enfermedades respiratorias");
    }

    if (datos.no2_prediccion > 60 || datos.o3_prediccion > 70) {
        alertas.push("🔮 PROYECCIÓN FUTURA: Se espera aumento significativo en contaminantes peligrosos para 2040");
    }

    // Alertas por nivel de AQI
    const nivelActual = determinarNivelAqi(datos.aqi_actual);
    if (nivelActual === 'malo' || nivelActual === 'muy-malo') {
        alertas.push("🚨 CALIDAD DEL AIRE PELIGROSA: Siga estrictamente las recomendaciones para su grupo de riesgo");
    }

    const alertasList = document.getElementById('alertasList');
    if (alertasList) {
        if (alertas.length > 0) {
            alertasList.innerHTML = alertas.map(alerta =>
                `<div class="alerta-item">${alerta}</div>`
            ).join('');
        } else {
            alertasList.innerHTML = '<div class="alerta-item positiva">✅ No hay alertas críticas en este momento. Condiciones favorables.</div>';
        }
    }
}

// Mostrar error
function mostrarError(mensaje) {
    const container = document.querySelector('.recomendaciones-container');
    if (container) {
        container.innerHTML = `<div class="alerta-item">${mensaje}</div>`;
    }
}

// Inicialización
document.addEventListener('DOMContentLoaded', function () {
    console.log('✅ DOM cargado - Iniciando carga de recomendaciones');
    cargarRecomendaciones();
});

if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(cargarRecomendaciones, 100);
}