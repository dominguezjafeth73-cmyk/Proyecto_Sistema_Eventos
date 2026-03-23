import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router';
import { Search, MapPin, CalendarDays, User, ChevronDown, Facebook, Instagram, Accessibility, LogIn, Loader2 } from 'lucide-react';
import axios from 'axios';
import { RegisterModal } from '../components/RegisterModal'; // Asegúrate que la ruta sea correcta

export function RootLayout() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false); 
  
  const [loginStep, setLoginStep] = useState<'select' | 'form'>('select');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/api/login-admin/', {
        email: email,
        password: password
      });

      if (response.data.status === 'success') {
        localStorage.setItem('user_name', response.data.user.nombre);
        setIsLoginOpen(false);
        setLoginStep('select');
        navigate('/admin/users');
      }
    } catch (error: any) {
      alert(error.response?.data?.message || "Error de credenciales");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 text-teal-600 font-bold text-xl min-w-max">
            <div className="bg-teal-500 text-white p-1.5 rounded-md">
              <CalendarDays className="w-5 h-5" />
            </div>
            <span>Sistema de Eventos</span>
          </Link>

          <div className="flex-1 max-w-xl hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2">
            <input type="text" placeholder="Palabra clave o lugar" className="bg-transparent border-none outline-none w-full text-sm text-gray-700 placeholder-gray-500" />
            <Search className="w-4 h-4 text-gray-400 ml-2" />
          </div>

          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-700">
            <Link to="/" className="hover:text-teal-600">Inicio</Link>
            <a href="#" className="hover:text-teal-600">Eventos</a>
            <a href="#" className="hover:text-teal-600">Soporte</a>
          </nav>

          <div className="flex items-center gap-3 relative">
            <div className="relative group">
              <button className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-teal-600" onClick={() => setIsRegisterOpen(!isRegisterOpen)}>
                Registrarse <ChevronDown className="w-4 h-4" />
              </button>
              {isRegisterOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-lg shadow-lg py-1 z-50">
                  {/* AQUÍ CONECTAMOS EL MODAL */}
                  <button onClick={() => { setIsRegisterOpen(false); setIsRegisterModalOpen(true); }} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Registro Usuario
                  </button>
                  <button onClick={() => { setIsRegisterOpen(false); alert("Registro de Asistente"); }} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Registro Asistente
                  </button>
                </div>
              )}
            </div>
            
            <button onClick={() => setIsLoginOpen(true)} className="hidden sm:flex items-center gap-1.5 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors">
              <LogIn className="w-4 h-4" />
              <span>Iniciar Sesión</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-white border-t mt-12">
        <div className="bg-zinc-900 py-6">
          <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-between items-center gap-6 opacity-80">
            <span className="text-white font-bold text-xl tracking-tight">RDS-Hn</span>
            <span className="text-white font-bold text-xl">.hn</span>
            <div className="flex items-center text-white gap-2"><span className="text-xl">📻</span> 88.9 FM</div>
            <span className="text-white font-semibold uppercase">Programas</span>
            <span className="text-white font-semibold uppercase">Empleos</span>
            <span className="text-white font-semibold uppercase">Becas</span>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center gap-1 mb-4">
               <span className="text-2xl font-bold text-[#e85d4f]">eventos</span>
               <span className="bg-[#48b2b7] text-white text-xs px-1.5 py-0.5 rounded-full font-bold">Hn</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed max-w-md text-justify">
              Eventos.hn es una plataforma social y gratuita de la Red de Desarrollo Sostenible RDS-HN...
            </p>
          </div>
          <div className="md:text-right flex flex-col items-start md:items-end gap-4">
            <p className="text-sm text-gray-600">
              Col. Las Colinas, Bloque RR, Casa 2016, Boulevard<br/>Francia, Tegucigalpa, Honduras.
            </p>
            <div className="flex items-center gap-2">
              <a href="#" className="text-blue-600 hover:text-blue-700"><Facebook className="w-6 h-6 fill-current" /></a>
              <a href="#" className="text-pink-600 hover:text-pink-700"><Instagram className="w-6 h-6" /></a>
            </div>
          </div>
        </div>
      </footer>

      {/* MODAL DE LOGIN */}
      {isLoginOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] px-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">Iniciar Sesión</h2>
              <button onClick={() => { setIsLoginOpen(false); setLoginStep('select'); }} className="text-gray-400 hover:text-gray-600">&times;</button>
            </div>
            <div className="p-6">
              {loginStep === 'select' ? (
                <div className="space-y-3">
                  <p className="text-sm text-gray-500 mb-6">Selecciona tu rol para iniciar sesión:</p>
                  <button onClick={() => setLoginStep('form')} className="w-full py-3 bg-gray-50 border border-gray-200 rounded-lg hover:border-teal-500 hover:bg-teal-50 text-gray-700 font-medium transition-all text-left px-4 flex items-center justify-between">
                    <span>Administrador</span>
                    <span className="text-xs text-gray-400">Panel Completo</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <input type="email" placeholder="Correo" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-teal-500" />
                  <input type="password" placeholder="Contraseña" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-teal-500" />
                  <div className="flex gap-2">
                    <button type="button" onClick={() => setLoginStep('select')} className="flex-1 py-2 border rounded-lg hover:bg-gray-50">Volver</button>
                    <button type="submit" disabled={loading} className="flex-[2] py-2 bg-teal-600 text-white rounded-lg flex justify-center items-center gap-2 hover:bg-teal-700">
                      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Entrar'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE REGISTRO - IMPORTADO Y CONECTADO */}
      <RegisterModal 
        isOpen={isRegisterModalOpen} 
        onClose={() => setIsRegisterModalOpen(false)} 
      />

    </div>
  );
}
