// Inicializar el mapa
const map = L.map('map', {
  preferCanvas: false,
  zoomControl: true
}).setView([4.711, -74.0721], 10);

// Capa base
const baseLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  maxZoom: 19,
  minZoom: 8,
  crossOrigin: true
}).addTo(map);

// Variable para almacenar la capa de localidad
let capaLocalidad;

function mostrarInfo() {
  const localidad = document.getElementById("localidad").value;
  const resultado = document.getElementById("resultado");
  const titulo = document.getElementById("tituloLocalidad");
  const info = document.getElementById("infoLocalidad");

  if (localidad === "") {
    alert("Por favor, selecciona una localidad antes de filtrar.");
    return;
  }

  console.log('=== MOSTRAR INFO - Localidad:', localidad);

  // Guardar la localidad seleccionada en localStorage
  localStorage.setItem('localidadSeleccionada', localidad);
  console.log('📍 Localidad guardada desde mostrarInfo:', localidad);

  console.log('Buscando localidad:', localidad);

  // Llamar al endpoint de Django
  fetch(`/filtrar-localidad/?localidad=${encodeURIComponent(localidad)}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Datos recibidos:', data);

      if (data.error) {
        alert(data.error);
        return;
      }

      if (!data.features || data.features.length === 0) {
        alert(`No se encontraron datos para "${localidad}"`);
        return;
      }

      // Remover capa anterior
      if (capaLocalidad) {
        map.removeLayer(capaLocalidad);
      }

      // Asegurar que el mapa base esté visible
      if (!map.hasLayer(baseLayer)) {
        baseLayer.addTo(map);
      }

      // Crear nueva capa con el polígono
      capaLocalidad = L.geoJSON(data, {
        style: function (feature) {
          return {
            color: '#e74c3c',
            weight: 3,
            opacity: 0.8,
            fillColor: '#3498db',
            fillOpacity: 0.3
          };
        },
        onEachFeature: function (feature, layer) {
          const props = feature.properties || {};
          let popupContent = `<b>Localidad:</b> ${props.LocNombre || localidad}<br>`;
          if (props.LocCodigo) {
            popupContent += `<b>Código:</b> ${props.LocCodigo}<br>`;
          }
          if (props.LocArea) {
            popupContent += `<b>Área:</b> ${(props.LocArea / 1000000).toFixed(2)} km²<br>`;
          }
          if (props.LocAAdmini) {
            popupContent += `<b>Acto Administrativo:</b> ${props.LocAAdmini}`;
          }
          layer.bindPopup(popupContent);
        }
      }).addTo(map);

      // Ajustar vista al polígono
      const bounds = capaLocalidad.getBounds();
      if (bounds.isValid()) {
        map.fitBounds(bounds, {
          padding: [50, 50],
          maxZoom: 13
        });
      }

      // Forzar actualización del mapa
      setTimeout(() => {
        map.invalidateSize();
        baseLayer.redraw();
      }, 100);

      // Mostrar información en el panel con datos del GeoJSON
      const props = data.features[0]?.properties || {};
      const localidadNombre = props.LocNombre || localidad;
      
      titulo.textContent = localidadNombre;
      
      // Construir la información con los datos reales del GeoJSON
      let infoTexto = '';
      
      if (props.LocCodigo) {
        infoTexto += `<strong>Código de Localidad:</strong> ${props.LocCodigo}<br><br>`;
      }
      
      if (props.LocArea) {
        const areaKm2 = (props.LocArea / 1000000).toFixed(2);
        infoTexto += `<strong>Área:</strong> ${areaKm2} km²<br><br>`;
      }
      
      if (props.LocAAdmini) {
        infoTexto += `<strong>Acto Administrativo:</strong> ${props.LocAAdmini}<br><br>`;
      }
      
      if (props.SHAPE_Length && props.SHAPE_Length > 0) {
        // Intentar diferentes conversiones según las unidades
        let perimetro;
        if (props.SHAPE_Length > 1000) {
          // Si es mayor a 1000, probablemente está en metros
          perimetro = (props.SHAPE_Length / 1000).toFixed(2) + ' km';
        } else if (props.SHAPE_Length > 1) {
          // Si está entre 1 y 1000, probablemente ya está en km o grados
          perimetro = props.SHAPE_Length.toFixed(2) + ' km';
        } else {
          // Si es muy pequeño, probablemente está en grados decimales
          perimetro = (props.SHAPE_Length * 111).toFixed(2) + ' km'; // ~111 km por grado
        }
        infoTexto += `<strong>Perímetro:</strong> ${perimetro}<br><br>`;
      }
      
      // Agregar información adicional si está disponible
      infoTexto += `<em>Datos obtenidos del sistema de información geográfica de Bogotá.</em>`;
      
      info.innerHTML = infoTexto;

      resultado.classList.add("visible");
    })
    .catch(error => {
      console.error('Error:', error);
      alert(`Error al cargar datos: ${error.message}`);
    });
}

// Asegurar que el mapa se renderice correctamente al cargar
setTimeout(() => {
  map.invalidateSize();
}, 100);

// Re-ajustar el mapa cuando cambie el tamaño de la ventana
window.addEventListener('resize', () => {
  map.invalidateSize();
});