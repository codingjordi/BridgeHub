import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email('auth.error.invalidEmail'),
  password: z.string().min(6, 'auth.error.passwordLength')
})

const registerSchema = z.object({
  email: z.string().email('auth.error.invalidEmail'),
  password: z.string()
    .min(6, 'auth.error.passwordLength')
    .regex(/[A-Z]/, 'auth.error.passwordUppercase')
    .regex(/[0-9]/, 'auth.error.passwordNumber'),
  confirmPassword: z.string(),
  fullName: z.string().min(2, 'auth.error.fullNameLength'),
  username: z.string()
    .min(3, 'auth.error.usernameLength')
    .regex(/^[a-zA-Z0-9_]+$/, 'auth.error.usernameFormat'),
  acceptTerms: z.boolean(),
  acceptNewsletter: z.boolean()
}).refine((data) => data.password === data.confirmPassword, {
  message: 'auth.error.passwordMatch',
  path: ['confirmPassword']
}).refine((data) => data.acceptTerms, {
  message: 'auth.error.acceptTerms',
  path: ['acceptTerms']
})

export default function Auth() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { signIn, signUp, signInWithOAuth, user } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptNewsletter, setAcceptNewsletter] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const x = Math.round((clientX / window.innerWidth) * 100);
      const y = Math.round((clientY / window.innerHeight) * 100);
      
      document.documentElement.style.setProperty('--x', `${x}%`);
      document.documentElement.style.setProperty('--y', `${y}%`);
      document.documentElement.style.setProperty('--x2', `${(x + 30) % 100}%`);
      document.documentElement.style.setProperty('--y2', `${(y + 30) % 100}%`);
      document.documentElement.style.setProperty('--x3', `${(x + 60) % 100}%`);
      document.documentElement.style.setProperty('--y3', `${(y + 60) % 100}%`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      if (isLogin) {
        const result = loginSchema.safeParse({ email, password });
        if (!result.success) {
          const formattedErrors = {};
          result.error.issues.forEach(issue => {
            formattedErrors[issue.path[0]] = t(issue.message);
          });
          setErrors(formattedErrors);
          return;
        }

        setIsLoading(true);
        const { error } = await signIn({ email, password });
        if (error) throw error;
      } else {
        const result = registerSchema.safeParse({
          email,
          password,
          confirmPassword,
          fullName,
          username,
          acceptTerms,
          acceptNewsletter
        });

        if (!result.success) {
          const formattedErrors = {};
          result.error.issues.forEach(issue => {
            formattedErrors[issue.path[0]] = t(issue.message);
          });
          setErrors(formattedErrors);
          return;
        }

        setIsLoading(true);
        const { error } = await signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              username: username,
              newsletter: acceptNewsletter,
            },
          },
        });
        if (error) throw error;
        
        alert(t('auth.error.emailVerification'));
      }
    } catch (error) {
      console.error('Error:', error);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    try {
      const { error } = await signInWithOAuth(provider);
      if (error) throw error;
    } catch (error) {
      console.error('Error:', error);
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="relative min-h-[calc(100vh-73px)] flex items-center justify-center p-4">
        <div className="hero-grid absolute inset-0"></div>
        <div className="w-full max-w-md relative">
          <div className=" rounded-lg border bg-card/80 backdrop-blur-sm text-card-foreground shadow-lg">
            <div className="p-6 space-y-1">
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[hsl(var(--accent-purple))] to-[hsl(var(--accent-blue))]">
                {t('auth.welcome')}
              </h1>
              <p className="text-sm text-muted-foreground">
                {isLogin ? t('auth.loginDescription') : t('auth.registerDescription')}
              </p>
            </div>
            <div className="p-6 pt-0">
              <div className="flex space-x-2 mb-6">
                <button
                  className={`flex-1 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 ${
                    isLogin
                      ? 'btn-gradient text-white'
                      : 'border border-input bg-background/50 hover:bg-accent hover:text-accent-foreground'
                  }`}
                  onClick={() => setIsLogin(true)}
                >
                  {t('auth.login')}
                </button>
                <button
                  className={`flex-1 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 ${
                    !isLogin
                      ? 'btn-gradient text-white'
                      : 'border border-input bg-background/50 hover:bg-accent hover:text-accent-foreground'
                  }`}
                  onClick={() => setIsLogin(false)}
                >
                  {t('auth.register')}
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {!isLogin && (
                  <>
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        {t('auth.fullName')}
                      </label>
                      <input
                        id="name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background/50 backdrop-blur-sm px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="John Doe"
                      />
                      {errors.fullName && (
                        <p className="text-sm text-red-500 mt-1">{errors.fullName}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="username" className="text-sm font-medium">
                        {t('auth.username')}
                      </label>
                      <input
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background/50 backdrop-blur-sm px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="johndoe"
                      />
                      {errors.username && (
                        <p className="text-sm text-red-500 mt-1">{errors.username}</p>
                      )}
                    </div>
                  </>
                )}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    {t('auth.email')}
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background/50 backdrop-blur-sm px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="m@example.com"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-4 md:space-y-0 md:flex md:gap-4">
                  <div className="flex-1 space-y-2">
                    <label htmlFor="password" className="text-sm font-medium">
                      {t('auth.password')}
                    </label>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background/50 backdrop-blur-sm px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    {errors.password && (
                      <p className="text-sm text-red-500 mt-1">{errors.password}</p>
                    )}
                  </div>

                  {!isLogin && (
                    <div className="flex-1 space-y-2">
                      <label htmlFor="confirmPassword" className="text-sm font-medium">
                        {t('auth.confirmPassword')}
                      </label>
                      <input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background/50 backdrop-blur-sm px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                      {errors.confirmPassword && (
                        <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>
                      )}
                    </div>
                  )}
                </div>

                {!isLogin && (
                  <>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={acceptTerms}
                          onChange={(e) => setAcceptTerms(e.target.checked)}
                          className="h-4 w-4 rounded border-input"
                        />
                        {errors.acceptTerms && (
                          <p className="text-sm text-red-500 mt-1">{errors.acceptTerms}</p>
                        )}
                        <span className="text-sm">
                          {t('auth.acceptTerms')} <a href="/terms" className="text-[hsl(var(--accent-purple))] hover:underline">{t('auth.termsLink')}</a>
                        </span>
                      </label>
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={acceptNewsletter}
                          onChange={(e) => setAcceptNewsletter(e.target.checked)}
                          className="h-4 w-4 rounded border-input"
                        />
                        <span className="text-sm">
                          {t('auth.acceptNewsletter')}
                        </span>
                      </label>
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  className="w-full btn-gradient text-white inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2"
                  disabled={isLoading}
                >
                  {isLoading ? t('auth.loading') : isLogin ? t('auth.signIn') : t('auth.createAccount')}
                </button>

                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t"></span>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      {t('auth.continueWith')}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleSocialLogin('github')}
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-[#24292e] hover:bg-[#2f363d] text-white h-10 px-4 py-2"
                  >
                    GitHub
                    <svg className="ml-2 h-5 w-5" viewBox="0 0 438.549 438.549" fill="currentColor">
                      <path d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"/>
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSocialLogin('discord')}
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-[#5865F2] hover:bg-[#4752C4] text-white h-10 px-4 py-2"
                  >
                    Discord
                    <svg className="ml-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                    </svg>
                  </button>
  
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}