from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('filtros/', views.filtros, name='filtros'),
    path('prediccion/', views.prediccion, name='prediccion'),
]
