import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { useAuth } from '../contexts/AuthContext';

const ForgotPassword = () => {
  const { sendPasswordReset } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (!email) {
      setError('Email is required');
      setLoading(false);
      return;
    }

    const { error } = await sendPasswordReset(email);
    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setSuccess('Password reset email sent. Please check your inbox.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="pb-2">
          <h1 className="text-2xl font-bold text-foreground text-center">Forgot password</h1>
          <p className="mt-1 text-sm text-muted-foreground text-center">
            Enter your email and we&apos;ll send you a reset link.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-md bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700">
                {error}
              </div>
            )}
            {success && (
              <div className="rounded-md bg-emerald-50 border border-emerald-200 px-3 py-2 text-sm text-emerald-700">
                {success}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>

            <Button
              type="submit"
              className="w-full justify-center"
              loading={loading}
            >
              Send reset link
            </Button>
          </form>

          <div className="mt-4 text-center">
            <Link to="/login" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
              Back to login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;


