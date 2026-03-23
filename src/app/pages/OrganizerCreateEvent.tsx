import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Check, Users, Music, MapPin, Ticket, AlertCircle } from 'lucide-react';
import clsx from 'clsx';

const categories = ['Arte', 'Cultura y Patrimonio', 'Diásporas', 'Desarrollo Social', 'Entretenimiento y Medios', 'Ciencia y Tecnología', 'Educación y Formación', 'Conferencia de Prensa'];

export function OrganizerCreateEvent() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1
    name: '',
    description: '',
    category: '',
    // Step 2
    isMusical: true,
    talentType: 'solista',
    talentId: '',
    // Step 3
    venueId: '',
    eventDate: '',
    // Step 4
    zonePrices: {} as Record<string, string>
  });

  const venues = [
    { id: '1', name: 'Teatro Central - Centro Histórico' },
    { id: '2', name: 'Centro de Convenciones - Zona Empresarial' },
    { id: '3', name: 'Plaza Mayor - Zona Histórica' },
  ];

  const zones = [
    { id: 'z1', name: 'VIP', capacity: 200, color: 'bg-purple-100 border-purple-300 text-purple-800' },
    { id: 'z2', name: 'Palco', capacity: 150, color: 'bg-blue-100 border-blue-300 text-blue-800' },
    { id: 'z3', name: 'General', capacity: 1000, color: 'bg-teal-100 border-teal-300 text-teal-800' },
    { id: 'z4', name: 'Silla de Ruedas', capacity: 20, color: 'bg-orange-100 border-orange-300 text-orange-800' },
  ];

  const [selectedZone, setSelectedZone] = useState<string | null>(null);

  const handleNext = () => setStep(s => Math.min(4, s + 1));
  const handleBack = () => setStep(s => Math.max(1, s - 1));

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Crear Nuevo Evento</h2>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-100 rounded-full z-0"></div>
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-teal-500 rounded-full z-0 transition-all duration-300"
            style={{ width: `${((step - 1) / 3) * 100}%` }}
          ></div>
          
          {[1, 2, 3, 4].map(s => (
            <div key={s} className="relative z-10 flex flex-col items-center">
              <div className={clsx(
                "w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 transition-colors",
                step === s ? "bg-teal-600 border-teal-600 text-white" : 
                step > s ? "bg-teal-500 border-teal-500 text-white" : "bg-white border-gray-200 text-gray-400"
              )}>
                {step > s ? <Check className="w-5 h-5" /> : s}
              </div>
              <span className={clsx(
                "absolute -bottom-6 text-xs font-medium whitespace-nowrap",
                step >= s ? "text-gray-800" : "text-gray-400"
              )}>
                {s === 1 && "Datos Generales"}
                {s === 2 && "Talento"}
                {s === 3 && "Logística"}
                {s === 4 && "Zonas y Precios"}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-8">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Paso 1: Datos Generales</h3>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Evento</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
                      placeholder="Ej. Concierto Sinfónico 2026"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                    <textarea 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all min-h-[120px]"
                      placeholder="Describe los detalles principales del evento..."
                      value={formData.description}
                      onChange={e => setFormData({...formData, description: e.target.value})}
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                    <select 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
                      value={formData.category}
                      onChange={e => setFormData({...formData, category: e.target.value})}
                    >
                      <option value="">Selecciona una categoría</option>
                      {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Paso 2: Talento y Artistas</h3>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">¿Es un evento musical?</label>
                  <div className="flex gap-4">
                    <button 
                      className={clsx(
                        "flex-1 py-3 border rounded-xl flex flex-col items-center gap-2 transition-all",
                        formData.isMusical ? "border-teal-500 bg-teal-50 text-teal-700" : "border-gray-200 hover:bg-gray-50 text-gray-600"
                      )}
                      onClick={() => setFormData({...formData, isMusical: true})}
                    >
                      <Music className="w-6 h-6" />
                      <span className="font-medium">Sí, es Musical</span>
                    </button>
                    <button 
                      className={clsx(
                        "flex-1 py-3 border rounded-xl flex flex-col items-center gap-2 transition-all",
                        !formData.isMusical ? "border-teal-500 bg-teal-50 text-teal-700" : "border-gray-200 hover:bg-gray-50 text-gray-600"
                      )}
                      onClick={() => setFormData({...formData, isMusical: false})}
                    >
                      <Users className="w-6 h-6" />
                      <span className="font-medium">No, es Otro Tipo</span>
                    </button>
                  </div>
                </div>

                {formData.isMusical && (
                  <div className="space-y-6 bg-gray-50 p-5 rounded-xl border border-gray-100">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Tipo de Artista</label>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input 
                            type="radio" 
                            name="talentType" 
                            value="solista" 
                            checked={formData.talentType === 'solista'}
                            onChange={e => setFormData({...formData, talentType: e.target.value})}
                            className="text-teal-600 focus:ring-teal-500 w-4 h-4"
                          />
                          <span className="text-sm font-medium text-gray-700">Solista (Tabla artista)</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input 
                            type="radio" 
                            name="talentType" 
                            value="banda" 
                            checked={formData.talentType === 'banda'}
                            onChange={e => setFormData({...formData, talentType: e.target.value})}
                            className="text-teal-600 focus:ring-teal-500 w-4 h-4"
                          />
                          <span className="text-sm font-medium text-gray-700">Banda (Tabla banda)</span>
                        </label>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Seleccionar {formData.talentType === 'solista' ? 'Solista' : 'Banda'}
                      </label>
                      <select 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                        value={formData.talentId}
                        onChange={e => setFormData({...formData, talentId: e.target.value})}
                      >
                        <option value="">Buscar en base de datos...</option>
                        {formData.talentType === 'solista' ? (
                          <>
                            <option value="1">Juan Pérez</option>
                            <option value="2">María Gómez</option>
                          </>
                        ) : (
                          <>
                            <option value="b1">Los Rockeros</option>
                            <option value="b2">Banda Sinfónica Nacional</option>
                          </>
                        )}
                      </select>
                      {formData.talentType === 'banda' && formData.talentId && (
                        <p className="mt-2 text-xs text-blue-600 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          Se cargarán los datos de los integrantes (tabla banda_integrante).
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Paso 3: Logística y Fecha</h3>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Recinto / Escenario</label>
                  <select 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
                    value={formData.venueId}
                    onChange={e => setFormData({...formData, venueId: e.target.value})}
                  >
                    <option value="">Seleccione el recinto...</option>
                    {venues.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
                  </select>
                  <p className="mt-2 text-xs text-gray-500 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    El mapa de zonas dependerá del recinto seleccionado.
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha y Hora de Inicio</label>
                  <input 
                    type="datetime-local" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
                    value={formData.eventDate}
                    onChange={e => setFormData({...formData, eventDate: e.target.value})}
                  />
                  <p className="mt-2 text-xs text-gray-500">Se guardará como id_evento_fecha.</p>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Paso 4: Configuración de Zonas y Precios</h3>
              <p className="text-sm text-gray-600 mb-6">En lugar de asientos individuales, asigne precios por cada zona disponible en el recinto.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Visualización del Mapa / Zonas */}
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-teal-600" />
                    Zonas del Recinto Seleccionado
                  </h4>
                  <div className="space-y-3">
                    {zones.map(zone => (
                      <div 
                        key={zone.id}
                        onClick={() => setSelectedZone(zone.id)}
                        className={clsx(
                          "p-4 rounded-lg border-2 cursor-pointer transition-all flex justify-between items-center",
                          zone.color,
                          selectedZone === zone.id ? "ring-2 ring-offset-2 ring-teal-500 scale-[1.02]" : "opacity-80 hover:opacity-100"
                        )}
                      >
                        <span className="font-bold">{zone.name}</span>
                        <div className="text-xs bg-white/50 px-2 py-1 rounded font-medium">
                          Cap: {zone.capacity}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Configuración de Precio para Zona Seleccionada */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Ticket className="w-4 h-4 text-teal-600" />
                    Asignar Precios
                  </h4>
                  
                  {selectedZone ? (
                    <div className="bg-teal-50 rounded-xl p-6 border border-teal-100 relative">
                      {(() => {
                        const zone = zones.find(z => z.id === selectedZone);
                        return (
                          <>
                            <div className="flex justify-between items-start mb-6">
                              <div>
                                <h5 className="font-bold text-teal-900 text-lg">{zone?.name}</h5>
                                <p className="text-sm text-teal-700">Capacidad Total: {zone?.capacity} personas</p>
                              </div>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-teal-900 mb-2">
                                Precio por boleto (Lempiras)
                              </label>
                              <div className="relative">
                                <span className="absolute left-4 top-2.5 text-gray-500 font-medium">L.</span>
                                <input 
                                  type="number" 
                                  placeholder="0.00"
                                  className="w-full pl-10 pr-4 py-2 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none text-lg font-medium"
                                  value={formData.zonePrices[selectedZone] || ''}
                                  onChange={e => setFormData({
                                    ...formData, 
                                    zonePrices: {
                                      ...formData.zonePrices,
                                      [selectedZone]: e.target.value
                                    }
                                  })}
                                />
                              </div>
                              <p className="mt-3 text-xs text-teal-700">Este valor se guardará en la tabla <strong>boleto_config</strong> asociado a la zona seleccionada.</p>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  ) : (
                    <div className="bg-gray-50 border border-dashed border-gray-300 rounded-xl p-8 text-center text-gray-500 flex flex-col items-center justify-center h-full min-h-[200px]">
                      <AlertCircle className="w-8 h-8 mb-3 text-gray-400" />
                      <p>Selecciona una zona en el mapa de la izquierda para configurar su precio.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-8 py-5 border-t border-gray-100 bg-gray-50/50 flex justify-between rounded-b-xl">
          <button 
            onClick={handleBack}
            disabled={step === 1}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-4 h-4" />
            Atrás
          </button>
          
          {step < 4 ? (
            <button 
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-medium transition-colors"
            >
              Siguiente
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button 
              className="flex items-center gap-2 px-6 py-2 bg-[#e85d4f] hover:bg-[#d44c3f] text-white rounded-lg font-medium transition-colors"
            >
              <Check className="w-4 h-4" />
              Guardar y Publicar Evento
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
