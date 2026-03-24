import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { 
  Calendar, MapPin, Clock, Tag, Navigation, Info, ShieldCheck, 
  Ticket, Map as MapIcon, Loader2, AlertCircle, ArrowRight, X, 
  Building, DollarSign, Activity, CheckCircle2, Users, Star, Music 
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { VenueMap } from '../components/VenueMap';
import { MOCK_EVENTS, MOCK_ZONES, Zone as OriginalZone, Event as OriginalEvent } from '../data/mockData';

// 10. Preparación para backend real
export interface BackendZone {
  idZona: string;
  nombreZona: string;
  nombreTipoBoleto: string;
  precio: number;
  cupoMaximo: number;
  vendidos: number;
  reservados: number;
  disponibles: number;
  estado: 'Disponible' | 'Pocos boletos' | 'Agotado';
  descripcion?: string;
}

export interface BackendEventDetail {
  idEvento: string;
  nombreEvento: string;
  descripcion: string;
  fechaEvento: string;
  horaInicio: string;
  horaFin: string;
  direccion: string;
  ciudad: string;
  pais: string;
  latitud: number;
  longitud: number;
  nombreRecinto: string;
  tipoRecinto: 'estadio' | 'arena' | 'teatro' | 'abierto';
  nombreEscenario: string;
  precioDesde: number;
  estadoEvento: 'Disponible' | 'Próximamente' | 'Agotado' | 'Cancelado';
  imagenEvento: string;
  zonas: BackendZone[];
}

export function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState<BackendEventDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [selectedZoneId, setSelectedZoneId] = useState<string | null>(null);
  const [ticketCount, setTicketCount] = useState<number>(1);

  // Mapeo inicial (Simulación de Fetch al Backend)
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    setTimeout(() => {
      if (!isMounted) return;

      const baseEvent = MOCK_EVENTS.find(e => e.id === id);
      const baseZones = MOCK_ZONES.filter(z => z.eventId === id);

      if (!baseEvent) {
        setError("No se encontró el evento.");
        setIsLoading(false);
        return;
      }

      const mappedData: BackendEventDetail = {
        idEvento: baseEvent.id,
        nombreEvento: baseEvent.name,
        descripcion: baseEvent.description,
        fechaEvento: baseEvent.date,
        horaInicio: baseEvent.time,
        horaFin: '23:30', // Simulando dato adicional
        direccion: baseEvent.address,
        ciudad: baseEvent.city,
        pais: baseEvent.country,
        latitud: baseEvent.latitude,
        longitud: baseEvent.longitude,
        nombreRecinto: baseEvent.venue,
        tipoRecinto: baseEvent.venueType,
        nombreEscenario: baseEvent.stageName,
        precioDesde: baseZones.length > 0 ? Math.min(...baseZones.map(z => z.precio)) : 0,
        estadoEvento: 'Disponible',
        imagenEvento: baseEvent.imageUrl,
        zonas: baseZones.map(z => {
          let estado: BackendZone['estado'] = 'Disponible';
          if (z.disponibles === 0) estado = 'Agotado';
          else if (z.disponibles < (z.cupoMaximo * 0.15) || z.disponibles < 100) estado = 'Pocos boletos';

          return {
            idZona: z.id,
            nombreZona: z.nombreZona,
            nombreTipoBoleto: z.nombreTipoBoleto || 'Admisión General',
            precio: z.precio,
            cupoMaximo: z.cupoMaximo,
            vendidos: z.vendidos,
            reservados: z.reservados,
            disponibles: z.disponibles,
            estado,
            descripcion: `Acceso asegurado a la zona ${z.nombreZona}. Disfruta de una vista privilegiada y excelentes comodidades. Las puertas abren 2 horas antes.`
          };
        })
      };

      setData(mappedData);
      setIsLoading(false);
    }, 800);

    return () => { isMounted = false; };
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center bg-zinc-950 text-zinc-400">
        <Loader2 className="h-12 w-12 animate-spin mb-4 text-indigo-500" />
        <p className="text-lg">Cargando detalles del evento...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center bg-zinc-950 text-center px-4">
        <AlertCircle className="h-16 w-16 text-red-500 mb-6" />
        <h2 className="text-3xl font-bold text-white mb-2">Evento no disponible</h2>
        <p className="text-zinc-400 mb-8">{error || "La información de este evento no se pudo cargar."}</p>
        <Button onClick={() => navigate('/events')} size="lg">Explorar Cartelera</Button>
      </div>
    );
  }

  const selectedZone = data.zonas.find(z => z.idZona === selectedZoneId) || null;
  const eventDate = parseISO(`${data.fechaEvento}T${data.horaInicio}`);

  // Acción para integrar con el checkout actual
  const handleReservation = () => {
    if (selectedZone) {
      const originalZone: OriginalZone = MOCK_ZONES.find(z => z.id === selectedZone.idZona)!;
      const originalEvent: OriginalEvent = MOCK_EVENTS.find(e => e.id === data.idEvento)!;
      
      navigate(`/checkout/${data.idEvento}`, { 
        state: { zone: originalZone, count: ticketCount, event: originalEvent }
      });
    }
  };

  const handleQuickPurchase = () => {
    if (selectedZone) {
      handleReservation();
      return;
    }
    
    // Auto-select cheapest available zone and redirect
    const availableZones = data.zonas.filter(z => z.estado !== 'Agotado');
    if (availableZones.length > 0) {
      const cheapest = [...availableZones].sort((a,b) => a.precio - b.precio)[0];
      const originalZone = MOCK_ZONES.find(z => z.id === cheapest.idZona)!;
      const originalEvent = MOCK_EVENTS.find(e => e.id === data.idEvento)!;
      
      navigate(`/checkout/${data.idEvento}`, { 
        state: { zone: originalZone, count: 1, event: originalEvent }
      });
    } else {
      document.getElementById('zonas-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 pb-24 font-sans selection:bg-indigo-500/30">
      
      {/* 1. Encabezado principal del evento */}
      <div className="relative h-[550px] w-full lg:h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={data.imagenEvento} 
            alt={data.nombreEvento} 
            className="h-full w-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-zinc-950/30" />
          <div className="absolute inset-0 bg-indigo-900/10 mix-blend-overlay" />
        </div>
        
        <div className="absolute bottom-16 lg:bottom-20 left-0 w-full px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-7xl">
            <span className="mb-6 flex items-center gap-2 w-max rounded-full bg-indigo-600/20 border border-indigo-500/50 px-4 py-1.5 text-sm font-semibold tracking-wide text-indigo-300 backdrop-blur-md">
              <Activity className="w-4 h-4" />
              {data.estadoEvento}
            </span>
            <h1 className="mb-4 text-5xl font-black tracking-tighter text-white md:text-7xl lg:text-8xl drop-shadow-2xl">
              {data.nombreEvento}
            </h1>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-sm font-medium text-zinc-300 md:text-base mb-8">
              <div className="flex items-center gap-2 bg-zinc-900/40 rounded-full px-4 py-2 backdrop-blur-sm border border-zinc-800/50">
                <Calendar className="h-5 w-5 text-indigo-400" />
                <span className="capitalize">{format(eventDate, "EEEE d 'de' MMMM, yyyy", { locale: es })}</span>
              </div>
              <div className="flex items-center gap-2 bg-zinc-900/40 rounded-full px-4 py-2 backdrop-blur-sm border border-zinc-800/50">
                <MapPin className="h-5 w-5 text-indigo-400" />
                <span>{data.nombreRecinto}, {data.ciudad}, {data.pais}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <Button size="lg" className="h-14 px-8 text-lg font-bold shadow-[0_0_30px_-5px_rgba(79,70,229,0.5)] bg-indigo-600 hover:bg-indigo-700 hover:scale-105 transition-all" onClick={handleQuickPurchase}>
                Adquirir Boletos
              </Button>
              <div className="hidden sm:block">
                <p className="text-zinc-400 text-sm mb-0.5">Precio desde</p>
                <p className="text-2xl font-black text-white">${data.precioDesde.toLocaleString()} <span className="text-sm font-medium text-zinc-500">MXN</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* 2. Resumen rápido del evento */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 -mt-8 relative z-20 shadow-2xl">
          <div className="bg-zinc-900/90 backdrop-blur-md border border-zinc-800 rounded-2xl p-5 flex flex-col items-center justify-center text-center group hover:bg-zinc-800 transition-colors">
            <Calendar className="w-6 h-6 text-indigo-400 mb-3 group-hover:scale-110 transition-transform" />
            <span className="text-xs text-zinc-500 font-medium uppercase tracking-wider mb-1">Fecha</span>
            <span className="font-bold text-white text-sm capitalize">{format(eventDate, "d MMM, yyyy", { locale: es })}</span>
          </div>
          <div className="bg-zinc-900/90 backdrop-blur-md border border-zinc-800 rounded-2xl p-5 flex flex-col items-center justify-center text-center group hover:bg-zinc-800 transition-colors">
            <Clock className="w-6 h-6 text-indigo-400 mb-3 group-hover:scale-110 transition-transform" />
            <span className="text-xs text-zinc-500 font-medium uppercase tracking-wider mb-1">Hora de inicio</span>
            <span className="font-bold text-white text-sm">{data.horaInicio} hrs</span>
          </div>
          <div className="bg-zinc-900/90 backdrop-blur-md border border-zinc-800 rounded-2xl p-5 flex flex-col items-center justify-center text-center group hover:bg-zinc-800 transition-colors">
            <Building className="w-6 h-6 text-indigo-400 mb-3 group-hover:scale-110 transition-transform" />
            <span className="text-xs text-zinc-500 font-medium uppercase tracking-wider mb-1">Recinto</span>
            <span className="font-bold text-white text-sm truncate w-full">{data.nombreRecinto}</span>
          </div>
          <div className="bg-zinc-900/90 backdrop-blur-md border border-zinc-800 rounded-2xl p-5 flex flex-col items-center justify-center text-center group hover:bg-zinc-800 transition-colors">
            <Music className="w-6 h-6 text-indigo-400 mb-3 group-hover:scale-110 transition-transform" />
            <span className="text-xs text-zinc-500 font-medium uppercase tracking-wider mb-1">Escenario</span>
            <span className="font-bold text-white text-sm truncate w-full">{data.nombreEscenario}</span>
          </div>
        </div>

        <div className="mt-16 lg:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LADO IZQUIERDO: Detalles y Mapas */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-16">
            
            <section>
              <h2 className="text-3xl font-bold text-white mb-6">Acerca del evento</h2>
              <div className="prose prose-invert prose-lg text-zinc-400 leading-relaxed">
                <p>{data.descripcion}</p>
                <p>Prepárate para vivir una experiencia inolvidable. Las puertas se abrirán con anticipación para asegurar un ingreso ordenado y rápido. Disfruta de la mejor calidad de sonido y una producción visual de primer nivel.</p>
              </div>
            </section>

            {/* 4 & 5. Mapa visual del recinto dividido por zonas + Leyenda */}
            <section id="zonas-section" className="scroll-mt-32">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">Mapa del Recinto</h2>
                  <p className="text-zinc-400">Selecciona una zona visualmente o a través de la lista.</p>
                </div>
              </div>

              <div className="rounded-3xl border border-zinc-800 bg-zinc-900/30 p-4 sm:p-8 relative">
                <VenueMap 
                  venueType={data.tipoRecinto} 
                  zonas={data.zonas} 
                  selectedZoneId={selectedZoneId} 
                  onSelectZone={setSelectedZoneId} 
                />

                {/* 5. Leyenda visual */}
                <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mt-8 text-sm font-medium text-zinc-400 bg-zinc-950/50 py-4 px-6 rounded-xl border border-zinc-800/50">
                  <div className="flex items-center gap-2">
                    <div className="w-3.5 h-3.5 rounded-full bg-emerald-500/20 border border-emerald-500"></div> 
                    Disponible
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3.5 h-3.5 rounded-full bg-amber-500/20 border border-amber-500"></div> 
                    Pocos boletos
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3.5 h-3.5 rounded-full bg-zinc-800 border border-zinc-700"></div> 
                    Agotado
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3.5 h-3.5 rounded-full bg-indigo-600 shadow-[0_0_12px_rgba(79,70,229,0.6)]"></div> 
                    Seleccionado
                  </div>
                </div>
              </div>
            </section>

            {/* 3. Sección de ubicación con Google Maps */}
            <section>
              <h2 className="text-3xl font-bold text-white mb-6">Ubicación</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start bg-zinc-900/30 border border-zinc-800 rounded-3xl p-4 sm:p-6">
                <div className="relative h-[250px] sm:h-[300px] w-full overflow-hidden rounded-2xl border border-zinc-800">
                  <iframe
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    src={`https://maps.google.com/maps?q=${data.latitud},${data.longitud}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                    title="Mapa de ubicación del evento"
                  ></iframe>
                </div>
                
                <div className="flex flex-col justify-center py-4 px-2">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500/10 mb-4">
                    <MapPin className="h-6 w-6 text-indigo-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{data.nombreRecinto}</h3>
                  <p className="text-zinc-400 font-medium mb-4">{data.nombreEscenario}</p>
                  <p className="text-zinc-500 mb-8 leading-relaxed">{data.direccion}</p>
                  
                  <div className="flex gap-4">
                    <a 
                      href={`https://www.google.com/maps/dir/?api=1&destination=${data.latitud},${data.longitud}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full"
                    >
                      <Button variant="outline" className="w-full gap-2 text-zinc-300">
                        <Navigation className="h-4 w-4" /> Cómo llegar
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* 8. Información útil del evento */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">Información Útil</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-6 flex gap-4">
                  <Clock className="w-8 h-8 text-indigo-400 shrink-0" />
                  <div>
                    <h4 className="font-bold text-white mb-1">Horarios</h4>
                    <p className="text-zinc-400 text-sm leading-relaxed">Las puertas del recinto abrirán 2 horas antes del inicio del evento. El espectáculo tiene una duración aproximada de 2.5 horas.</p>
                  </div>
                </div>
                <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-6 flex gap-4">
                  <ShieldCheck className="w-8 h-8 text-emerald-400 shrink-0" />
                  <div>
                    <h4 className="font-bold text-white mb-1">Políticas de ingreso</h4>
                    <p className="text-zinc-400 text-sm leading-relaxed">No se permite el acceso con alimentos, bebidas, cámaras profesionales ni mochilas grandes. El reingreso al recinto no está permitido.</p>
                  </div>
                </div>
                <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-6 flex gap-4">
                  <Users className="w-8 h-8 text-amber-400 shrink-0" />
                  <div>
                    <h4 className="font-bold text-white mb-1">Restricciones</h4>
                    <p className="text-zinc-400 text-sm leading-relaxed">Evento apto para todas las edades. Menores de 12 años deben ingresar acompañados de un adulto responsable.</p>
                  </div>
                </div>
                <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-6 flex gap-4">
                  <Ticket className="w-8 h-8 text-blue-400 shrink-0" />
                  <div>
                    <h4 className="font-bold text-white mb-1">Boletos Digitales</h4>
                    <p className="text-zinc-400 text-sm leading-relaxed">Tus boletos estarán disponibles en tu cuenta inmediatamente después de la compra. Muestra el código QR desde tu celular para ingresar.</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* LADO DERECHO: Panel de Selección y Compra */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="sticky top-24 space-y-6">
              
              {/* 6. Panel de detalle de zona (si hay seleccionada) o 7. Tarjetas (si no hay) */}
              {selectedZone ? (
                <div className="bg-zinc-900 border border-indigo-500/30 rounded-3xl p-6 shadow-[0_0_50px_-12px_rgba(79,70,229,0.2)] relative overflow-hidden flex flex-col min-h-[500px] transition-all">
                  <div className="absolute -top-32 -right-32 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px]"></div>
                  
                  <div className="flex justify-between items-start mb-6 relative z-10">
                    <div>
                      <span className="inline-block px-3 py-1 bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-widest rounded-full mb-3 border border-indigo-500/20">
                        {selectedZone.nombreTipoBoleto}
                      </span>
                      <h3 className="text-3xl font-black text-white">{selectedZone.nombreZona}</h3>
                    </div>
                    <button 
                      onClick={() => {
                        setSelectedZoneId(null);
                        setTicketCount(1);
                      }} 
                      className="p-2.5 bg-zinc-950/50 hover:bg-zinc-800 rounded-full text-zinc-400 hover:text-white transition-colors border border-zinc-800"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="mb-8 relative z-10">
                    <p className="text-zinc-400 text-sm mb-1">Precio por boleto</p>
                    <div className="flex items-baseline">
                      <span className="text-5xl font-black text-white">${selectedZone.precio.toLocaleString()}</span>
                      <span className="text-zinc-500 text-lg font-medium ml-2">MXN</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-8 relative z-10">
                    <div className="bg-zinc-950/60 p-4 rounded-2xl border border-zinc-800/80">
                      <span className="text-zinc-500 text-xs font-medium uppercase tracking-wider block mb-2">Disponibilidad</span>
                      <div className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${
                          selectedZone.estado === 'Disponible' ? 'bg-emerald-500' :
                          selectedZone.estado === 'Pocos boletos' ? 'bg-amber-500' : 'bg-red-500'
                        }`}></span>
                        <span className="text-white font-semibold">{selectedZone.estado}</span>
                      </div>
                      <span className="text-zinc-400 text-xs block mt-2">{selectedZone.disponibles} lugares restantes</span>
                    </div>
                    <div className="bg-zinc-950/60 p-4 rounded-2xl border border-zinc-800/80">
                      <span className="text-zinc-500 text-xs font-medium uppercase tracking-wider block mb-2">Capacidad</span>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-zinc-400" />
                        <span className="text-white font-semibold">{selectedZone.cupoMaximo.toLocaleString()}</span>
                      </div>
                      <span className="text-zinc-400 text-xs block mt-2">Capacidad total</span>
                    </div>
                  </div>

                  <p className="text-zinc-400 text-sm mb-8 flex-1 leading-relaxed relative z-10">
                    {selectedZone.descripcion}
                  </p>

                  <div className="mt-auto border-t border-zinc-800/80 pt-6 relative z-10">
                    <div className="mb-6 flex items-center justify-between bg-zinc-950/50 p-3 rounded-2xl border border-zinc-800">
                      <span className="text-zinc-300 font-medium px-2">Boletos</span>
                      <div className="flex items-center gap-4 bg-zinc-900 rounded-xl p-1 border border-zinc-700">
                        <button 
                          onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                          className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800 text-white hover:bg-zinc-700 disabled:opacity-50 transition-colors"
                          disabled={ticketCount <= 1}
                        >
                          -
                        </button>
                        <span className="w-6 text-center text-xl font-bold text-white">{ticketCount}</span>
                        <button 
                          onClick={() => setTicketCount(Math.min(selectedZone.disponibles, 8, ticketCount + 1))}
                          className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800 text-white hover:bg-zinc-700 disabled:opacity-50 transition-colors"
                          disabled={ticketCount >= selectedZone.disponibles || ticketCount >= 8}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-between items-end mb-6">
                      <span className="text-zinc-400 font-medium">Total a pagar</span>
                      <span className="text-3xl font-black text-indigo-400">
                        ${(selectedZone.precio * ticketCount).toLocaleString()}
                      </span>
                    </div>

                    <Button 
                      size="lg" 
                      className="w-full text-lg h-14 font-bold bg-indigo-600 hover:bg-indigo-700 shadow-[0_0_20px_-5px_rgba(79,70,229,0.5)] transition-all"
                      onClick={handleReservation}
                    >
                      Continuar Compra <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                    <p className="text-center text-xs text-zinc-500 mt-4 flex items-center justify-center gap-1">
                      <Info className="h-3 w-3" /> Límite de 8 boletos por compra
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-xl">
                  <div className="mb-6 pb-6 border-b border-zinc-800">
                    <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                      <Ticket className="w-6 h-6 text-indigo-400" /> Zonas Disponibles
                    </h3>
                    <p className="text-zinc-400 text-sm mt-2">Selecciona la zona en la que deseas estar para ver el detalle y adquirir tus boletos.</p>
                  </div>

                  <div className="flex flex-col gap-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                    {data.zonas.map((zona) => {
                      const isAgotado = zona.estado === 'Agotado';
                      
                      return (
                        <div 
                          key={zona.idZona}
                          onClick={() => !isAgotado && setSelectedZoneId(zona.idZona)}
                          className={`relative overflow-hidden rounded-2xl border p-4 transition-all ${
                            isAgotado 
                              ? 'border-zinc-800 bg-zinc-950/50 opacity-60' 
                              : 'border-zinc-700/50 bg-zinc-800/30 hover:bg-zinc-800 hover:border-zinc-600 cursor-pointer group'
                          }`}
                        >
                          <div className={`absolute left-0 top-0 h-full w-1 ${
                            zona.estado === 'Disponible' ? 'bg-emerald-500' :
                            zona.estado === 'Pocos boletos' ? 'bg-amber-500' : 'bg-zinc-700'
                          }`}></div>

                          <div className="flex justify-between items-start pl-2">
                            <div>
                              <h4 className="font-bold text-white text-lg group-hover:text-indigo-300 transition-colors">{zona.nombreZona}</h4>
                              <p className="text-zinc-400 text-xs mb-2">{zona.nombreTipoBoleto}</p>
                              <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border ${
                                zona.estado === 'Disponible' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                zona.estado === 'Pocos boletos' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 
                                'bg-zinc-800 text-zinc-500 border-zinc-700'
                              }`}>
                                {zona.estado}
                              </span>
                            </div>
                            
                            <div className="text-right">
                              <p className="text-xl font-black text-white group-hover:scale-105 transition-transform">
                                ${zona.precio.toLocaleString()}
                              </p>
                              <p className="text-xs text-zinc-500 mt-1">MXN</p>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}