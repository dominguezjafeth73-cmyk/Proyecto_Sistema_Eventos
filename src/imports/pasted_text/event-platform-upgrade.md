Quiero llevar mi plataforma de eventos a una versión mucho más profesional, realista y visualmente lista para producción, sin rehacer todo el proyecto ni romper la estructura actual del frontend.

Objetivo general:
Quiero que el sistema se vea como una plataforma real de compra de boletos de alto nivel, moderna, segura, creíble y premium. Necesito mejorar la experiencia completa del usuario desde ver el evento, seleccionar zonas, comprar boletos, pagar, recibir confirmación, generar factura, obtener un ticket con código QR y poder usar ese QR para ingresar al evento.

Mantén la estructura general actual del frontend, pero mejora y amplía estas secciones:

1. Pantalla de detalle del evento más profesional
Quiero que la pantalla de detalle del evento se vea mucho más moderna, clara y elegante.
Debe incluir:
- nombre del evento en grande
- imagen o banner destacado
- fecha y hora
- ciudad y país
- recinto
- escenario o salón
- dirección completa
- precio desde
- estado del evento
- botón principal de acción como “Comprar boletos”, “Seleccionar zona” o “Ver disponibilidad”

Agregar una sección de resumen rápido con tarjetas o bloques visuales para:
- fecha
- hora
- ciudad
- país
- recinto
- escenario
- dirección
- precio desde
- estado del evento

Quiero una jerarquía visual clara, buen espaciado, tarjetas modernas, íconos útiles, secciones bien separadas y diseño responsive para desktop, tablet y móvil.

2. Sección de ubicación y cómo llegar
Mejora la sección de ubicación para que se vea más útil y real.
Debe incluir:
- mapa visual preparado para integración con Google Maps
- dirección completa
- ciudad
- país
- nombre del recinto
- nombre del escenario o salón
- botón “Cómo llegar”
- botón “Ver en Google Maps”
- referencias de ubicación
- información visual sobre estacionamiento, acceso principal o puertas si aplica
- estados visuales de carga, error y sin ubicación disponible

3. Mapa de zonas mucho más visual y nada genérico
Quiero mejorar mucho la parte del mapa del recinto y las zonas.
No quiero un esquema genérico repetido para todos los eventos.
Necesito que cada recinto tenga una distribución distinta según el tipo de lugar:
- estadio
- arena
- teatro
- centro de convenciones
- salón de eventos
- recinto abierto

El mapa de zonas debe:
- verse mucho más visual
- parecerse a un recinto real
- cambiar según el tipo de evento y el lugar
- usar una estructura tipo SVG o bloques visuales bien organizados
- tener leyenda de colores
- sentirse interactivo aunque al inicio sea visual
- mostrar disponibilidad por color
- verse como una plataforma real de selección de boletos

Ejemplos de zonas por tipo de recinto:
Para estadios:
- Sombra Este
- Sombra Oeste
- Sol Centro
- Sol Norte
- Sol Sur
- Platea
- Palco
- VIP
- Gramilla o cancha si aplica

Para conciertos en arena o centros de eventos:
- Front Stage VIP
- Platinum
- Preferencial
- General
- Gradas Norte
- Gradas Sur
- Lounge
- Meet and Greet visualmente destacado si aplica

Para teatro:
- Platea Baja
- Platea Alta
- Balcón
- Preferencial
- General

Agregar una leyenda clara con colores para:
- Disponible
- Pocos boletos
- Agotado
- Seleccionado

Cuando el usuario seleccione una zona, mostrar un panel lateral o inferior con:
- nombreZona
- nombreTipoBoleto
- precio
- cupoMaximo
- vendidos
- reservados
- disponibles
- estado
- descripción corta opcional
- botón “Seleccionar zona”
- botón “Continuar compra”
- botón “Ver disponibilidad”

Además del mapa visual, también mostrar las zonas en tarjetas o bloques informativos con:
- nombre de la zona
- tipo de boleto
- precio
- capacidad
- disponibles
- estado
- botón de acción

