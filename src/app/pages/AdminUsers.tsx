import React from 'react';
import { Search, Edit, Trash2, UserPlus, Shield } from 'lucide-react';

const users = [
  { id_usuario: 'USR-28491', name: 'Jomin Vancelz', email: 'jomin@example.com', role: 'Cliente', date: '01/03/2026', status: 'Activo' },
  { id_usuario: 'USR-94827', name: 'Mantin Gransion', email: 'mantin@example.com', role: 'Organizador', date: '15/02/2026', status: 'Activo' },
  { id_usuario: 'USR-18374', name: 'James Braveit', email: 'james@example.com', role: 'Cliente', date: '10/01/2026', status: 'Inactivo' },
  { id_usuario: 'USR-00001', name: 'Jafeth Domínguez', email: 'admin@eventos.hn', role: 'Administrador', date: '01/01/2025', status: 'Activo' },
];

export function AdminUsers() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Gestión de Usuarios</h2>
        <button className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          <UserPlus className="w-4 h-4" />
          Nuevo Usuario
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="relative w-full sm:w-64">
            <input 
              type="text" 
              placeholder="Buscar por nombre, email o ID..." 
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-shadow"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <select className="border border-gray-200 text-sm text-gray-600 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20">
              <option value="">Todos los roles</option>
              <option value="admin">Administrador</option>
              <option value="organizer">Organizador</option>
              <option value="client">Cliente</option>
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-sm border-y border-gray-100">
              <tr>
                <th className="px-6 py-4 font-semibold">ID de Usuario</th>
                <th className="px-6 py-4 font-semibold">Nombre Completo</th>
                <th className="px-6 py-4 font-semibold">Correo Electrónico</th>
                <th className="px-6 py-4 font-semibold">Rol</th>
                <th className="px-6 py-4 font-semibold">Fecha Registro</th>
                <th className="px-6 py-4 font-semibold">Estado</th>
                <th className="px-6 py-4 font-semibold text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-500 font-mono font-medium">
                    <span className="bg-gray-100 px-2 py-1 rounded-md text-gray-600">{user.id_usuario}</span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{user.email}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border
                      ${user.role === 'Administrador' ? 'bg-purple-50 text-purple-700 border-purple-200' : 
                        user.role === 'Organizador' ? 'bg-blue-50 text-blue-700 border-blue-200' : 
                        'bg-gray-50 text-gray-700 border-gray-200'}
                    `}>
                      {user.role === 'Administrador' && <Shield className="w-3.5 h-3.5" />}
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{user.date}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium
                      ${user.status === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                    `}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="Editar">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Eliminar">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
