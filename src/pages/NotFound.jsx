import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function NotFound() {

  const { t } = useTranslation();

  return (
    <div className="min-h-[calc(100vh-76px)] bg-background flex items-center justify-center p-4">
      <div className="relative">
        <div className="hero-grid absolute inset-0"></div>
        <div className="max-w-md w-full relative">
          <div className="feature-card rounded-lg border bg-card/80 backdrop-blur-sm text-card-foreground p-8 text-center">
            <h1 className="text-[7rem] md:text-[10rem] font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[hsl(var(--accent-purple))] to-[hsl(var(--accent-blue))]">
              404
            </h1>
            <h2 className="text-2xl font-semibold mb-4">{t('notFound.title')}</h2>
            <p className="text-muted-foreground mb-8">
              {t('notFound.description')}
            </p>
            <Link
              to="/"
              className="btn-gradient text-white inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4"
            >
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}