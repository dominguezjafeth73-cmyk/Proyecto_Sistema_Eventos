import { BackendZone } from '../pages/EventDetail';

interface VenueMapProps {
  venueType: 'estadio' | 'arena' | 'teatro' | 'abierto';
  zonas: BackendZone[];
  selectedZoneId: string | null;
  onSelectZone: (id: string) => void;
}

export function VenueMap({ venueType, zonas, selectedZoneId, onSelectZone }: VenueMapProps) {
  const sortedZonas = [...zonas].sort((a,b) => b.precio - a.precio);

  const getZoneColorClasses = (z: BackendZone, isSelected: boolean) => {
    if (z.estado === 'Agotado') {
      return 'bg-zinc-800/50 border-zinc-700 text-zinc-500 cursor-not-allowed';
    }
    if (isSelected) {
      return 'bg-indigo-600 border-indigo-400 text-white shadow-[0_0_25px_rgba(79,70,229,0.5)] z-20 font-bold scale-105';
    }
    if (z.estado === 'Pocos boletos') {
      return 'bg-amber-500/10 border-amber-500/40 text-amber-500 hover:bg-amber-500/20 hover:border-amber-400/80 hover:scale-[1.02] cursor-pointer font-semibold';
    }
    return 'bg-emerald-500/10 border-emerald-500/40 text-emerald-500 hover:bg-emerald-500/20 hover:border-emerald-400/80 hover:scale-[1.02] cursor-pointer font-semibold';
  };

  const renderEstadio = () => {
    return (
      <div className="relative aspect-square sm:aspect-[4/3] w-full max-w-2xl mx-auto rounded-3xl bg-[#0a0a0e] border border-zinc-800/80 p-8 flex flex-col items-center overflow-hidden shadow-2xl">
        {/* Cancha / Escenario */}
        <div className="w-1/2 h-20 bg-gradient-to-t from-zinc-900 to-indigo-900/30 border-2 border-indigo-500/50 rounded-lg flex items-center justify-center mb-8 relative z-10">
          <span className="text-indigo-400/80 font-bold tracking-[0.2em] text-[10px]">ESCENARIO PRINCIPAL</span>
        </div>
        
        {/* Zonas envolventes (Estadio U shape) */}
        <div className="flex-1 w-full max-w-md flex flex-col gap-3 relative z-0 items-center">
          {sortedZonas.map((z, i) => {
            const widthPct = 50 + (i * 15);
            return (
              <button
                key={z.idZona}
                disabled={z.estado === 'Agotado'}
                onClick={() => onSelectZone(z.idZona)}
                className={`h-14 sm:h-16 rounded-t-full border-t-[4px] border-x-[4px] flex items-center justify-center transition-all duration-300 text-xs sm:text-sm tracking-wide ${getZoneColorClasses(z, selectedZoneId === z.idZona)}`}
                style={{ width: `${Math.min(widthPct, 100)}%` }}
              >
                {z.nombreZona}
              </button>
            )
          })}
        </div>
      </div>
    );
  };

  const renderTeatro = () => {
    return (
      <div className="relative aspect-square sm:aspect-[4/3] w-full max-w-2xl mx-auto rounded-xl bg-gradient-to-b from-[#1a0b14] to-[#0a0a0e] border border-red-900/20 p-8 flex flex-col items-center shadow-2xl">
        {/* Escenario de teatro */}
        <div className="w-3/4 h-12 bg-red-950/40 border-b-4 border-red-600 rounded-b-2xl flex items-center justify-center mb-10 shadow-[0_10px_30px_rgba(220,38,38,0.2)]">
          <span className="text-red-400 font-bold tracking-[0.3em] text-[11px]">ESCENARIO</span>
        </div>
        
        {/* Butacas rectas y curvas leves */}
        <div className="flex-1 w-full max-w-md flex flex-col gap-4 items-center">
          {sortedZonas.map((z, i) => {
            return (
              <button
                key={z.idZona}
                disabled={z.estado === 'Agotado'}
                onClick={() => onSelectZone(z.idZona)}
                className={`h-16 sm:h-20 w-full rounded-2xl flex flex-col items-center justify-center transition-all duration-300 ${getZoneColorClasses(z, selectedZoneId === z.idZona)}`}
              >
                <span className="text-sm font-bold">{z.nombreZona}</span>
                <span className="text-[10px] opacity-70">Butacas numeradas</span>
              </button>
            )
          })}
        </div>
      </div>
    );
  };

  const renderAbierto = () => {
    return (
      <div className="relative aspect-square sm:aspect-[4/3] w-full max-w-2xl mx-auto rounded-full bg-[#0d1310] border border-emerald-900/30 p-12 flex flex-col items-center justify-start shadow-2xl overflow-hidden">
        {/* Escenario Festival */}
        <div className="w-2/3 h-16 bg-emerald-950/40 border-b-4 border-emerald-500 rounded-b-[40px] flex items-center justify-center mb-6 z-10">
          <span className="text-emerald-400 font-bold tracking-[0.2em] text-[10px]">MAINSTAGE</span>
        </div>
        
        {/* Zonas asimétricas o de festival */}
        <div className="flex flex-wrap justify-center gap-4 w-full h-full relative z-0">
          {sortedZonas.map((z, i) => {
            const isSelected = selectedZoneId === z.idZona;
            return (
              <button
                key={z.idZona}
                disabled={z.estado === 'Agotado'}
                onClick={() => onSelectZone(z.idZona)}
                className={`flex-1 min-w-[40%] h-24 rounded-3xl border-2 flex items-center justify-center transition-all duration-300 text-xs sm:text-sm text-center px-2 ${getZoneColorClasses(z, isSelected)}`}
              >
                {z.nombreZona}
              </button>
            )
          })}
        </div>
      </div>
    );
  };

  const renderArena = () => {
    return (
      <div className="relative aspect-square sm:aspect-[4/3] w-full max-w-2xl mx-auto rounded-3xl bg-[#0a0a0e] border border-zinc-800/80 p-8 flex items-center justify-center shadow-2xl">
        <div className="w-full h-full border-4 border-zinc-800 rounded-full flex items-center justify-center p-6">
           <div className="flex flex-col w-full h-full gap-2 items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-indigo-900/30 border-2 border-indigo-500 flex items-center justify-center mb-4 z-10 shadow-[0_0_30px_rgba(79,70,229,0.3)]">
                <span className="text-indigo-400 font-bold text-[8px] tracking-widest text-center">ESCENARIO<br/>360</span>
              </div>
              <div className="flex flex-wrap justify-center gap-2 w-full">
                {sortedZonas.map((z) => (
                  <button
                    key={z.idZona}
                    disabled={z.estado === 'Agotado'}
                    onClick={() => onSelectZone(z.idZona)}
                    className={`w-full sm:w-[48%] h-14 rounded-xl border-2 flex items-center justify-center transition-all duration-300 text-xs ${getZoneColorClasses(z, selectedZoneId === z.idZona)}`}
                  >
                    {z.nombreZona}
                  </button>
                ))}
              </div>
           </div>
        </div>
      </div>
    );
  };

  switch(venueType) {
    case 'estadio': return renderEstadio();
    case 'teatro': return renderTeatro();
    case 'abierto': return renderAbierto();
    case 'arena': return renderArena();
    default: return renderArena();
  }
}
