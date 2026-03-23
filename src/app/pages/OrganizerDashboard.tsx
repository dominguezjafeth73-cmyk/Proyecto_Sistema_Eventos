import React from 'react';
import { Users, Ticket, MapPin, DollarSign, CalendarDays } from 'lucide-react';
import { Link } from 'react-router';

export function OrganizerDashboard() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Mi Dashboard</h2>
        <Link to="/organizer/create" className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
          <CalendarDays className="w-4 h-4" />
          Crear Nuevo Evento
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Eventos Activos</p>
            <h3 className="text-2xl font-bold text-gray-900">3</h3>
          </div>
          <div className="p-2.5 rounded-lg bg-blue-50 text-blue-600">
            <CalendarDays className="w-5 h-5" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Boletos Vendidos</p>
            <h3 className="text-2xl font-bold text-gray-900">1,248</h3>
          </div>
          <div className="p-2.5 rounded-lg bg-green-50 text-green-600">
            <Ticket className="w-5 h-5" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Ingresos Estimados</p>
            <h3 className="text-2xl font-bold text-gray-900">L. 345,600</h3>
          </div>
          <div className="p-2.5 rounded-lg bg-yellow-50 text-yellow-600">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Asistentes Esperados</p>
            <h3 className="text-2xl font-bold text-gray-900">2,500</h3>
          </div>
          <div className="p-2.5 rounded-lg bg-purple-50 text-purple-600">
            <Users className="w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <h3 className="font-semibold text-gray-800">Mis Próximos Eventos</h3>
        </div>
        <div className="p-6">
          <p className="text-sm text-gray-500">Tus eventos recientes aparecerán aquí. Crea un evento para empezar.</p>
        </div>
      </div>
    </div>
  );
}
