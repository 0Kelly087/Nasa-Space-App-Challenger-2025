from django.shortcuts import render
from django.http import JsonResponse
import pandas as pd
import numpy as np

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