import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router';
import { 
  CalendarDays, 
  LayoutDashboard, 
  Users, 
  FileText, 
  LifeBuoy, 
  LogOut, 
  Bell, 
  PlusCircle, 
  List, 
  Map, 
  Music 
} from 'lucide-react';
import clsx from 'clsx';

export function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const isAdmin = location.pathname.startsWith('/admin');

  const adminLinks = [
    { name: 'Dashboard (Pagos)', href: '/admin', icon: LayoutDashboard },
    { name: 'Gestión de Eventos', href: '/admin/events', icon: CalendarDays },
    { name: 'Gestión de Usuarios', href: '/admin/users', icon: Users },
    { name: 'Reportes', href: '/admin/reports', icon: FileText },
    { name: 'Soporte', href: '/admin/support', icon: LifeBuoy },
  ];

  const organizerLinks = [
    { name: 'Mi Dashboard (Resumen)', href: '/organizer', icon: LayoutDashboard },
    { name: 'Crear Nuevo Evento', href: '/organizer/create', icon: PlusCircle },
    { name: 'Mis Eventos', href: '/organizer/events', icon: List },
    { name: 'Gestión de Recintos', href: '/organizer/venues', icon: Map },
    { name: 'Gestión de Artistas y Bandas', href: '/organizer/artists', icon: Music },
  ];

  const links = isAdmin ? adminLinks : organizerLinks;

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b">
          <Link to="/" className="flex items-center gap-2 text-teal-600 font-bold text-lg">
            <div className="bg-teal-500 text-white p-1 rounded-md">
              <CalendarDays className="w-5 h-5" />
            </div>
            <span className="leading-tight">Sistema de<br/>Gestión</span>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.href;
              return (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className={clsx(
                      'flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors',
                      isActive 
                        ? 'bg-teal-50 text-teal-700 border-r-4 border-teal-600' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-3 px-2 py-2 w-full text-sm font-medium text-gray-600 hover:text-red-600 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-6 shrink-0">
          <h1 className="text-xl font-semibold text-gray-800 hidden sm:block">
            Sistema de Gestión de Eventos
          </h1>
          
          <div className="flex items-center gap-6 ml-auto">
            <button className="relative text-gray-500 hover:text-gray-700">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900">
                  {isAdmin ? 'Jafeth Domínguez' : 'Organizador Demo'}
                </p>
                <p className="text-xs text-gray-500">{isAdmin ? 'Administrador' : 'Organizador'}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold">
                {isAdmin ? 'JD' : 'OD'}
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50/50 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
