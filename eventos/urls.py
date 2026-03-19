from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EventoViewSet, login_view, registrar_usuario
from eventos import views

router = DefaultRouter()
router.register(r'eventos', EventoViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('login-manual/', views.login_view, name='login_manual'),
    path('registro/', registrar_usuario, name='registrar_usuario'),
]