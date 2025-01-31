import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'
import { ThemeToggle } from './components/theme-toggle'
import { LanguageToggle } from './components/language-toggle'
import { Footer } from './components/Footer'
import { Menu } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button'

function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/');
  }, [navigate]);

  return null;
}

function App() {
  const { t } = useTranslation();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    if (user) {
      fetchUserProfile();
    }
  }, [user]);

  const fetchUserProfile = async () => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      setUserProfile(profile);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const defaultAvatarUrl = "https://avvekmzjzxuqnrrxgukg.supabase.co/storage/v1/object/public/public_bucket/space_invader_icon.png";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b top-0 sticky z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="/" className="text-xl font-bold">{t('app.name')}</a>
          <div className="flex items-center gap-4">
            <LanguageToggle />
            <ThemeToggle />
            
            {user ? (
              <div className="flex items-center gap-2">
                <div className="p-[2px] rounded-full bg-gradient-to-r from-[hsl(var(--accent-purple))] to-[hsl(var(--accent-blue))]">
                  <img
                    src={user.user_metadata.avatar_url || defaultAvatarUrl}
                    alt="Avatar"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Menu className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      {t('app.menu.greeting', { name: user.user_metadata.full_name?.split(' ')[0] || 'User' })}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={() => navigate(`/profile/${userProfile?.username}`)}>
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => navigate('/settings')}>
                      {t('app.menu.settings')}
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => navigate('/support')}>
                      {t('app.menu.support')}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="my-1" />
                    <DropdownMenuItem onSelect={handleSignOut} className="text-red-500 dark:text-red-400">
                      {t('app.menu.signOut')}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  to="/auth"
                  className="text-sm font-medium hover:text-primary"
                  onClick={() => navigate('/auth')}
                >
                  {t('app.auth.signIn')}
                </Link>
                <Link
                  to="/auth"
                  className="btn-gradient text-white inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 px-4"
                  onClick={() => {
                    navigate('/auth');
                    window.localStorage.setItem('authMode', 'register');
                  }}
                >
                  {t('app.auth.createAccount')}
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>
      <main className="flex-1">
        <Routes>
          <Route path="/" element={user ? <AuthenticatedHome /> : <Home />} />
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
        </Routes>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;