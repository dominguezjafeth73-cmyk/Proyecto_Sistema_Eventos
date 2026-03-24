import { Ticket, Twitter, Instagram, Facebook } from 'lucide-react';
import { Link } from 'react-router';

export function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2 text-white">
              <Ticket className="h-6 w-6 text-indigo-500" />
              <span className="text-xl font-bold tracking-tight">TixNow</span>
            </Link>
            <p className="text-sm text-zinc-400">
              La plataforma de boletos más moderna y segura para tus eventos favoritos.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <Link to="/" className="text-zinc-400 hover:text-indigo-400"><Twitter className="h-5 w-5" /></Link>
              <Link to="/" className="text-zinc-400 hover:text-indigo-400"><Instagram className="h-5 w-5" /></Link>
              <Link to="/" className="text-zinc-400 hover:text-indigo-400"><Facebook className="h-5 w-5" /></Link>
            </div>
          </div>
          
          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Descubrir</h3>
            <ul className="flex flex-col gap-2 text-sm text-zinc-400">
              <li><Link to="/events" className="hover:text-indigo-400 transition-colors">Conciertos</Link></li>
              <li><Link to="/events" className="hover:text-indigo-400 transition-colors">Festivales</Link></li>
              <li><Link to="/events" className="hover:text-indigo-400 transition-colors">Deportes</Link></li>
              <li><Link to="/events" className="hover:text-indigo-400 transition-colors">Teatro</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Ayuda</h3>
            <ul className="flex flex-col gap-2 text-sm text-zinc-400">
              <li><Link to="/" className="hover:text-indigo-400 transition-colors">Soporte</Link></li>
              <li><Link to="/" className="hover:text-indigo-400 transition-colors">Puntos de Venta</Link></li>
              <li><Link to="/" className="hover:text-indigo-400 transition-colors">Facturación</Link></li>
              <li><Link to="/" className="hover:text-indigo-400 transition-colors">Preguntas Frecuentes</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Legal</h3>
            <ul className="flex flex-col gap-2 text-sm text-zinc-400">
              <li><Link to="/" className="hover:text-indigo-400 transition-colors">Términos y Condiciones</Link></li>
              <li><Link to="/" className="hover:text-indigo-400 transition-colors">Política de Privacidad</Link></li>
              <li><Link to="/" className="hover:text-indigo-400 transition-colors">Política de Reembolsos</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 border-t border-zinc-800 pt-8 text-center text-sm text-zinc-500">
          <p>© {new Date().getFullYear()} TixNow. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