4. Eventos más realistas y variados
Quiero que la plataforma use eventos de ejemplo más creíbles, variados y atractivos.
No quiero placeholders genéricos repetidos.

Quiero eventos con enfoque local en Honduras, pero también con algunos eventos internacionales para que la plataforma se sienta completa y global.

Usa ejemplos de eventos en ciudades de Honduras como:
- Tegucigalpa
- San Pedro Sula
- La Ceiba
- Comayagua
- Choluteca si aplica

También agrega algunos eventos en otros países para dar una sensación más internacional.

Tipos de eventos que quiero ver:
- conciertos de artistas famosos
- festivales
- partidos o eventos deportivos
- obras o espectáculos
- conferencias o experiencias especiales

Cada evento debe sentirse visualmente creíble y debe tener:
- imagen atractiva
- ciudad y país
- recinto acorde
- tipo de evento
- zonas acordes al recinto
- precio desde
- estado del evento
- fecha creíble
- experiencia visual premium

5. Pasarela de pago versión pro
Quiero una pantalla de pago mucho más profesional, moderna y realista.
Debe parecer una pasarela de pago segura y confiable.

La pantalla de checkout debe incluir:
- resumen del pedido
- nombre del evento
- imagen pequeña del evento
- fecha y hora
- recinto
- ciudad y país
- zona seleccionada
- cantidad de boletos
- subtotal
- cargos adicionales
- impuestos si aplica visualmente
- total final

Métodos de pago visuales:
- tarjeta de crédito / débito
- wallet digital
- transferencia o método alternativo visual
- opción de guardar método de pago

Campos del formulario:
- nombre del titular
- número de tarjeta
- fecha de expiración
- CVV
- correo electrónico
- teléfono
- país
- dirección de facturación

Validaciones visuales:
- validación de correo con formato correcto
- validación visual de número de tarjeta
- validación de fecha de expiración
- validación de CVV
- validación de campos obligatorios
- mensajes de error claros y elegantes
- estados de carga y procesamiento
- bloqueo visual del botón si faltan datos
- confirmación visual de pago exitoso
- pantalla visual de error si el pago falla

Seguridad visual y confianza:
- indicadores de pago seguro
- iconos de candado y seguridad
- mensaje de transacción cifrada
- diseño que transmita confianza
- checkbox para aceptar términos y condiciones antes de pagar
- sección de políticas, privacidad y soporte

No necesito lógica real de cobro todavía, pero sí una experiencia visual muy realista y lista para conectarse después con una pasarela real.

6. Autenticación y validación de correo más profesional
Quiero mejorar la experiencia de login, registro y seguridad de cuenta para que se vea como una plataforma seria.

Agregar visualmente:
- login moderno
- registro moderno
- recuperación de contraseña
- verificación por correo
- pantalla de confirmar correo electrónico
- mensajes de correo enviado
- pantalla de autenticación exitosa
- validación de correo realista
- validación de contraseña segura
- indicador visual de fortaleza de contraseña
- opción de mostrar / ocultar contraseña
- mensajes claros de error y éxito

Quiero que el diseño se sienta como una plataforma real que trabaja con correos auténticos, seguridad y validaciones serias, aunque por ahora quede preparado visualmente para backend.

7. Confirmación de compra, factura y ticket digital con QR
Quiero agregar toda la experiencia post compra para que el sistema se sienta completo y real.

Después de que el usuario compre boletos, debe mostrarse una pantalla de confirmación de compra profesional que incluya:
- mensaje de compra exitosa
- resumen final del pedido
- nombre del evento
- fecha y hora
- recinto
- ciudad y país
- dirección
- zona comprada
- cantidad de boletos
- número de orden
- método de pago
- subtotal
- cargos
- total pagado

