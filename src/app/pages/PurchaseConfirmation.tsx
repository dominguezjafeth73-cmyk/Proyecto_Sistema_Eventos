import { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router';
import { CheckCircle2, Ticket, Download, Mail, QrCode, MapPin, Calendar, Clock, Receipt, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function PurchaseConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as any;

  useEffect(() => {
    if (!state || !state.order) {
      navigate('/');
    }
  }, [state, navigate]);

  if (!state || !state.order) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  const { order } = state;
  const { event, zone, count, subtotal, serviceFee, taxes, grandTotal, buyer, id: orderId } = order;

  return (
    <div className="min-h-screen bg-zinc-950 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/30">
            <CheckCircle2 className="h-12 w-12 text-emerald-500" />
          </div>
          <h1 className="text-4xl font-black text-white mb-4">¡Compra Exitosa, {buyer.cardName.split(' ')[0]}!</h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Tus boletos están listos. Hemos enviado un recibo a <strong className="text-white">{buyer.email}</strong>. Tu número de orden es <strong className="text-indigo-400">{orderId}</strong>.
          </p>
        </div>

        {/* Digital Ticket / QR */}
        <div className="bg-gradient-to-br from-indigo-900/40 to-zinc-900 border border-indigo-500/30 rounded-[2rem] p-1 mb-8 shadow-[0_0_50px_rgba(79,70,229,0.15)]">
          <div className="bg-[#0a0a0e] rounded-[1.8rem] overflow-hidden flex flex-col md:flex-row relative">
            
            {/* Cutout circles for ticket effect */}
            <div className="absolute top-1/2 -left-3 w-6 h-6 bg-zinc-950 rounded-full hidden md:block"></div>
            <div className="absolute top-1/2 -right-3 w-6 h-6 bg-zinc-950 rounded-full hidden md:block"></div>
            
            <div className="md:w-1/3 bg-zinc-900 flex flex-col items-center justify-center p-8 border-b md:border-b-0 md:border-r border-zinc-800 border-dashed relative">
              <div className="w-48 h-48 bg-white p-2 rounded-xl flex items-center justify-center mb-4">
                <QrCode className="w-full h-full text-black" />
              </div>
              <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">Ticket Digital</p>
              <p className="text-sm font-mono text-zinc-300">{orderId}-TKT</p>
            </div>
            
            <div className="md:w-2/3 p-8 flex flex-col">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-black text-white mb-2">{event.name}</h2>
                  <div className="flex items-center gap-2 text-zinc-400 text-sm">
                    <MapPin className="w-4 h-4" /> {event.venue}, {event.city}
                  </div>
                </div>
                <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
                  <img src={event.imageUrl} alt={event.name} className="w-full h-full object-cover" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6 mb-8 mt-4">
                <div>
                  <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Fecha y Hora</p>
                  <p className="font-semibold text-white">{event.date} • {event.time}</p>
                </div>
                <div>
                  <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Zona / Asiento</p>
                  <p className="font-semibold text-white text-lg text-indigo-400">{zone.nombreZona}</p>
                </div>
                <div>
                  <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Titular</p>
                  <p className="font-semibold text-white">{buyer.cardName}</p>
                </div>
                <div>
                  <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Boletos</p>
                  <p className="font-semibold text-white">{count}x {zone.nombreTipoBoleto}</p>
                </div>
              </div>

              <div className="mt-auto pt-6 border-t border-zinc-800 flex flex-wrap gap-4">
                <Button className="flex-1 bg-indigo-600 hover:bg-indigo-700">
                  <Download className="w-4 h-4 mr-2" /> Descargar Ticket
                </Button>
                <Button variant="outline" className="flex-1">
                  <Mail className="w-4 h-4 mr-2" /> Enviar a Correo
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Invoice Summary */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 mb-12">
          <div className="flex items-center gap-3 mb-6 border-b border-zinc-800 pb-4">
            <Receipt className="w-6 h-6 text-indigo-400" />
            <h3 className="text-xl font-bold text-white">Comprobante de Compra (Factura)</h3>
          </div>
          
          <div className="space-y-4 mb-8">
            <div className="flex justify-between text-zinc-400 text-sm">
              <span>{count}x {zone.nombreZona} ({zone.nombreTipoBoleto})</span>
              <span>${subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-zinc-400 text-sm">
              <span>Cargos por servicio</span>
              <span>${serviceFee.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-zinc-400 text-sm">
              <span>Impuestos locales</span>
              <span>${taxes.toLocaleString()}</span>
            </div>
            <div className="pt-4 border-t border-zinc-800 flex justify-between items-end">
              <span className="text-white font-medium">Total Pagado</span>
              <span className="text-2xl font-black text-indigo-400">${grandTotal.toLocaleString()} MXN</span>
            </div>
          </div>

          <div className="bg-zinc-950 rounded-xl p-4 text-xs text-zinc-500 font-mono">
            <p>Comprobante #: COMP-{Math.floor(Math.random() * 1000000)}</p>
            {buyer.needsInvoice && (
              <>
                <p>Factura solicitada para RFC: {buyer.rfc}</p>
                <p>Razón Social: {buyer.businessName}</p>
                <p>Uso CFDI: {buyer.cfdiUse}</p>
              </>
            )}
            <p>Método de Pago: Tarjeta terminada en {buyer.cardNumber?.slice(-4) || 'XXXX'}</p>
            <p>Fecha de emisión: {new Date().toLocaleDateString()}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-6">
          <Link to="/tickets">
             <Button variant="outline" size="lg" className="w-48 border-zinc-700">
               Mis Boletos
             </Button>
          </Link>
          <Link to="/">
             <Button size="lg" className="w-48 bg-zinc-800 hover:bg-zinc-700 text-white">
               Ir al Inicio <ArrowRight className="w-4 h-4 ml-2" />
             </Button>
          </Link>
        </div>

      </div>
    </div>
  );
}