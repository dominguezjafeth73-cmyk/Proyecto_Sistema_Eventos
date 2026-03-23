import React from 'react';
import { DollarSign, Clock, Ticket, FileText, CheckCircle, AlertCircle, XCircle } from 'lucide-react';

const stats = [
  { label: 'Total Recaudado', value: 'L. 125,450.00', icon: DollarSign, color: 'text-green-500', bg: 'bg-green-100' },
  { label: 'Facturas por Cobrar', value: '12', icon: Clock, color: 'text-yellow-500', bg: 'bg-yellow-100' },
  { label: 'Boletos Vendidos', value: '154', icon: Ticket, color: 'text-blue-500', bg: 'bg-blue-100' },
];

const payments = [
  { id: '00001-001', client: 'Jomin Vancelz', date: '07/06/2026', method: 'Crédito', total: 'L 25,450.00', status: 'Pagado' },
  { id: '00002-002', client: 'Mantin Gransion', date: '07/25/2026', method: 'Efectivo', total: 'L 25,450.00', status: 'Pendiente' },
  { id: '00003-003', client: 'James Braveit', date: '07/06/2026', method: 'Crédito', total: 'L 15,450.00', status: 'Anulado' },
  { id: '00004-004', client: 'Mantin Gransion', date: '07/05/2026', method: 'Efectivo', total: 'L 25,450.00', status: 'Pendiente' },
  { id: '00005-002', client: 'Mentlin Pazsin', date: '07/05/2026', method: 'Efectivo', total: 'L 1,800.00', status: 'Pendiente' },
];

export function AdminDashboard() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard de Pagos</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-2">{stat.label}</p>
              <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
            </div>
            <div className={`p-3 rounded-lg ${stat.bg}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
          <h3 className="font-semibold text-gray-800">Historial de Pagos</h3>
          <button className="text-sm text-teal-600 hover:text-teal-700 font-medium">Exportar a CSV</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-sm">
              <tr>
                <th className="px-6 py-4 font-medium">ID Factura</th>
                <th className="px-6 py-4 font-medium">Cliente</th>
                <th className="px-6 py-4 font-medium">Fecha</th>
                <th className="px-6 py-4 font-medium">Método</th>
                <th className="px-6 py-4 font-medium">Total</th>
                <th className="px-6 py-4 font-medium">Estado</th>
                <th className="px-6 py-4 font-medium text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {payments.map((payment, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-600 font-mono">{payment.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{payment.client}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{payment.date}</td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center gap-1.5 text-gray-600">
                      <FileText className="w-4 h-4 text-blue-500" />
                      {payment.method}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{payment.total}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border
                      ${payment.status === 'Pagado' ? 'bg-green-50 text-green-700 border-green-200' : 
                        payment.status === 'Pendiente' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 
                        'bg-red-50 text-red-700 border-red-200'}
                    `}>
                      {payment.status === 'Pagado' && <CheckCircle className="w-3.5 h-3.5" />}
                      {payment.status === 'Pendiente' && <Clock className="w-3.5 h-3.5" />}
                      {payment.status === 'Anulado' && <XCircle className="w-3.5 h-3.5" />}
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-teal-600 hover:text-teal-800 text-sm font-medium">Ver Detalle</button>
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
