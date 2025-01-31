import { useTranslation } from 'react-i18next';

export function FooterLanguageToggle() {
  const { i18n } = useTranslation();

  const toggleLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="flex gap-2 items-center">
      <button
        onClick={() => toggleLanguage('es')}
        className={`text-sm ${i18n.language === 'es' ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-foreground'}`}
      >
        Español
      </button>
      <span className="text-muted-foreground">•</span>
      <button
        onClick={() => toggleLanguage('en')}
        className={`text-sm ${i18n.language === 'en' ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-foreground'}`}
      >
        English
      </button>
    </div>
  );
}