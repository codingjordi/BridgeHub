import { CheckCircle2 } from 'lucide-react';
import { stats } from '@/lib/mock-data';


export function StatCard({ value }) {

    return (
        <div className="feature-card rounded-lg border bg-background/50 backdrop-blur-sm p-4">
            <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[hsl(var(--accent-purple))]" />
                <div>
                    <p className="text-2xl font-bold"></p>
                    <p className="text-sm text-muted-foreground">{t('authenticatedHome.stats.completedProjects')}</p>
                </div>
            </div>
        </div>
    );
}