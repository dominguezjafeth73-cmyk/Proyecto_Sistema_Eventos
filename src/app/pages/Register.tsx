import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Mail, Lock, User, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const getPasswordStrength = (pass: string) => {
    if (pass.length === 0) return 0;
    let strength = 0;
    if (pass.length > 7) strength += 25;
    if (/[A-Z]/.test(pass)) strength += 25;
    if (/[0-9]/.test(pass)) strength += 25;
    if (/[^A-Za-z0-9]/.test(pass)) strength += 25;
    return strength;
  };

  const strength = getPasswordStrength(formData.password);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Por favor, completa todos los campos');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    if (strength < 50) {
      setError('La contraseña es demasiado débil');
      return;
    }
    
    setIsLoading(true);
    setError('');

    // Simulando registro y verificación por correo
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);
    }, 2000);
  };

  if (success) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center py-20 px-4">
        <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-8 text-center shadow-2xl">
          <div className="mx-auto w-20 h-20 bg-indigo-500/10 text-indigo-500 rounded-full flex items-center justify-center mb-6 border border-indigo-500/20">
            <Mail className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Verifica tu correo</h2>
          <p className="text-zinc-400 mb-8 leading-relaxed">
            Hemos enviado un enlace de confirmación a <strong className="text-white">{formData.email}</strong>. Por favor revisa tu bandeja de entrada o spam.
          </p>
          <Button onClick={() => navigate('/login')} className="w-full h-12 bg-indigo-600 hover:bg-indigo-700">
            Ir a Iniciar Sesión
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-white mb-2">Crear Cuenta</h1>
          <p className="text-zinc-400">Únete para comprar boletos y acceder a preventas</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">Nombre completo</label>
              <Input 
                placeholder="Juan Pérez" 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                icon={<User className="w-4 h-4" />}
                className="h-12"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">Correo electrónico</label>
              <Input 
                type="email" 
                placeholder="tu@correo.com" 
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                icon={<Mail className="w-4 h-4" />}
                className="h-12"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">Contraseña</label>
              <Input 
                type="password" 
                placeholder="Crea una contraseña segura" 
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
                icon={<Lock className="w-4 h-4" />}
                className="h-12"
              />
              
              {/* Strength indicator */}
              {formData.password.length > 0 && (
                <div className="mt-3">
                  <div className="flex justify-between items-center mb-1">
                     <span className="text-xs text-zinc-500">Fuerza de la contraseña</span>
                     <span className={`text-xs font-bold ${
                       strength < 50 ? 'text-red-400' : strength < 75 ? 'text-amber-400' : 'text-emerald-400'
                     }`}>
                       {strength < 50 ? 'Débil' : strength < 75 ? 'Buena' : 'Fuerte'}
                     </span>
                  </div>
                  <div className="w-full bg-zinc-950 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-300 ${
                        strength < 50 ? 'bg-red-500' : strength < 75 ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${strength}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">Confirmar contraseña</label>
              <Input 
                type="password" 
                placeholder="Repite tu contraseña" 
                value={formData.confirmPassword}
                onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
                icon={<CheckCircle2 className="w-4 h-4" />}
                className="h-12"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 shadow-lg text-base mt-2"
              disabled={isLoading}
            >
              {isLoading ? 'Creando cuenta...' : 'Registrarse'}
            </Button>
            
            <p className="text-[10px] text-zinc-500 text-center flex items-center justify-center gap-1 mt-4">
              <ShieldCheck className="w-3 h-3 text-indigo-400" />
              Tus datos están protegidos y encriptados.
            </p>
          </form>

          <div className="mt-6 text-center border-t border-zinc-800 pt-6">
            <p className="text-sm text-zinc-500">
              ¿Ya tienes una cuenta?{' '}
              <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium">
                Inicia Sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}