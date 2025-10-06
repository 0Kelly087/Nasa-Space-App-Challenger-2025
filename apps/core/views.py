from django.shortcuts import render
from django.http import JsonResponse
from django.conf import settings  # ← AGREGAR ESTA LÍNEA
import pandas as pd
import numpy as np
import json
import os
from pyproj import Transformer

def index(request):
    """Vista principal del proyecto"""
    context = {
        'titulo': 'NASA Space App Challenge',
        'descripcion': 'Análisis de datos TEMPO'
    }
    return render(request, 'core/index.html', context)


def data(request):
    """Vista para visualizar datos"""
    # Aquí puedes cargar y procesar datos con pandas
    # df = pd.read_csv('ruta/al/archivo.csv')
    context = {
        'titulo': 'Visualización de Datos'
    }
    return render(request, 'core/data.html', context)


def filtros(request):
    """Vista para aplicar filtros a los datos"""
    context = {
        'titulo': 'Filtros de Datos'
    }
    return render(request, 'core/filtros.html', context)


def predicciones(request):
    """Vista para mostrar predicciones del modelo IA"""
    # Aquí puedes integrar tus modelos de ML
    # from apps.ia_models.services import hacer_prediccion
    context = {
        'titulo': 'Predicciones'
    }
    return render(request, 'core/predicciones.html', context)

def salud(request):
    return render(request, 'core/salud.html')

# En apps/core/views.py

def predicciones(request):
    # Obtener la localidad desde la sesión o parámetros GET
    localidad = request.session.get('localidad_seleccionada')
    
    context = {
        'localidad': localidad
    }
    return render(request, 'core/predicciones.html', context)

def filtrar_localidad(request):
    localidad = request.GET.get('localidad')
    if not localidad:
        return JsonResponse({'error': 'No se proporcionó localidad'}, status=400)

    # CORRECCIÓN: Usar BASE_DIR para encontrar el archivo correctamente
    ruta_json = os.path.join(settings.BASE_DIR, 'static', 'data', 'loca.json')
    
    # También puedes intentar esta ruta alternativa si tienes los archivos en apps/core/static
    # ruta_json = os.path.join(settings.BASE_DIR, 'apps', 'core', 'static', 'data', 'loca.json')
    
    print(f"Buscando archivo en: {ruta_json}")  # Para debug
    print(f"¿Existe el archivo?: {os.path.exists(ruta_json)}")  # Para debug
    
    if not os.path.exists(ruta_json):
        return JsonResponse({
            'error': 'Archivo de datos no encontrado',
            'ruta_buscada': ruta_json
        }, status=500)

    try:
        with open(ruta_json, 'r', encoding='utf-8') as f:
            data_esri = json.load(f)

        if 'features' not in data_esri:
            return JsonResponse({'error': 'Formato de datos inválido'}, status=500)

        spatial_ref = data_esri.get('spatialReference', {}).get('wkid', 3116)
        transformer = Transformer.from_crs(f"EPSG:{spatial_ref}", "EPSG:4326", always_xy=True)

        features_filtrados = []
        for feature_esri in data_esri['features']:
            loc_nombre = feature_esri.get('attributes', {}).get('LocNombre', '')
            
            if localidad.upper() in loc_nombre.upper():
                feature_geojson = {
                    "type": "Feature",
                    "properties": feature_esri.get('attributes', {}),
                    "geometry": None
                }

                geometry_esri = feature_esri.get('geometry', {})
                
                if geometry_esri and 'rings' in geometry_esri:
                    rings = geometry_esri['rings']
                    coordinates = []
                    
                    for ring in rings:
                        ring_transformed = []
                        for coord in ring:
                            x, y = coord[0], coord[1]
                            lon, lat = transformer.transform(x, y)
                            ring_transformed.append([lon, lat])
                        
                        coordinates.append(ring_transformed)
                    
                    feature_geojson["geometry"] = {
                        "type": "Polygon",
                        "coordinates": coordinates
                    }

                features_filtrados.append(feature_geojson)

        if not features_filtrados:
            return JsonResponse({
                'error': f'No se encontró la localidad "{localidad}"',
                'features': []
            }, status=404)

        geojson_estandar = {
            'type': 'FeatureCollection',
            'features': features_filtrados
        }

        return JsonResponse(geojson_estandar, safe=False)

    except Exception as e:
        print(f"Error en conversión: {e}")
        import traceback
        traceback.print_exc()
        return JsonResponse({'error': f'Error al procesar datos: {str(e)}'}, status=500)