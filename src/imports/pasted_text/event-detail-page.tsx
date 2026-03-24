Quiero mejorar la pantalla de detalle del evento de mi plataforma de eventos, sin rehacer todo el frontend ni cambiar la estructura general actual.

La pantalla ya muestra información básica del evento, pero ahora necesito que se vea mucho más profesional, moderna y cercana a una plataforma real de ticketing, tipo Ticketmaster, aunque con un diseño más limpio, elegante y claro.

Objetivo general:
Quiero que la pantalla de detalle del evento incluya una sección completa de ubicación, recinto, escenario y distribución visual de zonas, preparada para conectarse a mi backend real.

Requisitos de diseño y estructura:
1. Mantén el navbar, footer y estructura general del frontend actual.
2. Mejora únicamente la pantalla de detalle del evento.
3. Usa React + Vite y deja la estructura lista para integración con API REST.
4. El diseño debe verse moderno, profesional, limpio y premium.
5. Usa una jerarquía visual clara, buen espaciado, tarjetas bien organizadas, botones visibles, íconos útiles y secciones bien separadas.
6. Haz el diseño completamente responsive para desktop, tablet y móvil.

Secciones que quiero agregar o mejorar dentro de la pantalla de detalle del evento:

1. Encabezado principal del evento
- Mostrar nombre del evento en grande.
- Mostrar fecha, hora, ciudad, recinto y escenario.
- Mostrar una imagen destacada o banner del evento.
- Mostrar un precio base o “precio desde”.
- Agregar botón principal de llamada a la acción, por ejemplo:
  - Comprar boletos
  - Ver zonas
  - Seleccionar zona

2. Resumen rápido del evento
Agregar una sección de tarjetas o bloques informativos con:
- fecha
- hora
- dirección
- ciudad
- recinto
- escenario
- precio desde
- estado del evento

3. Sección de ubicación con Google Maps
- Mantener o mejorar la sección actual de ubicación.
- Mostrar un mapa visual preparado para integración con Google Maps.
- Mostrar dirección completa del evento.
- Mostrar nombre del recinto.
- Mostrar nombre del escenario.
- Agregar botones como:
  - Ver ubicación
  - Cómo llegar
- Agregar estados visuales para:
  - carga
  - error
  - sin ubicación disponible

4. Mapa visual del recinto dividido por zonas
Quiero agregar una sección visual del recinto donde se vean las zonas de forma gráfica, no solo en lista.
Debe representar visualmente la distribución del recinto con áreas como por ejemplo:
- VIP
- Preferencial
- General
- Norte
- Sur
- Este
- Oeste
- o cualquier otra zona definida por el evento

Este mapa del recinto debe:
- verse moderno y profesional
- ser claro y entendible
- estar diseñado como bloques visuales o estructura tipo SVG
- quedar listo para luego ser interactivo
- permitir resaltar zonas por color
- tener un estilo similar al mapa de selección de zonas de una plataforma profesional de boletos

5. Leyenda visual de disponibilidad
Agregar una leyenda clara con colores para:
- Disponible
- Pocos boletos
- Agotado
- Seleccionado

6. Panel de detalle de zona
Cuando el usuario seleccione una zona del mapa del recinto, debe mostrarse un panel lateral o inferior con esta información:
- nombreZona
- nombreTipoBoleto
- precio
- cupoMaximo
- vendidos
- reservados
- disponibles
- estado
- descripción corta opcional de la zona

También agregar botón para:
- Seleccionar zona
- Continuar compra
- Ver disponibilidad

7. Sección de zonas en tarjetas
Además del mapa visual del recinto, quiero que las zonas también aparezcan en tarjetas o bloques informativos, para que el usuario pueda verlas también en formato listado.
Cada tarjeta debe incluir:
- nombre de la zona
- tipo de boleto
- precio
- capacidad
- disponibles
- estado
- botón de acción

8. Información útil del evento
Agregar una sección adicional con información útil como:
- apertura de puertas
- duración aproximada
- restricciones
- políticas de ingreso
- si hay reingreso o no
- recomendaciones para asistentes

9. Mejoras visuales de experiencia de usuario
Quiero que la pantalla se sienta más profesional con:
- tarjetas modernas
- sombras suaves
- esquinas redondeadas
- iconografía clara
- botones bien visibles
- buen contraste visual
- mejor separación entre mapa, información y zonas
- una composición más limpia y organizada
- diseño consistente en toda la pantalla

10. Preparación para backend real
Toda esta pantalla debe quedar lista para integrarse con datos reales del backend.
Usa una estructura de datos como esta:

idEvento
nombreEvento
descripcion
fechaEvento
horaInicio
horaFin
direccion
latitud
longitud
nombreRecinto
nombreEscenario
precioDesde
estadoEvento
imagenEvento
zonas: [
  {
    idZona,
    nombreZona,
    nombreTipoBoleto,
    precio,
    cupoMaximo,
    vendidos,
    reservados,
    disponibles,
    estado
  }
]

11. Reutilización
La solución debe quedar pensada para reutilizarse con distintos eventos, distintos recintos y distintas configuraciones de zonas.

12. Importante
- No cambies el resto del frontend.
- No inventes endpoints innecesarios.
- No alteres la navegación general.
- Solo mejora la pantalla de detalle del evento.
- Quiero una solución visual lista para alinearse después con mi backend real.
- Si es posible, diseña el mapa del recinto con una estructura visual tipo SVG o bloques por zonas para que luego pueda volverse interactivo en React.