import { Calendar, MapPin } from 'lucide-react';
import { Link } from 'react-router';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { Event } from '../../data/mockData';

export function EventCard({ event }: { event: Event }) {
  const eventDate = parseISO(`${event.date}T${event.time}`);

  return (
    <Link 
      to={`/events/${event.id}`} 
      className="group flex flex-col overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800 transition-all hover:border-indigo-500/50 hover:shadow-[0_0_30px_-5px_rgba(79,70,229,0.15)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent z-10 opacity-80" />
        <img 
          src={event.imageUrl} 
          alt={event.name} 
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 z-20">
          <span className="inline-block rounded-full bg-indigo-600/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-white">
            {event.category}
          </span>
        </div>
      </div>
      
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center gap-2 text-sm text-indigo-400">
          <Calendar className="h-4 w-4" />
          <span className="font-medium capitalize">
            {format(eventDate, "EEEE d 'de' MMMM", { locale: es })} • {format(eventDate, 'HH:mm')} hrs
          </span>
        </div>
        
        <h3 className="mb-2 text-xl font-bold text-white line-clamp-1">{event.name}</h3>
        
        <div className="mt-auto flex items-center gap-2 text-sm text-zinc-400">
          <MapPin className="h-4 w-4 shrink-0" />
          <span className="line-clamp-1">{event.venue}, {event.city}, {event.country}</span>
        </div>
      </div>
    </Link>
  );
}
