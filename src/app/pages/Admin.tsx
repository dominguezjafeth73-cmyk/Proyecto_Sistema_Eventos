import { useState } from 'react';
import { Calendar, MapPin, Plus, List, Layers, Users } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { MOCK_EVENTS, MOCK_ZONES } from '../data/mockData';

export function Admin() {
  const [activeTab, setActiveTab] = useState('events');

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-7xl">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">Panel Administrativo</h1>
          <p className="text-zinc-400 mt-2">Gestiona eventos, fechas y zonas de boletos.</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Crear Nuevo Evento
        </Button>
      </div>

      <div className="mb-8 flex gap-2 border-b border-zinc-800 pb-2 overflow-x-auto hide-scrollbar">
        {[
          { id: 'events', label: 'Eventos', icon: <List className="h-4 w-4" /> },
          { id: 'dates', label: 'Fechas', icon: <Calendar className="h-4 w-4" /> },
          { id: 'zones', label: 'Zonas', icon: <Layers className="h-4 w-4" /> },
          { id: 'orders', label: 'Órdenes', icon: <Users className="h-4 w-4" /> },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === tab.id 
                ? 'bg-zinc-800 text-white' 
                : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'events' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">Listado de Eventos</h2>
            <div className="w-64">
              <Input placeholder="Buscar evento..." className="h-9 text-sm" />
            </div>
          </div>
          
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden">
            <table className="w-full text-left text-sm text-zinc-400">
              <thead className="bg-zinc-800/50 text-xs uppercase text-zinc-300 border-b border-zinc-800">
                <tr>
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Nombre del Evento</th>
                  <th className="px-6 py-4">Categoría</th>
                  <th className="px-6 py-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                {MOCK_EVENTS.map(event => (
                  <tr key={event.id} className="hover:bg-zinc-800/30 transition-colors">
                    <td className="px-6 py-4 font-mono text-zinc-500">{event.id}</td>
                    <td className="px-6 py-4 font-medium text-zinc-300">{event.name}</td>
                    <td className="px-6 py-4">{event.category}</td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="sm" className="h-8 text-xs">Editar</Button>
                      <Button variant="ghost" size="sm" className="h-8 text-xs text-red-400 hover:text-red-300 hover:bg-red-400/10 ml-2">Eliminar</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'zones' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">Configuración de Zonas</h2>
            <Button variant="secondary" size="sm" className="gap-2">
              <Plus className="h-4 w-4" /> Añadir Zona
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_ZONES.map(zone => (
              <div key={zone.id} className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 flex flex-col">
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white">{zone.nombreZona}</h3>
                    <p className="text-sm text-zinc-400">{zone.eventId}</p>
                  </div>
                  <span className="rounded bg-zinc-800 px-2 py-0.5 text-xs text-zinc-300">
                    {zone.nombreTipoBoleto}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                  <div className="rounded bg-zinc-950 p-3 border border-zinc-800/50">
                    <span className="block text-xs text-zinc-500 mb-1">Precio</span>
                    <span className="font-semibold text-white">${zone.precio.toLocaleString()}</span>
                  </div>
                  <div className="rounded bg-zinc-950 p-3 border border-zinc-800/50">
                    <span className="block text-xs text-zinc-500 mb-1">Disponibles</span>
                    <span className="font-semibold text-white">{zone.disponibles} / {zone.cupoMaximo}</span>
                  </div>
                </div>

                <div className="mt-auto flex gap-2">
                  <Button variant="secondary" className="flex-1">Editar</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {(activeTab === 'dates' || activeTab === 'orders') && (
        <div className="flex flex-col items-center justify-center py-20 text-center rounded-xl border border-zinc-800 border-dashed bg-zinc-900/50">
          <Calendar className="mb-4 h-12 w-12 text-zinc-700" />
          <h3 className="text-lg font-medium text-white mb-2">Sección en Desarrollo</h3>
          <p className="text-zinc-500 max-w-sm">
            Esta sección estará conectada a los endpoints del backend ASP.NET Core próximamente.
          </p>
        </div>
      )}
    </div>
  );
}
