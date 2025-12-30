import { ThemeProvider } from './contexts/ThemeContext';
import MainLayout from './components/layout/Main-layout';

function App() {
  return (
    <ThemeProvider>
      <MainLayout>
        <div className="p-6">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Welcome to Sahili Church
          </h1>
          <p className="text-muted-foreground">
            Your content goes here...
          </p>
        </div>
      </MainLayout>
    </ThemeProvider>
  );
}

export default App;
