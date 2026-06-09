import { useEffect, useState } from 'react';
import { CheckCircle, Star, Trophy, PartyPopper } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

interface ChecklistCelebrationProps {
  trigger: boolean;
  type: 'task' | 'day' | 'milestone' | 'completion';
  message?: string;
  onComplete?: () => void;
}

export const ChecklistCelebration = ({ 
  trigger, 
  type, 
  message, 
  onComplete 
}: ChecklistCelebrationProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (trigger) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [trigger, onComplete]);

  if (!isVisible) return null;

  const getIcon = () => {
    switch (type) {
      case 'task': return <CheckCircle className="w-6 h-6" />;
      case 'day': return <Star className="w-6 h-6" />;
      case 'milestone': return <Trophy className="w-6 h-6" />;
      case 'completion': return <PartyPopper className="w-6 h-6" />;
      default: return <CheckCircle className="w-6 h-6" />;
    }
  };

  const getMessage = () => {
    if (message) return message;
    switch (type) {
      case 'task': return t('checklist.celebration.task');
      case 'day': return t('checklist.celebration.day');
      case 'milestone': return t('checklist.celebration.milestone');
      case 'completion': return t('checklist.celebration.completion');
      default: return t('checklist.celebration.task');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div className={cn(
        "bg-brand-orange text-white px-6 py-4 rounded-lg shadow-lg",
        "animate-scale-in flex items-center gap-3",
        "border border-white/20"
      )}>
        <div className="animate-pulse">
          {getIcon()}
        </div>
        <span className="font-medium">{getMessage()}</span>
      </div>
    </div>
  );
};

export const ConfettiAnimation = ({ active }: { active: boolean }) => {
  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "absolute w-3 h-3 animate-bounce",
            i % 4 === 0 && "bg-brand-orange",
            i % 4 === 1 && "bg-brand-pink", 
            i % 4 === 2 && "bg-brand-wine",
            i % 4 === 3 && "bg-brand-light-pink"
          )}
          style={{
            left: `${Math.random() * 100}%`,
            top: `-10px`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${2 + Math.random() * 3}s`
          }}
        />
      ))}
    </div>
  );
};