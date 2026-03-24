import { useLocation, useNavigate, useParams, Link } from 'react-router';
import { ArrowLeft, QrCode, Download, MapPin, Calendar, Clock, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function TicketDetail() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as any;

  if (!state || !state.ticket) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Ticket no encontrado</h2>
        <Button onClick={() => navigate('/tickets')} variant="outline">Volver a mis boletos</Button>
      </div>
    );
  }

  const { ticket } = state;
  const { event } = ticket;

  return (
    <div className="min-h-screen bg-zinc-950 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
        <Link to="/tickets" className="inline-flex items-center text-zinc-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Volver a mis boletos
        </Link>

        <div className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] overflow-hidden shadow-2xl relative">
          
          {/* Header Image */}
          <div className="h-48 w-full relative">
            <img src={event.imageUrl} alt={event.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent"></div>
          </div>

          <div className="p-8 text-center -mt-16 relative z-10">
            <div className="inline-block px-4 py-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-md">
              Ticket Válido
            </div>
            <h1 className="text-3xl font-black text-white mb-2">{event.name}</h1>
            <p className="text-zinc-400 font-medium mb-8">{event.category}</p>

            <div className="bg-white p-6 rounded-3xl inline-block mx-auto mb-8 shadow-xl">
              <QrCode className="w-48 h-48 text-black" />
            </div>

            <p className="text-sm text-zinc-500 font-mono tracking-[0.2em] mb-8">{ticket.id}</p>

            <div className="grid grid-cols-2 gap-y-6 gap-x-4 text-left bg-zinc-950/50 p-6 rounded-2xl border border-zinc-800/50 mb-8">
              <div>
                <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Fecha y Hora</p>
                <p className="font-semibold text-white">{event.date} • {event.time}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Recinto</p>
                <p className="font-semibold text-white">{event.venue}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Zona</p>
                <p className="font-semibold text-indigo-400">{ticket.zone}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Boletos</p>
                <p className="font-semibold text-white">{ticket.count}</p>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <Button className="bg-indigo-600 hover:bg-indigo-700 w-full sm:w-auto">
                Agregar a Wallet
              </Button>
              <Button variant="outline" className="w-full sm:w-auto">
                <Download className="w-4 h-4 mr-2" /> PDF
              </Button>
            </div>

          </div>

          {/* Notch cuts */}
          <div className="absolute top-[280px] -left-6 w-12 h-12 bg-zinc-950 rounded-full"></div>
          <div className="absolute top-[280px] -right-6 w-12 h-12 bg-zinc-950 rounded-full"></div>
          <div className="absolute top-[304px] left-6 right-6 border-b-2 border-zinc-800 border-dashed"></div>

        </div>
      </div>
    </div>
  );
}