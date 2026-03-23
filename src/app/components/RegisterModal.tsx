import React, { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import axios from 'axios';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    p_nombre: '', s_nombre: '', p_apellido: '', s_apellido: '',
    correo: '', usuario: '',num_identidad: '', password: ''
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:8000/api/registro/', formData);
      alert("¡Usuario registrado con éxito!");
      onClose();
    } catch (error: any) {
      alert("Error al registrar: " + (error.response?.data?.message || "Intente de nuevo"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[110] px-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white">
          <h2 className="text-xl font-bold text-gray-800">Crear Cuenta de Usuario</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 grid grid-cols-2 gap-4">
          <input type="text" placeholder="Primer Nombre" required className="border p-2 rounded" 
            onChange={(e) => setFormData({...formData, p_nombre: e.target.value})} />
          <input type="text" placeholder="Segundo Nombre" className="border p-2 rounded" 
            onChange={(e) => setFormData({...formData, s_nombre: e.target.value})} />
          <input type="text" placeholder="Primer Apellido" required className="border p-2 rounded" 
            onChange={(e) => setFormData({...formData, p_apellido: e.target.value})} />
          <input type="text" placeholder="Segundo Apellido" className="border p-2 rounded" 
            onChange={(e) => setFormData({...formData, s_apellido: e.target.value})} />
          <input type="email" placeholder="Correo Electrónico" required className="col-span-2 border p-2 rounded" 
            onChange={(e) => setFormData({...formData, correo: e.target.value})} />
          <input type="text" placeholder="Nombre de Usuario" required className="border p-2 rounded" 
            onChange={(e) => setFormData({...formData, usuario: e.target.value})} />
          <input type="text" placeholder="Número de Identidad (DNI)" required className="col-span-2 border p-2 rounded" 
          onChange={(e) => setFormData({...formData, num_identidad: e.target.value})}/>
          <input type="password" placeholder="Contraseña" required className="border p-2 rounded" 
            onChange={(e) => setFormData({...formData, password: e.target.value})} />
          
          <button type="submit" disabled={loading} className="col-span-2 bg-teal-600 text-white py-3 rounded-lg font-bold hover:bg-teal-700 flex justify-center items-center gap-2">
            {loading ? <Loader2 className="animate-spin" /> : 'Registrarme'}
          </button>
        </form>
      </div>
    </div>
  );
}