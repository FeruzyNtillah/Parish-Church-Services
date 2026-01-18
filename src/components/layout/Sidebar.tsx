import { Home, CalendarCheck, BookOpen, Heart, Users } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

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
  const location = useLocation();
  
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
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group hover:shadow-sm ${
                  isActive 
                    ? 'text-emerald-500 shadow-md border border-emerald-200' 
                    : 'text-muted-foreground border border-transparent hover:shadow-sm'
                }`}
                style={{
                  '--hover-bg': 'oklch(55.1% 0.027 264.364)',
                  '--hover-text': 'oklch(55.1% 0.027 264.364)'
                } as React.CSSProperties}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'oklch(55.1% 0.027 264.364 / 0.1)';
                    e.currentTarget.style.color = 'oklch(55.1% 0.027 264.364)';
                    e.currentTarget.style.borderColor = 'oklch(55.1% 0.027 264.364 / 0.2)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = '';
                    e.currentTarget.style.color = '';
                    e.currentTarget.style.borderColor = '';
                  }
                }}
              >
                <Icon className={`w-5 h-5 transition-colors ${
                  isActive 
                    ? 'text-emerald-500' 
                    : 'text-muted-foreground'
                }`} />
                {item.label && (
                  <span className={`font-medium transition-colors ${
                    isActive 
                      ? 'text-emerald-500' 
                      : ''
                  }`}>
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