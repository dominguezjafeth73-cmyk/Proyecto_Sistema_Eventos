import { useState, useEffect } from 'react';
import { MapPin, Navigation, AlertCircle, Loader2, Info, Map as MapIcon } from 'lucide-react';
import { Button } from './ui/Button';

// Estructura de datos preparada para el backend
export interface BackendEventLocation {
  idEvento: string;
  nombreEvento: string;
  direccion: string;
  latitud: number;
  longitud: number;
  nombreRecinto: string;
  nombreEscenario: string;
  zonas: Array<{
    idZona: string;
    nombreZona: string;
    precio: number;
    capacidad: number;
    cuposDisponibles: number;
    estado: 'Disponible' | 'Pocos boletos' | 'Agotado';
  }>;
}

interface EventLocationProps {
  eventId: string;
}

export function EventLocation({ eventId }: EventLocationProps) {
  const [data, setData] = useState<BackendEventLocation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulando llamada al backend
    let isMounted = true;
    
    const fetchLocationData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Simular tiempo de red
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Simular posible error aleatorio (descomentar para probar)
        // if (Math.random() > 0.8) throw new Error("Error de red");

        // Datos mock simulando respuesta del backend ASP.NET Core
        if (isMounted) {
          setData({
            idEvento: eventId,
            nombreEvento: "Evento Destacado",
            direccion: "Av. Viaducto Rio de la Piedad y Rio Churubusco S/N, Granjas México, 08400 Ciudad de México, CDMX",
            latitud: 19.4055,
            longitud: -99.0945,
            nombreRecinto: "Palacio de los Deportes",
            nombreEscenario: "Escenario Principal 360",
            zonas: [
              { idZona: "z1", nombreZona: "VIP Platinum", precio: 3500, capacidad: 500, cuposDisponibles: 40, estado: 'Pocos boletos' },
              { idZona: "z2", nombreZona: "General A", precio: 1500, capacidad: 2000, cuposDisponibles: 1500, estado: 'Disponible' },
              { idZona: "z3", nombreZona: "Gradas Sur", precio: 800, capacidad: 3000, cuposDisponibles: 0, estado: 'Agotado' }
            ]
          });
          setIsLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError("No se pudo cargar la información de ubicación y zonas del evento.");
          setIsLoading(false);
        }
      }
    };

    fetchLocationData();

    return () => {
      isMounted = false;
    };
  }, [eventId]);

  if (isLoading) {
    return (
      <div className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/30 p-8">
        <div className="flex flex-col items-center justify-center py-12 text-zinc-500">
          <Loader2 className="h-10 w-10 animate-spin mb-4 text-indigo-500" />
          <p>Cargando ubicación del evento...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full rounded-2xl border border-red-500/20 bg-red-500/10 p-8 text-center">
        <AlertCircle className="mx-auto h-12 w-12 text-red-400 mb-4" />
        <h3 className="text-lg font-bold text-white mb-2">Ups, algo salió mal</h3>
        <p className="text-zinc-400 mb-6">{error}</p>
        <Button onClick={() => window.location.reload()} variant="outline">
          Reintentar
        </Button>
      </div>
    );
  }

  if (!data || data.zonas.length === 0) {
    return (
      <div className="w-full rounded-2xl border border-zinc-800 border-dashed bg-zinc-900/30 p-8 text-center">
        <MapIcon className="mx-auto h-12 w-12 text-zinc-600 mb-4" />
        <h3 className="text-lg font-bold text-white mb-2">Información no disponible</h3>
        <p className="text-zinc-500">Aún no se ha configurado la ubicación o el mapa de zonas para este evento.</p>
      </div>
    );
  }

  return (
    <section className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 p-6 lg:p-8 shadow-xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <MapPin className="h-6 w-6 text-indigo-400" />
            Ubicación y Distribución
          </h2>
          <p className="mt-1 text-sm text-zinc-400">Conoce el recinto y las zonas disponibles para tu evento.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Lado Izquierdo: Mapa de Google y Ubicación */}
        <div className="flex flex-col gap-6">
          <div className="relative h-[300px] sm:h-[400px] w-full overflow-hidden rounded-xl border border-zinc-800 bg-zinc-800">
            {/* Mapa embebido de Google (sin API key requerida para visualización básica) */}
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src={`https://maps.google.com/maps?q=${data.latitud},${data.longitud}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              title="Mapa de ubicación del evento"
            ></iframe>
            
            <div className="absolute bottom-4 right-4">
              <a 
                href={`https://www.google.com/maps/dir/?api=1&destination=${data.latitud},${data.longitud}`} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button size="sm" className="shadow-lg gap-2 bg-indigo-600 hover:bg-indigo-700">
                  <Navigation className="h-4 w-4" /> Cómo llegar
                </Button>
              </a>
            </div>
          </div>

          <div className="rounded-xl bg-zinc-950 p-5 border border-zinc-800/80">
            <h3 className="text-lg font-bold text-white">{data.nombreRecinto}</h3>
            <p className="text-sm font-medium text-indigo-400 mb-2">{data.nombreEscenario}</p>
            <p className="text-sm text-zinc-400 flex items-start gap-2">
              <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
              {data.direccion}
            </p>
          </div>
        </div>

        {/* Lado Derecho: Listado de Zonas y Leyenda */}
        <div className="flex flex-col">
          <h3 className="text-lg font-bold text-white mb-4">Mapa de Zonas</h3>
          
          <div className="mb-6 flex flex-wrap gap-4 rounded-lg bg-zinc-950/50 p-3 text-xs text-zinc-400">
            <div className="flex items-center gap-1.5">
              <span className="block h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
              <span>Disponible</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="block h-2.5 w-2.5 rounded-full bg-amber-500"></span>
              <span>Pocos boletos</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="block h-2.5 w-2.5 rounded-full bg-red-500"></span>
              <span>Agotado</span>
            </div>
          </div>

          <div className="flex flex-col gap-3 flex-1 overflow-y-auto pr-2 custom-scrollbar">
            {data.zonas.map((zona) => (
              <div 
                key={zona.idZona} 
                className={`relative overflow-hidden rounded-xl border p-4 transition-colors ${
                  zona.estado === 'Agotado' 
                    ? 'border-zinc-800 bg-zinc-900/50 opacity-60' 
                    : 'border-zinc-700 bg-zinc-800/40 hover:bg-zinc-800'
                }`}
              >
                {/* Indicador visual de estado */}
                <div className={`absolute left-0 top-0 h-full w-1 ${
                  zona.estado === 'Disponible' ? 'bg-emerald-500' :
                  zona.estado === 'Pocos boletos' ? 'bg-amber-500' : 'bg-red-500'
                }`}></div>

                <div className="flex items-start justify-between pl-2">
                  <div>
                    <h4 className="font-bold text-white text-base">{zona.nombreZona}</h4>
                    <p className="text-lg font-black text-indigo-400 mt-1">
                      ${zona.precio.toLocaleString('es-MX')} <span className="text-xs font-normal text-zinc-500">MXN</span>
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium border ${
                      zona.estado === 'Disponible' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                      zona.estado === 'Pocos boletos' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 
                      'bg-red-500/10 text-red-400 border-red-500/20'
                    }`}>
                      {zona.estado}
                    </span>
                    <p className="text-xs text-zinc-500 mt-2">
                      Capacidad: {zona.capacidad.toLocaleString()}
                    </p>
                  </div>
                </div>

                {zona.estado !== 'Agotado' && (
                  <div className="mt-3 pl-2">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-zinc-400">Disponibilidad</span>
                      <span className="font-medium text-zinc-300">{zona.cuposDisponibles} lugares</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-zinc-950 overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          zona.estado === 'Pocos boletos' ? 'bg-amber-500' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${(zona.cuposDisponibles / zona.capacidad) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-4 flex items-start gap-2 rounded-lg bg-indigo-500/10 p-3 text-xs text-indigo-300">
            <Info className="h-4 w-4 shrink-0 mt-0.5" />
            <p>Selecciona tu zona en la sección superior para continuar con el proceso de compra.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
