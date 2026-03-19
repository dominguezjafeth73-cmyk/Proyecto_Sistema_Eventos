# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Evento(models.Model):
    idevento = models.IntegerField(db_column='idEvento', primary_key=True)  # Field name made lowercase.
    nombre_evento = models.CharField(max_length=120, db_collation='SQL_Latin1_General_CP1_CI_AS')
    descripcion = models.TextField(db_collation='SQL_Latin1_General_CP1_CI_AS', blank=True, null=True)
    url_imagen = models.CharField(max_length=225, db_collation='SQL_Latin1_General_CP1_CI_AS', blank=True, null=True)
    fecha_registro = models.DateTimeField(null=True, blank=True)
    id_organizador = models.ForeignKey('Organizador', models.DO_NOTHING, db_column='id_organizador')
    id_categoria_evento = models.ForeignKey('CategoriaEvento', models.DO_NOTHING, db_column='id_categoria_evento')

    class Meta:
        managed = False
        db_table = 'Evento'


class Organizador(models.Model):
    id_organizador = models.AutoField(db_column='id_Organizador', primary_key=True)  # Field name made lowercase.
    nombre = models.CharField(max_length=120, db_collation='SQL_Latin1_General_CP1_CI_AS')
    correo = models.CharField(max_length=120, db_collation='SQL_Latin1_General_CP1_CI_AS', blank=True, null=True)
    telefono = models.CharField(max_length=20, db_collation='SQL_Latin1_General_CP1_CI_AS', blank=True, null=True)
    pais = models.CharField(max_length=60, db_collation='SQL_Latin1_General_CP1_CI_AS', blank=True, null=True)
    estado = models.CharField(max_length=20, db_collation='SQL_Latin1_General_CP1_CI_AS', blank=True, null=True)
    fecha_registro = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'Organizador'


class Persona(models.Model):
    idpersona = models.AutoField(db_column='idPersona', primary_key=True)  # Field name made lowercase.
    num_identidad = models.CharField(unique=True, max_length=20, db_collation='SQL_Latin1_General_CP1_CI_AS', blank=True, null=True)
    p_nombre = models.CharField(db_column='P_nombre', max_length=45, db_collation='SQL_Latin1_General_CP1_CI_AS')  # Field name made lowercase.
    s_nombre = models.CharField(db_column='S_nombre', max_length=45, db_collation='SQL_Latin1_General_CP1_CI_AS', blank=True, null=True)  # Field name made lowercase.
    p_apellido = models.CharField(db_column='P_apellido', max_length=45, db_collation='SQL_Latin1_General_CP1_CI_AS')  # Field name made lowercase.
    s_apellido = models.CharField(db_column='S_apellido', max_length=45, db_collation='SQL_Latin1_General_CP1_CI_AS', blank=True, null=True)  # Field name made lowercase.
    correo = models.CharField(unique=True, max_length=100, db_collation='SQL_Latin1_General_CP1_CI_AS')
    direccion = models.CharField(max_length=150, db_collation='SQL_Latin1_General_CP1_CI_AS', blank=True, null=True)
    fecha_nac = models.DateField(blank=True, null=True)
    sexo = models.CharField(max_length=1, db_collation='SQL_Latin1_General_CP1_CI_AS', blank=True, null=True)
    fecha_registro = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'Persona'


class Recinto(models.Model):
    id_recinto = models.AutoField(primary_key=True)
    nombre_recinto = models.CharField(unique=True, max_length=45, db_collation='SQL_Latin1_General_CP1_CI_AS')
    direccion = models.CharField(max_length=150, db_collation='SQL_Latin1_General_CP1_CI_AS', blank=True, null=True)
    ciudad = models.CharField(max_length=60, db_collation='SQL_Latin1_General_CP1_CI_AS')
    pais = models.CharField(max_length=60, db_collation='SQL_Latin1_General_CP1_CI_AS')
    capacidad_total = models.IntegerField()
    link_maps = models.CharField(max_length=255, db_collation='SQL_Latin1_General_CP1_CI_AS', blank=True, null=True)
    fecha_registro = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'Recinto'


