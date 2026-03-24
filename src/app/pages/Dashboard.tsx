import { Link } from 'react-router';
import { Ticket, History, User, CreditCard, ChevronRight, Settings } from 'lucide-react';
import { MOCK_EVENTS } from '../data/mockData';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

export function Dashboard() {
  const event = MOCK_EVENTS[0];
  const eventDate = parseISO(`${event.date}T${event.time}`);

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-7xl">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">Mi Panel</h1>
          <p className="text-zinc-400 mt-2">Bienvenido de vuelta, Juan Pérez.</p>
        </div>
        <Link to="/admin" className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
          <Settings className="h-4 w-4" /> Ir al Panel de Admin
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Navigation */}
        <aside className="w-full lg:w-64 shrink-0">
          <nav className="space-y-2 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
            <Link to="/dashboard" className="flex items-center justify-between rounded-lg bg-indigo-500/10 px-3 py-2 text-sm font-medium text-indigo-400 transition-colors">
              <span className="flex items-center gap-3">
                <Ticket className="h-5 w-5" /> Mis Boletos
              </span>
              <ChevronRight className="h-4 w-4 opacity-50" />
            </Link>
            <Link to="/dashboard" className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors">
              <span className="flex items-center gap-3">
                <History className="h-5 w-5" /> Historial de Órdenes
              </span>
            </Link>
            <Link to="/dashboard" className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors">
              <span className="flex items-center gap-3">
                <CreditCard className="h-5 w-5" /> Métodos de Pago
              </span>
            </Link>
            <Link to="/dashboard" className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors">
              <span className="flex items-center gap-3">
                <User className="h-5 w-5" /> Mi Perfil
              </span>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 space-y-8">
          <section>
            <h2 className="mb-6 text-xl font-bold text-white">Mis Boletos Activos</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Ticket Card Component */}
              <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-xl transition-all hover:border-indigo-500/50">
                <div className="absolute inset-x-0 -top-2 flex justify-center">
                  <div className="h-4 w-24 rounded-full bg-zinc-950/50 blur-md"></div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-block rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
                      Confirmado
                    </span>
                    <span className="text-xs text-zinc-500 font-mono">ID: TIX-9A3K4F</span>
                  </div>
                  
                  <div className="mb-6 flex gap-4">
                    <img src={event.imageUrl} alt={event.name} className="h-16 w-16 rounded-lg object-cover" />
                    <div>
                      <h3 className="font-bold text-lg text-white line-clamp-1">{event.name}</h3>
                      <p className="text-sm text-zinc-400 capitalize">{format(eventDate, "EEEE d 'de' MMMM", { locale: es })}</p>
                      <p className="text-sm text-zinc-400">{event.venue}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 rounded-xl bg-zinc-950 p-4 border border-zinc-800">
                    <div>
                      <span className="block text-xs uppercase text-zinc-500 mb-1">Zona</span>
                      <span className="font-semibold text-white">VIP Platinum</span>
                    </div>
                    <div>
                      <span className="block text-xs uppercase text-zinc-500 mb-1">Cantidad</span>
                      <span className="font-semibold text-white">2 Boletos</span>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-dashed border-zinc-800 bg-zinc-900 p-4 text-center">
                  <Link to={`/events/${event.id}`}>
                    <span className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors">Ver Detalles del Evento</span>
                  </Link>
                </div>

                {/* Ticket cutouts */}
                <div className="absolute left-0 top-3/4 -ml-2 h-4 w-4 rounded-full bg-zinc-950"></div>
                <div className="absolute right-0 top-3/4 -mr-2 h-4 w-4 rounded-full bg-zinc-950"></div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-6 text-xl font-bold text-white">Historial de Órdenes Recientes</h2>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden">
              <table className="w-full text-left text-sm text-zinc-400">
                <thead className="bg-zinc-800/50 text-xs uppercase text-zinc-300">
                  <tr>
                    <th className="px-6 py-4">Orden</th>
                    <th className="px-6 py-4">Evento</th>
                    <th className="px-6 py-4">Fecha Compra</th>
                    <th className="px-6 py-4">Total</th>
                    <th className="px-6 py-4">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-zinc-800/50 hover:bg-zinc-800/30">
                    <td className="px-6 py-4 font-mono text-zinc-300">ORD-9824</td>
                    <td className="px-6 py-4">{event.name}</td>
                    <td className="px-6 py-4">12 Oct 2025</td>
                    <td className="px-6 py-4">$7,700.00</td>
                    <td className="px-6 py-4">
                      <span className="inline-block rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs text-emerald-400">Pagado</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-zinc-800/30">
                    <td className="px-6 py-4 font-mono text-zinc-300">ORD-5112</td>
                    <td className="px-6 py-4">Global Pop Summit</td>
                    <td className="px-6 py-4">05 Sep 2025</td>
                    <td className="px-6 py-4">$3,200.00</td>
                    <td className="px-6 py-4">
                      <span className="inline-block rounded-full bg-zinc-500/10 px-2 py-0.5 text-xs text-zinc-400">Usado</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
