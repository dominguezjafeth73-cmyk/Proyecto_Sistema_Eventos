import { useState } from 'react';
import { Filter, SlidersHorizontal, Search } from 'lucide-react';
import { MOCK_EVENTS } from '../data/mockData';
import { EventCard } from '../components/EventCard';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

export function Events() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredEvents = MOCK_EVENTS.filter(e => 
    e.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    e.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Descubrir Eventos</h1>
        <p className="mt-4 text-lg text-zinc-400">Encuentra los mejores conciertos, festivales y obras cerca de ti.</p>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 shrink-0">
          <div className="sticky top-24 space-y-8 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
            <div className="flex items-center gap-2 text-lg font-semibold text-white border-b border-zinc-800 pb-4">
              <Filter className="h-5 w-5" /> Filtros
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium text-zinc-300">Categoría</h3>
              <div className="space-y-2">
                {['Todos', 'Conciertos', 'Festivales', 'Electrónica', 'Rock', 'Pop'].map((cat) => (
                  <label key={cat} className="flex items-center gap-3">
                    <input type="checkbox" className="h-4 w-4 rounded border-zinc-700 bg-zinc-900 text-indigo-600 focus:ring-indigo-600 focus:ring-offset-zinc-900" defaultChecked={cat === 'Todos'} />
                    <span className="text-sm text-zinc-400">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium text-zinc-300">Ciudad</h3>
              <div className="space-y-2">
                {['Todas', 'Ciudad de México', 'Monterrey', 'Guadalajara'].map((city) => (
                  <label key={city} className="flex items-center gap-3">
                    <input type="checkbox" className="h-4 w-4 rounded border-zinc-700 bg-zinc-900 text-indigo-600 focus:ring-indigo-600 focus:ring-offset-zinc-900" defaultChecked={city === 'Todas'} />
                    <span className="text-sm text-zinc-400">{city}</span>
                  </label>
                ))}
              </div>
            </div>

            <Button className="w-full gap-2">
              <SlidersHorizontal className="h-4 w-4" /> Aplicar Filtros
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Top Search & Sorting */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-md">
              <Input 
                icon={<Search className="h-4 w-4" />}
                placeholder="Buscar eventos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-zinc-400">Ordenar por:</span>
              <select className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500">
                <option>Más recientes</option>
                <option>Próximos a suceder</option>
                <option>Mayor precio</option>
                <option>Menor precio</option>
              </select>
            </div>
          </div>

          {/* Event Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
            
            {filteredEvents.length === 0 && (
              <div className="col-span-full py-20 text-center text-zinc-500">
                <Search className="mx-auto h-12 w-12 mb-4 opacity-20" />
                <p>No se encontraron eventos con esa búsqueda.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
