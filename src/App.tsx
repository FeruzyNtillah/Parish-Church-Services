import { ThemeProvider } from './contexts/ThemeContext';
import MainLayout from './components/layout/Main-layout';

function App() {
  return (
    <ThemeProvider>
      <MainLayout>
        <div className="p-6">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Welcome to Perish Church
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Your content goes here...
          </p>
        </div>
      </MainLayout>
    </ThemeProvider>
  );
}

export default App;
