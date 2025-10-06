// =============================
// PREDICCIONES - MISIÓN TEMPO
// =============================

console.log('=== INICIANDO PREDICCIONES.JS ===');

// Simulación de datos diferentes por localidad con proyecciones a 15 años (2040)
const datosLocalidades = {
  'Usaquen': { 
    no2: 38.2, o3: 42.1, so2: 6.5, aqi: 62, 
    no2_pred: 52.8, o3_pred: 79.5, so2_pred: 10.1, aqi_pred: 130 
  },
  'Chapinero': { 
    no2: 45.8, o3: 38.5, so2: 9.2, aqi: 72, 
    no2_pred: 63.4, o3_pred: 72.8, so2_pred: 14.2, aqi_pred: 151 
  },
  'Santa Fe': { 
    no2: 44.1, o3: 36.8, so2: 8.7, aqi: 70, 
    no2_pred: 61.0, o3_pred: 69.8, so2_pred: 13.4, aqi_pred: 147 
  },
  'San Cristobal': { 
    no2: 40.3, o3: 39.2, so2: 7.8, aqi: 66, 
    no2_pred: 55.8, o3_pred: 74.2, so2_pred: 12.0, aqi_pred: 138 
  },
  'Usme': { 
    no2: 46.7, o3: 34.5, so2: 9.8, aqi: 73, 
    no2_pred: 64.6, o3_pred: 65.4, so2_pred: 15.1, aqi_pred: 153 
  },
  'Tunjuelito': { 
    no2: 43.9, o3: 37.1, so2: 8.9, aqi: 69, 
    no2_pred: 60.7, o3_pred: 70.3, so2_pred: 13.7, aqi_pred: 145 
  },
  'Bosa': { 
    no2: 48.3, o3: 32.9, so2: 10.5, aqi: 75, 
    no2_pred: 66.8, o3_pred: 62.5, so2_pred: 16.2, aqi_pred: 157 
  },
  'Kennedy': { 
    no2: 42.5, o3: 35.2, so2: 8.1, aqi: 68, 
    no2_pred: 58.9, o3_pred: 67.3, so2_pred: 12.4, aqi_pred: 142 
  },
  'Fontibon': { 
    no2: 47.2, o3: 33.8, so2: 10.2, aqi: 74, 
    no2_pred: 65.3, o3_pred: 64.1, so2_pred: 15.7, aqi_pred: 155 
  },
  'Engativa': { 
    no2: 41.8, o3: 38.9, so2: 8.4, aqi: 67, 
    no2_pred: 57.9, o3_pred: 73.7, so2_pred: 12.9, aqi_pred: 140 
  },
  'Suba': { 
    no2: 36.4, o3: 44.8, so2: 7.3, aqi: 64, 
    no2_pred: 50.4, o3_pred: 84.6, so2_pred: 11.3, aqi_pred: 134 
  },
  'Barrios Unidos': { 
    no2: 39.5, o3: 40.3, so2: 7.6, aqi: 65, 
    no2_pred: 54.7, o3_pred: 76.3, so2_pred: 11.7, aqi_pred: 136 
  },
  'Teusaquillo': { 
    no2: 37.9, o3: 41.5, so2: 7.2, aqi: 63, 
    no2_pred: 52.4, o3_pred: 78.5, so2_pred: 11.1, aqi_pred: 132 
  },
  'Los Martires': { 
    no2: 48.6, o3: 32.3, so2: 10.8, aqi: 76, 
    no2_pred: 67.2, o3_pred: 61.2, so2_pred: 16.6, aqi_pred: 159 
  },
  'Antonio Nariño': { 
    no2: 42.7, o3: 37.8, so2: 8.6, aqi: 68, 
    no2_pred: 59.1, o3_pred: 71.6, so2_pred: 13.2, aqi_pred: 143 
  },
  'Puente Aranda': { 
    no2: 45.3, o3: 35.7, so2: 9.5, aqi: 71, 
    no2_pred: 62.7, o3_pred: 67.6, so2_pred: 14.6, aqi_pred: 149 
  },
  'Candelaria': { 
    no2: 44.8, o3: 36.2, so2: 9.1, aqi: 71, 
    no2_pred: 62.0, o3_pred: 68.6, so2_pred: 14.0, aqi_pred: 148 
  },
  'Rafael Uribe Uribe': { 
    no2: 43.2, o3: 37.5, so2: 8.8, aqi: 69, 
    no2_pred: 59.8, o3_pred: 71.1, so2_pred: 13.5, aqi_pred: 144 
  },
  'Ciudad Bolivar': { 
    no2: 49.1, o3: 31.8, so2: 11.2, aqi: 77, 
    no2_pred: 67.9, o3_pred: 60.3, so2_pred: 17.2, aqi_pred: 161 
  },
  'Sumapaz': { 
    no2: 28.4, o3: 52.3, so2: 5.1, aqi: 56, 
    no2_pred: 39.3, o3_pred: 98.9, so2_pred: 7.9, aqi_pred: 124 
  }
};

