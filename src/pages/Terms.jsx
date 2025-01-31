import { useTranslation } from 'react-i18next';

export default function Terms() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[hsl(var(--accent-purple))] to-[hsl(var(--accent-blue))]">
          {t('terms.title')}
        </h1>

        <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">{t('terms.section1.title')}</h2>
            <p className="text-muted-foreground mb-4">{t('terms.section1.content')}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">{t('terms.section2.title')}</h2>
            <p className="text-muted-foreground mb-4">{t('terms.section2.content')}</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              {[1, 2, 3, 4, 5].map((item) => (
                <li key={item}>{t(`terms.section2.list.item${item}`)}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">{t('terms.section3.title')}</h2>
            <p className="text-muted-foreground mb-4">{t('terms.section3.content')}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">{t('terms.section4.title')}</h2>
            <p className="text-muted-foreground mb-4">{t('terms.section4.content')}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">{t('terms.section5.title')}</h2>
            <p className="text-muted-foreground mb-4">{t('terms.section5.content')}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">{t('terms.section6.title')}</h2>
            <p className="text-muted-foreground">{t('terms.section6.content')}</p>
          </section>
        </div>
      </div>
    </div>
  );
}