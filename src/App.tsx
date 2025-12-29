import { ThemeProvider } from './contexts/ThemeContext';
import MainLayout from './components/layout/Main-layout';

function App() {
  return (
    <ThemeProvider>
      <MainLayout>
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome to Perish Church
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Your content goes here...
          </p>
        </div>
      </MainLayout>
    </ThemeProvider>
  );
}

export default App;

