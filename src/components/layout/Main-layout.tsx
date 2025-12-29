import Sidebar from './Sidebar';
import Topbar from './Topbar';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Sidebar />
      <Topbar />
      <main className="ml-64 mt-16 p-6 border-l border-slate-200 dark:border-slate-800">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
