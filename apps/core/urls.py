from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('filtros/', views.filtros, name='filtros'),
    path('predicciones/', views.predicciones, name='predicciones'),
    path('filtrar-localidad/', views.filtrar_localidad, name='filtrar_localidad'),  # ← AGREGAR ESTA LÍNEA
]

