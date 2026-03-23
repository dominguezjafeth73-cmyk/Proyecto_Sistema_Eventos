import React from 'react';
import { useLocation } from 'react-router';
import { Wrench } from 'lucide-react';

export function PlaceholderPage() {
  const location = useLocation();
  
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-12rem)]">
      <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm text-center max-w-md w-full">
        <div className="bg-teal-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Wrench className="w-8 h-8 text-teal-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Página en Construcción</h2>
        <p className="text-gray-500">
          La vista para <code className="bg-gray-100 px-2 py-1 rounded text-teal-600 font-mono text-sm">{location.pathname}</code> aún no ha sido implementada en esta demostración.
        </p>
      </div>
    </div>
  );
}
