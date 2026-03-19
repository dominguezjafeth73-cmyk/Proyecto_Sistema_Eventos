import hashlib
from django.contrib.auth.backends import BaseBackend
from .models import Usuario

class MySqlserverBackend(BaseBackend):
    def authenticate(self, request, username=None, password=None):
        try:
            user = Usuario.objects.get(usuario=username)
            hash_recibido = hashlib.sha256(password.encode()).hexdigest()
            if user.hash_clave == hash_recibido:
                return user
        except Usuario.DoesNotExist:
            return None
        return None

    def get_user(self, user_id):
        try:
            return Usuario.objects.get(pk=user_id)
        except Usuario.DoesNotExist:
            return None
