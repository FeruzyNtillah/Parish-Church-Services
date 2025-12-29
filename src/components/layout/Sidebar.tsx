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
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shadow-sm z-40">
      <div className="flex flex-col h-full">
        {/* Logo/Brand Section */}
        <div className="h-16 flex items-center justify-center border-b border-gray-200 dark:border-gray-800 px-4">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
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
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 group"
              >
                <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                <span className="font-medium">{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Footer Section */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            © 2024 Perish Church
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

