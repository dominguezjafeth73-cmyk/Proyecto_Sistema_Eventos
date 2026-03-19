import hashlib
from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Evento, Usuario, Persona, EstadoUsuario
from .serializers import EventoSerializer
from .backends import MySqlserverBackend
from django.utils import timezone

class EventoViewSet(viewsets.ModelViewSet):
    queryset = Evento.objects.all()
    serializer_class = EventoSerializer

@api_view(['POST'])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = MySqlserverBackend().authenticate(request, username=username, password=password)
    if user:
        return Response({"message": "Login exitoso", "username": user.usuario}, status=200)
    return Response({"error": "Credenciales inválidas"}, status=401)


@api_view(['POST'])
def registrar_usuario(request):
    try:
        # Extraemos los datos del JSON
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response({"error": "Debes enviar 'username' y 'password' en el JSON"}, status=400)

        # 1. Hashear clave
        password_hash = hashlib.sha256(password.encode()).hexdigest()

        try:
            estado = EstadoUsuario.objects.get(pk=1)
            persona = Persona.objects.get(pk=1)
        except (EstadoUsuario.DoesNotExist, Persona.DoesNotExist):
            return Response({"error": "No se encontró el Estado 1 o Persona 1 en la DB"}, status=500)

        # 3. CREAR USUARIO
        Usuario.objects.create(
            usuario=username,
            hash_clave=password_hash,
            id_estado_usuario=estado,
            id_persona=persona,
            fecha_creacion=timezone.now()
        )

        return Response({"message": "¡ÉXITO! Usuario creado correctamente"}, status=201)

    except Exception as e:
        return Response({"error": str(e)}, status=400)

