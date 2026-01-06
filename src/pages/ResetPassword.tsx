import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { useAuth } from '../contexts/AuthContext';

const ResetPassword = () => {
  const { updatePassword } = useAuth();
  const navigate = useNavigate();
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

    if (!password || !confirmPassword) {
      setError('Please enter and confirm your new password');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    const { error } = await updatePassword(password);
    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setSuccess('Password updated successfully. Redirecting to login...');
    setTimeout(() => navigate('/login'), 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="pb-2">
          <h1 className="text-2xl font-bold text-foreground text-center">Reset password</h1>
          <p className="mt-1 text-sm text-muted-foreground text-center">
            Enter a new password for your account.
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
              <label className="block text-sm font-medium text-foreground mb-1" htmlFor="password">
                New password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500"
                autoComplete="new-password"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-foreground mb-1"
                htmlFor="confirmPassword"
              >
                Confirm new password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500"
                autoComplete="new-password"
              />
            </div>

            <Button
              type="submit"
              className="w-full justify-center"
              loading={loading}
            >
              Update password
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

export default ResetPassword;


