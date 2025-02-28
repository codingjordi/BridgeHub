import { useTranslation } from "react-i18next";

export default function StepCard({ stepNumber, backgroundColor }) {
    // Validate prop types
    if (typeof stepNumber !== 'number' || typeof backgroundColor !== 'string') {
        throw new Error('backgroundColor must be a string and stepNumber must be a number');
    }
    if (stepNumber < 1 || stepNumber > 3) {
        throw new Error('stepNumber must be a number between 1 and 3');
    }

    const { t } = useTranslation();

    return (
        <div className="feature-card rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className={`w-12 h-12 rounded-full ${backgroundColor} text-white flex items-center justify-center text-xl font-bold mb-4`}>{stepNumber}</div>
            <h3 className="text-xl font-semibold mb-2">{t(`howItWorks.step${stepNumber}.title`)}</h3>
            <p className="min-h-[48px] text-muted-foreground">{t(`howItWorks.step${stepNumber}.description`)}</p>
        </div>
    );
}

