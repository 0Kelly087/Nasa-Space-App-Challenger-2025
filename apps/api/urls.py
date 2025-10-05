from django.urls import path
from .views import TestAPIView

app_name = 'api'

urlpatterns = [
    path('test/', TestAPIView.as_view(), name='test'),
]