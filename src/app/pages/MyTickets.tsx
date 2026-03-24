import { Ticket, QrCode, Calendar, MapPin, Download, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '../components/ui/Button';
import { MOCK_EVENTS } from '../data/mockData';

export function MyTickets() {
  const upcomingTickets = [
    {
      id: 'TKT-12345',
      event: MOCK_EVENTS[0], // Bad Bunny
      zone: 'Silla VIP',
      count: 2,
      purchaseDate: '2026-03-24',
      status: 'Válido'
    },
    {
      id: 'TKT-67890',
      event: MOCK_EVENTS[2], // Rey Leon
      zone: 'Platea Baja Centro',
      count: 1,
      purchaseDate: '2026-02-15',
      status: 'Válido'
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-950 pb-24 pt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <h1 className="text-4xl font-black text-white mb-2">Mis Boletos</h1>
        <p className="text-zinc-400 mb-10">Gestiona tus entradas, descárgalas o compártelas.</p>

        <div className="flex flex-col gap-6">
          {upcomingTickets.map((ticket) => (
            <div key={ticket.id} className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden flex flex-col sm:flex-row shadow-xl hover:border-indigo-500/50 transition-colors">
              <div className="w-full sm:w-48 h-48 sm:h-auto relative shrink-0">
                <img src={ticket.event.imageUrl} alt={ticket.event.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-zinc-900 to-transparent"></div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col justify-center">
                <div className="flex justify-between items-start mb-2">
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    {ticket.status}
                  </span>
                  <span className="text-zinc-500 text-sm font-mono">{ticket.id}</span>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2">{ticket.event.name}</h3>
                
                <div className="flex flex-wrap gap-4 text-sm text-zinc-400 mb-4">
                  <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {ticket.event.date}</div>
                  <div className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {ticket.event.venue}</div>
                  <div className="flex items-center gap-1"><Ticket className="w-4 h-4" /> {ticket.count}x {ticket.zone}</div>
                </div>

                <div className="flex flex-wrap gap-3 mt-auto">
                  <Link to={`/tickets/${ticket.id}`} state={{ ticket }}>
                    <Button className="bg-indigo-600 hover:bg-indigo-700 h-10 px-6">
                      <QrCode className="w-4 h-4 mr-2" /> Ver Código QR
                    </Button>
                  </Link>
                  <Button variant="outline" className="h-10 border-zinc-700">
                    <Download className="w-4 h-4 mr-2" /> PDF
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}