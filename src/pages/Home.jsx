import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Code2, Users, Briefcase, CheckCircle2, ArrowRight } from 'lucide-react'
import { useEffect } from 'react'
import StepCard from '../components/StepCard';
import BenefitCard from '../components/BenefitCard';

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
      {/* Hero */}
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




      {/* Benefits */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[hsl(var(--accent-purple))] to-[hsl(var(--accent-blue))]">
            {t('benefits.title')}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <BenefitCard benefitNumber={1} checkColor={'text-[hsl(var(--accent-purple))]'} />
            <BenefitCard benefitNumber={2} checkColor={'text-[hsl(var(--accent-blue))]'} />
            <BenefitCard benefitNumber={3} checkColor={'text-[hsl(var(--accent-blue))]'} />
            <BenefitCard benefitNumber={4} checkColor={'text-[hsl(var(--accent-purple))]'} /> 
          </div>
        </div>
      </section>

      {/* How it works  */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[hsl(var(--accent-purple))] to-[hsl(var(--accent-blue))]">
            {t('howItWorks.title')}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative">
              <StepCard stepNumber={1} backgroundColor={'bg-[hsl(var(--accent-purple))]'}/>
            </div>
            <div className="relative">
              <StepCard stepNumber={2} backgroundColor={'bg-[hsl(var(--accent-blue))]'}/>
            </div>
            <div className="relative">
              <StepCard stepNumber={3} backgroundColor={'bg-[hsl(var(--accent-cyan))]'}/>
            </div>
          </div>
        </div>
      </section>

      

      {/* CTA */}
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