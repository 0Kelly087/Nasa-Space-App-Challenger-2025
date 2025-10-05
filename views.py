from django.shortcuts import render

def index(request):
    return render(request, 'analisis/index.html')

def filtros(request):
    return render(request, 'analisis/filtros.html')

def prediccion(request):
    return render(request, 'analisis/prediccion.html')