class Rol(models.Model):
    idrol = models.AutoField(db_column='idRol', primary_key=True)  # Field name made lowercase.
    rol = models.CharField(db_column='Rol', unique=True, max_length=30, db_collation='SQL_Latin1_General_CP1_CI_AS')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Rol'


class Acto(models.Model):
    id_acto = models.AutoField(primary_key=True)
    tipo_acto = models.CharField(max_length=10, db_collation='SQL_Latin1_General_CP1_CI_AS')
    id_artista = models.OneToOneField('Artista', models.DO_NOTHING, db_column='id_artista', blank=True, null=True)
    id_banda = models.OneToOneField('Banda', models.DO_NOTHING, db_column='id_banda', blank=True, null=True)
    fecha_registro = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'acto'


class Artista(models.Model):
    id_artista = models.AutoField(primary_key=True)
    nombre_artistico = models.CharField(max_length=120, db_collation='SQL_Latin1_General_CP1_CI_AS')
    biografia = models.TextField(db_collation='SQL_Latin1_General_CP1_CI_AS', blank=True, null=True)
    pais_origen = models.CharField(max_length=60, db_collation='SQL_Latin1_General_CP1_CI_AS', blank=True, null=True)
    url_foto = models.CharField(max_length=255, db_collation='SQL_Latin1_General_CP1_CI_AS', blank=True, null=True)
    estado_artista = models.CharField(max_length=20, db_collation='SQL_Latin1_General_CP1_CI_AS')
    fecha_registro = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'artista'


class Asiento(models.Model):
    id_asiento = models.AutoField(primary_key=True)
    id_escenario = models.ForeignKey('Escenario', models.DO_NOTHING, db_column='id_escenario')
    fila = models.CharField(max_length=5, db_collation='SQL_Latin1_General_CP1_CI_AS')
    numero = models.IntegerField()
    fecha_registro = models.DateTimeField()
    id_zona_asiento = models.ForeignKey('ZonaAsiento', models.DO_NOTHING, db_column='id_zona_asiento')

    class Meta:
        managed = False
        db_table = 'asiento'


class AsientoEvento(models.Model):
    id_asiento = models.IntegerField(primary_key=True, db_column='id_asiento')
    id_evento_fecha = models.IntegerField(db_column='id_evento_fecha')
    id_evento_fecha = models.ForeignKey('EventoFecha', models.DO_NOTHING, db_column='id_evento_fecha')
    id_asiento = models.ForeignKey(Asiento, models.DO_NOTHING, db_column='id_asiento')
    estado = models.CharField(max_length=20, db_collation='SQL_Latin1_General_CP1_CI_AS')
    fecha_registro = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'asiento_evento'
        unique_together = (('id_evento_fecha', 'id_asiento'),)


class Banda(models.Model):
    id_banda = models.AutoField(primary_key=True)
    nombre_banda = models.CharField(unique=True, max_length=120, db_collation='SQL_Latin1_General_CP1_CI_AS')
    descripcion = models.TextField(db_collation='SQL_Latin1_General_CP1_CI_AS', blank=True, null=True)
    pais_origen = models.CharField(max_length=60, db_collation='SQL_Latin1_General_CP1_CI_AS', blank=True, null=True)
    anio_formacion = models.IntegerField(blank=True, null=True)
    url_foto = models.CharField(max_length=255, db_collation='SQL_Latin1_General_CP1_CI_AS', blank=True, null=True)
    fecha_registro = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'banda'


