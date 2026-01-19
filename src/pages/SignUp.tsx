import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';

const SignUp = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (!email || !password) {
      setError('Email and password are required');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    const { error } = await signUp(email, password, fullName || undefined);
    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setSuccess('Account created. Check your email to confirm your address.');
    setTimeout(() => {
      navigate('/login');
    }, 2500);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative bg-cover bg-center bg-no-repeat church-background"
    >
      <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-black/60"></div>
      
      <div className="relative z-10 w-full max-w-md px-4">
        <div className="backdrop-blur-sm bg-black/10 rounded-3xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-3 tracking-tight drop-shadow-lg">Create an account</h1>
            <p className="text-white/90 text-lg leading-relaxed drop-shadow-md">
              Sign up to access the Parish Dashboard.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="rounded-lg bg-red-500/90 border border-red-400/50 px-4 py-3 text-sm text-white backdrop-blur-sm">
                {error}
              </div>
            )}
            {success && (
              <div className="rounded-lg bg-emerald-500/90 border border-emerald-400/50 px-4 py-3 text-sm text-white backdrop-blur-sm">
                {success}
              </div>
            )}

            <div>
              <label className="block text-sm font-normal text-white/90 mb-2" htmlFor="fullName">
                Full name
              </label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-white/30 bg-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/70 transition-all duration-150 ease-out backdrop-blur-sm"
                placeholder="Your full name"
                autoComplete="name"
              />
            </div>

            <div>
              <label className="block text-sm font-normal text-white/90 mb-2" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-white/30 bg-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/70 transition-all duration-150 ease-out backdrop-blur-sm"
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>

            <div>
              <label className="block text-sm font-normal text-white/90 mb-2" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-white/30 bg-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/70 transition-all duration-150 ease-out backdrop-blur-sm"
                autoComplete="new-password"
              />
            </div>

            <div>
              <label
                className="block text-sm font-normal text-white/90 mb-2"
                htmlFor="confirmPassword"
              >
                Confirm password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-white/30 bg-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/70 transition-all duration-150 ease-out backdrop-blur-sm"
                autoComplete="new-password"
              />
            </div>

            <Button
              type="submit"
              className="w-full justify-center bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-xl transition-all duration-150 ease-out shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              loading={loading}
            >
              Create account
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/20">
            <p className="text-sm text-center text-white/80">
              Already have an account?{' '}
              <Link to="/login" className="text-white hover:text-yellow-400 font-medium transition-colors duration-150">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;


