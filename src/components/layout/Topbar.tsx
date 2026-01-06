import { Bell, LogOut, Settings, Sun, Moon, Church } from 'lucide-react';
import { useTheme } from '../../contexts/themeStore';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Topbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Failed to sign out', error);
    }
  };

  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-background border-b border-border shadow-sm z-30 backdrop-blur-sm bg-opacity-95">
      <div className="flex items-center justify-between h-full px-6">
        {/* Left Section - Can be used for breadcrumbs or title */}
        <div className="flex items-center">
          <h2 className="text-lg font-semibold text-foreground">
            <Church className="w-6 h-6 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
          </h2>
        </div>

        {/* Right Section - User info and actions */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="relative p-2.5 rounded-lg text-muted-foreground hover:bg-emerald-50 dark:hover:bg-emerald-950 transition-all duration-200 hover:text-emerald-600 dark:hover:text-emerald-400 hover:shadow-sm"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5" strokeWidth={2} />
            ) : (
              <Sun className="w-5 h-5" strokeWidth={2} />
            )}
          </button>

          {/* Notifications */}
          <button
            className="relative p-2.5 rounded-lg text-muted-foreground hover:bg-emerald-50 dark:hover:bg-emerald-950 transition-all duration-200 hover:text-emerald-600 dark:hover:text-emerald-400 hover:shadow-sm"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" strokeWidth={2} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 dark:bg-red-400 rounded-full ring-2 ring-background"></span>
          </button>

          {/* Settings */}
          <button
            className="p-2.5 rounded-lg text-muted-foreground hover:bg-emerald-50 dark:hover:bg-emerald-950 transition-all duration-200 hover:text-emerald-600 dark:hover:text-emerald-400 hover:shadow-sm"
            aria-label="Settings"
          >
            <Settings className="w-5 h-5" strokeWidth={2} />
          </button>

          {/* User Email */}
          {user && (
            <span className="hidden sm:inline text-sm text-muted-foreground max-w-xs truncate">
              {user.email}
            </span>
          )}

          {/* Logout Button */}
          <button
            type="button"
            onClick={handleLogout}
            className="p-2.5 rounded-lg text-muted-foreground hover:bg-red-50 dark:hover:bg-red-950 transition-all duration-200 hover:text-red-600 dark:hover:text-red-400 hover:shadow-sm flex items-center gap-1"
            aria-label="Sign out"
          >
            <LogOut className="w-5 h-5" strokeWidth={2} />
            <span className="hidden sm:inline text-sm font-medium">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
