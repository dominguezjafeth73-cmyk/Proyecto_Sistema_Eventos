Quiero que me generes el diseño completo de un frontend web moderno, profesional y responsive para una plataforma de eventos y venta de boletos tipo Ticketmaster, pensado para desarrollarse en React + Vite.

El sistema ya tiene backend en ASP.NET Core Web API con JWT y SQL Server, por lo que el diseño debe estar preparado para consumir endpoints reales. El flujo principal del sistema maneja eventos por fechas, zonas de boletos y compras por zona, no por asiento.

Objetivo del frontend

Crear una interfaz completa, limpia, moderna y lista para luego conectarse con backend. Quiero un diseño realista, profesional y usable, con componentes reutilizables y estructura clara.

Estilo visual
Diseño moderno y profesional
Tema oscuro elegante con acentos llamativos
Inspiración visual tipo plataformas de conciertos y eventos premium
Apariencia limpia, tecnológica y atractiva
Responsive para desktop y mobile
Componentes pensados para React
UX clara, botones visibles y tarjetas bien organizadas
Páginas que debe incluir
Landing Page / Inicio
navbar con logo, búsqueda, login y registro
hero section con evento destacado
buscador de eventos
secciones de eventos destacados, próximos eventos y categorías
cards de eventos con imagen, nombre, fecha, lugar y botón “Ver detalles”
footer moderno
Login
formulario de usuario y contraseña
botón iniciar sesión
opción recordar sesión
mensaje de error bonito
diseño compatible con JWT
Registro
formulario visual para registro de usuario
campos personales
estilo moderno y claro
Listado de eventos
grid de eventos
filtros por categoría, fecha, precio o ciudad
buscador superior
tarjetas reutilizables
Detalle del evento
banner principal del evento
imagen del evento
nombre, descripción, fecha, hora, recinto y escenario
sección de zonas disponibles
cada zona debe mostrarse como tarjeta o bloque visual con:
nombre de zona
precio
cupo máximo
vendidos
reservados
disponibles
selector de cantidad
botón reservar/comprar
diseño pensado para consumir disponibilidad desde backend
Pantalla de reserva / compra
resumen del evento
resumen de la zona seleccionada
cantidad de boletos
subtotal / total
botón reservar
luego botón confirmar compra
experiencia simple y clara
Dashboard de usuario
perfil básico del usuario
historial de órdenes
historial de reservas
boletos comprados
estado de compra
sección de próximos eventos comprados
Mis boletos
lista de boletos comprados
código del boleto
nombre del evento
zona
estado del boleto
diseño tipo ticket digital
preparado para QR o código más adelante
Panel administrativo básico
vista para administrar eventos
tabla de eventos
tabla de fechas de evento
tabla de zonas por evento
vista de órdenes y pagos
formulario visual para crear evento
formulario para crear fecha de evento
formulario para definir zonas y tipos de boleto
Datos del backend que debe considerar el diseño

El frontend debe estar preparado para consumir estas operaciones reales:

login con JWT
obtener disponibilidad por evento/fecha
reservar por zona
confirmar compra
ver órdenes
ver reservas
ver boletos

La lógica de compra funciona por zonas, por ejemplo:

VIP
GENERAL
NORTE
SUR

Cada zona tiene:

nombreZona
nombreTipoBoleto
precio
cupoMaximo
vendidos
reservados
disponibles
Componentes que quiero que genere
Navbar
Footer
Hero section
EventCard
EventGrid
SearchBar
FilterSidebar
ZoneCard
PurchaseSummary
LoginForm
RegisterForm
DashboardSidebar
TicketCard
AdminTables
AdminForms
Modal de confirmación de compra
Alertas visuales para éxito/error
Estructura UX importante
navegación clara
llamadas a la acción visibles
diseño modular
fácil de convertir a componentes React
que el detalle del evento y la compra por zonas sea una de las partes más fuertes del diseño
que todo se vea listo para convertirse en una SPA
Lo que NO quiero
diseño genérico o plano
tablas feas sin estilo
algo pensado para asientos individuales
algo solo decorativo sin flujo real
Lo que SÍ quiero
diseño de sistema completo
frontend visualmente fuerte
componentes claros y reutilizables
experiencia realista para venta de entradas por zonas
diseño listo para pasarlo luego a React + Vite

Genera una propuesta completa con todas las pantallas conectadas visualmente y con estilo consistente.