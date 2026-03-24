import { Link } from 'react-router';
import { ArrowRight, Music, Disc3, Mic2, Heart, Search } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { MOCK_EVENTS } from '../data/mockData';
import { EventCard } from '../components/EventCard';

export function Home() {
  const featuredEvent = MOCK_EVENTS[0];
  const upcomingEvents = MOCK_EVENTS.slice(1, 4);

  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="relative flex h-[80vh] min-h-[600px] w-full items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={featuredEvent.imageUrl} 
            alt="Hero Background" 
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-sm font-medium text-indigo-300 backdrop-blur-md">
              <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-indigo-500"></span>
              Evento Destacado
            </div>
            <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-white sm:text-7xl lg:text-8xl">
              {featuredEvent.name}
            </h1>
            <p className="mb-8 max-w-xl text-lg text-zinc-300 sm:text-xl">
              {featuredEvent.description}
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link to={`/events/${featuredEvent.id}`}>
                <Button size="lg" className="w-full sm:w-auto">
                  Comprar Boletos
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/events">
                <Button variant="outline" size="lg" className="w-full sm:w-auto bg-zinc-950/50 backdrop-blur-md">
                  Ver Todos los Eventos
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Search Bar Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-28 relative z-20">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-4 shadow-2xl backdrop-blur-xl sm:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="flex-1">
              <Input 
                icon={<Search className="h-5 w-5" />}
                placeholder="Busca por artista, evento o recinto..."
                className="h-14 border-zinc-700 bg-zinc-800/50 text-base"
              />
            </div>
            <div className="flex gap-4">
              <Input type="date" className="h-14 border-zinc-700 bg-zinc-800/50 text-zinc-400" />
              <Button size="lg" className="h-14 px-8">Buscar</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-white">Explorar por Categorías</h2>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-8">
          {[
            { name: 'Conciertos', icon: <Mic2 className="h-8 w-8" />, color: 'bg-blue-500/10 text-blue-500 border-blue-500/20 hover:border-blue-500' },
            { name: 'Festivales', icon: <Music className="h-8 w-8" />, color: 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20 hover:border-indigo-500' },
            { name: 'Electrónica', icon: <Disc3 className="h-8 w-8" />, color: 'bg-purple-500/10 text-purple-500 border-purple-500/20 hover:border-purple-500' },
            { name: 'Favoritos', icon: <Heart className="h-8 w-8" />, color: 'bg-pink-500/10 text-pink-500 border-pink-500/20 hover:border-pink-500' },
          ].map((cat) => (
            <Link 
              key={cat.name} 
              to="/events"
              className={`flex flex-col items-center justify-center gap-4 rounded-2xl border p-8 transition-all hover:-translate-y-1 hover:shadow-lg ${cat.color}`}
            >
              {cat.icon}
              <span className="font-semibold">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white">Próximos Eventos</h2>
            <p className="mt-2 text-zinc-400">Asegura tu lugar en los mejores espectáculos</p>
          </div>
          <Link to="/events" className="hidden text-sm font-semibold text-indigo-400 hover:text-indigo-300 sm:flex items-center gap-1">
            Ver todos <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {upcomingEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
        <div className="mt-8 sm:hidden">
          <Link to="/events">
            <Button variant="outline" className="w-full">Ver todos los eventos</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
