import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ThemeToggle } from './theme-toggle';
import { FooterLanguageToggle } from './FooterLanguageToggle';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t bg-background">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Company */}
          <div>
            <h3 className="font-semibold mb-3">{t('footer.company')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground">
                  {t('footer.about')}
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-sm text-muted-foreground hover:text-foreground">
                  {t('footer.careers')}
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm text-muted-foreground hover:text-foreground">
                  {t('footer.blog')}
                </Link>
              </li>
              <li>
                <Link to="/press" className="text-sm text-muted-foreground hover:text-foreground">
                  {t('footer.press')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-3">{t('footer.legal')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                  {t('footer.terms')}
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                  {t('footer.privacy')}
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-sm text-muted-foreground hover:text-foreground">
                  {t('footer.cookies')}
                </Link>
              </li>
              <li>
                <Link to="/guidelines" className="text-sm text-muted-foreground hover:text-foreground">
                  {t('footer.guidelines')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-3">{t('footer.support')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-sm text-muted-foreground hover:text-foreground">
                  {t('footer.help')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                  {t('footer.contact')}
                </Link>
              </li>
              <li>
                <Link to="/status" className="text-sm text-muted-foreground hover:text-foreground">
                  {t('footer.status')}
                </Link>
              </li>
              <li>
                <Link to="/feedback" className="text-sm text-muted-foreground hover:text-foreground">
                  {t('footer.feedback')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Preferences */}
          <div>
            <h3 className="font-semibold mb-3">{t('footer.preferences')}</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">{t('footer.theme')}</p>
                <ThemeToggle />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">{t('footer.language')}</p>
                <FooterLanguageToggle />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              {t('footer.copyright')}
            </p>
            <p className="text-sm text-muted-foreground">
              {t('footer.madeWith')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}