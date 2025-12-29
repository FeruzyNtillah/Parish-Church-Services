import { Bell, User, Settings, Sun, Moon, Church } from 'lucide-react';
import { useTheme } from '../../contexts/themeStore';

const Topbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm z-30 backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95">
      <div className="flex items-center justify-between h-full px-6">
        {/* Left Section - Can be used for breadcrumbs or title */}
        <div className="flex items-center">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            <Church className="w-6 h-6" aria-hidden="true" />
          </h2>
        </div>

        {/* Right Section - Icons */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="relative p-2.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-slate-800 transition-all duration-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:shadow-sm"
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
            className="relative p-2.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-slate-800 transition-all duration-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:shadow-sm"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" strokeWidth={2} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 dark:bg-red-400 rounded-full ring-2 ring-white dark:ring-slate-900"></span>
          </button>

          {/* Settings */}
          <button
            className="p-2.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-slate-800 transition-all duration-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:shadow-sm"
            aria-label="Settings"
          >
            <Settings className="w-5 h-5" strokeWidth={2} />
          </button>

          {/* User Profile */}
          <button
            className="p-2.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-slate-800 transition-all duration-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:shadow-sm"
            aria-label="User profile"
          >
            <User className="w-5 h-5" strokeWidth={2} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
