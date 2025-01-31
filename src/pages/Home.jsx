import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Code2, Users, Briefcase, CheckCircle2, ArrowRight } from 'lucide-react'
import { useEffect } from 'react'

export default function Home() {
  const { t } = useTranslation();

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

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="hero-grid absolute inset-0"></div>
        <div className="max-w-4xl mx-auto relative">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[hsl(var(--accent-purple))] via-[hsl(var(--accent-blue))] to-[hsl(var(--accent-cyan))]">
            {t('hero.title')}
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            {t('hero.description')}
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/projects"
              className="btn-gradient text-white inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-11 px-8"
            >
              {t('hero.explore')}
            </Link>
            <Link
              to="/auth"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8"
            >
              {t('hero.start')}
            </Link>
          </div>
        </div>
      </section>




      {/* Benefits Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[hsl(var(--accent-purple))] to-[hsl(var(--accent-blue))]">
            {t('benefits.title')}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="feature-card rounded-lg border bg-card text-card-foreground shadow-sm p-6">
              <div className="flex gap-4 items-start">
                <CheckCircle2 className="w-6 h-6 text-[hsl(var(--accent-purple))] mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">{t('benefits.practical.title')}</h3>
                  <p className="text-muted-foreground">{t('benefits.practical.description')}</p>
                </div>
              </div>
            </div>
            <div className="feature-card rounded-lg border bg-card text-card-foreground shadow-sm p-6">
              <div className="flex gap-4 items-start">
                <CheckCircle2 className="w-6 h-6 text-[hsl(var(--accent-blue))] mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">{t('benefits.networking.title')}</h3>
                  <p className="text-muted-foreground">{t('benefits.networking.description')}</p>
                </div>
              </div>
            </div>
            <div className="feature-card rounded-lg border bg-card text-card-foreground shadow-sm p-6">
              <div className="flex gap-4 items-start">
                <CheckCircle2 className="w-6 h-6 text-[hsl(var(--accent-cyan))] mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">{t('benefits.portfolio.title')}</h3>
                  <p className="text-muted-foreground">{t('benefits.portfolio.description')}</p>
                </div>
              </div>
            </div>
            <div className="feature-card rounded-lg border bg-card text-card-foreground shadow-sm p-6">
              <div className="flex gap-4 items-start">
                <CheckCircle2 className="w-6 h-6 text-[hsl(var(--accent-purple))] mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">{t('benefits.learning.title')}</h3>
                  <p className="text-muted-foreground">{t('benefits.learning.description')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      

      {/* How It Works Section */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[hsl(var(--accent-purple))] to-[hsl(var(--accent-blue))]">
            {t('howItWorks.title')}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="feature-card rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                <div className="w-12 h-12 rounded-full bg-[hsl(var(--accent-purple))] text-white flex items-center justify-center text-xl font-bold mb-4">1</div>
                <h3 className="text-xl font-semibold mb-2">{t('howItWorks.step1.title')}</h3>
                <p className="text-muted-foreground">{t('howItWorks.step1.description')}</p>
              </div>
              
            </div>
            <div className="relative">
              <div className="feature-card rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                <div className="w-12 h-12 rounded-full bg-[hsl(var(--accent-blue))] text-white flex items-center justify-center text-xl font-bold mb-4">2</div>
                <h3 className="text-xl font-semibold mb-2">{t('howItWorks.step2.title')}</h3>
                <p className="text-muted-foreground">{t('howItWorks.step2.description')}</p>
              </div>
              
            </div>
            <div className="feature-card rounded-lg border bg-card text-card-foreground shadow-sm p-6">
              <div className="w-12 h-12 rounded-full bg-[hsl(var(--accent-cyan))] text-white flex items-center justify-center text-xl font-bold mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">{t('howItWorks.step3.title')}</h3>
              <p className="text-muted-foreground">{t('howItWorks.step3.description')}</p>
            </div>
          </div>
        </div>
      </section>

      

      {/* CTA Section */}
      <section className="py-20 px-4 bg-background relative overflow-hidden">
        <div className="hero-grid absolute inset-0"></div>
        <div className="max-w-4xl mx-auto text-center relative">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[hsl(var(--accent-purple))] to-[hsl(var(--accent-blue))]">
            {t('cta.title')}
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            {t('cta.description')}
          </p>
          <Link
            to="/auth"
            className="btn-gradient text-white inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-11 px-8"
          >
            {t('cta.button')}
          </Link>
        </div>
      </section>
    </div>
  )
}