class BandaIntegrante(models.Model):
    pk = models.CompositePrimaryKey('artista_id_artista', 'banda_id_banda')
    artista_id_artista = models.ForeignKey(Artista, models.DO_NOTHING, db_column='artista_id_artista')
    banda_id_banda = models.ForeignKey(Banda, models.DO_NOTHING, db_column='banda_id_banda')
    fecha_ingreso = models.DateField(blank=True, null=True)
    rol_en_banda = models.CharField(max_length=50, db_collation='SQL_Latin1_General_CP1_CI_AS', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'banda_integrante'


class Boleto(models.Model):
    id_boleto = models.AutoField(primary_key=True)
    id_orden = models.ForeignKey('Orden', models.DO_NOTHING, db_column='id_orden')
    id_evento_fecha = models.ForeignKey(AsientoEvento, models.DO_NOTHING, db_column='id_evento_fecha')
    id_asiento = models.ForeignKey(AsientoEvento, models.DO_NOTHING, db_column='id_asiento', related_name='boleto_id_asiento_set')
    idtipo_boleto = models.ForeignKey('TipoBoleto', models.DO_NOTHING, db_column='idtipo_boleto')
    codigo = models.CharField(unique=True, max_length=80, db_collation='SQL_Latin1_General_CP1_CI_AS')
    estado = models.CharField(max_length=20, db_collation='SQL_Latin1_General_CP1_CI_AS')
    emitido_en = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'boleto'
        unique_together = (('id_evento_fecha', 'id_asiento'),)


class CarteleraEvento(models.Model):
    id_cartelera_evento = models.AutoField(primary_key=True)
    id_evento_fecha = models.OneToOneField('EventoFecha', models.DO_NOTHING, db_column='id_evento_fecha')
    orden_aparicion = models.IntegerField(unique=True)
    hora_salida = models.TimeField(blank=True, null=True)
    fecha_registro = models.DateTimeField()
    id_acto = models.ForeignKey(Acto, models.DO_NOTHING, db_column='id_acto')

    class Meta:
        managed = False
        db_table = 'cartelera_evento'


class CategoriaEvento(models.Model):
    id_categoria_evento = models.AutoField(primary_key=True)
    nombre = models.CharField(unique=True, max_length=50, db_collation='SQL_Latin1_General_CP1_CI_AS')
    descripcion = models.CharField(max_length=150, db_collation='SQL_Latin1_General_CP1_CI_AS', blank=True, null=True)
    estado = models.CharField(max_length=20, db_collation='SQL_Latin1_General_CP1_CI_AS')
    fecha_registro = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'categoria_evento'


class Checkin(models.Model):
    id_checkin = models.AutoField(primary_key=True)
    id_boleto = models.OneToOneField(Boleto, models.DO_NOTHING, db_column='id_boleto')
    fecha_checkin = models.DateTimeField()
    validado_por = models.ForeignKey('Usuario', models.DO_NOTHING, db_column='validado_por', blank=True, null=True)
    id_puerta = models.ForeignKey('Puerta', models.DO_NOTHING, db_column='id_puerta')

    class Meta:
        managed = False
        db_table = 'checkin'


class Cupon(models.Model):
    id_cupon = models.AutoField(primary_key=True)
    codigo = models.CharField(unique=True, max_length=30, db_collation='SQL_Latin1_General_CP1_CI_AS')
    tipo_descuento = models.CharField(max_length=20, db_collation='SQL_Latin1_General_CP1_CI_AS')
    valor = models.DecimalField(max_digits=10, decimal_places=2)
    fecha_inicio = models.DateField(blank=True, null=True)
    fecha_fin = models.DateField(blank=True, null=True)
    usos_maximos = models.IntegerField(blank=True, null=True)
    estado = models.CharField(max_length=20, db_collation='SQL_Latin1_General_CP1_CI_AS')
    fecha_registro = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'cupon'


class Escenario(models.Model):
    id_escenario = models.AutoField(primary_key=True)
    id_recinto = models.ForeignKey(Recinto, models.DO_NOTHING, db_column='id_recinto')
    nombre_escenario = models.CharField(max_length=80, db_collation='SQL_Latin1_General_CP1_CI_AS')
    capacidad = models.IntegerField(blank=True, null=True)
    descripcion = models.CharField(max_length=150, db_collation='SQL_Latin1_General_CP1_CI_AS', blank=True, null=True)
    fecha_registro = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'escenario'
        unique_together = (('nombre_escenario', 'id_recinto'),)


class EstadoUsuario(models.Model):
    id_estado_usuario = models.AutoField(primary_key=True)
    estado = models.CharField(unique=True, max_length=20, db_collation='SQL_Latin1_General_CP1_CI_AS')

    class Meta:
        managed = False
        db_table = 'estado_usuario'


class EventoFecha(models.Model):
    id_evento_fecha = models.AutoField(primary_key=True)
    id_evento = models.ForeignKey(Evento, models.DO_NOTHING, db_column='id_evento')
    id_escenario = models.ForeignKey(Escenario, models.DO_NOTHING, db_column='id_escenario')
    fecha_evento = models.DateField()
    hora_inicio = models.TimeField()
    hora_fin = models.TimeField(blank=True, null=True)
    estado_fecha = models.CharField(max_length=20, db_collation='SQL_Latin1_General_CP1_CI_AS')
    fecha_registro = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'evento_fecha'


class Factura(models.Model):
    id_factura = models.AutoField(primary_key=True)
    id_orden = models.OneToOneField('Orden', models.DO_NOTHING, db_column='id_orden')
    nombre_factura = models.CharField(max_length=120, db_collation='SQL_Latin1_General_CP1_CI_AS')
    rtn = models.CharField(max_length=20, db_collation='SQL_Latin1_General_CP1_CI_AS', blank=True, null=True)
    direccion_factura = models.CharField(max_length=120, db_collation='SQL_Latin1_General_CP1_CI_AS', blank=True, null=True)
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)
    impuesto = models.DecimalField(max_digits=10, decimal_places=2)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    fecha_emision = models.DateTimeField()
    estado = models.CharField(max_length=20, db_collation='SQL_Latin1_General_CP1_CI_AS', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'factura'


class MetodoPago(models.Model):
    id_metodo_pago = models.AutoField(primary_key=True)
    nombre = models.CharField(unique=True, max_length=45, db_collation='SQL_Latin1_General_CP1_CI_AS')
    descripcion = models.CharField(max_length=150, db_collation='SQL_Latin1_General_CP1_CI_AS', blank=True, null=True)
    estado = models.CharField(max_length=20, db_collation='SQL_Latin1_General_CP1_CI_AS')
    fecha_registro = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'metodo_pago'


class Orden(models.Model):
    id_orden = models.IntegerField(primary_key=True)
    id_usuario = models.ForeignKey('Usuario', models.DO_NOTHING, db_column='id_usuario')
    estado = models.CharField(max_length=15, db_collation='SQL_Latin1_General_CP1_CI_AS')
    total = models.DecimalField(max_digits=10, decimal_places=2)
    moneda = models.CharField(max_length=5, db_collation='SQL_Latin1_General_CP1_CI_AS')
    creada_en = models.DateTimeField()
    actualizada_en = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'orden'


class OrdenCupon(models.Model):
    id_orden = models.OneToOneField(Orden, models.DO_NOTHING, db_column='id_orden')
    id_cupon = models.ForeignKey(Cupon, models.DO_NOTHING, db_column='id_cupon')
    monto_descuento = models.DecimalField(max_digits=10, decimal_places=2)
    fecha_aplicacion = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'orden_cupon'


class Pago(models.Model):
    id_pago = models.AutoField(primary_key=True)
    id_orden = models.ForeignKey(Orden, models.DO_NOTHING, db_column='id_orden')
    monto = models.DecimalField(max_digits=10, decimal_places=2)
    estado = models.CharField(max_length=20, db_collation='SQL_Latin1_General_CP1_CI_AS')
    referencia = models.CharField(max_length=60, db_collation='SQL_Latin1_General_CP1_CI_AS', blank=True, null=True)
    fecha_pago = models.DateTimeField()
    id_metodo_pago = models.ForeignKey(MetodoPago, models.DO_NOTHING, db_column='id_metodo_pago')

    class Meta:
        managed = False
        db_table = 'pago'


class Puerta(models.Model):
    id_puerta = models.AutoField(primary_key=True)
    id_escenario = models.ForeignKey(Escenario, models.DO_NOTHING, db_column='id_escenario')
    nombre = models.CharField(max_length=50, db_collation='SQL_Latin1_General_CP1_CI_AS')
    ubicacion = models.CharField(max_length=100, db_collation='SQL_Latin1_General_CP1_CI_AS', blank=True, null=True)
    estado = models.CharField(max_length=20, db_collation='SQL_Latin1_General_CP1_CI_AS')
    fecha_registro = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'puerta'
        unique_together = (('nombre', 'id_escenario'),)


class Reembolso(models.Model):
    id_reembolso = models.AutoField(primary_key=True)
    id_pago = models.ForeignKey(Pago, models.DO_NOTHING, db_column='id_pago')
    monto = models.DecimalField(max_digits=10, decimal_places=2)
    motivo = models.CharField(max_length=150, db_collation='SQL_Latin1_General_CP1_CI_AS')
    estado = models.CharField(max_length=20, db_collation='SQL_Latin1_General_CP1_CI_AS')
    fecha_solicitud = models.DateTimeField()
    fecha_resolucion = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'reembolso'


class Reserva(models.Model):
    id_reserva = models.IntegerField(primary_key=True)
    id_orden = models.ForeignKey(Orden, models.DO_NOTHING, db_column='id_orden')
    estado = models.CharField(max_length=20, db_collation='SQL_Latin1_General_CP1_CI_AS')
    expira_en = models.DateTimeField()
    creada_en = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'reserva'


class ReservaDetalle(models.Model):
    pk = models.CompositePrimaryKey('id_reserva', 'id_evento_fecha', 'id_asiento')
    id_reserva = models.ForeignKey(Reserva, models.DO_NOTHING, db_column='id_reserva')
    id_evento_fecha = models.ForeignKey(AsientoEvento, models.DO_NOTHING, db_column='id_evento_fecha')
    id_asiento = models.ForeignKey(AsientoEvento, models.DO_NOTHING, db_column='id_asiento', related_name='reservadetalle_id_asiento_set')
    idtipo_boleto = models.ForeignKey('TipoBoleto', models.DO_NOTHING, db_column='idtipo_boleto')
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    creada_en = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'reserva_detalle'


class TelPersona(models.Model):
    id_tel = models.AutoField(primary_key=True)
    id_persona = models.ForeignKey(Persona, models.DO_NOTHING, db_column='id_persona')
    telefono = models.CharField(max_length=20, db_collation='SQL_Latin1_General_CP1_CI_AS')
    tipo_tel = models.CharField(max_length=15, db_collation='SQL_Latin1_General_CP1_CI_AS')

    class Meta:
        managed = False
        db_table = 'tel_persona'


class TipoBoleto(models.Model):
    idtipo_boleto = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=50, db_collation='SQL_Latin1_General_CP1_CI_AS')
    descripcion = models.CharField(max_length=150, db_collation='SQL_Latin1_General_CP1_CI_AS', blank=True, null=True)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    cupo_maximo = models.IntegerField()
    id_evento_fecha = models.ForeignKey(EventoFecha, models.DO_NOTHING, db_column='id_evento_fecha')
    fecha_registro = models.DateTimeField()
    cupos_maximo = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'tipo_boleto'