// Función para obtener color según nivel
function obtenerColor(valor, tipo) {
  if (tipo === 'aqi') {
    if (valor <= 50) return '#4caf50';
    if (valor <= 100) return '#ffc107';
    if (valor <= 150) return '#ff9800';
    return '#ff5252';
  }
  // Para otros contaminantes
  if (valor <= 30) return '#4caf50';
  if (valor <= 50) return '#ffc107';
  if (valor <= 70) return '#ff9800';
  return '#ff5252';
}

// Función para obtener nivel de calidad
function obtenerNivelCalidad(valor, tipo) {
  if (tipo === 'aqi') {
    if (valor <= 50) return { texto: 'Bueno', clase: 'bueno' };
    if (valor <= 100) return { texto: 'Moderado', clase: 'moderado' };
    if (valor <= 150) return { texto: 'Malo para grupos sensibles', clase: 'malo' };
    return { texto: 'Malo', clase: 'muy-malo' };
  }
  // Para otros contaminantes
  if (valor <= 30) return { texto: 'Bueno', clase: 'bueno' };
  if (valor <= 50) return { texto: 'Moderado', clase: 'moderado' };
  if (valor <= 70) return { texto: 'Malo', clase: 'malo' };
  return { texto: 'Muy Malo', clase: 'muy-malo' };
}

// Función para obtener símbolo y clase de cambio
function obtenerIndicador(cambio) {
  if (cambio > 5) return { simbolo: '↑', clase: 'empeora', signo: '+' };
  if (cambio < -5) return { simbolo: '↓', clase: 'mejora', signo: '' };
  return { simbolo: '→', clase: 'estable', signo: '' };
}

