Asunto: Solicitud de diseño detallado para la actualización de interfaces y flujos de usuario de la plataforma SaaS de Gestión de Eventos, alineada con la base de datos y lógica de negocio actualizadas.

Contexto del Proyecto:
Ya existe un backend en Django y un frontend en React con un avance significativo. El objetivo de esta solicitud no es un diseño completo desde cero, sino una guía técnica visual que detalle los cambios en la estructura de las páginas, el comportamiento de los componentes y la lógica de navegación para reflejar los nuevos requerimientos de negocio.

Requerimientos Generales:

Estilo Visual: Mantener la estética limpia y moderna de las imágenes originales, pero estructurando el contenido por secciones claras.

Alineación con BD: El diseño debe reflejar que los eventos ahora se gestionan por "Zonas con Capacidad" (VIP, General, etc.) y no por "Asientos Individuales Numerados".

SECCIÓN 1: Actualización de Header y Navegación (Header Unificado)
Contexto Visual: Basarse en las imágenes 7, 8 y 11.
Objetivo: Crear un Header unificado que sirva para todos los tipos de usuario y que integre el buscador de eventos.

Guía de Diseño para Header:

Estructura (de izquierda a derecha):

Logo de la plataforma (ej. "Sistema de Gestión de Eventos").

Barra de Búsqueda Integrada (NUEVO): Integrar el buscador (lupa y campo de texto "Palabra clave o lugar") que aparecía en la imagen 8 directamente en el Header, a la derecha del logo.

Enlaces de navegación de la App: "Inicio", "Eventos", "Soporte", etc.

Acceso General (NUEVO): Eliminar el enlace específico "Acceso Admin". Reemplazarlo por un botón genérico de "Iniciar Sesión" y un botón de "Registrarse". El botón de registro debe tener un dropdown que distinga: "Registro como Organizador" y "Registro como Asistente" (reflejando el flujo de la imagen 15, adaptado a los roles de la BD).

Comportamiento de Login Unificado:

Detallar el flujo: El usuario hace clic en "Iniciar Sesión" -> Aparece un formulario modal de login -> El usuario introduce sus credenciales -> Lógica de Backend/Django: La API verifica el rol del usuario -> Si el usuario es 'Administrador', el backend lo redirecciona al Dashboard (imagen 19); si es 'Organizador', lo redirecciona a su propia gestión de eventos (ver Sección 4); si es 'Asistente', permanece en la App.

SECCIÓN 2: Actualización de la Página de Inicio (Estructura por Secciones)
Contexto Visual: Basarse en las imágenes 11, 12, 13 y 14.
Objetivo: Organizar la página de inicio en secciones lógicas, dinámicas y con interactividad mejorada.

Estructura Detallada de la Página de Inicio:

Banner Hero: Mantener el diseño actual (verde azulado) con el título y subtítulo, pero asegurar que el buscador integrado del Header ya esté visible.

Sección 2.1: Categorías (NUEVO - Basado en Imagen 13):

Ubicación: Inmediatamente debajo del Banner Hero.

Diseño: Una cuadrícula de tarjetas (como en la imagen 13) que represente las categorías de eventos (Arte, Tecnología, etc.).

Interactividad: Implementar el efecto "sobresaltar" (efecto hover): Cuando el mouse pase por encima de una tarjeta, esta debe aumentar ligeramente su tamaño y quizás cambiar su color de fondo o borde para destacar, tal como se sugiere en la imagen de referencia.

Sección 2.2: Eventos Próximos (Actualización de Imagen 12):

Diseño: Mantener las tarjetas actuales (con imagen, título, fecha y ubicación en Honduras), pero modificar el precio.

Alineación con BD (IMPORTANTE): La tarjeta ya no debe mostrar "Desde L. XX.00" de manera genérica. Debe consultar la tabla boleto_config y zona del evento y mostrar: "Desde en Zona". El botón "Ver Asientos" debe cambiarse por "Ver Boletos" o "Seleccionar Zona".

Evento Gratuito: Mantener el diseño para eventos gratuitos como el "Festival de Arte".

Sección 2.3: Eventos de Hoy (NUEVO - Basado en Imagen 14):

Ubicación: Debajo de "Eventos Próximos".

Diseño: Una tabla simple y limpia (como en la imagen 14) que liste los eventos que están sucediendo el día actual, mostrando: Hora de inicio (TIME), Nombre del Evento y Categoría.

Sección 2.4: Footer (NUEVO - Basado en Imagen 16):

Ubicación: Al final de la página.

Contenido: Incluir el logo secundario (ej. "eventos.hn"), la descripción de la plataforma, la dirección física de las oficinas y los iconos de redes sociales (reflejando el diseño de la imagen 16).

SECCIÓN 3: Actualización del Dashboard del Administrador (Gestión de Usuarios)
Contexto Visual: Basarse en la imagen 19.
Objetivo: Mejorar la tabla de usuarios para facilitar la edición.

Guía de Diseño para Dashboard (Gestión de Usuarios):

Tabla de Usuarios: En la tabla que muestra el listado de usuarios (clientes), añadir una nueva columna:

Nombre de Columna: "ID de Usuario" o "ID".

Contenido: Mostrar el valor de id_usuario de la tabla usuario de la base de datos. Esto es esencial para que la API de Django sepa exactamente qué usuario está editando el administrador.

SECCIÓN 4: Dashboard del Organizador (NUEVA PÁGINA)
Contexto Visual: Basarse en la estructura de la imagen 20, adaptando el contenido.
Objetivo: Crear una interfaz dedicada para que el usuario con rol 'Organizador' (quien previamente pasó por el flujo de registro de la imagen 15) gestione sus eventos y la logística asociada.

Estructura y Funcionalidades del Dashboard del Organizador:

Menú de Navegación Lateral (Similar a Imagen 20):

"Mi Dashboard (Resumen)"

"Crear Nuevo Evento"

"Mis Eventos (Ver Lista)"

"Gestión de Recintos (Escenarios y Zonas)"

"Gestión de Artistas y Bandas"

Flujo de Creación de Evento Completo (Formulario Multifásico):

Fase 1: Datos Generales: Nombre del evento, descripción, categoría.

Fase 2: Talento: Integrar la lógica de "Artista/Banda":

Un selector para definir si el evento es "Musical" o "No Musical".

Si es Musical: Selector para añadir un "Solista" (ref. id_artista) o una "Banda" (ref. id_banda) a la cartelera del evento. Si es solista, mostrar los campos de la tabla artista; si es banda, mostrar los de la tabla banda y banda_integrante.

Fase 3: Logística y Fecha: Seleccionar un Escenario/Recinto existente. Definir la id_evento_fecha.

Fase 4: Configuración de Zonas y Precios (CRÍTICO):

En lugar de un selector de asientos individual, mostrar una cuadrícula de las Zonas disponibles para el escenario seleccionado.

Interactividad: El Organizador debe poder seleccionar una Zona (ej. VIP), y el diseño debe mostrar: Capacidad Total de la Zona (ref. capacidad_zona).

NUEVO CAMPO: Un campo de texto para "Asignar Precio a la Zona". Este valor se guardará en la tabla boleto_config.

Comportamiento de los Dashboards:

Organizador: Solo tiene acceso a crear y gestionar eventos, y a ver el resumen de ventas de sus propios eventos.

Administrador: Mantiene todos sus permisos actuales, incluyendo el Dashboard de Pagos (imagen 19) y la gestión global de usuarios (Sección 3).