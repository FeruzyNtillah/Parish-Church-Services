import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import MainLayout from './components/layout/Main-layout';
import Home from './pages/Home';
import Events from './pages/Events';
import Sermons from './pages/Sermons';
import Donations from './pages/Donations';
import Family from './pages/family';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import SignUp from './pages/SignUp';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public auth routes (no main layout) */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* Protected app routes */}
            <Route
              path="/*"
              element={(
                <ProtectedRoute>
                  <MainLayout>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/events" element={<Events />} />
                      <Route path="/sermons" element={<Sermons />} />
                      <Route path="/donations" element={<Donations />} />
                      <Route path="/family" element={<Family />} />
                    </Routes>
                  </MainLayout>
                </ProtectedRoute>
              )}
            />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
