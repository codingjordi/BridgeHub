import { Routes, Route, useNavigate, BrowserRouter } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import ProtectedRoute from './components/ProtectedRoute'
import { Toaster } from "@/components/ui/toaster"
import Home from './pages/Home'
import AuthenticatedHome from './pages/AuthenticatedHome'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import CreateProject from './pages/CreateProject'
import Profile from './pages/Profile'
import Auth from './pages/Auth'
import Terms from './pages/Terms'
import NotFound from './pages/NotFound'
import Layout from './layout/Layout'

function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/');
  }, [navigate]);

  return null;
}

function App() {
  const { user } = useAuth();

  return (
    <div>
      <main className="flex-1">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={user ? <AuthenticatedHome /> : <Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route
              path="/projects/create"
              element={
                <ProtectedRoute>
                  <CreateProject />
                </ProtectedRoute>
              }
            />
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
        </BrowserRouter>
      </main>
      <Toaster />
    </div>
  );
}

export default App;