class Usuario(models.Model):
    id_usuario = models.AutoField(primary_key=True) 
    usuario = models.CharField(max_length=45, unique=True)
    hash_clave = models.CharField(max_length=250)
    fecha_creacion = models.DateTimeField()
    id_estado_usuario = models.ForeignKey('EstadoUsuario', models.DO_NOTHING, db_column='id_estado_usuario')
    id_persona = models.ForeignKey('Persona', models.DO_NOTHING, db_column='id_Persona') 

    class Meta:
        managed = False
        db_table = 'usuario'

    def __str__(self):
        return self.usuario


class UsuarioRol(models.Model):
    pk = models.CompositePrimaryKey('id_usuario', 'id_rol')
    id_usuario = models.ForeignKey(Usuario, models.DO_NOTHING, db_column='id_usuario')
    id_rol = models.ForeignKey(Rol, models.DO_NOTHING, db_column='id_rol')
    fecha_asignacion = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'usuario_Rol'


class ZonaAsiento(models.Model):
    id_zona_asiento = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=50, db_collation='SQL_Latin1_General_CP1_CI_AS')
    descripcion = models.CharField(max_length=150, db_collation='SQL_Latin1_General_CP1_CI_AS', blank=True, null=True)
    capacidad_zona = models.IntegerField(blank=True, null=True)
    estado = models.CharField(max_length=20, db_collation='SQL_Latin1_General_CP1_CI_AS')
    fecha_registro = models.DateTimeField()
    id_escenario = models.ForeignKey(Escenario, models.DO_NOTHING, db_column='id_escenario')

    class Meta:
        managed = False
        db_table = 'zona_asiento'
        unique_together = (('id_escenario', 'nombre'),)
