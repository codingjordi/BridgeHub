import { ThemeToggle } from '../components/ThemeToggle.jsx'
import { LanguageToggle } from '../components/LanguageToggle.jsx'
import { Link, useNavigate } from 'react-router-dom'
import { Menu } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@/hooks/useAuth.js'
import { useState, useEffect } from 'react'
import { supabase } from '@/services/supabase.js'
import { useProfile } from '@/hooks/useProfile.js'

export default function Header() {


  const { t } = useTranslation();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchUserProfile();
    }
  }, [user]);

  const [userProfile, setUserProfile] = useState(null);
  const defaultAvatarUrl = 'https://avvekmzjzxuqnrrxgukg.supabase.co/storage/v1/object/public/public_bucket/space_invader_icon.png';

  const fetchUserProfile = async () => {
    try {

      if (!user) {
        setUserProfile(null);
        return;
      }

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      setUserProfile(profile);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setUserProfile(null);
    }
  };


  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="border-b top-0 sticky z-10 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <a href="/" className="text-xl font-bold">{t('app.name')}</a>
        <div className="flex items-center gap-4">

          {user ? (
            <div className="flex items-center gap-2">
              <LanguageToggle />
                <ThemeToggle />
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
                  <DropdownMenuItem onSelect={() => navigate(`/profile/${userProfile.username}`)}>
                    {t('app.menu.profile')}
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => navigate('/projects')}>
                    {t('app.menu.explore')}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
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

              <div className="hidden md:flex items-center gap-4">
                <LanguageToggle />
                <ThemeToggle />
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
              <div className="block md:hidden">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Menu className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="md:w-auto w-screen h-[100vh] mt-0">
                    <DropdownMenuItem>
                      <div className="w-full flex justify-between items-center">
                        <LanguageToggle />
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <div className="w-full flex justify-between items-center">
                        <ThemeToggle />
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={() => navigate('/auth')} className="text-sm font-medium hover:text-primary">
                      {t('app.auth.signIn')}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={() => {
                        navigate('/auth');
                        window.localStorage.setItem('authMode', 'register');
                      }}
                      className="btn-gradient text-white inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 px-4"
                    >
                      {t('app.auth.createAccount')}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
