import { useTranslation } from 'react-i18next';
import { CheckCircle2 } from 'lucide-react'


export default function BenefitCard({ benefitNumber, checkColor }) {

    const { t } = useTranslation();
    
    return(
        <div className="feature-card rounded-lg border bg-card text-card-foreground shadow-sm p-6">
              <div className="flex gap-4 items-start">
                <CheckCircle2 className={`w-6 h-6 ${checkColor} mt-1`}/>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{t(`benefits.benefit${benefitNumber}.title`)}</h3>
                  <p className="text-muted-foreground">{t(`benefits.benefit${benefitNumber}.description`)}</p>
                </div>
              </div>
            </div>
    );
}

// text-[hsl(var(--accent-purple))]