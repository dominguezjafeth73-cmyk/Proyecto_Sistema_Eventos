import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router';
import { CreditCard, ShieldCheck, CheckCircle2, AlertCircle, ArrowLeft, Ticket, Lock, Mail, User, MapPin, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Event, Zone } from '../data/mockData';

export function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const state = location.state as { zone: Zone; count: number; event: Event } | null;

  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    email: '',
    phone: '',
    country: 'México',
    address: '',
    city: '',
    stateProv: '',
    zipCode: '',
    needsInvoice: false,
    rfc: '',
    businessName: '',
    cfdiUse: 'G03',
    terms: false
  });

  useEffect(() => {
    if (!state) {
      navigate('/events');
    }
  }, [state, navigate]);

  if (!state) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  const { zone, count, event } = state;
  const subtotal = zone.precio * count;
  const serviceFee = subtotal * 0.12; // 12% fee
  const taxes = subtotal * 0.15; // 15% tax
  const grandTotal = subtotal + serviceFee + taxes;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.cardName) newErrors.cardName = 'El nombre es obligatorio';
    if (!formData.cardNumber || formData.cardNumber.length < 16) newErrors.cardNumber = 'Número de tarjeta inválido';
    if (!formData.expiry) newErrors.expiry = 'Obligatorio';
    if (!formData.cvv || formData.cvv.length < 3) newErrors.cvv = 'Inválido';
    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Correo inválido';
    if (!formData.address) newErrors.address = 'Dirección obligatoria';
    if (!formData.city) newErrors.city = 'Ciudad obligatoria';
    if (!formData.stateProv) newErrors.stateProv = 'Estado obligatorio';
    if (!formData.zipCode) newErrors.zipCode = 'Código postal obligatorio';
    
    if (formData.needsInvoice) {
      if (!formData.rfc) newErrors.rfc = 'El RFC es requerido';
      if (!formData.businessName) newErrors.businessName = 'La razón social es requerida';
    }

    if (!formData.terms) newErrors.terms = 'Debes aceptar los términos';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsProcessing(true);
    // Simulate API call for purchase
    setTimeout(() => {
      setIsProcessing(false);
      const orderId = `ORD-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
      navigate(`/purchase-success/${orderId}`, {
        state: { 
          order: {
            id: orderId,
            event,
            zone,
            count,
            subtotal,
            serviceFee,
            taxes,
            grandTotal,
            buyer: formData
          }
        }
      });
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-zinc-950 pb-20 pt-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        
        <button onClick={() => navigate(-1)} className="flex items-center text-zinc-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" /> Volver al evento
        </button>

        <h1 className="text-3xl font-black text-white mb-8">Pago Seguro</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LADO IZQUIERDO: Formulario de Pago */}
          <div className="lg:col-span-7">
            <form onSubmit={handleConfirm} className="space-y-8">
              
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6 border-b border-zinc-800 pb-4">
                  <User className="w-6 h-6 text-indigo-400" />
                  <h2 className="text-xl font-bold text-white">Datos de Contacto</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Correo Electrónico</label>
                    <Input 
                      type="email" 
                      placeholder="tucorreo@ejemplo.com"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className={errors.email ? 'border-red-500' : ''}
                      icon={<Mail className="w-4 h-4" />}
                    />
                    {errors.email && <span className="text-red-400 text-xs mt-1">{errors.email}</span>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Teléfono</label>
                    <Input 
                      type="tel" 
                      placeholder="+504 0000-0000"
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8">
                <div className="flex items-center justify-between mb-6 border-b border-zinc-800 pb-4">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-6 h-6 text-indigo-400" />
                    <h2 className="text-xl font-bold text-white">Método de Pago</h2>
                  </div>
                  <div className="flex gap-2">
                    {/* Fake logos */}
                    <div className="w-10 h-6 bg-zinc-800 rounded flex items-center justify-center text-[8px] font-bold text-white">VISA</div>
                    <div className="w-10 h-6 bg-zinc-800 rounded flex items-center justify-center text-[8px] font-bold text-white">MC</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Nombre en la tarjeta</label>
                    <Input 
                      placeholder="Como aparece en la tarjeta"
                      value={formData.cardName}
                      onChange={e => setFormData({...formData, cardName: e.target.value})}
                      className={errors.cardName ? 'border-red-500' : ''}
                    />
                    {errors.cardName && <span className="text-red-400 text-xs mt-1">{errors.cardName}</span>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Número de tarjeta</label>
                    <Input 
                      placeholder="0000 0000 0000 0000"
                      maxLength={19}
                      value={formData.cardNumber}
                      onChange={e => setFormData({...formData, cardNumber: e.target.value.replace(/\D/g, '')})}
                      className={errors.cardNumber ? 'border-red-500' : ''}
                      icon={<CreditCard className="w-4 h-4" />}
                    />
                    {errors.cardNumber && <span className="text-red-400 text-xs mt-1">{errors.cardNumber}</span>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-zinc-400 mb-2">Expiración</label>
                      <Input 
                        placeholder="MM/AA"
                        maxLength={5}
                        value={formData.expiry}
                        onChange={e => setFormData({...formData, expiry: e.target.value})}
                        className={errors.expiry ? 'border-red-500' : ''}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-400 mb-2">CVV</label>
                      <Input 
                        type="password"
                        placeholder="123"
                        maxLength={4}
                        value={formData.cvv}
                        onChange={e => setFormData({...formData, cvv: e.target.value.replace(/\D/g, '')})}
                        className={errors.cvv ? 'border-red-500' : ''}
                        icon={<Lock className="w-4 h-4" />}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8">
                 <div className="flex items-center gap-3 mb-6 border-b border-zinc-800 pb-4">
                  <MapPin className="w-6 h-6 text-indigo-400" />
                  <h2 className="text-xl font-bold text-white">Dirección de Facturación</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-zinc-400 mb-2">País</label>
                    <select 
                      className="w-full h-12 rounded-xl border border-zinc-800 bg-zinc-950 px-4 text-white focus:border-indigo-500 focus:outline-none"
                      value={formData.country}
                      onChange={e => setFormData({...formData, country: e.target.value})}
                    >
                      <option>México</option>
                      <option>Honduras</option>
                      <option>El Salvador</option>
                      <option>Guatemala</option>
                      <option>Costa Rica</option>
                      <option>Estados Unidos</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Dirección (Calle y número)</label>
                    <Input 
                      placeholder="Ej. Av. Reforma 123, Col. Centro"
                      value={formData.address}
                      onChange={e => setFormData({...formData, address: e.target.value})}
                      className={errors.address ? 'border-red-500' : ''}
                    />
                    {errors.address && <span className="text-red-400 text-xs mt-1">{errors.address}</span>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Ciudad</label>
                    <Input 
                      placeholder="Ciudad"
                      value={formData.city}
                      onChange={e => setFormData({...formData, city: e.target.value})}
                      className={errors.city ? 'border-red-500' : ''}
                    />
                    {errors.city && <span className="text-red-400 text-xs mt-1">{errors.city}</span>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Estado / Provincia</label>
                    <Input 
                      placeholder="Estado"
                      value={formData.stateProv}
                      onChange={e => setFormData({...formData, stateProv: e.target.value})}
                      className={errors.stateProv ? 'border-red-500' : ''}
                    />
                    {errors.stateProv && <span className="text-red-400 text-xs mt-1">{errors.stateProv}</span>}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Código Postal</label>
                    <Input 
                      placeholder="00000"
                      value={formData.zipCode}
                      onChange={e => setFormData({...formData, zipCode: e.target.value})}
                      className={errors.zipCode ? 'border-red-500' : ''}
                    />
                    {errors.zipCode && <span className="text-red-400 text-xs mt-1">{errors.zipCode}</span>}
                  </div>
                </div>

                {/* Sección de Facturación Fiscal (opcional) */}
                <div className="mt-8 pt-6 border-t border-zinc-800">
                  <div className="flex items-center gap-3 mb-4">
                    <input 
                      type="checkbox" 
                      id="needsInvoice" 
                      checked={formData.needsInvoice}
                      onChange={e => setFormData({...formData, needsInvoice: e.target.checked})}
                      className="w-5 h-5 rounded border-zinc-700 bg-zinc-950 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label htmlFor="needsInvoice" className="text-white font-medium cursor-pointer">
                      Requiero factura / Comprobante fiscal
                    </label>
                  </div>

                  {formData.needsInvoice && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 bg-zinc-950/50 p-6 rounded-2xl border border-zinc-800">
                      <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-2">RFC / Tax ID</label>
                        <Input 
                          placeholder="ABC123456789"
                          value={formData.rfc}
                          onChange={e => setFormData({...formData, rfc: e.target.value.toUpperCase()})}
                          className={errors.rfc ? 'border-red-500' : ''}
                        />
                        {errors.rfc && <span className="text-red-400 text-xs mt-1">{errors.rfc}</span>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-2">Uso de CFDI</label>
                        <select 
                          className="w-full h-12 rounded-xl border border-zinc-800 bg-zinc-950 px-4 text-white focus:border-indigo-500 focus:outline-none"
                          value={formData.cfdiUse}
                          onChange={e => setFormData({...formData, cfdiUse: e.target.value})}
                        >
                          <option value="G03">G03 - Gastos en general</option>
                          <option value="G01">G01 - Adquisición de mercancías</option>
                          <option value="P01">P01 - Por definir</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-zinc-400 mb-2">Razón Social</label>
                        <Input 
                          placeholder="Nombre de la empresa o persona física"
                          value={formData.businessName}
                          onChange={e => setFormData({...formData, businessName: e.target.value})}
                          className={errors.businessName ? 'border-red-500' : ''}
                        />
                        {errors.businessName && <span className="text-red-400 text-xs mt-1">{errors.businessName}</span>}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
                <input 
                  type="checkbox" 
                  id="terms" 
                  checked={formData.terms}
                  onChange={e => setFormData({...formData, terms: e.target.checked})}
                  className="mt-1 w-5 h-5 rounded border-zinc-700 bg-zinc-950 text-indigo-600 focus:ring-indigo-600"
                />
                <label htmlFor="terms" className="text-sm text-zinc-400">
                  Acepto los <a href="#" className="text-indigo-400 hover:underline">Términos y Condiciones</a> y la <a href="#" className="text-indigo-400 hover:underline">Política de Privacidad</a>, reconociendo que todas las ventas son finales y no hay reembolsos.
                  {errors.terms && <span className="block text-red-400 text-xs mt-1">{errors.terms}</span>}
                </label>
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full h-14 text-lg font-bold bg-indigo-600 hover:bg-indigo-700 shadow-[0_0_20px_rgba(79,70,229,0.4)] transition-all relative overflow-hidden"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" /> Procesando pago...
                  </span>
                ) : (
                  `Pagar $${grandTotal.toLocaleString()} MXN`
                )}
                {!isProcessing && (
                  <div className="absolute inset-0 bg-white/20 translate-y-full hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                )}
              </Button>
              
              <div className="flex items-center justify-center gap-2 text-zinc-500 text-xs mt-4">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                Pago seguro cifrado con SSL de 256 bits.
              </div>
            </form>
          </div>

          {/* LADO DERECHO: Resumen del Pedido */}
          <div className="lg:col-span-5">
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 sticky top-24 shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-6">Resumen de tu Pedido</h3>
              
              <div className="flex gap-4 mb-6 pb-6 border-b border-zinc-800">
                <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-zinc-700">
                  <img src={event.imageUrl} alt={event.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-white leading-tight">{event.name}</h4>
                  <p className="text-xs text-zinc-400 mt-1">{event.venue}, {event.city}</p>
                  <p className="text-xs text-zinc-500 mt-1">{event.date} • {event.time} hrs</p>
                </div>
              </div>

              <div className="mb-6 pb-6 border-b border-zinc-800">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-zinc-300 font-medium">{zone.nombreZona}</p>
                    <p className="text-xs text-zinc-500">{zone.nombreTipoBoleto} x {count}</p>
                  </div>
                  <span className="font-bold text-white">${subtotal.toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-3 mb-6 pb-6 border-b border-zinc-800 text-sm">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal</span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Cargo por servicio (12%)</span>
                  <span>${serviceFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Impuestos (15%)</span>
                  <span>${taxes.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex justify-between items-end">
                <span className="text-zinc-300 font-medium">Total</span>
                <span className="text-4xl font-black text-indigo-400">
                  ${grandTotal.toLocaleString()}
                  <span className="text-sm font-medium text-zinc-500 ml-1">MXN</span>
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}