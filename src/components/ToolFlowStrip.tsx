import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface Step {
  label: string;
  path: string;
  key: string;
}

const STEPS: Step[] = [
  { key: 'validace', label: 'Ověr nápad', path: '/validace' },
  { key: 'kalkulacka', label: 'Kalkulačka', path: '/kalkulacka' },
  { key: 'vyber-platformy', label: 'Výběr platformy', path: '/vyber-platformy' },
  { key: 'diagnostika', label: 'Diagnostika', path: '/diagnostika' },
  { key: 'roi-kalkulacka', label: 'ROI', path: '/roi-kalkulacka' },
  { key: 'checklist', label: 'Checklist', path: '/checklist' },
];

interface ToolFlowStripProps {
  current: string;
}

export const ToolFlowStrip = ({ current }: ToolFlowStripProps) => {
  return (
    <div className="max-w-4xl mx-auto mb-6">
      <p className="text-sm text-brand-wine/70 mb-2">
        <span className="font-semibold text-brand-wine">Jak nástroje navazují:</span>{' '}
        Každý nástroj reší jeden krok. Tady jsi u výpočtu, jestli se ti to vyplatí.
      </p>

      <div className="overflow-x-auto -mx-1 px-1 pb-1">
        <div className="flex items-center gap-1 min-w-max">
          {STEPS.map((step, index) => {
            const isActive = step.key === current;
            return (
              <div key={step.key} className="flex items-center gap-1">
                <Link
                  to={step.path}
                  className={
                    isActive
                      ? 'flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-brand-wine text-white shadow-sm whitespace-nowrap'
                      : 'flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-brand-light-pink/60 text-brand-wine/60 hover:bg-brand-light-pink hover:text-brand-wine transition-colors whitespace-nowrap'
                  }
                >
                  {step.label}
                </Link>
                {index < STEPS.length - 1 && (
                  <ChevronRight className="w-3 h-3 text-brand-wine/30 flex-shrink-0" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
