import { Home, CalendarCheck, BookOpen, Heart, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NavItem {
  label?: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
}

const navItems: NavItem[] = [
  { label: 'Home', icon: Home, path: '/' },
  { label: 'Events', icon: CalendarCheck, path: '/events' },
  { label: 'Sermons', icon: BookOpen, path: '/sermons' },
  { label: 'Donations', icon: Heart, path: '/donations' },
  // Families nav item (icon + label) routing to /family
  { label: 'Family', icon: Users, path: '/family' },
];

const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-card shadow-sm z-40 border-r border-border">
      <div className="flex flex-col h-full">
        {/* Logo/Brand Section */}
        <div className="h-16 flex items-center justify-center px-4">
          <h1 className="text-xl font-bold bg-linear-to-r from-emerald-600 to-emerald-700 dark:from-emerald-400 dark:to-emerald-500 bg-clip-text text-transparent">
            Sahili Church
          </h1>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-emerald-50 dark:hover:bg-emerald-950 transition-all duration-200 group hover:shadow-sm"
              >
                <Icon className="w-5 h-5 text-muted-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors" />
                {item.label && (
                  <span className="font-medium group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer Section */}
        <div className="p-4 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            © 2026 Perish Church
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