También quiero que se genere visualmente una factura o comprobante de compra profesional con diseño limpio y confiable.
La factura debe incluir:
- logo o identidad de la plataforma
- número de factura o comprobante
- fecha de emisión
- datos del comprador
- correo electrónico
- detalle de los boletos comprados
- evento
- recinto
- ciudad y país
- zona
- cantidad
- precio unitario
- subtotal
- cargos adicionales
- impuestos si aplica visualmente
- total final
- estado del pago
- método de pago
- nota de soporte o ayuda

Además, quiero un ticket digital generado después de la compra.
Ese ticket debe verse moderno y realista e incluir:
- nombre del evento
- banner o imagen pequeña del evento
- fecha y hora
- recinto
- ciudad y país
- puerta o acceso si aplica
- zona
- asiento si aplica o entrada general si no aplica
- nombre del comprador
- número de ticket
- estado del ticket
- instrucciones de ingreso

Quiero que el ticket digital incluya un código QR grande, visible y bien presentado.
El diseño debe dar a entender que cuando el usuario llegue al evento, el personal podrá escanear ese QR para validar el acceso y permitir la entrada.

Agregar también:
- botón “Descargar factura”
- botón “Descargar ticket”
- botón “Ver QR”
- botón “Enviar al correo”
- botón “Mis boletos”
- botón “Volver al inicio”

Quiero una pantalla o sección de “Mis boletos” o “Mis tickets” donde el usuario pueda ver todos sus boletos comprados con:
- evento
- fecha
- ciudad
- recinto
- zona
- estado del ticket
- QR visual
- opción de ver detalle
- opción de descargar
- opción de reenviar al correo

También quiero una vista de detalle del ticket donde el QR sea el protagonista y se vea listo para ser escaneado al llegar al evento.

8. Recomendaciones visuales extra para que todo se vea más pro
Además de lo anterior, agrega mejoras de experiencia de usuario como:
- breadcrumbs o navegación más clara
- countdown o recordatorio visual para eventos próximos
- badges como “Últimos boletos”, “Agotado”, “Nuevo”, “Más vendido”
- secciones de eventos relacionados
- recomendaciones personalizadas
- ayuda o preguntas frecuentes en checkout
- pantalla de confirmación de compra elegante
- mensajes de confianza y soporte
- historial de compras visual
- detalle del pedido después de pagar
- diseño responsive premium para móvil y desktop

9. Preparación para backend real
Toda la interfaz debe quedar lista para integrarse con backend real.
No inventes endpoints innecesarios, pero sí deja estructura de componentes y datos clara.

Usa datos preparados para backend como:
- idEvento
- nombreEvento
- descripcion
- fechaEvento
- horaInicio
- horaFin
- ciudad
- pais
- direccion
- latitud
- longitud
- nombreRecinto
- nombreEscenario
- tipoRecinto
- precioDesde
- estadoEvento
- imagenEvento
- zonas
- metodosPago
- usuario
- correoVerificado
- ticket
- qrTicket
- factura
- numeroOrden
- numeroFactura
- totalPagado

10. Importante
- No cambies el navbar, footer ni la navegación general.
- No conviertas todo en algo genérico.
- Quiero que cada recinto tenga personalidad y distribución distinta.
- Quiero una experiencia visual mucho más realista, local e internacional al mismo tiempo.
- Quiero que checkout, autenticación, confirmación de compra, factura y ticket QR transmitan confianza, seguridad y profesionalismo.
- Mantén React + Vite.
- Deja los componentes limpios, reutilizables y listos para integración futura con API REST.
- Sugiere mejoras visuales adicionales que eleven la experiencia del usuario sin romper la estructura actual.
- Quiero que el resultado final se sienta como una plataforma real de venta de boletos lista para producción visual, con enfoque en confianza, claridad, personalización por recinto y experiencia de usuario premium. No quiero ejemplos visuales genéricos; quiero una experiencia creíble, elegante y cercana a una plataforma real de boletos, desde la selección de zona hasta la factura y el ingreso con QR al evento.