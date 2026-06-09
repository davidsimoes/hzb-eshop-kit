import { Star, TrendingUp, Heart, Lightbulb, Trophy } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useChecklistAnalytics } from '@/hooks/useChecklistAnalytics';
import { ChecklistProgress } from '@/hooks/useChecklist';

interface ChecklistInsightsProps {
  progress: ChecklistProgress;
}

export const ChecklistInsights = ({ progress }: ChecklistInsightsProps) => {
  const { t } = useTranslation();
  const { analytics, getInsights } = useChecklistAnalytics(progress);
  const insights = getInsights();

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'success': return <Trophy className="w-5 h-5 text-brand-orange" />;
      case 'progress': return <TrendingUp className="w-5 h-5 text-brand-wine" />;
      case 'encouragement': return <Heart className="w-5 h-5 text-brand-pink" />;
      case 'tip': return <Lightbulb className="w-5 h-5 text-brand-wine" />;
      default: return <Star className="w-5 h-5 text-brand-orange" />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'success': return 'bg-brand-orange/10 border-brand-orange/20';
      case 'progress': return 'bg-brand-wine/10 border-brand-wine/20';
      case 'encouragement': return 'bg-brand-pink/10 border-brand-pink/20';
      case 'tip': return 'bg-brand-wine/10 border-brand-wine/20';
      default: return 'bg-brand-orange/10 border-brand-orange/20';
    }
  };

  if (insights.length === 0) return null;

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          {t('checklist.insights.title')}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {t('checklist.insights.description')}
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        {insights.map((insight, index) => (
          <div 
            key={index}
            className={`p-3 rounded-lg border ${getInsightColor(insight.type)} animate-fade-in`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start gap-3">
              {getInsightIcon(insight.type)}
              <p className="text-sm text-foreground flex-1">
                {insight.message}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

interface TaskDifficultyRatingProps {
  taskId: string;
  onRate: (taskId: string, difficulty: number) => void;
}

export const TaskDifficultyRating = ({ taskId, onRate }: TaskDifficultyRatingProps) => {
  const { t } = useTranslation();

  return (
    <div className="mt-2 p-3 bg-muted/50 rounded-md">
      <h4 className="text-sm font-medium mb-2">
        {t('checklist.insights.difficulty.title')}
      </h4>
      <p className="text-xs text-muted-foreground mb-2">
        {t('checklist.insights.difficulty.description')}
      </p>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map(rating => (
          <Button
            key={rating}
            variant="ghost"
            size="sm"
            onClick={() => onRate(taskId, rating)}
            className="p-1 h-auto hover:bg-brand-orange/20"
          >
            <Star className="w-4 h-4" />
          </Button>
        ))}
      </div>
    </div>
  );
};