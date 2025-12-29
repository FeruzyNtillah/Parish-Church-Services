import { Home, Info, Briefcase, Calendar, Target } from 'lucide-react';

interface NavItem {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
}

const navItems: NavItem[] = [
  { label: 'Home', icon: Home, path: '/' },
  { label: 'About', icon: Info, path: '/about' },
  { label: 'Services', icon: Briefcase, path: '/services' },
  { label: 'Sessions', icon: Calendar, path: '/sessions' },
  { label: 'Mission', icon: Target, path: '/mission' },
];

const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 shadow-sm z-40">
      <div className="flex flex-col h-full">
        {/* Logo/Brand Section */}
        <div className="h-16 flex items-center justify-center border-b border-slate-200 dark:border-slate-800 px-4 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-slate-800 dark:to-slate-900">
          <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400 bg-clip-text text-transparent">
            Perish Church
          </h1>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.path}
                href={item.path}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-slate-800 transition-all duration-200 group hover:shadow-sm"
              >
                <Icon className="w-5 h-5 text-slate-500 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                <span className="font-medium group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {item.label}
                </span>
              </a>
            );
          })}
        </nav>

        {/* Footer Section */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
            © 2024 Perish Church
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
