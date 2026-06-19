import { useState, useEffect } from 'react';
import { checklistData } from '@/data/checklistData';
import { ChecklistProgress } from '@/hooks/useChecklist';
import * as safeStorage from '@/lib/safeStorage';

interface TaskAnalytics {
  taskId: string;
  completionTime?: number; // Time to complete in milliseconds
  difficulty?: number; // 1-5 star rating
  timeSpent?: number; // Actual time spent
  helpfulnessRating?: number; // 1-5 star rating for task clarity
}

interface DayAnalytics {
  day: number;
  completionRate: number;
  averageTimeToComplete: number;
  difficultTasks: string[];
}

interface ChecklistAnalytics {
  startDate?: Date;
  lastActivity?: Date;
  totalTimeSpent: number;
  completionRate: number;
  difficultDays: number[];
  taskAnalytics: { [taskId: string]: TaskAnalytics };
  dayAnalytics: DayAnalytics[];
}

export const useChecklistAnalytics = (progress: ChecklistProgress) => {
  const [analytics, setAnalytics] = useState<ChecklistAnalytics>(() => {
    const saved = safeStorage.getItem('checklist-analytics');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...parsed,
          startDate: parsed.startDate ? new Date(parsed.startDate) : undefined,
          lastActivity: parsed.lastActivity ? new Date(parsed.lastActivity) : undefined
        };
      } catch {
        return getInitialAnalytics();
      }
    }
    return getInitialAnalytics();
  });

  function getInitialAnalytics(): ChecklistAnalytics {
    return {
      totalTimeSpent: 0,
      completionRate: 0,
      difficultDays: [],
      taskAnalytics: {},
      dayAnalytics: []
    };
  }

  // Save analytics to localStorage
  useEffect(() => {
    safeStorage.setItem('checklist-analytics', JSON.stringify(analytics));
  }, [analytics]);

  // Update analytics when progress changes
  useEffect(() => {
    updateAnalytics();
  }, [progress]);

  const updateAnalytics = () => {
    const completed = Object.values(progress).filter(p => p.completed).length;
    const total = checklistData.length;
    const completionRate = total > 0 ? (completed / total) * 100 : 0;

    // Calculate day analytics
    const dayAnalytics: DayAnalytics[] = [];
    for (let day = 1; day <= 15; day++) {
      const dayTasks = checklistData.filter(task => task.day === day);
      const completedDayTasks = dayTasks.filter(task => progress[task.id]?.completed);
      const dayCompletionRate = dayTasks.length > 0 ? (completedDayTasks.length / dayTasks.length) * 100 : 0;
      
      // Find difficult tasks (those marked with low ratings)
      const difficultTasks = dayTasks
        .filter(task => analytics.taskAnalytics[task.id]?.difficulty && analytics.taskAnalytics[task.id].difficulty! <= 2)
        .map(task => task.id);

      dayAnalytics.push({
        day,
        completionRate: dayCompletionRate,
        averageTimeToComplete: 0, // Could be calculated from completion dates
        difficultTasks
      });
    }

    setAnalytics(prev => ({
      ...prev,
      completionRate,
      dayAnalytics,
      lastActivity: new Date(),
      startDate: prev.startDate || (completed > 0 ? new Date() : undefined)
    }));
  };

  const recordTaskDifficulty = (taskId: string, difficulty: number) => {
    setAnalytics(prev => ({
      ...prev,
      taskAnalytics: {
        ...prev.taskAnalytics,
        [taskId]: {
          ...prev.taskAnalytics[taskId],
          taskId,
          difficulty
        }
      }
    }));
  };

  const recordTaskHelpfulness = (taskId: string, helpfulnessRating: number) => {
    setAnalytics(prev => ({
      ...prev,
      taskAnalytics: {
        ...prev.taskAnalytics,
        [taskId]: {
          ...prev.taskAnalytics[taskId],
          taskId,
          helpfulnessRating
        }
      }
    }));
  };

  const getDifficultTasks = () => {
    return Object.values(analytics.taskAnalytics)
      .filter(task => task.difficulty && task.difficulty <= 2)
      .map(task => task.taskId);
  };

  const getInsights = () => {
    const insights = [];
    
    // Completion rate insights
    if (analytics.completionRate > 75) {
      insights.push({
        type: 'success',
        message: 'Skvělá práce! Máš hotovou většinu úkolů.',
        icon: 'trophy'
      });
    } else if (analytics.completionRate > 50) {
      insights.push({
        type: 'progress',
        message: 'Jsi na dobré cestě! Pokračuj dál.',
        icon: 'trending-up'
      });
    } else if (analytics.completionRate > 0) {
      insights.push({
        type: 'encouragement',
        message: 'Každý začátek je těžký. Stačí dělat krok za krokem.',
        icon: 'heart'
      });
    }

    // Difficult days insights
    const difficultDays = analytics.dayAnalytics
      .filter(day => day.difficultTasks.length > 1)
      .map(day => day.day);
    
    if (difficultDays.length > 0) {
      insights.push({
        type: 'tip',
        message: `Dny ${difficultDays.join(', ')} vypadají náročněji. Věnuj jim víc času.`,
        icon: 'lightbulb'
      });
    }

    return insights;
  };

  const resetAnalytics = () => {
    setAnalytics(getInitialAnalytics());
    safeStorage.removeItem('checklist-analytics');
  };

  return {
    analytics,
    recordTaskDifficulty,
    recordTaskHelpfulness,
    getDifficultTasks,
    getInsights,
    resetAnalytics
  };
};