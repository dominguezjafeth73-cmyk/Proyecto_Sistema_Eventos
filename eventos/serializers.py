# eventos/serializers.py
from rest_framework import serializers
from .models import Evento 

# eventos/serializers.py
class EventoSerializer(serializers.ModelSerializer):
    # Esto le dice a Django: "No valides la fecha, solo pásamela como texto"
    fecha_registro = serializers.ReadOnlyField() 

    class Meta:
        model = Evento
        fields = '__all__'