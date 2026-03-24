import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Mail, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Por favor, completa todos los campos');
      return;
    }
    
    setIsLoading(true);
    setError('');

    // Simulando auth
    setTimeout(() => {
      setIsLoading(false);
      if (email === 'test@test.com' && password === 'password') {
        setSuccess(true);
        setTimeout(() => navigate('/dashboard'), 1500);
      } else {
        setError('Credenciales incorrectas. (Usa: test@test.com / password)');
      }
    }, 1500);
  };

  if (success) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center py-20 px-4">
        <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-8 text-center shadow-2xl">
          <div className="mx-auto w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">¡Bienvenido de vuelta!</h2>
          <p className="text-zinc-400">Redirigiendo a tu panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center py-20 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-white mb-2">Iniciar Sesión</h1>
          <p className="text-zinc-400">Ingresa a tu cuenta para gestionar tus boletos</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">Correo electrónico</label>
              <Input 
                type="email" 
                placeholder="tu@correo.com" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                icon={<Mail className="w-4 h-4" />}
                className="h-12"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-zinc-400">Contraseña</label>
                <Link to="#" className="text-xs text-indigo-400 hover:text-indigo-300">¿Olvidaste tu contraseña?</Link>
              </div>
              <Input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                icon={<Lock className="w-4 h-4" />}
                className="h-12"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 shadow-lg text-base"
              disabled={isLoading}
            >
              {isLoading ? 'Autenticando...' : 'Entrar'}
              {!isLoading && <ArrowRight className="w-4 h-4 ml-2" />}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-zinc-500">
              ¿No tienes una cuenta?{' '}
              <Link to="/register" className="text-indigo-400 hover:text-indigo-300 font-medium">
                Regístrate aquí
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}