import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Header } from '@/components/Header/Header';
import { Breadcrumb } from '@/components/Navigation/Breadcrumb';
import { useChecklist } from '@/hooks/useChecklist';
import { checklistData, ChecklistItem } from '@/data/checklistData';
import { CheckSquare, Square, Clock, RotateCcw, ExternalLink, ChevronDown, ChevronUp, BookOpen } from 'lucide-react';
import { ToolFlowStrip } from '@/components/ToolFlowStrip';
import { MetaTags } from '@/components/SEO/MetaTags';
export const Checklist = () => {
  const { t, i18n } = useTranslation();
  const {
    progress,
    toggleItem,
    updateNotes,
    stats,
    resetProgress
  } = useChecklist();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'low':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };
  const toggleExpanded = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  // Simple task toggle without celebrations for now
  const handleTaskToggle = (itemId: string) => {
    toggleItem(itemId);
  };
  const ChecklistItemComponent = ({
    item
  }: {
    item: ChecklistItem;
  }) => {
    const isCompleted = progress[item.id]?.completed || false;
    const isExpanded = expandedItems.has(item.id);
    const [localNotes, setLocalNotes] = useState(progress[item.id]?.notes || '');

    // Update local state when progress changes
    useEffect(() => {
      setLocalNotes(progress[item.id]?.notes || '');
    }, [progress[item.id]?.notes]);

    // Debounced update to avoid losing focus
    useEffect(() => {
      const timer = setTimeout(() => {
        if (localNotes !== (progress[item.id]?.notes || '')) {
          updateNotes(item.id, localNotes);
        }
      }, 500);

      return () => clearTimeout(timer);
    }, [localNotes, item.id]);
    return <Card className={`mb-2 transition-all duration-300 hover:shadow-md ${isCompleted ? 'bg-green-50 border-green-200 animate-scale-in' : 'hover:shadow-sm'}`}>
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <button onClick={() => handleTaskToggle(item.id)} className={`mt-1 w-5 h-5 rounded flex-shrink-0 transition-all duration-200 hover:scale-110 ${isCompleted ? 'text-green-600' : 'text-gray-400 hover:text-gray-600'}`}>
              {isCompleted ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5" />}
            </button>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <Badge className={`${getPriorityColor(item.priority)} text-xs`}>
                      {t(`checklist.priority.${item.priority}`)}
                    </Badge>
                    <Badge variant="outline" className="text-xs text-gray-600">
                      <Clock className="w-3 h-3 mr-1" />
                      {t(item.estimatedTimeKey)}
                    </Badge>
                  </div>
                  <h3 className={`font-medium text-base ${isCompleted ? 'line-through text-gray-600' : 'text-gray-900'}`}>
                    {t(item.titleKey)}
                  </h3>
                </div>
                <button onClick={() => toggleExpanded(item.id)} className="text-gray-400 hover:text-gray-600 p-1 transition-all duration-200 hover:scale-110">
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>
              
              <p className={`text-sm mb-2 ${isCompleted ? 'text-gray-500' : 'text-gray-700'}`}>
                {t(item.descriptionKey)}
              </p>

              {item.tipsKey && <div className="mb-3 p-2 bg-blue-50 rounded text-sm text-blue-800">
                  <strong>{t('checklist.tip')}</strong> {t(item.tipsKey)}
                </div>}

              {/* Legal resources for Day 3 legal tasks */}
              {item.id === 'day-3-legal-docs' && (
                <div className="mb-3 p-3 bg-amber-50 border border-amber-200 rounded text-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <ExternalLink className="w-4 h-4 text-amber-600" />
                    <strong className="text-amber-800">{t('checklist.legalResources.title')}</strong>
                  </div>
                  <p className="text-amber-700 mb-2">{t('checklist.legalResources.description')}</p>
                  <Button asChild variant="outline" size="sm" className="border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white">
                    <a href="https://elegal.cz/nase-specializace?oblast=pravo-v-e-commerce" target="_blank" rel="noopener noreferrer">
                      {t('checklist.legalResources.button')}
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </div>
              )}

              {isExpanded && <div className="mt-3 pt-3 border-t animate-fade-in">
                  <Textarea 
                    value={localNotes} 
                    onChange={e => setLocalNotes(e.target.value)} 
                    placeholder={t('checklist.notes.placeholder')} 
                    className="min-h-[60px] text-sm transition-all duration-200 focus:scale-[1.02]" 
                  />
                </div>}
            </div>
          </div>
        </CardContent>
      </Card>;
  };

  // Group tasks by day
  const tasksByDay = checklistData.reduce((acc, item) => {
    if (!acc[item.day]) {
      acc[item.day] = [];
    }
    acc[item.day].push(item);
    return acc;
  }, {} as Record<number, ChecklistItem[]>);

  // Get sorted days
  const sortedDays = Object.keys(tasksByDay).map(Number).sort((a, b) => a - b);
  return <div className="min-h-screen bg-gray-50">
      <MetaTags
        title="15denní checklist pro spuštění e-shopu"
        description="Odškrtávej krok po kroku vše, co potřebuješ před spuštěním e-shopu: právo, platby, dopravu, GDPR, obsah i technické nastavení."
      />
      <Header />
      <main id="main-content" className="container mx-auto px-4 py-8">
        <Breadcrumb />
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-brand-wine mb-4">
            {t('checklist.title')}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t('checklist.subtitle')}
          </p>
        </div>

        <ToolFlowStrip current="checklist" />

        {/* Google Slides Reference */}
        <div className="max-w-2xl mx-auto mb-8">
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-blue-900">{t('checklist.guide.title')}</h3>
              </div>
              <p className="text-sm text-blue-700 mb-3">
                {t('checklist.guide.description')}
              </p>
              <Button asChild variant="outline" size="sm" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                <Link to="/prezentace">
                  <BookOpen className="w-4 h-4 mr-2" />
                  {t('checklist.guide.button')}
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Simple Stats and Progress */}
        <div className="max-w-2xl mx-auto mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-2xl font-bold text-brand-wine">{stats.completed}</div>
                  <div className="text-sm text-gray-600">{t('checklist.progress.completed', 'of {{total}} completed', { total: stats.total })}</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-brand-wine">{stats.completionRate.toFixed(0)}%</div>
                  <div className="text-sm text-gray-600">{t('checklist.progress.done')}</div>
                </div>
              </div>
              <Progress value={stats.completionRate} className="mb-4" />
              <div className="flex gap-2 justify-center">
                <Button onClick={resetProgress} size="sm" variant="outline">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  {t('checklist.actions.reset')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Task List Grouped by Days */}
        <div className="max-w-4xl mx-auto">
          {sortedDays.map(day => {
          const dayTasks = tasksByDay[day];
          const completedTasks = dayTasks.filter(task => progress[task.id]?.completed).length;
          const totalTasks = dayTasks.length;
          const completionPercentage = totalTasks > 0 ? completedTasks / totalTasks * 100 : 0;
          return <div key={day} className="mb-8 animate-fade-in">
                {/* Day Header */}
                <div className="mb-4">
                  <Card className={`transition-all duration-300 hover:shadow-md ${completionPercentage === 100 ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'}`}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${completionPercentage === 100 ? 'bg-green-500' : 'bg-brand-wine'}`}>
                            {day}
                          </div>
                          <div>
                            <h2 className="text-xl font-bold text-brand-wine">{t('checklist.day.title', 'Day {{day}}', { day })}</h2>
                            <p className="text-sm text-gray-600">
                              {t('checklist.day.progress', '{{completed}}/{{total}} tasks completed', { completed: completedTasks, total: totalTasks })}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-brand-wine">
                            {completionPercentage.toFixed(0)}%
                          </div>
                          <div className="text-sm text-gray-600">{t('checklist.progress.done')}</div>
                        </div>
                      </div>
                      <div className="mt-3">
                        <Progress value={completionPercentage} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Day Tasks */}
                <div className="ml-4 border-l-2 border-gray-200 pl-6">
                  {dayTasks.map(item => <ChecklistItemComponent key={item.id} item={item} />)}
                </div>
              </div>;
        })}
        </div>
      </main>
    </div>;
};
export default Checklist;