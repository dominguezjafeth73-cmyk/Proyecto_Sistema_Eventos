import React from 'react';
import { Palette, Landmark, Globe, HeartHandshake, MonitorPlay, Cpu, GraduationCap, Mic, Calendar, MapPin, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const categories = [
  { name: 'Arte', icon: Palette, color: 'bg-red-500 text-white', highlight: true },
  { name: 'Cultura y Patrimonio', icon: Landmark, color: 'bg-white text-gray-800' },
  { name: 'Diásporas', icon: Globe, color: 'bg-white text-gray-800' },
  { name: 'Desarrollo Social', icon: HeartHandshake, color: 'bg-white text-gray-800' },
  { name: 'Entretenimiento y Medios', icon: MonitorPlay, color: 'bg-white text-gray-800' },
  { name: 'Ciencia y Tecnología', icon: Cpu, color: 'bg-white text-gray-800' },
  { name: 'Educación y Formación', icon: GraduationCap, color: 'bg-white text-gray-800' },
  { name: 'Conferencia de Prensa', icon: Mic, color: 'bg-white text-gray-800' },
];

const upcomingEvents = [
  {
    title: 'Música en Vivo',
    date: '20 de Marzo, 2026 - 18:00',
    location: 'Teatro Central - Centro Histórico',
    priceText: 'Desde L. 60.00 en Zona General',
    image: 'https://images.unsplash.com/photo-1764805354913-953132e82086?w=800&q=80',
    free: false
  },
  {
    title: 'Conferencia de Tecnología',
    date: '28 de Marzo, 2026 - 09:00',
    location: 'Centro de Convenciones - Zona Empresarial',
    priceText: 'Desde L. 120.00 en Zona VIP',
    image: 'https://images.unsplash.com/photo-1592758080692-b6a5dbe9c725?w=800&q=80',
    free: false
  },
  {
    title: 'Evento de Cultura',
    date: '5 de Abril, 2026 - 17:00',
    location: 'Teatro Central - Centro Histórico',
    priceText: 'Desde L. 80.00 en Zona Palco',
    image: 'https://images.unsplash.com/photo-1771911654347-b1b506fa40f3?w=800&q=80',
    free: false
  },
  {
    title: 'Festival de Arte',
    date: '10 de Mayo, 2026 - 14:00',
    location: 'Plaza Mayor - Zona Histórica',
    priceText: 'Gratis',
    image: 'https://images.unsplash.com/photo-1767128457174-cab08794e82b?w=800&q=80',
    free: true
  }
];

const todayEvents = [
  { time: '12:00 AM', title: 'Explorando el reconocimiento corporal a través de la danza', category: 'Arte' },
  { time: '12:00 AM', title: 'Esta semana Distrito Palmira Celebra a Papá', category: 'Entretenimiento y Medios' },
  { time: '12:00 AM', title: 'Esta semana en el CCET', category: 'Arte' },
  { time: '12:00 AM', title: 'MIN: Agenda Cultural Marzo 2026', category: 'Arte' },
  { time: '12:00 AM', title: 'Crea tu primera escultura y expone', category: 'Arte' },
];

export function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-teal-500 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Descubre los Mejores Eventos
          </h1>
          <p className="text-teal-50 text-xl md:text-2xl font-light">
            Compra tus boletos de manera fácil y segura
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4 max-w-7xl mx-auto w-full">
        <h2 className="text-3xl font-bold text-center text-[#e85d4f] mb-12">Categorías</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((cat, idx) => (
            <div 
              key={idx} 
              className={`
                group flex flex-col items-center justify-center p-6 rounded-2xl cursor-pointer 
                transition-all duration-300 hover:scale-105 hover:shadow-xl
                border border-gray-100 shadow-sm
                ${cat.highlight ? cat.color : 'bg-white'}
              `}
            >
              <div className="mb-4">
                <cat.icon className={`w-12 h-12 ${cat.highlight ? 'text-white' : 'text-gray-800'}`} strokeWidth={1.5} />
              </div>
              <h3 className={`text-center font-medium ${cat.highlight ? 'text-white' : 'text-[#e85d4f]'}`}>
                {cat.name}
              </h3>
              {cat.highlight && (
                <p className="text-xs text-white/80 text-center mt-2 leading-tight">
                  Dibujo, Pintura, Escultura, Fotografía, Arquitectura...
                </p>
              )}
            </div>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <button className="bg-[#e85d4f] hover:bg-[#d44c3f] text-white px-8 py-3 rounded-md font-medium transition-colors">
            Más Categorías
          </button>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 px-4 max-w-7xl mx-auto w-full">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Eventos Próximos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingEvents.map((event, idx) => (
            <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col">
              <div className="h-48 overflow-hidden relative">
                <ImageWithFallback 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{event.title}</h3>
                <div className="flex items-center text-gray-500 mb-2 text-sm">
                  <Calendar className="w-4 h-4 mr-2 text-teal-500" />
                  {event.date}
                </div>
                <div className="flex items-center text-gray-500 mb-6 text-sm">
                  <MapPin className="w-4 h-4 mr-2 text-teal-500" />
                  {event.location}
                </div>
                
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className={`font-semibold ${event.free ? 'text-teal-600' : 'text-teal-700'}`}>
                    {event.priceText}
                  </span>
                  <button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1">
                    Seleccionar Zona
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Today's Events */}
      <section className="py-16 px-4 max-w-7xl mx-auto w-full">
        <h2 className="text-3xl font-bold text-center text-[#e85d4f] mb-8">Eventos de Hoy</h2>
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-red-50/50">
                <th className="py-4 px-6 font-semibold text-gray-800 border-b w-32">Hora</th>
                <th className="py-4 px-6 font-semibold text-gray-800 border-b">Evento</th>
                <th className="py-4 px-6 font-semibold text-gray-800 border-b w-48 hidden md:table-cell">Categoría</th>
              </tr>
            </thead>
            <tbody>
              {todayEvents.map((event, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 border-b border-gray-100 text-gray-600 text-sm">{event.time}</td>
                  <td className="py-4 px-6 border-b border-gray-100 font-medium text-gray-800 hover:text-teal-600 cursor-pointer transition-colors underline decoration-gray-300 underline-offset-4 decoration-1">{event.title}</td>
                  <td className="py-4 px-6 border-b border-gray-100 text-gray-500 text-sm hidden md:table-cell">{event.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
