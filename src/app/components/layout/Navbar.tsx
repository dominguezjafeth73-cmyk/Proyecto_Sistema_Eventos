import { Link } from 'react-router';
import { Ticket, Search, Menu, User, LogIn } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 text-white">
            <Ticket className="h-6 w-6 text-indigo-500" />
            <span className="text-xl font-bold tracking-tight">TixNow</span>
          </Link>
          
          <div className="hidden md:flex">
            <Link to="/events" className="text-sm font-medium text-zinc-300 transition-colors hover:text-white">
              Eventos
            </Link>
          </div>
        </div>

        <div className="hidden flex-1 items-center justify-center px-8 md:flex max-w-md">
          <Input 
            type="search" 
            placeholder="Buscar eventos, artistas o recintos..." 
            icon={<Search className="h-4 w-4" />}
            className="w-full bg-zinc-900/50 focus:bg-zinc-900"
          />
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <Link to="/tickets" className="text-sm font-medium text-zinc-300 transition-colors hover:text-white mr-2">
            Mis Boletos
          </Link>
          <div className="h-6 w-px bg-zinc-800 mx-1"></div>
          <Link to="/login">
            <Button variant="ghost" size="sm" className="gap-2">
              <LogIn className="h-4 w-4" />
              Ingresar
            </Button>
          </Link>
          <Link to="/register">
            <Button size="sm">Registrarse</Button>
          </Link>
          <div className="h-6 w-px bg-zinc-800 mx-1"></div>
          <Link to="/dashboard">
            <Button variant="ghost" size="sm" className="gap-2 text-zinc-400">
              <User className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <button className="md:hidden p-2 text-zinc-400 hover:text-white">
          <Menu className="h-6 w-6" />
        </button>
      </div>
    </nav>
  );
}