// Función principal para actualizar los datos
function actualizarDatos() {
  console.log('=== ACTUALIZAR DATOS - INICIANDO ===');
  
  // Diagnóstico completo del localStorage
  console.log('🔍 DIAGNÓSTICO LOCALSTORAGE:');
  console.log('Número de items:', localStorage.length);
  
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    console.log(`  ${key}: ${value}`);
  }
  
  // Obtener localidad del localStorage
  const localidadGuardada = localStorage.getItem('localidadSeleccionada');
  console.log('📍 Localidad recuperada:', localidadGuardada);
  
  // Si no hay localidad, usar Kennedy por defecto
  const localidad = localidadGuardada || 'Kennedy';
  console.log('📍 Localidad a usar:', localidad);
  
  // Actualizar nombre de localidad en la página
  const elementoLocalidad = document.getElementById('localidadNombre');
  if (elementoLocalidad) {
    elementoLocalidad.textContent = `Localidad: ${localidad}`;
    console.log('✅ Localidad actualizada en HTML');
  } else {
    console.error('❌ Elemento localidadNombre no encontrado');
  }

  // Obtener datos de la localidad
  const datosActuales = datosLocalidades[localidad] || datosLocalidades['Kennedy'];
  
  console.log('📊 Datos cargados:', datosActuales);

  // Calcular porcentajes de cambio
  const cambioNO2 = ((datosActuales.no2_pred - datosActuales.no2) / datosActuales.no2 * 100).toFixed(0);
  const cambioO3 = ((datosActuales.o3_pred - datosActuales.o3) / datosActuales.o3 * 100).toFixed(0);
  const cambioSO2 = ((datosActuales.so2_pred - datosActuales.so2) / datosActuales.so2 * 100).toFixed(0);
  const cambioAQI = ((datosActuales.aqi_pred - datosActuales.aqi) / datosActuales.aqi * 100).toFixed(0);

  // Obtener indicadores
  const indNO2 = obtenerIndicador(cambioNO2);
  const indO3 = obtenerIndicador(cambioO3);
  const indSO2 = obtenerIndicador(cambioSO2);
  const indAQI = obtenerIndicador(cambioAQI);

  // Actualizar valores actuales
  const valoresActuales = document.querySelectorAll('.panel.actual .dato-valor');
  if (valoresActuales.length >= 4) {
    const nivelNO2 = obtenerNivelCalidad(datosActuales.no2, 'no2');
    const nivelO3 = obtenerNivelCalidad(datosActuales.o3, 'o3');
    const nivelSO2 = obtenerNivelCalidad(datosActuales.so2, 'so2');
    const nivelAQI = obtenerNivelCalidad(datosActuales.aqi, 'aqi');

    valoresActuales[0].innerHTML = `${datosActuales.no2} <span class="dato-unidad">ppb</span>`;
    valoresActuales[0].style.color = obtenerColor(datosActuales.no2, 'no2');
    valoresActuales[0].parentElement.querySelector('.nivel-calidad').textContent = nivelNO2.texto;
    valoresActuales[0].parentElement.querySelector('.nivel-calidad').className = `nivel-calidad ${nivelNO2.clase}`;

    valoresActuales[1].innerHTML = `${datosActuales.o3} <span class="dato-unidad">ppb</span>`;
    valoresActuales[1].style.color = obtenerColor(datosActuales.o3, 'o3');
    valoresActuales[1].parentElement.querySelector('.nivel-calidad').textContent = nivelO3.texto;
    valoresActuales[1].parentElement.querySelector('.nivel-calidad').className = `nivel-calidad ${nivelO3.clase}`;

    valoresActuales[2].innerHTML = `${datosActuales.so2} <span class="dato-unidad">ppb</span>`;
    valoresActuales[2].style.color = obtenerColor(datosActuales.so2, 'so2');
    valoresActuales[2].parentElement.querySelector('.nivel-calidad').textContent = nivelSO2.texto;
    valoresActuales[2].parentElement.querySelector('.nivel-calidad').className = `nivel-calidad ${nivelSO2.clase}`;

    valoresActuales[3].innerHTML = `${datosActuales.aqi} <span class="dato-unidad">AQI</span>`;
    valoresActuales[3].style.color = obtenerColor(datosActuales.aqi, 'aqi');
    valoresActuales[3].parentElement.querySelector('.nivel-calidad').textContent = nivelAQI.texto;
    valoresActuales[3].parentElement.querySelector('.nivel-calidad').className = `nivel-calidad ${nivelAQI.clase}`;
  }

  // Actualizar valores de predicción
  const valoresPrediccion = document.querySelectorAll('.panel.prediccion .dato-valor');
  if (valoresPrediccion.length >= 4) {
    const nivelNO2Pred = obtenerNivelCalidad(datosActuales.no2_pred, 'no2');
    const nivelO3Pred = obtenerNivelCalidad(datosActuales.o3_pred, 'o3');
    const nivelSO2Pred = obtenerNivelCalidad(datosActuales.so2_pred, 'so2');
    const nivelAQIPred = obtenerNivelCalidad(datosActuales.aqi_pred, 'aqi');

    valoresPrediccion[0].innerHTML = `${datosActuales.no2_pred} <span class="dato-unidad">ppb</span>
      <span class="indicador-cambio ${indNO2.clase}">${indNO2.simbolo} ${indNO2.signo}${cambioNO2}%</span>`;
    valoresPrediccion[0].style.color = obtenerColor(datosActuales.no2_pred, 'no2');
    valoresPrediccion[0].parentElement.querySelector('.nivel-calidad').textContent = nivelNO2Pred.texto;
    valoresPrediccion[0].parentElement.querySelector('.nivel-calidad').className = `nivel-calidad ${nivelNO2Pred.clase}`;
    
    valoresPrediccion[1].innerHTML = `${datosActuales.o3_pred} <span class="dato-unidad">ppb</span>
      <span class="indicador-cambio ${indO3.clase}">${indO3.simbolo} ${indO3.signo}${cambioO3}%</span>`;
    valoresPrediccion[1].style.color = obtenerColor(datosActuales.o3_pred, 'o3');
    valoresPrediccion[1].parentElement.querySelector('.nivel-calidad').textContent = nivelO3Pred.texto;
    valoresPrediccion[1].parentElement.querySelector('.nivel-calidad').className = `nivel-calidad ${nivelO3Pred.clase}`;
    
    valoresPrediccion[2].innerHTML = `${datosActuales.so2_pred} <span class="dato-unidad">ppb</span>
      <span class="indicador-cambio ${indSO2.clase}">${indSO2.simbolo} ${indSO2.signo}${cambioSO2}%</span>`;
    valoresPrediccion[2].style.color = obtenerColor(datosActuales.so2_pred, 'so2');
    valoresPrediccion[2].parentElement.querySelector('.nivel-calidad').textContent = nivelSO2Pred.texto;
    valoresPrediccion[2].parentElement.querySelector('.nivel-calidad').className = `nivel-calidad ${nivelSO2Pred.clase}`;
    
    valoresPrediccion[3].innerHTML = `${datosActuales.aqi_pred} <span class="dato-unidad">AQI</span>
      <span class="indicador-cambio ${indAQI.clase}">${indAQI.simbolo} ${indAQI.signo}${cambioAQI}%</span>`;
    valoresPrediccion[3].style.color = obtenerColor(datosActuales.aqi_pred, 'aqi');
    valoresPrediccion[3].parentElement.querySelector('.nivel-calidad').textContent = nivelAQIPred.texto;
    valoresPrediccion[3].parentElement.querySelector('.nivel-calidad').className = `nivel-calidad ${nivelAQIPred.clase}`;
  }

  // Guardar datos para la página de salud
  localStorage.setItem('datosPrediccion', JSON.stringify({
    localidad: localidad,
    aqi_actual: datosActuales.aqi,
    aqi_prediccion: datosActuales.aqi_pred,
    no2_actual: datosActuales.no2,
    o3_actual: datosActuales.o3,
    no2_prediccion: datosActuales.no2_pred,
    o3_prediccion: datosActuales.o3_pred
  }));

  console.log('✅ Datos actualizados correctamente');
}

// Manejo de eventos de carga
console.log('Agregando event listener para DOMContentLoaded');
document.addEventListener('DOMContentLoaded', function() {
  console.log('✅ DOM completamente cargado - ejecutando actualizarDatos');
  actualizarDatos();
});

// También ejecutar si ya está cargado
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  console.log('✅ Documento ya listo - ejecutando inmediatamente');
  setTimeout(actualizarDatos, 0);
}

console.log('=== FIN DE PREDICCIONES.JS ===');