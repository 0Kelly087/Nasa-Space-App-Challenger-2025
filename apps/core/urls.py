from django.urls import path
from . import views

app_name = 'core'

urlpatterns = [
    path('', views.index, name='index'),
    path('data/', views.data, name='data'),
    path('filtros/', views.filtros, name='filtros'),
    path('predicciones/', views.predicciones, name='predicciones'),
]